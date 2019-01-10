/**
 * 新增-任务表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		task: {
			taskId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			Date.prototype.Format = function (fmt) {    
			    var o = {    
			        "M+": this.getMonth() + 1, //月份     
			        "d+": this.getDate(), //日     
			        "H+": this.getHours(), //小时     
			        "m+": this.getMinutes(), //分     
			        "s+": this.getSeconds(), //秒     
			        "q+": Math.floor((this.getMonth() + 3) / 3), //季度     
			        "S": this.getMilliseconds() //毫秒     
			    };    
			    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));    
			    for (var k in o)    
			    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));    
			    return fmt;    
			}  
			//插入当前时间
			var nowTime=new Date().Format("yyyy-MM-dd HH:mm:SS"); 
			//判断资源
			if($("#member-list").val()=="null"){
				vm.task.taskUser="";
			}else{
				vm.task.taskUser=$("#member-list").val();
			}
			vm.task.gmtCreate=nowTime;
			//判断所属项目是否为空
			var proId=$("#task-proId").val();
		    vm.task.proId=proId;
		    //判断开始结束日期
		    var startDate=vm.task.taskStartdate;
		    var endDate=vm.task.taskEnddate;
		    var d1 = new Date(startDate.replace(/\-/g, "\/"));  
		    var d2 = new Date(endDate.replace(/\-/g, "\/"));  
		     if(startDate!=""&&endDate!=""&&d1 >d2)  
		    {  
		     alert("开始时间不能大于结束时间！");  
		     return false;  
		    }
		    $.SaveForm({
		    	url: '../../api/tasklist/save?_' + $.now(),
		    	param: vm.task,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})


//$('#datetimepicker').datetimepicker({
//    format: 'yyyy-mm-dd hh:ii'
//});

//验证不为空 notnull
function isNotNull(obj) {
    obj = $.trim(obj);
    if (obj.length == 0 || obj == null || obj == undefined) {
        return true;
    }
    else
        return false;
}

/**
 * 获取项目列表下拉
 */
$.ajax({
	type: "post",
	url : '../../api/tasklist/prolist?_' + $.now(),
//	url : '../../api/sys/user/all?_' + $.now(),
	success: function (rs) {
		var html = "<select id='task-proId' class='form-control'  onchange='getTaskResource()'   isvalid='yes'   v-model='task.proId' name='task-proId' checkexpession='NotNull'>";
			var arr = new Array(); 
//			html += "<option  v-model='task.proId'  value=null>" +"请选择" + "</option>";
			
			for(var i=0;i<rs.length;i++){		
				 html += "<option  v-model='task.proId'  value='"+rs[i].proId+"'" +"onclick='getTaskResource("+rs[i].proId+")'>" +rs[i].proName + "</option>";
			}
		
			html += "</select>";
	
			var htmls = "<select id='member-list' class='form-control'   v-model='task.taskResource' name='member-lists'>";
			htmls += "<option  v-model='task.taskResource' selected value=null>" +"请选择" + "</option>";
			htmls += "</select>";
			$("#proname").html(html);
			$("#membername").html(htmls);
//			$('#custom-headers').multiSelect({
//				  selectableHeader: "<div class='custom-header'  style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>成员列表</div>",
//				  selectionHeader: "<div class='custom-header' style=' text-align: center; padding: 3px;  background: #000; color: #fff;'>已选成员</div>"	  
//			});
			
	}
});

//根据任务状态控制任务资源
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