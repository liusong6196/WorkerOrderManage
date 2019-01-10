/**
 * 个人状态
 */

var nowenddate;
var tasks;
var timesheets;
var dicts;

var pros1=[]; //售前
var pros2=[]; //实施
var pros3=[]; //售后
var pros4=[]; //研发
var types=[];//项目类型

$(function() {
	loadfirst();
});

/**
 * 加载Input工时
 * @param type
 * @param taskid
 * @param day
 * @returns
 */
function getTimesheetValue(type,taskid,day){
	var tmpvalue=0;
	 $.each(timesheets,function(){
	
		 if(this.timesheetType==type&&this.taskId==taskid&&this.timeDate==day){
			 tmpvalue=this.timeActualhours;
		 }
	 });
	 if(tmpvalue==0){
		 tmpvalue="";
	 }
	 return tmpvalue;
}

/**
 * 加载统计数据
 * @returns
 */
function dototal(){
	
	$("#dataGrid input").each(function(){
	
		if(this.value!=""){
			this.onkeyup();	
		}
	});
}

function loadfirst(){
	var nowdate=formatDate(new Date(),"yyyy-MM-dd");
	var layer_index;
	$.ajax({
		type: "post",
		url : '../../api/timesheet/timesheetsearch?_' + $.now(),
		data:{
			date:nowdate
		},
		beforeSend:function(){
			layer_index= layer.msg('加载中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			layer.close(layer_index); 
			if(data==null) {
				dialogAlert("查询日期超出范围!");
			return
			};
			$("#startdate").html(data.tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(data.tsweek.tsEnddate.substring(0,10));
			nowenddate=data.tsweek.tsEnddate.substring(0,10);
			$("#weeknum").html(getWeekOfYear(nowenddate));
			 tasks=data.tasks;
		     timesheets=data.timesheets;
			 dicts=data.dicts;
			$("#dataGrid").html(buildTimsheet(tasks,dicts));
			$("#remark").val(data.weekts.remark);
			dototal();
		 
				$("#nextweek").hide();			
				if(data.weekts.weekStatus!="1"){
						$("#form").css('display','none'); 
					}else{
						$("#form").css('display','block'); 
					}
			
			}
		});
}

function btnClick(v){
	var tsday=new Date($("#enddate").html());
	tsday.setDate(tsday.getDate()+parseInt(v));
	var date=formatDate(tsday,"yyyy-MM-dd");
	
	loadByDay(date);
}



function loadByDay(day){
	var nowdate=formatDate(new Date(),"yyyy-MM-dd");
	var layer_index;
	$.ajax({
		type: "post",
		url : '../../api/timesheet/timesheetsearch?_' + $.now(),
		data:{
			date:day
		},
		beforeSend:function(){
			layer_index= layer.msg('加载中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			layer.close(layer_index);
			if(data==null) {
				dialogAlert("查询日期超出范围!");
			return
			};
			$("#startdate").html(data.tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(data.tsweek.tsEnddate.substring(0,10));		 
			date=data.tsweek.tsEnddate.substring(0,10);
		
			$("#weeknum").html(getWeekOfYear(date));
			 tasks=data.tasks;
		     timesheets=data.timesheets;
			 dicts=data.dicts;
			$("#dataGrid").html(buildTimsheet(tasks,dicts));
			dototal();
			$("#remark").val(data.weekts.remark);
			if(date!=nowenddate){	
				$("#nextweek").show();
				$("#form").css('display','none'); 
			
			}else{
				$("#nextweek").hide();			
				if(data.weekts.weekStatus!="1"){
					$("#form").css('display','none'); 
					}else{
						$("#form").css('display','block'); 
					}
			}
			
			
			
				
		 
		}
		});
}


function buildTimsheet(tasks,dicts){
	 //alert(JSON.stringify(tasks));
	 pros1=[]; //售前
	 pros2=[]; //实施
	 pros3=[]; //售后
	 pros4=[]; //研发
	 types=[];//项目类型
	for(var i=0;i<tasks.length;i++){
		if(types.indexOf(tasks[i].proType)==-1){
			types.push(tasks[i].proType);
		}
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
	
	var html=buildHead();
		  html+=groupByproType(pros1,"0");
		  html+=groupByproType(pros2,"1");
		  html+=groupByproType(pros3,"2");
		  html+=groupByproType(pros4,"3");
		  html+=buildNoprojectTask(dicts);
		  html+=buildFooter();
	return html;
}



function showprojectinfo(id){
	
	dialogOpenInfo({
		title: '项目信息',
		url: 'sys/timesheet/projectinfo.html?id='+id,
		width: '520px',
		height: '400px'
	});
	
}


function showtaskinfo(id){
	
	dialogOpenInfo({
		title: '任务信息',
		url: 'sys/timesheet/taskinfo.html?id='+id,
		width: '520px',
		height: '450px'
	});
	
}

function groupByproType(pros,index){
	var arr=["售前","实施","售后","研发"];
	var proids=[]; 
	for(var i=0;i<pros.length;i++){
		if(proids.indexOf(pros[i].proId)==-1){
			proids.push(pros[i].proId);
		}
	}
	html="";
	var rowspan=pros.length;
	for(var i=0;i<proids.length;i++){
		var grouptasks=getPorsTasks(pros,proids[i]);
		for(var x=0;x<grouptasks.length;x++){
			
			html+="<tr>";
			if(i==0&&x==0){	
				html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' rowspan='"+rowspan+"' class='warning'>"+arr[index]+"项目</td>";			
			}
			if(x==0){
				html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff' rowspan='"+grouptasks.length+"' align='center'>"+grouptasks[x].proNumber+"</td>";
				html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff' rowspan='"+grouptasks.length+"' align='center'><a style='cursor:pointer' onclick='showprojectinfo("+grouptasks[x].proId+")'>"+grouptasks[x].proName+"</a></td>";
			}
			html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff' align='center'><a style='cursor:pointer'  onclick='showtaskinfo("+grouptasks[x].taskId+")'>"+grouptasks[x].taskName+"</a></td>";
		    for(var m=0;m<7;m++){
		    	var date=new Date($("#startdate").html());	
		    	date.setDate(date.getDate()+m);
		    	var inputid=formatDate(date,"yyyy-MM-dd");
		    	var value=getTimesheetValue(1,grouptasks[x].taskId,inputid);
		    	
		    	html+="<td   align='center' style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#dff0d9'>"
		    	 +"<input type='text' style='width:50px; text-align:center;background:#f2f9f0 '  id='"+grouptasks[x].proType+"_"+grouptasks[x].proId+"_"+grouptasks[x].taskId+"_"+inputid+"' onkeyup='dayschange(this)' value='"+value+"'/></td>";
		    }
			html+="<td align='center'style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#dff0d9'  id='"+grouptasks[x].proType+"_"+grouptasks[x].proId+"_"+grouptasks[x].taskId+"_sum'></td>";
			html+="</tr>";	
		}
		
	}

	
	
	return html;
}


/**
 * 获取项目包含任务
 */
function getPorsTasks(tasks,proid){
	var taskarr=[];
	for(var i=0;i<tasks.length;i++){
		if(tasks[i].proId==proid){
			taskarr.push(tasks[i]);
		}
	}
	return taskarr;
}


var dictstypes=[];
var routine_type=[];
var leave_type=[];
/**
 * 加载非项目任务
 * @param dicts
 * @returns
 */
function buildNoprojectTask(dicts){
	 dictstypes=[];
	 routine_type=[];
	 leave_type=[];
	for(var i=0;i<dicts.length;i++){
		if(dictstypes.indexOf(dicts[i].type)==-1){
			dictstypes.push(dicts[i].type);
		}
		if("routine_type"==dicts[i].type){
			routine_type.push(dicts[i]);
		}
		if("leave_type"==dicts[i].type){
			leave_type.push(dicts[i]);
		}
	}
	var html="";
	//循环读取
	for(var i=0;i<dictstypes.length;i++){
		var title="";
		if("routine_type"==dictstypes[i]){
			title="日常管理";
			html+=groupBuilByDictstype(title,routine_type);
		}
		if("leave_type"==dictstypes[i]){
			title="离岗";
			html+=groupBuilByDictstype(title,leave_type);
		}
		if("training_type"==dictstypes[i]){
			title="培训";
			html+=groupBuilByDictstype(title,training_type);
		}
	}
	
	return html;
}


function noproject_dayschange(o){
	if(!isInteger(o.value)&&o.value!=""){
		o.value="";
	}
	var value=o.value;
	var info=o.id.split("_");
	var day=info[3];
	var type=info[0]+"_"+info[1];
	if(value==""){
		value=0;
	}
	var count=0;
	$("#dataGrid input").each(function(){
		var input=this.id.split("_");
		if(input[0]+"_"+input[1]==type&&input[3]==day){
			if(this.value==""){
				count+=0;
			}else{
				count+=parseInt(this.value);
			}
		}
	});
	$("#dataGrid input").each(function(){
		var input=this.id.split("_");
		if(input[2]==day){
			if(this.value==""){
				count+=0;
			}else{
				count+=parseInt(this.value);
			}
		}
	});
	
	
	$("#"+type+"_"+info[2]+"_sum").html(getxSumByVal(type+"_"+info[2]));
	$("#sumhours"+"_"+day).html(getySumByVal(day));
	var nowsumhours=$("#sumhours"+"_"+day).html();
	//计算加班时数
	var standardhours=$("#standardhours_"+day).html();
	var overhours=$("#overhours_"+day).html();
	if(overhours==""){
		overhours=0;
	}
	var nowoverhours= parseInt(nowsumhours)-parseInt(standardhours);
	if(nowoverhours<0){
		nowoverhours=0;
	}
	var overhoursstyle="";
	if(nowoverhours>0){
		overhoursstyle+="style='color:#0782ff' ";
	}else{
		nowoverhours=0;
	} 
	if(nowoverhours>0){
		$("#sumhours"+"_"+day).html(nowsumhours+"/"+"<span "+overhoursstyle+">"+nowoverhours+"</span>");
	}
	$("#overhours_"+day).html(nowoverhours);
	$("#standardhours_sum").html(getxSumByHtml("standardhours"));
	$("#sumhours_sum").html(getxSumByHtml("sumhours"));
	$("#overhours_sum").html(getxSumByHtml("overhours"));
	var overhours_sum=$("#overhours_sum").html();
	
	var overhourssumstyle="";
	if(overhours_sum>0){
		overhourssumstyle+="style='color:#0782ff' ";
	}else{
		overhours_sum=0;
	} 
	if($("#sumhours_sum").html()!=0&&parseInt(overhours_sum)>0){
		var alltotalset=$("#sumhours_sum").html()+"/"+"<span "+overhourssumstyle+">"+overhours_sum+"</span>";
		$("#sumhours_sum").html(alltotalset);
	}
}



function groupBuilByDictstype(type,dicts){
	var rowspan=dicts.length;
	var html="";
	for(var i=0;i<dicts.length;i++){
		html+="<tr>";
		if(i==0){	
			html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' rowspan='"+rowspan+"' class='warning'>"+type+"</td>";			
		}	
			html+="<td  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#ffffff' colspan='3' align='center'>"+dicts[i].label+"</td>";
			
	 for(var m=0;m<7;m++){
			var date=new Date($("#startdate").html());	
			date.setDate(date.getDate()+m);
			 var inputid=formatDate(date,"yyyy-MM-dd");
			 var value=getTimesheetValue(2,dicts[i].id,inputid);
			 html+="<td    align='center' style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#dff0d9'><input type='text' style='width:50px;text-align:center;background:#f2f9f0'  value='"+value+"' id='"+dicts[i].type+"_"+dicts[i].id+"_"+inputid+"' onkeyup='noproject_dayschange(this)'/></td>";
	}
			html+="<td align='center' style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;background:#dff0d9'  id='"+dicts[i].type+"_"+dicts[i].id+"_"+"sum'></td>";
			html+="</tr>";	
	}
	
	
	return html;
}




function addDialogOpen(data){
	dialogOpen({
		title: 'Timesheet-增加',
		url: 'sys/timesheet/add.html?_' + $.now(),
		width: '920px',
		height: '650px',
		scroll: true,
		yes : function(iframeId) {
			var rs=top.frames[iframeId].acceptCommit();
			setTimeout(function(){
				loadByDay($("#startdate").html());
			},2000)
			
			
		}
	});
}


function buildFooter(){
	var html="<tr  style='background: #eff4fc;'>";
    html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; font-weight:bold;' colspan='2'>总时数/加班时数</td>";
    html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' colspan='2'></td>";
	for(var m=0;m<7;m++){
		var date=new Date($("#startdate").html());	
    	date.setDate(date.getDate()+m);
    	var inputid=formatDate(date,"yyyy-MM-dd");
		html+="<td id='sumhours"+"_"+inputid+"' align='center'  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;font-weight:bold;' ></td>";
	}
	html+="<td  align='center'  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;font-weight:bold;' id='sumhours_sum'></td>";
    html+="</tr>";
    
    html+="<tr style='background: #eff4fc;display:none'>";
    html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' colspan='2'>标准时数</td>";
    html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' colspan='2'></td>";
	for(var m=0;m<7;m++){
		var date=new Date($("#startdate").html());	
    	date.setDate(date.getDate()+m);
    	var inputid=formatDate(date,"yyyy-MM-dd");
    	if(m<5){
    		html+="<td id='standardhours"+"_"+inputid+"' align='center'  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' >8</td>";
    	}else{
		html+="<td id='standardhours"+"_"+inputid+"' align='center'  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' >0</td>";  	
    	}
	}
	html+="<td  align='center'  style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' id='standardhours_sum'></td>";
    html+="</tr>";
    
    html+="<tr style='background: silver;display:none'>";
    html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' colspan='2'>加班时数</td>";
    html+="<td style='border:1px solid #000;vertical-align:middle; ' colspan='2'></td>";
	for(var m=0;m<7;m++){
		var date=new Date($("#startdate").html());	
    	date.setDate(date.getDate()+m);
    	var inputid=formatDate(date,"yyyy-MM-dd");
		html+="<td id='overhours"+"_"+inputid+"' align='center'  style='border:1px solid #000;text-align:center; font-weight:bold;' ></td>";
	}
	html+="<td  align='center'  style='border:1px solid #000;text-align:center;font-weight:bold; ' id='overhours_sum' ></td>";
    html+="</tr>";
    return html;
}

function buildHead(){
	
	var html="<tr style='background: #eff4fc;'>";
    html+="<th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle;' >项目类型</th>";
    html+="<th style='width: 150px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' >项目编号</th>";
    html+="<th style='width: 300px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' >项目名称</th>";
    html+="<th style='width: 200px;text-align:center;font-weight:bold;border:1px solid #a8bbd3;vertical-align:middle; ' >任务名称</th>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px'>周一</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px' >周二</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px' >周三</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px'>周四</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px' >周五</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;background:#f2dede;width: 50px'>周六</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;background:#f2dede;width: 50px' >周日</td>";
  	html+="<td style='text-align:center;font-weight:bold;border:1px solid #a8bbd3;width: 50px'>合计</td></tr>";
  	return html;
  
}


function dayschange(o){
	if(!isInteger(o.value)&&o.value!=""){
		o.value="";
	}
	var index=o.id;
	var protype=index.split("_")[0];
	var proid=index.split("_")[1];
	var taskid=index.split("_")[2];
	var day=index.split("_")[3];
	var value=o.value;
	if(o.value==""){
		value=0;
	}
	var xsum=getxSumByVal(protype+"_"+proid+"_"+taskid);
	//横向统计赋值
	$("#"+protype+"_"+proid+"_"+taskid+"_sum").html(xsum);
	var ysum=0;
	$("#dataGrid input").each(function(){
		var inputid=this.id.split("_");
		if(inputid[0]==protype&&inputid[1]==proid&&inputid[3]==day){
			if(this.value==""){
				ysum+=0;
			}else{
				ysum+=parseInt(this.value);
			}
		}
	});

	$("#sumhours"+"_"+day).html(getySumByVal(day));
	var nowsumhours=$("#sumhours"+"_"+day).html();
	//计算加班时数
	var standardhours=$("#standardhours_"+day).html();
	var overhours=$("#overhours_"+day).html();
	if(overhours==""){
		overhours=0;
	}
	var nowoverhours= parseInt(nowsumhours)-parseInt(standardhours);
	if(nowoverhours<0){
		nowoverhours=0;
	}
	var overhoursstyle="";
	if(nowoverhours>0){
		overhoursstyle+="style='color:#0782ff' ";
	}else{
		nowoverhours=0;
	} 
	if(nowoverhours>0){
		$("#sumhours"+"_"+day).html(nowsumhours+"/"+"<span "+overhoursstyle+">"+nowoverhours+"</span>");
	}
	$("#overhours_"+day).html(nowoverhours);
	$("#standardhours_sum").html(getxSumByHtml("standardhours"));
	$("#sumhours_sum").html(getxSumByHtml("sumhours"));
	$("#overhours_sum").html(getxSumByHtml("overhours"));
	var overhours_sum=$("#overhours_sum").html();
	
	var overhourssumstyle="";
	if(overhours_sum>0){
		overhourssumstyle+="style='color:#0782ff' ";
	}else{
		overhours_sum=0;
	} 
	if($("#sumhours_sum").html()!=0&&parseInt(overhours_sum)>0){
		var alltotalset=$("#sumhours_sum").html()+"/"+"<span "+overhourssumstyle+">"+overhours_sum+"</span>";
		$("#sumhours_sum").html(alltotalset);
	}
}



/**
 * 横向统计
 * @param id
 * @returns
 */
function getxSumByVal(id){
	var sum=0;
	for(var m=0;m<7;m++){
		var date=new Date($("#startdate").html());	
    	date.setDate(date.getDate()+m);
    	var count=$("#"+id+"_"+formatDate(date,"yyyy-MM-dd")).val();
    	if(""==count){
    		count=0;
    	}
    	sum+=parseInt(count);
	}
	if(sum==0){
		sum="";
	}
	return sum;
}
/**
 * 横向统计
 * @param id
 * @returns
 */
function getxSumByHtml(id){
	var sum=0;
	for(var m=0;m<7;m++){
		var date=new Date($("#startdate").html());	
    	date.setDate(date.getDate()+m);
    	var count=$("#"+id+"_"+formatDate(date,"yyyy-MM-dd")).html();
    	if(""==count){
    		count=0;
    	}
    	sum+=parseInt(count);
	}
	if(sum==0){
		sum="";
	}
	return sum;
}

function getySumByVal(day){
	var sum=0;
	
	$("#dataGrid input").each(function(){
		if(this.id.indexOf(day)!=-1){
			if(this.value==""){
				sum+=0;
			}else{
				sum+=parseInt(this.value);
			}
		}
	});

	if(sum==0){
		sum="";
	}
	return sum;
}


function isInteger(obj) {
    reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 保存timesheet
 * @returns
 */
function saveTimsheet(v){
	var tasksinfo=[];
	var noprojectinfo=[];
	var sumhours=$("#sumhours_sum").html();
	var overhours=$("#overhours_sum").html();
	if(sumhours==""){
		sumhours=0;
	}
	if(overhours==""){
		overhours=0;
	}
	if(sumhours.indexOf("/")!=-1){
		sumhours=sumhours.split("/")[0];
	}
	for(var i=0;i<tasks.length;i++){	
		for(var m=0;m<7;m++){
			if(tasks[i].taskStatus == "4"){
				
			}else if(tasks[i].taskStatus != "4"){
				var date=new Date($("#startdate").html());	
		    	date.setDate(date.getDate()+m);
		    	var datestr=formatDate(date,"yyyy-MM-dd");
				var idstr=tasks[i].proType+"_"+tasks[i].proId+"_"+tasks[i].taskId+"_"+datestr;
				var value=$("#"+idstr).val();
				if(value==""){
					value=0;
				}
				tasksinfo.push(tasks[i].taskId+"_"+datestr+"_"+value);
			}
		}
	}
	for(var i=0;i<dicts.length;i++){
		
		for(var m=0;m<7;m++){
			var date=new Date($("#startdate").html());	
	    	date.setDate(date.getDate()+m);
	    	var datestr=formatDate(date,"yyyy-MM-dd");
			var idstr=dicts[i].type+"_"+dicts[i].id+"_"+datestr;
			var value=$("#"+idstr).val();
			if(value==""){
				value=0;
			}
			noprojectinfo.push(dicts[i].id+"_"+datestr+"_"+value);
		}
	}
	
	var layer_index;
	var loading_title;
	v=="0"?loading_title="保存":loading_title="提交";
	$.ajax({
		type: "post",
		url : '../../api/timesheet/timesheetsave?_' + $.now(),
		data:{
			date:$("#startdate").html(),
			task:tasksinfo.toString(),
			noprojects:noprojectinfo.toString(),
			remark:$("#remark").val(),
			weekactualhours:sumhours,
			weekovertimehours:overhours,
			submitflag:v
		},
		beforeSend:function(){
			layer_index= layer.msg(loading_title+'操作中...', {shade: [0.5, '#f5f5f5'],scrollbar: false,offset: '40%', time:100000}) ;  
			
		},
		success: function (data) {
			layer.close(layer_index); 
			if(data.rs=="ok"){
				dialogMsg(loading_title+"成功",1);
			}else{
				dialogMsg(loading_title+"失败",2);
			}
			location.reload();
		
		},
		error:function(e){
			dialogMsg("发生异常",2);
			layer.close(index); 
		}
	});
}




dialogOpenInfo = function(opt){
	var defaults = {
		id : 'layerForm',
		title : '',
		width: '',
		height: '',
		url : null,
		scroll : false,
		data : {}
		
	}
	var option = $.extend({}, defaults, opt), content = null;
	if(option.scroll){
		content = [option.url]
	}else{
		content = [option.url, 'no']
	}
	top.layer.open({
	  	type : 2,
	  	id : option.id,
		title : option.title,
		closeBtn : 1,
		anim: -1,
		isOutAnim: false,
		shadeClose : false,
		shade : 0.3,
		area : [option.width, option.height],
		content : content,
		btn: option.btn
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