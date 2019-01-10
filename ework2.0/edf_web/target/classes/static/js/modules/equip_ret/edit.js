
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

function checkCount(){
	var kcount = $("#ret_count").val();
	var bcount = $("#bor_count").val();
	var ycount = $("#ycount").val();
	var wcount = parseInt(bcount) - parseInt(ycount);
	if(kcount == '' || kcount == null){
		$("#s_alert").html("归还数量不能为空！");
		$("#malert").modal("show");
		return false;
	}
	if(!(/(^[1-9]\d*$)/.test(kcount))){
		$("#s_alert").html("请输入正确的归还数量(正整数)！");
		$("#malert").modal("show");
		return false;
	}
	if(parseInt(kcount) > parseInt(wcount)){
		$("#s_alert").html("归还数量不能大于未还数量！未还数量为："+wcount);
		$("#malert").modal("show");
		return false;
	}
	return true;
}

function getNowTime(){
	var ddd = new Date();
	var day = ddd.getDate();
	var month = ddd.getMonth() + 1;
	var datew = ddd.getFullYear()+"-"+month+"-"+day;
	var datew = datew.toString();
	return datew;
}

$(function(){
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getuserlist?_' + $.now(),
		async: false,
		success: function (rs) {
			loadUserSelect(rs.userlist,"ret_user");
		}
	});
	
	$("#ret_date").val(getNowTime());
	
});



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
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			if(!checkCount()){
				return false;
			}
			vm.equipmentBorrow.paramRetCount = $("#ret_count").val();
			vm.equipmentBorrow.retDateTime = $("#ret_date").val();
			vm.equipmentBorrow.retUserId = $("#ret_user").val();
		    $.ConfirmForm({
		    	url: '../../api/equ_bor/equ_ret?_' + $.now(),
		    	param: vm.equipmentBorrow,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})