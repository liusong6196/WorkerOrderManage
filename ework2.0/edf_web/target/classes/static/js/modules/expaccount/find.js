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
			window.print(); 
//			setTimeout(function(){
//				dialogClose();
//			}, 500);
		}
	}
});
$(function(){
	vm.expenseAccount.expAccId =localStorage.expAccId;
	vm.setForm();
});
/**
 * 设置报销单表展示信息
 * @returns
 */
function setAccount(account){
	//审批状态
	vm.expenseAccount.expAccState=account.expAccState;
	switch (account.expAccState) {
	case  "1": 
		$("#expAccState").append('<span class="label label-default">待审批</span>');
		break;
	case  "2": 
		$("#expAccState").append('<span class="label label-info">审批通过</span>');
		break;
	case  "3": 
		$("#expAccState").append('<span class="label label-danger">审批不通过</span>');
		break;
	case  "4": 
		$("#expAccState").append('<span class="label label-success">已报销</span>');
		break;
	case  "5": 
		$("#expAccState").append('<span class="label label-success">审批中</span>');
		break;
	/*default: 
		$("#expAccState").append('<span class="label label-default">待审批</span>');
		break;*/
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
	var proOptionsArrayJson=getPro();
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
	
	if(account.checkUseridTwo!=null)
		$("#checkUseridTwo").html(getUserName(account.checkUseridTwo));
	if(account.checkDatetimeTwo!=null)
		$("#checkDatetimeTwo").html(account.checkDatetimeTwo);
	
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
						"<td ><span>"+traffics[i].expStartDatetime+"</span></td>" +
						"<td ><span>"+traffics[i].expStartSite+"</span></td>" +
						"<td ><span>"+traffics[i].expEndDatetime+"</span></td>" +
						"<td ><span>"+traffics[i].expEndSite+"</span></td>" +
						"<td ><span>"+vehicleSpan+"</span></td>" +
						"<td ><span>"+traffics[i].accDetMoney+"</span></td>" +
						"<td ><span>"+traffics[i].chcekMoney+"</span></td>" +
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
				"<td ><span>"+expTtemSpan+"</span></td>" +
				"<td><span>"+routines[i].expAbstract+"</span></td>" +
				"<td ><span>"+routines[i].accDetMoney+"</span></td>" +
				"<td ><span>"+routines[i].chcekMoney+"</span></td>" +
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