
function loadSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function loadProSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].proId+"'>"+data[i].proName+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function loadUserSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].userId+"'>"+data[i].username+"</option>";
	}
	$('#'+id).html(htmlstr);
	
}

function setEqu(id){
	$.ajax({
		type: "post",
		data:{
			id:id
		},
		url : '../../api/equ_bor/getequinfo?_' + $.now(),
		async: false,
		success: function (rs) {
			$("#equName").val(rs.equ.equName);
			$("#styleId").val(rs.equ.equStyleid);
			$("#equ_Count").val(rs.equ.equCount);
		}
	});
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
	if(parseInt(bcount) > parseInt(kcount)){
		$("#s_alert").html("库存不足！");
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
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"bor_site")
		}
	});
	
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
		data:{type:"bor_ret_state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"bor_state")
		}
	});
	
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

var vm = new Vue({
	el:'#eway',
	data: {
		equipmentBorrow: {
			equBorId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/equ_bor/info?_' + $.now(),
		    	param: vm.equipmentBorrow.equBorId,
		    	success: function(data) {
		    		vm.equipmentBorrow = data;
		    		setEqu(vm.equipmentBorrow.equId);
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			vm.equipmentBorrow.equId = $("#equ_id").val();
			vm.equipmentBorrow.borDatetime = $("#bor_date").val();
		    $.ConfirmForm({
		    	url: '../../api/equ_bor/update?_' + $.now(),
		    	param: vm.equipmentBorrow,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})