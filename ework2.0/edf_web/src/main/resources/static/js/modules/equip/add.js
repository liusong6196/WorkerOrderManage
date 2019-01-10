/**
 * 新增-设备表js
 */
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

function getNowTime(){
	var ddd = new Date();
	var day = ddd.getDate();
	var month = ddd.getMonth() + 1;
	var datew = ddd.getFullYear()+"-"+month+"-"+day;
	var datew = datew.toString();
	return datew;
}

function checkCount(){
	var kcount = $("#equ_Count").val();
	if(kcount == '' || kcount == null){
		$("#s_alert").html("入库数量不能为空！");
		$("#malert").modal("show");
		return false;
	}
	if(!(/(^[1-9]\d*$)/.test(kcount))){
		$("#s_alert").html("请输入正确的入库数量(正整数)！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function checkMoney(){
	var money = $("#equ_money").val();
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(money == '' || money == null){
		$("#s_alert").html("设备单价不能为空！");
		$("#malert").modal("show");
		return false;
	}
	
	if(money == '0'){
		$("#s_alert").html("设备单价不能为零！");
		$("#malert").modal("show");
		return false;
	}
	
	if(!reg.test(money)){
		$("#s_alert").html("请输入正确的设备单价(精确到小数点后两位)！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

$(function(){
	
	$.ajax({
		type: "post",
		data:{type:"equ_source"},
		url : '../../api/equip/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadSelect(rs.typedata,"tSource")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"equ_type"},
		url : '../../api/equip/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadSelect(rs.typedata,"tetype")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadSelect(rs.typedata,"equ_site")
		}
	});
	
	$.ajax({
		type: "post",
		url : '../../api/equip/getcustomers?_' + $.now(),
		async:false,
		success: function (rs) {
			loadCustomerSelect(rs.customers,"customer")
		}
	});
	
	$.get('../../api/sys/supplier/Suplist?_' + $.now(), function(r){
		console.log(r);
		vm.suplist=r;
	});
	
	$("#option_date").val(getNowTime());
	$("#tSource").val("1");
	$("#tetype").val("1");
	$("#equ_site").val("1");
});

//加载供应商信息下拉框
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


var vm = new Vue({
	el:'#eway',
	data: {
		equipment: {
			equId: 0
		},
		suplist:[]
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			if(!checkCount()){
				return false;
			}
			if(!checkMoney()){
				return false;
			}
			vm.equipment.equSource=$("#tSource").val();
			vm.equipment.equSite=$("#equ_site").val();
			vm.equipment.equType=$("#tetype").val();
			vm.equipment.optionDate=$("#option_date").val();
		    $.SaveForm({
		    	url: '../../api/equip/save?_' + $.now(),
		    	param: vm.equipment,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
