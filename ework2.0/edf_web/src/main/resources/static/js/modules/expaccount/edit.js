/**
 * 编辑-报销单表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		expenseAccount: {
			expAccId: 0,
			expAccTypeSelelct:null,
			expAccState:null
		}
	},
	methods : {
		setForm: function() {
			//获取报销单和明细表单信息
			var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId))//listAccountAndDetailed(vm.expenseAccount.expAccId);
			//设置报销单信息
			setAccount(data.account);
			vm.expenseAccount.expAccState=data.account.expAccState;
			//设置交通报销单信息
			var trafficArrayJson=data.traffic;
			if(trafficArrayJson!=null)
				setTraffiic(trafficArrayJson);
			
			//设置日常报销单信息--setRoutine
			var routineArrayJson=data.routine;
			if(routineArrayJson!=null)
				setRoutine(routineArrayJson);
			if(data.account.expAccState==2 || data.account.expAccState==4){
				$(".form-control").prop('disabled',true);
				//$('.form-control').css('cursor','hand');
				//交通明细
				$("#addExpenseTrafficBtn").prop('disabled',true);
				//日常明细
				$("#addExpenseRoutineBtn").prop('disabled',true);
				$('.aDelete').removeAttr('onclick');
				$('.aDelete').removeAttr('onmouseover');
				//not-allowed
				$('.aDelete').css('cursor','not-allowed');
			}
		},
		acceptClick: function() {
			if (!$('.form').Validform()) {
		        return false;
		    }
			var accountFromJson=getFromAccount();
			//日常
			var rountineArrayJson="";
			//交通
			var trafficArrayJson="";
			//当主表报销单类型为2(日常时),不用获取交通报销明细.
			if(2==accountFromJson.expAccType){
				// 日常/其他表单信息
				var trId=document.getElementById('expenseRoutineTbody').rows.length;
				if(trId>0)
					rountineArrayJson=getFromExpenseRoutine(trId);
			}else{
				//日常/其他表单信息
				var routineTrId=document.getElementById('expenseRoutineTbody').rows.length;
				if(routineTrId>0)
					rountineArrayJson=getFromExpenseRoutine(routineTrId);
				
				//交通表单信息
				var trafficTrId=document.getElementById('expenseTrafficTbody').rows.length;
				if(trafficTrId>0)
					trafficArrayJson=getFromExpenseTraffic(trafficTrId);
			}
			var data={};
			data.account=accountFromJson;
			data.rountine=rountineArrayJson;
			data.traffic=trafficArrayJson;
			/**
			 * 提交表单信息
			 */
			$.ajax({
				type: "post",
				url : '../../api/exAccount/saveAccountAndDetailed',
				data:{data:JSON.stringify(data),type:2},
				async: false ,
				success: function (json) {
					layer.closeAll('loading');
					if(json.code==0){
						setTimeout(function(){
							window.location.href='list.html';
						}, 500); 
						layer.msg('修改成功',{icon:1});
						$.currentIframe().vm.load();
					}else{
						layer.msg('操作失败，请重试',{icon:5});
					}
				},beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					layer.closeAll('loading');
					layer.msg('操作失败，请重试',{icon:5});
				}
			});
		}
	}
});
$(function(){
	vm.expenseAccount.expAccId =localStorage.expAccId;
	vm.setForm();
	/**
	 * 当点击添加日常费用明细
	 */
	$("#addExpenseRoutineBtn").click(function(){
		var length=document.getElementById('expenseRoutineTbody').rows.length;
		var tr="<tr id='expenseRoutineTbodyTr_"+length+"'>" +
					"<td >" +
						"<select class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择项目' name='expItem'>" +
							"<option value='0' selected='selected'>请选择项目</option>" +
							"</select>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='expAbstract' placeholder='摘要明细'  isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='accDetMoney' placeholder='报销金额'  isvalid='yes' checkexpession='IsMoney'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='remark' placeholder='备注'  >" +
					"</td>" +
					"<td >" +
						"<a onmouseover=\"this.style.cursor='hand'\" onClick='removeExpenseRoutineTbodyTr("+length+")'><i class='fa fa-trash-o'></i>&nbsp;</a>" +
					"</td>" +
				"</tr>";
		$("#expenseRoutineTbody").append(tr);
		//报销项目下拉框
		var expItemType="exp_item";
		var expItemOptionsArrayJson=getOptionsByType(expItemType);
		//循环添加
		for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
			$("#expenseRoutineTbodyTr_"+length+" select[name='expItem']")
				.append("<option value='"+expItemOptionsArrayJson[expItemTypeI].value+"' >"+expItemOptionsArrayJson[expItemTypeI].label+"</option>");
		}
	});
	
	
	/**
	 * 当点击添加交通明细
	 */
	$("#addExpenseTrafficBtn").click(function(){
		var length=document.getElementById('expenseTrafficTbody').rows.length;
		var tr="<tr id='expenseTrafficTbodyTr_"+length+"'>" +
					"<td>" +
						"<input type='date' class='form-control' name='expStartDatetime'   isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='expStartSite' placeholder='出发地' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='date' class='form-control' name='expEndDatetime'  isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='expEndSite' placeholder='到达地' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<select class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择交通工具' name='vehicleType'>" +
								"<option value='0' selected='selected'>请选择</option>" +
						"</select>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='accDetMoney' placeholder='报销金额'  isvalid='yes' checkexpession='IsMoney'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='expAbstract' placeholder='摘要明细'  >" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='remark' placeholder='备注'  >" +
					"</td>" +
					"<td>" +
						"<a onmouseover=\"this.style.cursor='hand'\" onClick='removeExpenseTrafficTbodyTr("+length+")'><i class='fa fa-trash-o'></i>&nbsp;</a>" +
					"</td>" +
				"/tr>";
		$("#expenseTrafficTbody").append(tr);
		//交通工具下拉框
		var vehicleType="vehicle_type";
		var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
		//循环添加
		for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
			$("#expenseTrafficTbodyTr_"+length+" select[name='vehicleType']")
				.append("<option value='"+vehicleOptionsArrayJson[vehicleTypeI].value+"' >"+vehicleOptionsArrayJson[vehicleTypeI].label+"</option>");
		}
	});
	
	/**
	 * 报销类型下拉框改变事件
	 */
	$("#expAccType").change(function(){
		var value=parseInt($(this).val());
		switch (value) {
		//差旅
		case 1:
			$("#routineBtnAddSpan").html("其他明细");
			$("#routineTitle").html("其他报销明细");
			$("#trafficTable").css('display','');
			$("#routineTable").css('display','');
			//交通明细
			$("#addExpenseTrafficBtn").prop("disabled",false);
			//日常明细
			$("#addExpenseRoutineBtn").prop('disabled',false);
			$(".roundisabled").prop('disabled',false);
			$(".roundisabled").prop('readonly',false);
			$(".roundisabledFont").html("*");
			$(".roundisabled").attr('isvalid','yes');
			break;
		//日常
		case 2:
			//获取交通明细tr--删除
			var length=document.getElementById('expenseTrafficTbody').rows.length;
			if(length>0){
				if(getTrafficIds()!=null){
					if(confirm("此操作将删除所有交通报销明细,确定删除吗？")){
						$.ajax({
							type: "post",
							url : '/api/expenseTraffic/remove',
							data:{ids:JSON.stringify(getTrafficIds())},
							async: false ,
							success: function (json) {
								layer.msg('删除成功',{icon:1});
								for(var i=0;i<length;i++){
									$('#expenseTrafficTbodyTr_'+i).remove();
								}
								$("#routineBtnAddSpan").html("日常明细");
								$("#routineTitle").html("日常报销明细");
								$("#trafficTable").css('display','none');
								$("#routineTable").css('display','');
								$(".roundisabled").attr('isvalid','');
								$(".roundisabled").prop('disabled',true);
								$(".roundisabledFont").html("");
							},error : function(XMLHttpRequest, textStatus, errorThrown) {
								layer.msg('删除失败，请重试',{icon:5});
							}
						});
					}else{
						$("#expAccType").val('1');
						$("#routineBtnAddSpan").html("其他明细");
						$("#routineTitle").html("其他报销明细");
						$("#trafficTable").css('display','');
						$("#routineTable").css('display','');
						$(".roundisabled").prop('disabled',false);
						$(".roundisabled").prop('readonly',false);
						$(".roundisabledFont").html("*");
						$(".roundisabled").attr('isvalid','yes');
						//交通明细
						$("#addExpenseTrafficBtn").prop("disabled",false);
						//日常明细
						$("#addExpenseRoutineBtn").prop('disabled',false);
					}
				}else{
					//交通明细
					$("#addExpenseTrafficBtn").prop("disabled",true);
					$("#routineBtnAddSpan").html("日常明细");
					$("#trafficTable").css('display','none');
					$(".roundisabled").attr('isvalid','');
					$(".roundisabled").prop('disabled',true);
					$(".roundisabledFont").html("");
				}
			}else{
				//交通明细
				$("#addExpenseTrafficBtn").prop("disabled",true);
				$("#routineBtnAddSpan").html("日常明细");
				$("#trafficTable").css('display','none');
				$(".roundisabled").attr('isvalid','');
				$(".roundisabled").prop('disabled',true);
				$(".roundisabledFont").html("");
			}
			break;
		default:
			$("#routineBtnAddSpan").html("日常明细");
			$("#trafficTable").css('display','none');
			$("#routineTable").css('display','none');
			//交通明细
			$("#addExpenseTrafficBtn").prop('disabled',true);
			//日常明细
			$("#addExpenseRoutineBtn").prop('disabled',true);
			$(".roundisabledFont").html("");
			$(".roundisabled").attr('isvalid','');
			break;
		}
	});
});
function getTrafficIds(){
	var length=document.getElementById('expenseTrafficTbody').rows.length;
	var idArray=[];
	for(var i=0;i<length;i++){
		if(isNaN($('#expenseTrafficTbodyTr_'+i+" input[name=expTraId]").val())){
			return null;
		}
		idArray[i]=parseInt($('#expenseTrafficTbodyTr_'+i+" input[name=expTraId]").val());
	}
	return idArray;
}
/**
 * 获取当前用户姓名
 * @returns
 */
function getUserName(userId){
	var userName="";
	$.ajax({
		type: "post",
		url : '../../api/sys/user/userInfo',
		data:{userId:userId},
		async: false ,
		success: function (json) {
			userName=json.userName;
		}
	});
	return userName;
}
/**
 * 设置报销单表展示信息
 * @returns
 */
function setAccount(account){
	//id
	$("#expAccId").val(account.expAccId);
	//报销单号
	$("#expAccNo").val(account.expAccNo);
	//用户姓名
	$("#userName").val(getUserName(account.expAccUserid));
	//设置报销单类型下拉框
	var expAccTypeType="exp_acc_type";
	var expAccTypeOptionsArrayJson=getOptionsByType(expAccTypeType);
	for(var expAccTypeI=expAccTypeOptionsArrayJson.length-1;expAccTypeI>=0;expAccTypeI--){
		$("#expAccType")
			.append("<option value='"+expAccTypeOptionsArrayJson[expAccTypeI].value+"' >"+expAccTypeOptionsArrayJson[expAccTypeI].label+"</option>");
	}
	$("#expAccType").val(account.expAccType);
	//设置项目
	var proOptionsArrayJson=getPro();
	for(var proOptionsI=proOptionsArrayJson.length-1;proOptionsI>=0;proOptionsI--){
		$("#proId")
		.append("<option value='"+proOptionsArrayJson[proOptionsI].proId+"' >"+proOptionsArrayJson[proOptionsI].proName+"</option>");
	}
	$("#proId").val(account.proId);
	//获取业务类型
	var proBusinesstype="pro_businesstype";
	var proBusinesstypeOptionsArrayJson=getOptionsByType(proBusinesstype);
	for(var proBusinesstypeI=proBusinesstypeOptionsArrayJson.length-1;proBusinesstypeI>=0;proBusinesstypeI--){
		$("#proBusinesstype")
			.append("<option value='"+proBusinesstypeOptionsArrayJson[proBusinesstypeI].value+"'>"+proBusinesstypeOptionsArrayJson[proBusinesstypeI].label+"</option>");
	}
	$("#proBusinesstype").val(account.proBusinesstype);
	//出差地travelSite
	$("#travelSite").val(account.travelSite);
	//出差天数
	$("#travelDays").val(account.travelDays);
	//补贴金额
	$("#travelAllowance").val(account.travelAllowance);
	//备注
	$("#accountRemark").val(account.remark);
	vm.expenseAccount.expAccTypeSelelct=account.expAccType;
	//按钮状态
	if(1==account.expAccType){
		$(".roundisabledFont").html("*");
		$(".roundisabled").attr('isvalid','yes');
		$("#routineBtnAddSpan").html("其他明细");
		$("#routineTitle").html("其他报销明细");
		$("#trafficTable").css('display','');
		$("#routineTable").css('display','');
		//交通明细
		$("#addExpenseTrafficBtn").prop("disabled",false);
		//日常明细
		$("#addExpenseRoutineBtn").prop('disabled',false);
	}else if(2==account.expAccType){
		$(".roundisabled").attr('isvalid','');
		$(".roundisabled").val("");
		$(".roundisabled").prop('disabled',true);
		$(".roundisabledFont").html("");
		$("#routineBtnAddSpan").html("日常明细");
		$("#routineTitle").html("日常报销明细");
		$("#trafficTable").css('display','none');
		$("#routineTable").css('display','');
		//交通明细
		$("#addExpenseTrafficBtn").prop('disabled',true);
		//日常明细
		$("#addExpenseRoutineBtn").prop('disabled',false);
	}else{
		$("#routineBtnAddSpan").html("日常明细");
		$("#trafficTable").css('display','none');
		$("#routineTable").css('display','none');
		//交通明细
		$("#addExpenseTrafficBtn").prop('disabled',true);
		//日常明细
		$("#addExpenseRoutineBtn").prop('disabled',true);
	}
}
/**
 * 设置交通报销明细
 * @param traffics
 * @returns
 */
function setTraffiic(traffics){
	for(var i=0;i<traffics.length;i++){
		var tr="<tr id='expenseTrafficTbodyTr_"+i+"'>" +
					"<td><input type='hidden' name='expTraId' value='"+traffics[i].expTraId+"'/>" +
						"<input type='date' class='form-control' name='expStartDatetime' value='"+traffics[i].expStartDatetime+"'   isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td width='10%'>" +
						"<input type='text' class='form-control' name='expStartSite' placeholder='出发地' value='"+traffics[i].expStartSite+"' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='date' class='form-control' name='expEndDatetime' value='"+traffics[i].expEndDatetime+"' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td width='10%'>" +
						"<input type='text' class='form-control' name='expEndSite' value='"+traffics[i].expEndSite+"' placeholder='到达地' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td width='12%'>" +
						"<select class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择交通工具' name='vehicleType'>" +
								"<option value='0' selected='selected'>请选择</option>" +
						"</select>" +
					"</td>" +
					"<td width='10%'>" +
						"<input type='text' class='form-control' name='accDetMoney' value='"+traffics[i].accDetMoney+"' placeholder='报销金额'  isvalid='yes' checkexpession='IsMoney'>" +
					"</td>" +
					"<td width='20%'>" +
						"<input type='text' class='form-control' name='expAbstract' value='"+traffics[i].expAbstract+"' placeholder='摘要明细'  >" +
					"</td>" +
					"<td width='30%'>" +
						"<input type='text' class='form-control' name='remark'  value='"+traffics[i].remark+"' placeholder='备注'  >" +
					"</td>" +
					"<td width='5%'>" +
						"<a class='aDelete' onmouseover=\"this.style.cursor='hand'\" onClick='removeExpenseTrafficTbodyTr("+i+")'><i class='fa fa-trash-o'></i>&nbsp;</a>" +
					"</td>" +
				"/tr>";
		$("#expenseTrafficTbody").append(tr);
		//交通工具下拉框
		var vehicleType="vehicle_type";
		var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
		//循环添加
		for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
			$("#expenseTrafficTbodyTr_"+i+" select[name='vehicleType']")
					.append("<option value='"+vehicleOptionsArrayJson[vehicleTypeI].value+"' >"+vehicleOptionsArrayJson[vehicleTypeI].label+"</option>");
		}
		$("#expenseTrafficTbodyTr_"+i+" select[name='vehicleType']").val(traffics[i].vehicleType);
	}
	
}

/**
 * 设置日常报销单详细
 * @param routines
 * @returns
 */
function setRoutine(routines){
	for(var i=0;i<routines.length;i++){
		var tr="<tr id='expenseRoutineTbodyTr_"+i+"'>" +
				"<td width='15%'><input type='hidden' name='expRouId' value='"+routines[i].expRouId+"'/>" +
					"<select class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择项目' name='expItem'>" +
						"<option value='0' selected='selected'>请选择项目</option>" +
						"</select>" +
				"</td>" +
				"<td>" +
					"<input type='text' class='form-control' name='expAbstract' placeholder='摘要明细' value='"+routines[i].expAbstract+"'  isvalid='yes' checkexpession='NotNull'>" +
				"</td>" +
				"<td width='10%'>" +
					"<input type='text' class='form-control' name='accDetMoney' placeholder='报销金额'  value='"+routines[i].accDetMoney+"'  isvalid='yes' checkexpession='IsMoney'>" +
				"</td>" +
				"<td>" +
					"<input type='text' class='form-control' name='remark' placeholder='备注'  value='"+routines[i].remark+"'>" +
				"</td>" +
				"<td width='5%'>" +
					"<a class='aDelete' onmouseover=\"this.style.cursor='hand'\" onClick='removeExpenseRoutineTbodyTr("+i+")'><i class='fa fa-trash-o'></i>&nbsp;</a>" +
				"</td>" +
			"</tr>";
		$("#expenseRoutineTbody").append(tr);
		//报销项目下拉框
		var expItemType="exp_item";
		var expItemOptionsArrayJson=getOptionsByType(expItemType);
		//循环添加
		for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
			$("#expenseRoutineTbodyTr_"+i+" select[name='expItem']")
				.append("<option value='"+expItemOptionsArrayJson[expItemTypeI].value+"' >"+expItemOptionsArrayJson[expItemTypeI].label+"</option>");
		}
		$("#expenseRoutineTbodyTr_"+i+" select[name='expItem']").val(routines[i].expItem);
	}
	
}
/**
 * 获取表单初始化所有的值
 * @param id 报销单号
 * @returns
 */
function listAccountAndDetailed(id){
	var result=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/listAccountAndDetailed',
		data:{id:vm.expenseAccount.expAccId},
		async: false ,
		success: function (json) {
			if(json.code==0){
				result=json.data;
			}
		}
	});
	return result;
}


/**
 * 日常/其他报销明细后的删除节点操作
 * @param idLength
 * @returns
 */
function removeExpenseRoutineTbodyTr(idLength){
	if($("#expenseRoutineTbodyTr_"+idLength+" input[name=expRouId]").val()!=null){
		layer.confirm('确定删除吗？', {icon: 2, title:'提示'}, function(index){
			$.ajax({
				type: "post",
				url : '../../api/expenseRoutine/removeOne',
				data:{id:$('#expenseRoutineTbodyTr_'+idLength+" input[name=expRouId]").val()},
				async: false ,
				success: function (json) {
					if(json.code==0){
						$('#expenseRoutineTbodyTr_'+idLength).remove();
						layer.closeAll('loading');
						layer.msg('删除成功',{icon:1});
					}
				},
				beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					layer.closeAll('loading');
					layer.msg('删除失败，请重试',{icon:5});
				}
			});
			layer.close(index)
		});
	}else{
		$('#expenseRoutineTbodyTr_'+idLength).remove();
	}
}

/**
 *	差旅报销明细后的删除节点操作
 * @param idLength
 * @returns
 */
function removeExpenseTrafficTbodyTr(idLength){
	if($("#expenseTrafficTbodyTr_"+idLength+" input[name=expTraId]").val()!=null){
		layer.confirm('确定删除吗？', {icon: 2, title:'提示'}, function(index){
			$.ajax({
				type: "post",
				url : '../../api/expenseTraffic/deleteOne',
				data:{id:$('#expenseTrafficTbodyTr_'+idLength+" input[name=expTraId]").val()},
				async: false ,
				success: function (json) {
					if(json.code==0){
						$('#expenseTrafficTbodyTr_'+idLength).remove();
						layer.closeAll('loading');
						layer.msg('删除成功',{icon:1});
					}
				},
				beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					layer.closeAll('loading');
					layer.msg('删除失败，请重试',{icon:5});
				}
			});
			layer.close(index)
		});
	}else{
		$('#expenseTrafficTbodyTr_'+idLength).remove();
	}
}
/**
 * 获取交通工具
 * @returns
 */
function getOptionsByType(type){
	var optionsArrayJson=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getOptions',
		data:{type:type},
		async: false ,
		success: function (json) {
			if(json.code==0){
				optionsArrayJson=json.data;
			}
		}
	});
	return optionsArrayJson;
}
/**
 * 获取当前用户参与的项目--proId为获取业务类型需要
 * @param proId
 * @returns
 */
function getPro(proId){
	var proArrayJson=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getPro',
		data:{proId:proId},
		async: false ,
		success: function (json) {
			if(json.code==0){
				proArrayJson=json.data;
			}
		}
	});
	return proArrayJson;
}
/**
 * 获取报销单表的各项值-json
 */
function getFromAccount(){
	var accountJson={};
	accountJson.expAccId=$("#expAccId").val();
	//报销单号
	accountJson.expAccNo=$("#expAccNo").val();
	//项目ID
	accountJson.proId=$("#proId").val();
	//业务类型
	accountJson.proBusinesstype=$("#proBusinesstype").val();
	//出差地
	accountJson.travelSite=$("#expAccType").val()==2?null:$("#travelSite").val();
	//报销类型
	accountJson.expAccType=$("#expAccType").val();
	//出差天数
	accountJson.travelDays=$("#expAccType").val()==2?"":$("#travelDays").val();
	//补贴金额alert("10wer".indexOf("."))
	var travelAllowance="";
	if($("#travelAllowance").val()!=""){
		if($("#travelAllowance").val().indexOf(".")<0){
			travelAllowance=$("#travelAllowance").val()+".00";
		}else{
			travelAllowance=parseFloat($("#travelAllowance").val()).toFixed(2);
		}
	}
	//补贴金额
	accountJson.travelAllowance=$("#expAccType").val()==2?"":travelAllowance;
	//备注
	accountJson.remark=$("#accountRemark").val();
	
	//判断审批状态为未通过
	if(vm.expenseAccount.expAccState==3){
		accountJson.expAccState="1";
	}
	return accountJson;
}
/**
 * 获取交通报销明细表单值
 * @param trId
 * @returns JsonArray
 */
function getFromExpenseTraffic(trId){
	var expenseTrafficArrayJson=[];
	for(var i=0;i<trId;i++){
		var trafficJson={};
		if($("#expenseTrafficTbodyTr_"+i+" input[name=expTraId]")!=null){
			trafficJson.expTraId=$("#expenseTrafficTbodyTr_"+i+" input[name=expTraId]").val();
		}
		//报销单号
		trafficJson.expAccNo=$("#expAccNo").val();
		//出发时间
		trafficJson.expStartDatetime=$("#expenseTrafficTbodyTr_"+i+" input[name=expStartDatetime]").val();
		//出发地点
		trafficJson.expStartSite=$("#expenseTrafficTbodyTr_"+i+" input[name=expStartSite]").val();
		//到达时间
		trafficJson.expEndDatetime=$("#expenseTrafficTbodyTr_"+i+" input[name=expEndDatetime]").val();
		//到达地点
		trafficJson.expEndSite=$("#expenseTrafficTbodyTr_"+i+" input[name=expEndSite]").val();
		//交通工具
		trafficJson.vehicleType=$("#expenseTrafficTbodyTr_"+i+" select[name=vehicleType]").val();
		var accDetMoney="";
		if($("#expenseTrafficTbodyTr_"+i+" input[name=accDetMoney]").val().indexOf(".")<0){
			accDetMoney=$("#expenseTrafficTbodyTr_"+i+" input[name=accDetMoney]").val()+".00";
		}else{
			accDetMoney=parseFloat($("#expenseTrafficTbodyTr_"+i+" input[name=accDetMoney]").val()).toFixed(2);
		}
		//报销金额
		trafficJson.accDetMoney=accDetMoney;
		//摘要明细
		trafficJson.expAbstract=$("#expenseTrafficTbodyTr_"+i+" input[name=expAbstract]").val();
		//备注
		trafficJson.remark=$("#expenseTrafficTbodyTr_"+i+" input[name=remark]").val();
		expenseTrafficArrayJson.push(trafficJson);
	}
	return expenseTrafficArrayJson;
}

/**
 * 日常/其他报销明细
 * @param trId
 * @returns JsonArray
 */
function getFromExpenseRoutine(trId){
	var expenseRoutineArrayJson=[];
	for(var i=0;i<trId;i++){
		var routineJson={};
		if($("#expenseRoutineTbodyTr_"+i+" input[name=expRouId]")!=null){
			routineJson.expRouId=$("#expenseRoutineTbodyTr_"+i+" input[name=expRouId]").val();
		}
		//报销单号
		routineJson.expAccNo=$("#expAccNo").val();
		//报销单类型
		routineJson.expAccType=$("#expAccType").val();
		//报销项
		routineJson.expItem=$("#expenseRoutineTbodyTr_"+i+" select[name=expItem]").val();
		//摘要明细
		routineJson.expAbstract=$("#expenseRoutineTbodyTr_"+i+" input[name=expAbstract]").val();
		var accDetMoney="";
		if($("#expenseRoutineTbodyTr_"+i+" input[name=accDetMoney]").val().indexOf(".")<0){
			accDetMoney=$("#expenseRoutineTbodyTr_"+i+" input[name=accDetMoney]").val()+".00";
		}else{
			accDetMoney=parseFloat($("#expenseRoutineTbodyTr_"+i+" input[name=accDetMoney]").val()).toFixed(2)
		}
		//报销金额
		routineJson.accDetMoney=accDetMoney;
		//备注
		routineJson.remark=$("#expenseRoutineTbodyTr_"+i+" input[name=remark]").val();
		expenseRoutineArrayJson.push(routineJson);
	}
	return expenseRoutineArrayJson;
}