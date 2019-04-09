function loadAddressSelect(data,id){
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].distid+"'>"+data[i].explain+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function loadOtherSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

function loadDescAndMethodSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''></option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].selectDesc+"'>"+data[i].selectDesc+"</option>";
	}
	$('#'+id).html(htmlstr);
}

//加载区县
function loadarea(){
	$("#w_town").empty();
	$("#w_village").empty();
	var belong = $('#w_belong').val();
	$.ajax({
		type: "post",
		data:{
			selectlevel:"1",
			updistid:"",
			belong:belong
		},
		url : '../../api/cqwork/cqdist/distlist?_' + $.now(),
		async:false,
		success: function (rs) {
			loadAddressSelect(rs.distlist,"w_area")
		}
	});
}

//加载乡镇街道
function loadtown(){
	var updistid = $("#w_area").val();
	if(updistid == '' || updistid == null){
		return false;
	}
	$.ajax({
		type: "post",
		data:{
			selectlevel:"",
			updistid:updistid
		},
		url : '../../api/cqwork/cqdist/distlist?_' + $.now(),
		async:false,
		success: function (rs) {
			loadAddressSelect(rs.distlist,"w_town")
		}
	});
}

//加载村社
function loadvillage(){
	var updistid = $("#w_town").val();
	if(updistid == '' || updistid == null){
		return false;
	}
	$.ajax({
		type: "post",
		data:{
			selectlevel:"",
			updistid:updistid
		},
		url : '../../api/cqwork/cqdist/distlist?_' + $.now(),
		async:false,
		success: function (rs) {
			loadAddressSelect(rs.distlist,"w_village")
		}
	});
}

//加载所属地下拉框
function loadBelongList(){
	$.ajax({
		type: "post",
		data:{type:"wo_belong"},
		url : '../../api/cqwork/getusertype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_belong");
		}
	});
}

//加载所属项目下拉框
function loadProjectList(){
	$.ajax({
		type: "post",
		data:{type:"wo_project"},
		url : '../../api/cqwork/getusertype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_project");
		}
	});
}

//加载问题类型下拉框
function loadQtypeList(){
	$.ajax({
		type: "post",
		data:{type:"wo_qtype"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_type");
		}
	});
}

//加载问题来源下拉框
function loadSourceList(){
	$.ajax({
		type: "post",
		data:{type:"wo_source"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_source");
		}
	});
}

//加载处理方式下拉框
function loadMannerList(){
	$.ajax({
		type: "post",
		data:{type:"wo_manner"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_manner");
		}
	});
}

//加载状态下拉框
function loadStatusList(){
	$.ajax({
		type: "post",
		data:{type:"wo_status"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"w_status");
		}
	});
}

//加载问题描述下拉框
function loadDescriptionList(){
	$.ajax({
		type: "post",
		data:{type:"wo_desc"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"st_desc");
		}
	});
}

//加载处理方法下拉框
function loadMethodList(){
	$.ajax({
		type: "post",
		data:{type:"wo_method"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"st_method");
		}
	});
}

//根据所选项目加载问题描述和处理方法下拉框
function loadDescAndMethodByPro(proname){
	$("#st_desc").html('');
	$("#st_method").html('');
	$.ajax({
		type: "post",
		data:{
			pro_name:proname,
			select_type:1
		},
		url : '../../api/cqwork/getproselect?_' + $.now(),
		async:false,
		success: function (rs) {
			loadDescAndMethodSelect(rs.selects,"st_desc");
		}
	});
	
	$.ajax({
		type: "post",
		data:{
			pro_name:proname,
			select_type:2
		},
		url : '../../api/cqwork/getproselect?_' + $.now(),
		async:false,
		success: function (rs) {
			loadDescAndMethodSelect(rs.selects,"st_method");
		}
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

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function desc_Chooes(){
	var desc_val = $('#st_desc').val();
	$('#w_description').val(desc_val);
}

function method_Chooes(){
	var method = $('#st_method').val();
	$('#w_method').val(method);
}

function protime_Chooes(){
	var protime = $('#st_protime').val();
	$('#w_processTime').val(protime);
}

function pro_choose(){
	var proname = $("#w_project").val();
	loadDescAndMethodByPro(proname);
}

function checknum(num){
	if(!(/(^[1-9]\d*$)/.test(num))){
		return false;
	}
	return true;
}

$(function(){
	loadBelongList();
	loadProjectList();
	loadQtypeList();
	loadSourceList();
	loadMannerList();
	loadStatusList();
	loadDescriptionList();
	loadMethodList();
});

/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		workorder: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/cqwork/info?_' + $.now(),
		    	param: vm.workorder.id,
		    	success: function(data){
		    		var strdate = data.occurDate.substring(0,10);
		    		vm.workorder = data;
		    		vm.workorder.strdate = strdate;
		    		$('#w_belong').val(vm.workorder.belong);
		    		loadarea();
		    		loadDescAndMethodByPro(vm.workorder.project);
		    	}
			});
		},
		acceptClick: function() {
			
			if (!$('#form').Validform()){
		        return false;
		    }
			var area = $("#w_area").val();
			var town = $("#w_town").val();
			var village = $("#w_village").val();
			var name = $("#w_name").val();
			var project = $("#w_project").val();
			var type = $("#w_type").val();
			var occurDate = $("#w_occurDate").val();
			var qq = $("#w_qq").val();
			var tel = $("#w_tel").val();
			var description = $("#w_description").val();
			var method = $("#w_method").val();
			var manner = $("#w_manner").val();
			var source = $("#w_source").val();
			var processTime = $("#w_processTime").val();
			var status = $("#w_status").val();
			var belong = $("#w_belong").val();
			if(qq != '' && !checknum(qq)){
				alert("请输入正确的QQ号");
				return false;
			}
			if(tel != '' && !checknum(tel)){
				alert("请输入正确的电话号码");
				return false;
			}
			if(processTime != '' && !checknum(processTime)){
				alert("请输入正确的处理时长（分钟数）");
				return false;
			}
			vm.workorder.area = area;
			vm.workorder.town = town;
			vm.workorder.village = village;
			vm.workorder.name = name;
			vm.workorder.project = project;
			vm.workorder.type = type;
			vm.workorder.strdate = occurDate;
			vm.workorder.qq = qq;
			vm.workorder.tel = tel;
			vm.workorder.description = description;
			vm.workorder.method = method;
			vm.workorder.manner = manner;
			vm.workorder.source = source;
			vm.workorder.processTime = processTime;
			vm.workorder.status = status;
			vm.workorder.belong = belong;
			$.ConfirmForm({
		    	url: '../../api/cqwork/update?_' + $.now(),
		    	param: vm.workorder,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})