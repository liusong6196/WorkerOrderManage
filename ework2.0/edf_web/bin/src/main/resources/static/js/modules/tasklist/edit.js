/**
 * 编辑-任务表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		task: {
			taskId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/tasklist/info?_' + $.now(),
		    	param: vm.task.taskId,
		    	success: function(data) {
		    		vm.task = data;
		    		getTaskResource(data.proId);
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/tasklist/update?_' + $.now(),
		    	param: vm.task,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})


/**
 * 获取项目名称下拉
 */
function getProName(proId){
   alert(1);
	$.ajax({
		type: "post",
		data:{proId:proId},
		url : '../../api/tasklist/prolist?_' + $.now(),
//		url : '../../api/sys/user/all?_' + $.now(),
		success: function (rs) {
			alert(rs.proName);
//				$(#"pro-name").val(rs.proName);
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
function getTaskResource(proId){
//	var proId = $("#pro-name").val();
	alert(proId);
	$.ajax({
		type: "post",
		url : '../../api/tasklist/memberslist?_' + $.now(),
		data:{proId:proId},
//		url : '../../api/sys/user/all?_' + $.now(),
		success: function (rs) {
			var members=rs.members;
			var html = "<select id='member-list' class='form-control'  v-model='task.taskUser'  name='member-lists'>";
				var arr = new Array(); 
				html += "<option   v-model='task.taskUser'   selected value=null>" +"请选择" + "</option>";
				for(var i=0;i<members.length;i++){		
					 html += "<option  v-model='task.taskResource'  value='"+members[i].userId+"'>" +members[i].username + "</option>";
				}
			
				html += "</select>";
		

				$("#membername").html(html);
//				$('#custom-headers').multiSelect({
//					  selectableHeader: "<div class='custom-header'  style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>成员列表</div>",
//					  selectionHeader: "<div class='custom-header' style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>已选成员</div>"	  
//				});
				
		}
	});
}
