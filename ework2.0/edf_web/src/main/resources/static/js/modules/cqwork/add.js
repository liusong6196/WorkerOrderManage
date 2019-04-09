var base64 = '';

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

function changimg(event){
	base64 = '';
	file = event.target.files[0];
	if(!/image\/\w+/.test(file.type)) {  
        alert("[异常图片]必须为图片格式，如：jpg、png等！");
        event.target.value = '';
        return false;  
    }
    var a = new FileReader();
    a.onload = function (e) {
        var base64Str = e.target.result;//获取base64
        base64 = base64Str;//赋值全局变量
    }
    a.readAsDataURL(file);
}

$(function(){
	loadBelongList();
	loadarea();
	loadProjectList();
	loadQtypeList();
	loadSourceList();
	loadMannerList();
	loadStatusList();
	var proname = $("#w_project").val();
	loadDescAndMethodByPro(proname);
	//初始化下拉框默认选择
	$("#w_type").val('系统问题');
	$("#w_occurDate").val(getNowFormatDate());
	$("#w_manner").val('远程支持');
	$("#w_source").val('QQ');
	$("#w_status").val('1');
});

function checknum(num){
	if(!(/(^[1-9]\d*$)/.test(num))){
		return false;
	}
	return true;
}

//提交工单
function addWorkorderSubmit(){
	if (!$('#form').Validform()) {
        return false;
    }
	var area = $("#w_area option:selected").text();
	var town = $("#w_town option:selected").text();
	if(town == '请选择'){
		town = ''
	}
	var village = $("#w_village option:selected").text();
    if(village == '请选择'){
		village = ''
	}
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
	vm.workorder.errImgpath = base64;
	var flag = confirm("是否确定保存？");
	if(flag){
		$.SaveForm({
	    	url: '../../api/cqwork/save?_' + $.now(),
	    	param: vm.workorder,
	    	success: function(data) {
	    		window.location.reload();
	    	}
	    });	
	}
}

//重置输入框
function inpuntReset(){
	$("#w_belong").val('');
	$("#w_area").empty();
	$("#w_town").empty();
	$("#w_village").empty();
	$("#w_name").val('');
	$("#w_project").val('');
	$("#w_type").val('');
	$("#w_occurDate").val('');
	$("#w_qq").val('');
	$("#w_tel").val('');
	$("#w_description").val('');
	$("#w_method").val('');
	$("#w_manner").val('');
	$("#w_source").val('');
	$("#w_processTime").val('');
	$("#w_status").val('');
	$("#errorimg").val('');
}

/**
 * 新增-js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		workorder: {
			id: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/cqwork/save?_' + $.now(),
		    	param: vm.workorder,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
