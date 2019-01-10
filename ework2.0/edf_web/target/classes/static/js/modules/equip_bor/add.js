
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

function loadProSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].proId+"'>"+data[i].proName+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function loadUserSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].userId+"'>"+data[i].username+"</option>";
	}
	$('#'+id).html(htmlstr);
	
}

function getEquCount(id){
	var equCount = "";
	$.ajax({
		type: "post",
		async:false,
		data:{
			id:id
		},
		url : '../../api/equip/getequcount?_' + $.now(),
		success: function (data) {
			equCount = data.count;
		}
	});
	return equCount;
}

function loadEqu(){
	$("#loadEqu").modal({
		backdrop:"static"//遮罩
	});
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
	var bcount = $("#bor_count").val();
	if(kcount == '' || kcount == null){
		$("#s_alert").html("请选择设备！");
		$("#malert").modal("show");
		return false;
	}
	if(bcount == '' || bcount == null){
		$("#s_alert").html("请输入借用数量！");
		$("#malert").modal("show");
		return false;
	}
	if(!(/(^[1-9]\d*$)/.test(bcount))){
		$("#s_alert").html("请输入正确的借用数量！");
		$("#malert").modal("show");
		return false;
	}
	if(parseInt(bcount) > parseInt(kcount)){
		$("#s_alert").html("库存不足！");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function checkUser(){
	var bor_user = $("#bor_user").val();
	if(bor_user == '' || bor_user == null){
		$("#s_alert").html("请选择借用人!");
		$("#malert").modal("show");
		return false;
	}
	return true;
}

$(function(){
	initialPage();
	getGrid();
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getprolist?_' + $.now(),
		success: function (rs) {
			loadProSelect(rs.prolist,"pro_name");
		}
	});
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getuserlist?_' + $.now(),
		async: false,
		success: function (rs) {
			loadUserSelect(rs.userlist,"bor_user");
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"bor_site")
		}
	});
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getloginuserid?_' + $.now(),
		success: function (rs) {
			$("#bor_user").val(""+rs.userid);
		}
	});
	
	$("#equSure").click(function(){
		var ck = $('#dataGrid').bootstrapTable('getSelections');
		if(checkedRow(ck)){
			$("#equName").val(ck[0].equName);
			$("#styleId").val(ck[0].equStyleid);
			$("#equ_Count").val(ck[0].equCount);
			$("#equ_id").val(ck[0].equId);
			$("#loadEqu").modal('hide');
		}
	});

	$("#bor_date").val(getNowTime());//设置借用时间
	
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
 * 新增-设备借用表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		equipmentBorrow: {
			equBorId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			if(!checkCount()){
				return false;
			}
			if(!checkUser()){
				return false;
			}
			vm.equipmentBorrow.equId = $("#equ_id").val();
			vm.equipmentBorrow.borDatetime = $("#bor_date").val();
		    $.SaveForm({
		    	url: '../../api/equ_bor/save?_' + $.now(),
		    	param: vm.equipmentBorrow,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
