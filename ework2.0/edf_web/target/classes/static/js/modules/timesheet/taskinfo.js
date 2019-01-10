
$(function(){
	$.ajax({
		type: "post",
		url : '../../api/tasklist/infoentity?_' + $.now(),
		data:{
			id:GetQueryString("id"),
		},
		success: function (data) {
			
			$("#taskName").html(data.task.taskName);
			$("#taskNumber").html(data.task.taskNumber);
			var taskstatus=data.task.taskStatus;
			switch(taskstatus){
			case "1":
				taskstatus="未分配";
				break;
			case "2":
				taskstatus="准备做";
				break;
			case "3":
				taskstatus="进行中";
				break;
			case "4":
				taskstatus="已完成";
				break;
			case "0":
				taskstatus="已取消";
				break;
			}
			$("#taskStatus").html(taskstatus);
			$("#taskManager").html(data.task.taskUsername);
			$("#taskUser").html(data.task.taskUsername);
			$("#taskDate").html(data.task.taskStartdate+"至"+data.task.taskEnddate);
			$("#taskHours").html(data.task.taskPlannedhours+"(工时)");
			}
	});
});

 

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}