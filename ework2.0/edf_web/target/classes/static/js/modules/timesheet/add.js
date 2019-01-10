$(function(){
	$.ajax({
		type: "post",
		url : '../../api/timesheet/timesheetinsertlist?_' + $.now(),
		data:{
			date:formatDate(new Date(),"yyyy-MM-dd"),
		},
		success: function (data) {
			if(data==null) {
				dialogAlert("查询日期超出范围!");
			return
			};
			var tasks=data.tasks;
			var tsweek=data.tsweek;
			var dicts=data.dicts;
			$("#startdate").html(data.tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(data.tsweek.tsEnddate.substring(0,10));		 
			if(tasks.length>0){
				$("#dataGrid").html(loadTasks(tasks));		
			}
			loadNoProjectTasks(dicts);
		}
	});
});

var protypes=[];
function loadTasks(tasks){
	var html=" <tr style='background: silver;height:35px'>";
	html+="<th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; ' >项目编号</th>";
	html+="<th style='width: 50px;text-align:center;font-weight:bold;border:1px solid #000;'>选择</th>";
	html+="<th style='width: 300px;text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; '>项目名称</th>";
	html+=" <th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; '>任务名称</th>";
	html+=" <th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; '>开始时间</th>";
	html+="  <th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; '>结束时间</th>";
	html+="  <th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000;'>计划工作量</th>";
	html+=" </tr>";
	
	var pros1=[]; //售前
	var pros2=[]; //实施
	var pros3=[]; //售后
	var pros4=[]; //研发
	for(var i=0;i<tasks.length;i++){
		
		switch(tasks[i].proType)
		{
		case '1':
		  pros1.push(tasks[i]);
		  break;
		case '2':
		  pros2.push(tasks[i]);
		  break;
		case '3':
		  pros3.push(tasks[i]);
		break;
		default:
		  pros4.push(tasks[i]);
		 break;
		}
	}
	
	for(var i=0;i<pros1.length;i++){
		  if(i==0){  
		  html+="<tr style='background-color: #d2d6de;'><td colspan='7'  align='center'>售前项目</td></tr>"
		  }
		  html+="<tr>";
		  html+="<td  align='center'>"+pros1[i].proNumber+"</td>";
		  html+="<td  align='center'><input name='taskids' type='checkbox' value='"+pros1[i].taskId+"'/></td>";
		  html+="<td>"+pros1[i].proName+"</td>";
		  html+="<td>"+pros1[i].taskName+"</td>";
		  html+="<td  align='center'>"+pros1[i].taskStartdate+"</td>";
		  html+="<td  align='center'>"+pros1[i].taskEnddate+"</td>";
		  html+="<td  align='center'>"+pros1[i].taskPlannedhours+"</td>";
		  html+="</tr>";
	}
	
	for(var i=0;i<pros2.length;i++){
		  if(i==0){  
		  html+="<tr style='background-color: #d2d6de;'><td colspan='7'  align='center'>实施项目</td></tr>"
		  }
		  html+="<tr>";
		  html+="<td  align='center'>"+pros2[i].proNumber+"</td>";
		  html+="<td  align='center'><input name='taskids' type='checkbox' value='"+pros2[i].taskId+"'/></td>";
		  html+="<td>"+pros2[i].proName+"</td>";
		  html+="<td>"+pros2[i].taskName+"</td>";
		  html+="<td  align='center'>"+pros2[i].taskStartdate+"</td>";
		  html+="<td  align='center'>"+pros2[i].taskEnddate+"</td>";
		  html+="<td  align='center'>"+pros2[i].taskPlannedhours+"</td>";
		  html+="</tr>";
	}
	
	for(var i=0;i<pros3.length;i++){
		  if(i==0){ 
		  html+="<tr style='background-color: #d2d6de;'><td colspan='7'  align='center'>售后项目</td></tr>"
		  }
		  html+="<tr>";
		  html+="<td  align='center'>"+pros3[i].proNumber+"</td>";
		  html+="<td  align='center'><input name='taskids' type='checkbox' value='"+pros3[i].taskId+"'/></td>";
		  html+="<td>"+pros3[i].proName+"</td>";
		  html+="<td>"+pros3[i].taskName+"</td>";
		  html+="<td  align='center'>"+pros3[i].taskStartdate+"</td>";
		  html+="<td  align='center'>"+pros3[i].taskEnddate+"</td>";
		  html+="<td  align='center'>"+pros3[i].taskPlannedhours+"</td>";
		  html+="</tr>";
	}
	
	for(var i=0;i<pros4.length;i++){
		  if(i==0){  
			  html+="<tr style='background-color: #d2d6de;'><td colspan='7' align='center'>研发项目</td></tr>";
		  }
		  html+="<tr>";
		  html+="<td  align='center'>"+pros4[i].proNumber+"</td>";
		  html+="<td  align='center'><input name='taskids' type='checkbox' value='"+pros4[i].taskId+"'/></td>";
		  html+="<td>"+pros4[i].proName+"</td>";
		  html+="<td>"+pros4[i].taskName+"</td>";
		  html+="<td  align='center'>"+pros4[i].taskStartdate+"</td>";
		  html+="<td  align='center'>"+pros4[i].taskEnddate+"</td>";
		  html+="<td  align='center'>"+pros4[i].taskPlannedhours+"</td>";
		  html+="</tr>";
	}
	return html;
}


function loadNoProjectTasks(dicts){
	var dictstypes=[];
	for(var i=0;i<dicts.length;i++){
		if(dictstypes.indexOf(dicts[i].type)==-1){
			dictstypes.push(dicts[i].type);
		}
	}
	
	for(var i=0;i<dictstypes.length;i++){
		var tableheadName="";
		if(dictstypes[i]=="leave_type"){
			tableheadName="休假:"
		}
		if(dictstypes[i]=="routine_type"){
			tableheadName="非项目任务:"
		}
	
		var html="<tr style='background: silver;'><th style='text-align:center;font-weight:bold;border:1px solid #000;vertical-align:middle; '  colspan='4'>"+tableheadName+"</th></tr>";
		var count=0;
		for(var x=0;x<dicts.length;x++){
			
			if(dicts[x].type==dictstypes[i]){
				if(count%4==0){
					html+="<tr>"
				}
				html+="<td style='text-align:left;font-weight:bold'><input type='checkbox' value='"+dicts[x].id+"' name='noprojecttask'/>"+dicts[x].label+"</td>";
				
				count+=1;
				if(count%4==0){
					html+="</tr>"
				}
				
				
			}
		
		}
		$("#"+dictstypes[i]).html(html);
	}
}


function acceptCommit(){
	var taskcheck=[]; //项目任务
	var noprojecttaskcheck=[]; //非项目任务
	$('input[name="taskids"]:checked').each(function(){ 
		taskcheck.push($(this).val()); 
	}); 
	$('input[name="noprojecttask"]:checked').each(function(){ 
		noprojecttaskcheck.push($(this).val()); 
	}); 
	
	$.ajax({
		type: "post",
		url : '../../api/timesheet/timesheetinsert?_' + $.now(),
		data:{
			date:$("#startdate").html(),
			taskids:taskcheck.toString().toString(),
			noprojecttaskids:noprojecttaskcheck.toString()
		},
		beforeSend:function(){
			layer_index= layer.msg('操作中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			top.layer.close(index); //再执行关闭
			layer.close(layer_index); 
			dialogAlert("操作成功",1);
		}
	});
	
	
}
