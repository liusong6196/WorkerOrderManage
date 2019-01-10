/**
 * 新增-报销单表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		expenseAccount: {
			expAccId: 0
		}
	},
	methods : {
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
				data:{data:JSON.stringify(data),type:1},
				async: false ,
				success: function (json) {
					layer.closeAll('loading');
					if(json.code==0){
						setTimeout(function(){
							window.location.href='list.html';
						}, 500); 
						layer.msg('添加成功',{icon:1});
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

function getUserId(){
	var userId=null;
	$.ajax({
		type: "post",
		url : '../../api/sys/user/getUserId',
		data:{},
		async: false ,
		success: function (json) {
			userId=json;
		}
	});
	return userId;
}
$(function(){
	//初始化报销单号
	$("#expAccNo").val(makeExpAccNo());
	
	//用户名
	$("#userName").val(getUserName(getUserId()));
	
	//获取报销单类型下拉框
	var expAccTypeType="exp_acc_type";
	var expAccTypeOptionsArrayJson=getOptionsByType(expAccTypeType);
	//循环添加
	for(var expAccTypeI=expAccTypeOptionsArrayJson.length-1;expAccTypeI>=0;expAccTypeI--){
		$("#expAccType")
			.append("<option value='"+expAccTypeOptionsArrayJson[expAccTypeI].value+"' >"+expAccTypeOptionsArrayJson[expAccTypeI].label+"</option>");
	}
	//获取项目
	var proOptionsArrayJson=getPro();
	for(var proOptionsI=proOptionsArrayJson.length-1;proOptionsI>=0;proOptionsI--){
		//var str=JSON.stringify(proOptionsArrayJson[proOptionsI]);
		$("#proId")
		.append("<option value='"+proOptionsArrayJson[proOptionsI].proId+"'>"+proOptionsArrayJson[proOptionsI].proName+"</option>");
	}
	//获取业务类型
	var proBusinesstype="pro_businesstype";
	var proBusinesstypeOptionsArrayJson=getOptionsByType(proBusinesstype);
	for(var proBusinesstypeI=proBusinesstypeOptionsArrayJson.length-1;proBusinesstypeI>=0;proBusinesstypeI--){
		$("#proBusinesstype")
			.append("<option value='"+proBusinesstypeOptionsArrayJson[proBusinesstypeI].value+"'>"+proBusinesstypeOptionsArrayJson[proBusinesstypeI].label+"</option>");
	}
	
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
			$(".roundisabled").prop('disabled',false);
			$(".roundisabled").prop('readonly',false);
			$(".roundisabledFont").html("*");
			$(".roundisabled").attr('isvalid','yes');
			//交通明细
			$("#addExpenseTrafficBtn").prop("disabled",false);
			//日常明细
			$("#addExpenseRoutineBtn").prop('disabled',false);
			break;
		//日常
		case 2:
			$("#routineBtnAddSpan").html("日常明细");
			$("#routineTitle").html("日常报销明细");
			$("#trafficTable").css('display','none');
			$("#routineTable").css('display','');
			//获取交通明细tr--删除
			var length=document.getElementById('expenseTrafficTbody').rows.length;
			if(length>=1){
				for(var i=0;i<length;i++){
					removeExpenseTrafficTbodyTr(i);
				}
			}
			$(".roundisabled").attr('isvalid','');
			$(".roundisabled").prop('disabled',true);
			$(".roundisabledFont").html("");
			//交通明细
			$("#addExpenseTrafficBtn").prop('disabled',true);
			//日常明细
			$("#addExpenseRoutineBtn").prop('disabled',false);
			break;

		default:
			$("#routineBtnAddSpan").html("日常明细");
			$("#trafficTable").css('display','none');
			$("#routineTable").css('display','none');
			//交通明细
			$("#addExpenseTrafficBtn").prop('disabled',true);
			//日常明细
			$("#addExpenseRoutineBtn").prop('disabled',true);
			$(".roundisabled").prop('readonly',true);
			$(".roundisabledFont").html("");
			$(".roundisabled").attr('isvalid','');
			break;
		}
	});
	
	/**
	 * 当点击添加日常费用明细
	 */
	$("#addExpenseRoutineBtn").click(function(){
		var length=document.getElementById('expenseRoutineTbody').rows.length;
		var tr="<tr id='expenseRoutineTbodyTr_"+length+"'>" +
					"<td width='15%'>" +
						"<select class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择项目' name='expItem'>" +
							"<option value='0' selected='selected'>请选择项目</option>" +
							"</select>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='expAbstract' placeholder='摘要明细'  isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td width='10%'>" +
						"<input type='text' class='form-control' name='accDetMoney' placeholder='报销金额'  isvalid='yes' checkexpession='IsMoney'>" +
					"</td>" +
					"<td>" +
						"<input type='text' class='form-control' name='remark' placeholder='备注'  >" +
					"</td>" +
					"<td width='7%'>" +
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
						"<input style='width:130px;' type='date' class='form-control' name='expStartDatetime'   isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input style='width:80px;'  type='text' class='form-control' name='expStartSite' placeholder='出发地' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input style='width:130px;' type='date' class='form-control' name='expEndDatetime'  isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<input type='text' style='width:80px;'  class='form-control' name='expEndSite' placeholder='到达地' isvalid='yes' checkexpession='NotNull'>" +
					"</td>" +
					"<td>" +
						"<select style='width:80px;'  class='form-control' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择交通工具' name='vehicleType'>" +
								"<option value='0' selected='selected'>请选择</option>" +
						"</select>" +
					"</td>" +
					"<td>" +
						"<input type='text' style='width:80px;' class='form-control' name='accDetMoney' placeholder='报销金额'  isvalid='yes' checkexpession='IsMoney'>" +
					"</td>" +
					"<td>" +
						"<input type='text' style='width:130px;' class='form-control' name='expAbstract' placeholder='摘要明细'  >" +
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
});
/**
 * 生成报销单号-根据当前时间
 * @returns
 */
function makeExpAccNo(){
	var date=new Date();
	var year=date.getFullYear(); //获取当前年份
	var mon=date.getMonth()+1; //获取当前月份
	var da=date.getDate(); //获取当前日
	var day=date.getDay(); //获取当前星期几
	var h=date.getHours(); //获取小时
	var m=date.getMinutes(); //获取分钟
	var s=date.getSeconds(); //获取秒
	if(mon<10)mon="0"+mon.toString();
	var result=year.toString()+mon.toString()+da.toString()+h.toString()+m.toString()+s.toString();
	return result;
}
/**
 * 日常/其他报销明细后的删除节点操作
 * @param idLength
 * @returns
 */
function removeExpenseRoutineTbodyTr(idLength){
	$('#expenseRoutineTbodyTr_'+idLength).remove();
}

/**
 *	差旅报销明细后的删除节点操作
 * @param idLength
 * @returns
 */
function removeExpenseTrafficTbodyTr(idLength){
	$('#expenseTrafficTbodyTr_'+idLength).remove();
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
function getPro(){
	var proArrayJson=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getPro',
		data:{},
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
	//报销单号
	accountJson.expAccNo=$("#expAccNo").val();
	//项目ID
	accountJson.proId=$("#proId").val();
	//业务类型
	accountJson.proBusinesstype=$("#proBusinesstype").val();
	//出差地
	accountJson.travelSite=$("#travelSite").val();
	//报销类型
	accountJson.expAccType=$("#expAccType").val();
	//出差天数
	accountJson.travelDays=$("#travelDays").val();
	//补贴金额alert("10wer".indexOf("."))
	var travelAllowance="";
	if($("#travelAllowance").val()!=""){
		if($("#travelAllowance").val().indexOf(".")<0){
			travelAllowance=$("#travelAllowance").val()+".00";
		}else{
			travelAllowance=parseFloat($("#travelAllowance").val()).toFixed(2);
		}
	}
	accountJson.travelAllowance=travelAllowance;
	if($("#expAccType").val()==2){
		accountJson.travelSite="";
		accountJson.travelDays="";
		accountJson.travelAllowance="";
	}
	//备注
	accountJson.remark=$("#accountRemark").val();
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
 * 日常/其他报销明细
 * @param trId
 * @returns JsonArray
 */
function getFromExpenseRoutine(trId){
	var expenseRoutineArrayJson=[];
	for(var i=0;i<trId;i++){
		var routineJson={};
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
