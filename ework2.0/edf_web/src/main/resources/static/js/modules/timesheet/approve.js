var nowenddate;
var tsweek;
var list;
var listnoproject;
$(function(){
	loadfirst();
});

function loadfirst(){
	var layer_index;
	$.ajax({
		type: "post",
		url : '../../api/timesheet/approvelist?_' + $.now(),
		data:{
			date:formatDate(new Date(),"yyyy-MM-dd"),
		},
		beforeSend:function(){
			layer_index= layer.msg('加载中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  		
		},
		success: function (data) {
			layer.close(layer_index); 
			 tsweek=data.tsweek;
			 list=data.list;
			 listnoproject=data.listnoproject;
			$("#startdate").html(tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(tsweek.tsEnddate.substring(0,10));
			nowenddate=tsweek.tsEnddate.substring(0,10);
			$("#weeknum").html(getWeekOfYear(nowenddate));
		
			
			var html=createHead();
				  html+=projectLoad();
				  html+= noprojectLoad();
				  html+=createFoot();
				  $("#dataGrid").html(html);   
			
				  date=data.tsweek.tsEnddate.substring(0,10);
					if(date!=nowenddate){	
							$("#nextweek").show();
					}else{
						$("#nextweek").hide();
					}
				 
		}
	});
}

function btnClick(day){
	var tsday=new Date($("#enddate").html());
	tsday.setDate(tsday.getDate()+parseInt(day));
	var date=formatDate(tsday,"yyyy-MM-dd");
	loadByday(date);
}



function loadByday(day){
	var layer_index;
	$.ajax({
		type: "post",
		url : '../../api/timesheet/approvelist?_' + $.now(),
		data:{
			date:day,
		},
		beforeSend:function(){
			layer_index= layer.msg('加载中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			layer.close(layer_index); 
			 tsweek=data.tsweek;
			 list=data.list;
			 listnoproject=data.listnoproject;
			$("#startdate").html(tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(tsweek.tsEnddate.substring(0,10));
			$("#weeknum").html(getWeekOfYear(day));
			var html=createHead();
				  html+=projectLoad();
				  html+= noprojectLoad();
				  html+=createFoot();
				  $("#dataGrid").html(html);  
				date=data.tsweek.tsEnddate.substring(0,10);
				if(date!=nowenddate){	
						$("#nextweek").show();
				}else{
					$("#nextweek").hide();
				}
		}
	});
}

function createHead(){
	  var html="<tr style='background: #eff4fc;'>";
      html+="<th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' >项目类型</th>";
      html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;  ' >项目编号</th>";
      html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' >项目名称</th>";
	  html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;  '>员工</th>";
	  html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;  '>本周用时</th>";
	  html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;  '>选择</th>";
	  html+="</tr>";
	  return html;
}

function projectLoad(){
	var protype=[];

	for(var i=0;i<list.length;i++){
	 
		if(protype.indexOf(list[i].proTypename)==-1){
			protype.push(list[i].proTypename);
		}
	}
	
	var html="";

	for(var i=0;i<protype.length;i++){
		var rowcount=getProjectTypeRowCount(protype[i]);
		var proids=[];
		
		//加载项目类型下的项目编号
		for(var x=0;x<list.length;x++){
 
			if(list[x].proTypename==protype[i]&&proids.indexOf(list[x].proId)==-1){
				proids.push(list[x].proId);
			}
		}	

		for(var x=0;x<proids.length;x++){
			var pros=getProjects(proids[x]);
			for(var v=0;v<pros.length;v++){
				html+="<tr>";
				if(x==0&&v==0){
					
					html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; '  class='warning' rowspan='"+rowcount+"'>"+protype[i]+"项目</td>";
				}
					 
				if(v==0){
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'     rowspan='"+pros.length+"'>"+pros[v].proNumber+"</td>";
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff '   rowspan='"+pros.length+"'>"+pros[v].proName+"</td>";
				}
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'  >"+pros[v].username+"</td>";
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'  >"+pros[v].actualhours+"</td>";
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'  ><input type='checkbox'  name='project_ckb' value='1_"+pros[v].proId+"_"+pros[v].userId+"' /></td>";
				html+="</tr>";
			}
		
		}
		
	}
	return html;
}


function noprojectLoad(){
	var type=[];
	
	for(var i=0;i<listnoproject.length;i++){
		if(type.indexOf(listnoproject[i].proType)==-1){
			type.push(listnoproject[i].proType);
		}
	}
 
	var html="";
	 
	for(var i=0;i<type.length;i++){
		var rowcount=getNoProjectTypeRowCount(type[i]);
 
		var taskids=[];
		
		//加载项目类型下的项目编号
		for(var x=0;x<listnoproject.length;x++){
 
			if(listnoproject[x].proType==type[i]&&taskids.indexOf(listnoproject[x].proName)==-1){
				taskids.push(listnoproject[x].proName);
			}
		}	

		for(var x=0;x<taskids.length;x++){
			var tasks=getNoProjects(taskids[x]);
		 
			for(var v=0;v<tasks.length;v++){
				html+="<tr>";
				if(x==0&&v==0){
					
					html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; '  class='warning' rowspan='"+rowcount+"'>"+type[i]+"</td>";
				}
					 
				if(v==0){
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff '     rowspan='"+tasks.length+"' colspan='2'>"+tasks[v].proName+"</td>";
				
				}
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'  >"+tasks[v].username+"</td>";
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff '  >"+tasks[v].actualhours+"</td>";
					html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; background:#ffffff'  ><input type='checkbox'  name='noproject_ckb' value='2_"+tasks[v].taskId+"_"+tasks[v].userId+"' /></td>";
				html+="</tr>";
			}
		
		}
		
	}
	return html;
}

function getNoProjectTypeRowCount(type){
	var count=0;
	for(var i=0;i<listnoproject.length;i++){
		if(listnoproject[i].proType==type){
			count+=1;
		}
	}
	return count;
} 


function getNoProjects(taskid){
	var tasks=[];
	for(var i=0;i<listnoproject.length;i++){
		if(listnoproject[i].proName==taskid){
			tasks.push(listnoproject[i]);
		}
	}
	return tasks;
}

/**
 * 得到项目类型合并行数
 * @param type
 * @returns
 */
function getProjectTypeRowCount(type){
	var count=0;
	for(var i=0;i<list.length;i++){
		if(list[i].proTypename==type){
			count+=1;
		}
	}
	return count;
}
/**
 * 得到项目下所有资源
 * @param type
 * @returns
 */
function getProjects(proid){
	var pros=[];
	for(var i=0;i<list.length;i++){
		if(list[i].proId==proid){
			pros.push(list[i]);
		}
	}
	return pros;
}


function createFoot(){
	var   html="<tr  style='background: #eff4fc;'><td colspan='6' style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;'>如果您拒绝通过，请在下面空白处填写打回意见(最多50字):</td></tr>";
			html+="<tr><td colspan='6' style='height:100px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;'>" +
						"<textarea class='form-control' id='remark'  style='width:100%;height:100%' placeholder='打回意见'></textarea>"
					+"</td></tr>";
	return html;	
}

function dosubmit(v){
	var noprojects=[];
	var projects=[];
	
	$('input[name="noproject_ckb"]:checked').each(function(){ 
		noprojects.push($(this).val()); 
	}); 
	$('input[name="project_ckb"]:checked').each(function(){ 
		projects.push($(this).val()); 
	}); 
	 
	if(noprojects.length==0&&projects.length==0){
		dialogAlert("没有选中信息!",3);
		return;
	}
	
	if(v==4&&($("#remark").val()==null||$("#remark").val().trim()=="")){
 
		dialogAlert("请填写打回意见!",3);
		return;
	}
	var layer_index;
	$.ajax({
		type: "post",
		url : '../../api/timesheet/approve?_' + $.now(),
		data:{
			noprojects:noprojects.toString(),
			projects:projects.toString(),
			tsid:tsweek.tsId,
			remark:$("#remark").val(),
			state:v
		},
		beforeSend:function(){
			layer_index= layer.msg('操作中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			layer.close(layer_index); 
			if(data.rs=="ok"){
				dialogMsg("操作成功",1);
				 loadByday($("#enddate").html());
			}else{
				dialogMsg("操作失败",2);
			}
		}
	});
}

function getWeekOfYear(day){
	  var today = new Date(day);
	  var firstDay = new Date(today.getFullYear(),0, 1);
	  var dayOfWeek = firstDay.getDay(); 
	  var spendDay= 1;
	  if (dayOfWeek !=0) {
	    spendDay=7-dayOfWeek+1;
	  }
	  firstDay = new Date(today.getFullYear(),0, 1+spendDay);
	  var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
	  var result =Math.ceil(d/7);
	  return result+1;
	};