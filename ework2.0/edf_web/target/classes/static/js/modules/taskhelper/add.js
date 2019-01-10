/**
 * 新增-项目问题表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		projectQuestion: {
			proQueId: 0
		}
	},
	methods : {
		acceptClick: function() {
			vm.projectQuestion.proId=$("#task-proId").val();
			if($("#member-list").val()=="null"){
				vm.projectQuestion.userId="";
			}else{
				vm.projectQuestion.userId=$("#member-list").val();
			}
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/pro/savequestion?_' + $.now(),
		    	param: vm.projectQuestion,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})



$.ajax({
	type: "post",
	url : '../../api/tasklist/prolist?_' + $.now(),
	success: function (rs) {
		var html = "<select id='task-proId' class='form-control'  onchange='getTaskResource()'   isvalid='yes'  name='task-proId' checkexpession='NotNull'>";
			var arr = new Array(); 		
			for(var i=0;i<rs.length;i++){		
				 html += "<option   value='"+rs[i].proId+"'" +"onclick='getTaskResource("+rs[i].proId+")'>" +rs[i].proName + "</option>";
			}		
			html += "</select>";
			
			$("#proname").html(html);
			 getTaskResource();
	}
});


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