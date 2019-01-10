/**
 * 编辑-报销单表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		expenseAccount: {
			expAccId: 0,
			expAccState:null
		}
	},
	methods : {
		setForm: function() {
			//获取报销单和明细表单信息
			var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId))//listAccountAndDetailed(vm.expenseAccount.expAccId);
			//设置报销单信息
			setAccount(data.account);
			//设置交通报销单信息
			var trafficArrayJson=data.traffic;
			if(trafficArrayJson!=null)
				setTraffiic(trafficArrayJson);
			//设置日常报销单信息--setRoutine
			var routineArrayJson=data.routine;
			if(routineArrayJson!=null)
				setRoutine(routineArrayJson);
		},acceptClick:function(){
			var expAccstate=vm.expenseAccount.expAccState;
			var expAccStateSelect=$("#expAccStateSelect").val();
			if (expAccStateSelect==0) {
				layer.msg('请更换审批状态！', function(){
					//关闭后的操作
				});
		        return false;
		    }
			if(expAccstate==expAccStateSelect){
				setTimeout(function(){
					dialogClose();
				}, 500); 
				return ;
			}
			if(2==expAccstate||4==expAccstate){
				setTimeout(function(){
					dialogClose();
				}, 500); 
				$.currentIframe().vm.load();
			}else{
				//
				$.ajax({
					type: "post",
					url : '../../api/exAccount/updateState',
					data:{id:vm.expenseAccount.expAccId,state:expAccStateSelect},
					async: false ,
					success: function (json) {
						layer.closeAll('loading');
						if(json.code==0){
							setTimeout(function(){
								dialogClose();
							}, 500); 
							layer.msg('操作成功',{icon:1});
						}else{
							layer.msg('操作失败，请重试',{icon:5});
						}
						$.currentIframe().vm.load();
					},beforeSend:function(){
						layer.load();
					},error : function(XMLHttpRequest, textStatus, errorThrown) {
						setTimeout(function(){
							dialogClose();
						}, 500);
						layer.closeAll('loading');
						layer.msg('操作失败，请重试',{icon:5});
					}
				});
			}
			
		}
	}
});
$(function(){
	
	vm.expenseAccount.expAccId =localStorage.expAccId;
	vm.setForm();
});

function change(type){
	if(1==type){
		layer.confirm('确定通过审批？', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				type: "post",
				url : '../../api/exAccount/updateState',
				data:{id:vm.expenseAccount.expAccId,state:5},
				async: false ,
				success: function (json) {
					layer.closeAll('loading');
					if(json.code==0){
						setTimeout(function(){
							window.location.href='list.html';
						}, 500); 
						$("#expAccState").html('<span class="label label-info">审批通过</span>');
						$("#zt").html('<span class="label label-info">审批通过</span>');
						layer.msg('操作成功',{icon:1});
					}else{
						layer.msg('操作失败，请重试',{icon:5});
					}
					$.currentIframe().vm.load();
				},beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					setTimeout(function(){
						window.location.href='list.html';
					}, 500);
					layer.closeAll('loading');
					layer.msg('操作失败，请重试',{icon:5});
				}
			});
			layer.close(index);
		});
	}else if(5==type){
		layer.confirm('确定通过审批？', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				type: "post",
				url : '../../api/exAccount/updateState',
				data:{id:vm.expenseAccount.expAccId,state:2},
				async: false ,
				success: function (json) {
					layer.closeAll('loading');
					if(json.code==0){
						setTimeout(function(){
							window.location.href='list.html';
						}, 500); 
						$("#expAccState").html('<span class="label label-info">审批通过</span>');
						$("#zt").html('<span class="label label-info">审批通过</span>');
						layer.msg('操作成功',{icon:1});
					}else{
						layer.msg(json.msg,{icon:5});
					}
					$.currentIframe().vm.load();
				},beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					setTimeout(function(){
						window.location.href='list.html';
					}, 500);
					layer.closeAll('loading');
					layer.msg('操作失败，请重试',{icon:5});
				}
			});
			layer.close(index);
		});
	}else{
		layer.confirm('确定该报销单审批为不通过吗？', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				type: "post",
				url : '../../api/exAccount/updateState',
				data:{id:vm.expenseAccount.expAccId,state:3},
				async: false ,
				success: function (json) {
					layer.closeAll('loading');
					if(json.code==0){
						setTimeout(function(){
							window.location.href='list.html';
						}, 500); 
						$("#expAccState").html('<span class="label label-danger">审批不通过</span>');
						$("#zt").html('<span class="label label-danger">审批不通过</span>');
						layer.msg('操作成功',{icon:1});
					}else{
						layer.msg('操作失败，请重试',{icon:5});
					}
					$.currentIframe().vm.load();
				},beforeSend:function(){
					layer.load();
				},error : function(XMLHttpRequest, textStatus, errorThrown) {
					setTimeout(function(){
						dialogClose();
					}, 500);
					layer.closeAll('loading');
					layer.msg('操作失败，请重试',{icon:5});
				}
			});
		  layer.close(index);
		});
	}
}
/**
 * 设置报销单表展示信息
 * @returns
 */
function setAccount(account){
	//审批状态
	vm.expenseAccount.expAccState=account.expAccState;
	switch (account.expAccState) {
	case  "1": 
//		var select="<select class='form-control' name='expAccState' id='expAccStateSelect' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择状态'>" +
//					"<option value='0' selected='selected'>待审批</option>" +
//					"<option value='2'>审批通过</option>" +
//					"<option value='3'>审批不通过</option>" +
//				"</select>";
//		$("#expAccState").append(select);
		$("#expAccState").append('<span class="label label-default">待审批</span>');
		break;
	case  "2": 
		$("#expAccState").append('<span class="label label-info">审批通过</span>');
		break;
	case  "3": 
//		var select="<select class='form-control' name='expAccState' id='expAccStateSelect' isvalid='yes' checkexpession='SELECTNotNULL' msg='请选择状态'>" +
//						"<option value='0'>待审批</option>" +
//						"<option value='2'>审批通过</option>" +
//						"<option value='3' selected='selected'>审批不通过</option>" +
//					"</select>";
//		$("#expAccState").append(select);
		$("#expAccState").append('<span class="label label-danger">审批不通过</span>');
		break;
	case  "4": 
		$("#expAccState").append('<span class="label label-success">已报销</span>');
		break;
	case  "5": 
		$("#expAccState").append('<span class="label label-success">审核中</span>');
		break;
	default: 
		$("#expAccState").append('<span class="label label-default"></span>');
		break;
	}
	
	 
   
	document.getElementById("via").onclick=function(){
		  change(account.expAccState);
		}
	
	
	//id
	$("#expAccId").val(account.expAccId);
	//报销单号
	$("#expAccNo").html(account.expAccNo);
	//设置报销单类型
	var expAccTypeType="exp_acc_type";
	var expAccTypeOptionsArrayJson=getOptionsByType(expAccTypeType);
	for(var expAccTypeI=expAccTypeOptionsArrayJson.length-1;expAccTypeI>=0;expAccTypeI--){
		if(account.expAccType==expAccTypeOptionsArrayJson[expAccTypeI].value){
			$("#expAccType").html(expAccTypeOptionsArrayJson[expAccTypeI].label);
			break;
		}
	}
	//设置项目
	var proOptionsArrayJson=getPro(null);
	for(var proOptionsI=proOptionsArrayJson.length-1;proOptionsI>=0;proOptionsI--){
		if(account.proId==proOptionsArrayJson[proOptionsI].proId){
			$("#proId").html(proOptionsArrayJson[proOptionsI].proName);
			break;
		}
	}
	//研发项目proBusinesstype
	$("#proBusinesstype").html(account.proBusinesstype);
	//出差地travelSite
	$("#travelSite").html(account.travelSite);
	//出差天数
	$("#travelDays").html(account.travelDays);
	//补贴金额
	$("#travelAllowance").html(account.travelAllowance);
	//备注
	$("#remark").html(account.accountRemark);
	//申报人
	$("#userName").html(getUserName(account.expAccUserid));
	//申报时间
	$("#expAccDatetime").html(account.expAccDatetime);
	//补贴金额
	$("#travelAllowance").html(account.travelAllowance);
	//审批人
	if(account.checkUserid!=null)
		$("#checkUserid").html(getUserName(account.checkUserid));
	if(account.checkDatetime!=null)
		$("#checkDatetime").html(account.checkDatetime);
	//复核人
	if(account.doubleCheckUserid!=null)
		$("#doubleCheckUserid").html(getUserName(account.doubleCheckUserid));
	if(account.doubleCheckDatetime!=null)
		$("#doubleCheckDatetime").html(account.doubleCheckDatetime);
	$("#doubleCheckMoney").html(account.doubleCheckMoney==null?"":account.doubleCheckMoney);
}
/**
 * 设置交通报销明细
 * @param traffics
 * @returns
 */
function setTraffiic(traffics){
	for(var i=0;i<traffics.length;i++){
		//交通工具下拉框
		var vehicleType="vehicle_type";
		var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
		var vehicleSpan="";
		for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
			if(traffics[i].vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
				vehicleSpan=vehicleOptionsArrayJson[vehicleTypeI].label;
				break;
			}
		}
		if(traffics[i].chcekMoney==null){
			traffics[i].chcekMoney="";
		}
		var tr="<tr id='expenseTrafficTbodyTr_"+i+"'>" +
						"<td width='10%'><span>"+traffics[i].expStartDatetime+"</span></td>" +
						"<td width='6%'><span>"+traffics[i].expStartSite+"</span></td>" +
						"<td width='10%'><span>"+traffics[i].expEndDatetime+"</span></td>" +
						"<td width='6%'><span>"+traffics[i].expEndSite+"</span></td>" +
						"<td width='6%'><span>"+vehicleSpan+"</span></td>" +
						"<td width='8%'><span>"+traffics[i].accDetMoney+"</span></td>" +
						"<td width='8%'><span>"+traffics[i].chcekMoney+"</span></td>" +
						"<td><span>"+traffics[i].expAbstract+"</span></td>" +
						"<td><span>"+traffics[i].remark+"</span></td>" +
				"/tr>";
		$("#expenseTrafficTbody").append(tr);
	}
	
}

/**
 * 设置日常报销单详细
 * @param routines
 * @returns
 */
function setRoutine(routines){
	for(var i=0;i<routines.length;i++){
		//报销项目
		var expItemType="exp_item";
		var expItemOptionsArrayJson=getOptionsByType(expItemType);
		var expTtemSpan="";
		for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
			if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
				expTtemSpan=expItemOptionsArrayJson[expItemTypeI].label;
				break;
			}
		}
		if(routines[i].chcekMoney==null){
			routines[i].chcekMoney="";
		}
		var tr="<tr id='expenseRoutineTbodyTr_"+i+"'>" +
				"<td width='10%'><span>"+expTtemSpan+"</span></td>" +
				"<td><span>"+routines[i].expAbstract+"</span></td>" +
				"<td width='8%'><span>"+routines[i].accDetMoney+"</span></td>" +
				"<td width='8%'><span>"+routines[i].chcekMoney+"</span></td>" +
				"<td><span>"+routines[i].remark+"</span></td>"
			"</tr>";
		$("#expenseRoutineTbody").append(tr);
		
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