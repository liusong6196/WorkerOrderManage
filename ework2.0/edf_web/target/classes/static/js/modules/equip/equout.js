
function loadSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}
//加载客户信息下拉框
function loadCustomerSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].cusId+"'>"+data[i].cusName+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function getNowTime(){
	var ddd = new Date();
	var day = ddd.getDate();
	var month = ddd.getMonth() + 1;
	var datew = ddd.getFullYear()+"-"+month+"-"+day;
	var datew = datew.toString();
	return datew;
}

function isSelect(){
	var equ_id = $("#equ_id").val();
	var ecount = $("#equ_Count").val();
	if(equ_id == '' || ecount == '' || equ_id == 0){
		$("#s_alert").html("请选择要发货的设备！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function checkCount(){
	var kcount = $("#out_count").val();
	var ecount = $("#equ_Count").val();
	if(kcount == '' || kcount == null){
		$("#s_alert").html("发货数量不能为空！");
		$("#malert").modal("show");
		return false;
	}
	if(!(/(^[1-9]\d*$)/.test(kcount))){
		$("#s_alert").html("请输入正确的发货数量(正整数)！");
		$("#malert").modal("show");
		return false;
	}
	if(parseInt(kcount) > ecount){
		$("#s_alert").html("库存不足！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function checkMoney(){
	var money = $("#price").val();
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(money == '' || money == null){
		$("#s_alert").html("单价不能为空！");
		$("#malert").modal("show");
		return false;
	}
	
	if(money == '0'){
		$("#s_alert").html("单价不能为零！");
		$("#malert").modal("show");
		return false;
	}
	
	if(!reg.test(money)){
		$("#s_alert").html("请输入正确的单价(精确到小数点后两位)！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function valInvoiceMoney(){
	var kcount = $("#out_count").val();
	var money = $("#price").val();
	if(kcount == '' || money == ''){
		return;
	}
	var total = parseInt(kcount) * parseFloat(money);
	$("#money").val(total.toFixed(2));
}

function loadEqu(){
	$("#loadEqu").modal({
		backdrop:"static"//遮罩
	});
}

$(function(){
	
	initialPage();
	getGrid();
	
	$.ajax({
		type: "post",
		url : '../../api/equip/getcustomers?_' + $.now(),
		async:false,
		success: function (rs) {
			loadCustomerSelect(rs.customers,"customer")
		}
	});
	
	$("#equSure").click(function(){
		var ck = $('#dataGrid').bootstrapTable('getSelections');
		if(checkedRow(ck)){
			$("#equName").val(ck[0].equName);
			$("#styleId").val(ck[0].equStyleid);
			$("#equ_site").val(ck[0].equSiteName);
			$("#tetype").val(ck[0].equTypeName);
			$("#equ_Count").val(ck[0].equCount);
			$("#equ_id").val(ck[0].equId);
			$("#loadEqu").modal('hide');
		}
	});
	
	$("#option_date").val(getNowTime());
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/equip/list?_' + $.now(),
		height: "60%",
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "equName", title : "设备名称", align : "left"}, 
			{field : "equStyleid", title : "规格型号",align : "left"}, 
			{field : "equSiteName",title : "库存地点",align : "center"},
			{field : "equCount", title : "数量",align : "center"},
		]
	})
}

/**
 * 新增-设备表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		equipment: {
			equId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			if(!isSelect()){
				return false;
			}
			if(!checkCount()){
				return false;
			}
			if(!checkMoney()){
				return false;
			}
			vm.equipment.cusName=$("#customer").val();
			vm.equipment.optionDate=$("#option_date").val();
			vm.equipment.equId=$("#equ_id").val();
			vm.equipment.invoiceMoney=$("#money").val();
		    $.SaveForm({
		    	url: '../../api/equip/equ_out?_' + $.now(),
		    	param: vm.equipment,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
