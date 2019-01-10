/**
 * 新增-项目表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		project: {
			proId: 0
		}
	},
	methods : {
		acceptClick: function() {
		
			vm.project.members=$("#custom-headers").val();
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/pro/save?_'+ $.now(),
		    	param: vm.project,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})






$.ajax({
	type: "post",
	url : '../../api/pro/selections?_' + $.now(),
	success: function (rs) {

		membersLoad(rs.users);
		managersLoad(rs.users);
		bussinessLoad(rs.bussiness);
		$("#chargetype").val(-1);
		$("#type").val(-1);
	}
});




function membersLoad(rs){
	
	var html = "<select id='custom-headers' multiple='multiple' name='members'>";
	var arr = new Array(); 
	for(var i=0;i<rs.length;i++){		
		 html += "<option value='"+rs[i].userId+"'" +">" +rs[i].username + "</option>";
	}

	html += "</select>";
	$("#projectmembers").html(html);
	$('#custom-headers').multiSelect({
		  selectableHeader: "<div class='custom-header'  style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>成员列表</div>",
		  selectionHeader: "<div class='custom-header' style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>已选成员</div>"	  
	});
}


function managersLoad(rs){
	var html="<option value='-1'>请选择</option>";
	for(var i=0;i<rs.length;i++){
		 html += "<option value='"+rs[i].userId+"'" +">" +rs[i].username + "</option>";
	}
	
	$("#manager").html(html);
	$("#developmanager").html(html);
	$("#testmanager").html(html);
}

function bussinessLoad(rs){
	var html="<option value='-1'>请选择</option>";
	for(var i=0;i<rs.length;i++){
		 html += "<option value='"+rs[i].value+"'" +">" +rs[i].value+" - "+rs[i].label + "</option>";
	}
	
	$("#bussiness").html(html);
}