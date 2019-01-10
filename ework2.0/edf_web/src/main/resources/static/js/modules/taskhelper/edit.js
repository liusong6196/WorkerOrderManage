/**
 * 编辑-项目问题表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		projectQuestion: {
			proQueId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/pro/infoquestion?_' + $.now(),
		    	param: vm.projectQuestion.proQueId,
		    	success: function(data) {
		    		vm.projectQuestion = data;
		    		loadPro(data.proId,data.userId);
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/pro/updatequestion?_' + $.now(),
		    	param: vm.projectQuestion,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})


function loadPro(proId,userId){
$.ajax({
	type: "post",
	url : '../../api/tasklist/prolist?_' + $.now(),
	success: function (rs) {
		var html = "<select id='task-proId' class='form-control'  onchange='getTaskResource()'   isvalid='yes'  name='task-proId' checkexpession='NotNull'>";
			var arr = new Array(); 		
			for(var i=0;i<rs.length;i++){
				var selectStr="";
				if(rs[i].proId==proId){
					selectStr="selected"
				}
				 html += "<option   value='"+rs[i].proId+"' "+selectStr+">" +rs[i].proName + "</option>";
			}
			html += "</select>";
			
			$("#proname").html(html);
			loadUserId(proId,userId);
	}
});
}

function getTaskStatus(){
	var taskStatus= $("#task-status").val();
	if(taskStatus=="1"){
		$("#member-list").attr({"disabled":"disabled"});
	}else{
		$("#member-list").removeAttr("disabled");
	}
}


function getTaskResource(){
	var proId = $("#task-proId").val();
	$.ajax({
		type: "post",
		url : '../../api/tasklist/memberslist?_' + $.now(),
		data:{proId:proId},
		success: function (rs) {
			$("#membername").html("");
			var members=rs.members;
			var html = "<select id='member-list' class='form-control'   name='member-lists'>";
				var arr = new Array(); 
				html += "<option   selected value=null>" +"请选择" + "</option>";
				for(var i=0;i<members.length;i++){		
					 html += "<option    value='"+members[i].userId+"'>" +members[i].username + "</option>";
				}		
				html += "</select>";
				$("#membername").html(html);
		}
	});
}

function loadUserId(proId,userId){
	$.ajax({
		type: "post",
		url : '../../api/tasklist/memberslist?_' + $.now(),
		data:{proId:proId},
		success: function (rs) {
			$("#membername").html("");
			var members=rs.members;
			var html = "<select id='member-list' class='form-control'   name='member-lists'>";
				var arr = new Array(); 
				html += "<option   selected value=null>" +"请选择" + "</option>";
				for(var i=0;i<members.length;i++){		
					var selectStr="";
					if(members[i].userId==userId){
						selectStr="selected"
					}
					 html += "<option    value='"+members[i].userId+"' "+selectStr+">" +members[i].username + "</option>";
				}		
				html += "</select>";
				$("#membername").html(html);
		}
	});
	
}