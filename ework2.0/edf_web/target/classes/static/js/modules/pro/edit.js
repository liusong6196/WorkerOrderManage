/**
 * 编辑-项目表js
 */




var vm = new Vue({
	el:'#eway',
	data: {
		project: {
			proId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/pro/info?_' + $.now(),
		    	param: vm.project.proId,
		    	success: function(data) {
		    		vm.project = data;
		    		getMembers(data.proId);
		    		loadSelections();
		    	}
			});
		},
		acceptClick: function() {
			
			vm.project.members=$("#custom-headers").val();
			vm.project.userId=$("#manager").val();
			vm.project.proDevelopmanager=$("#developmanager").val();
			vm.project.proTestmanager=$("#testmanager").val();
			vm.project.proBusinesstype=$("#bussiness").val();
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/pro/update?_' + $.now(),
		    	param: vm.project,
		    	success: function(data) {
		    	
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})

function getMembers(proId){
$.ajax({
	type: "post",
	url : '../../api/pro/members?_' + $.now(),
	data:{proId:proId},
	success: function (json) {
		var html = "<select id='custom-headers' multiple='multiple' name='members'>";
			var arr = new Array(); 
			var users=json.users;
			var members=json.members;		
			for(var i=0;i<users.length;i++){						
				var b_select="";			
				$.each(members, function(index, item) {
					if(users[i].userId==item){
						b_select="selected";
						return;
					}
				}
				);				
				html += "<option value='"+users[i].userId+"'" +b_select+">" +users[i].username + "</option>";
							 
			}	
			html += "</select>";
			$("#projectmembers").html(html);
			$('#custom-headers').multiSelect({
				  selectableHeader: "<div class='custom-header'  style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>成员列表</div>",
				  selectionHeader: "<div class='custom-header' style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>已选成员</div>"	  
			});
			
	}
});
}


function loadSelections(){
	
	
	$.ajax({
		type: "post",
		url : '../../api/pro/selections?_' + $.now(),
		success: function (rs) {	
			managersLoad(rs.users);
			bussinessLoad(rs.bussiness);
			$("#manager").val(vm.project.userId);
			$("#developmanager").val(vm.project.proDevelopmanager==null?-1:vm.project.proDevelopmanager);
			$("#testmanager").val(vm.project.proTestmanager==null?-1:vm.project.proTestmanager);
			$("#bussiness").val(vm.project.proBusinesstype);
		}
	});

	
}

function bussinessLoad(rs){
	var html="<option value='-1'>请选择</option>";
	for(var i=0;i<rs.length;i++){
		 html += "<option value='"+rs[i].value+"'" +">" +rs[i].label + "</option>";
	}
	
	$("#bussiness").html(html);
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