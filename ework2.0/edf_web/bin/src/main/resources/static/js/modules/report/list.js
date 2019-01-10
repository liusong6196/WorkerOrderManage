/**
 * 个人状态
 */

var taskPlannedhoursTotal=0;
var taskTotalhoursTotal=0;
var taskCyclehoursTotal=0;

$(function() {
	loadSelections();
});
function searchreport(){
	//$("#datatable").html(createth());
	if (!$('#form').Validform()) {
        return false;
    }
	$.ajax({
		type: "post",
		url : '../../api/report/taskreportlist?_' + $.now(),
		data:{
			userId:$("#users").val(),
			proId:$("#pros").val(),
			company:$("#company").val(),
			start:$("#start").val(),
			end:$("#end").val(),
		},
		success: function (rs) {
					if(rs.length==0){
						dialogAlert("没有查询到相关信息!");
						location.reload();
						return;
					}
					var htmls=createth();
					var arr=groupdata(rs);
					for(var i=0;i<arr.length;i++){
						 htmls +=createtd(arr[i]);
					}
					htmls+=createTotal();
					$("#datatable").html(htmls);
					$("#userlabel").html($("#users").find("option:selected").text());
					var time="";
					if($("#start").val()!=""){
						time+=$("#start").val()+"   开始    ";
					}
					if($("#end").val()!=""){
						time+=$("#end").val()+"   结束";
					}
					
					if(time==""){
						time="&nbsp;&nbsp;&nbsp;无&nbsp;&nbsp;&nbsp;";
					}
					$("#timelabel").html(time);
		}
	});
}

function loadSelections(){
	$.ajax({
		type: "post",
		url : '../../api/report/selections?_' + $.now(),
		success: function (rs) {
				var usersHTML="<option value='-1'>请选择</option>";
				for(var i=0;i<rs.users.length;i++){
					usersHTML +="<option value='"+rs.users[i].userId+"'>"+rs.users[i].username+"</option>";
				}
				$("#users").html(usersHTML);
				var prosHTML="<option value='-1'>全部</option>";
				for(var i=0;i<rs.pros.length;i++){
					prosHTML +="<option value='"+rs.pros[i].proId+"'>"+rs.pros[i].proName+"</option>";
				}
				$("#pros").html(prosHTML);
		}
	});
}

/**
 * 创建表头
 * @returns
 */
function createth(){
	var th="<tr style='background: silver;'>";
		th+= "<th style='width: 300px;text-align:center;font-weight:bold;'>项目名称</th>";
		th+= "<th style='width: 300px;text-align:center;font-weight:bold;'>任务名称</th>";
		th+= "<th style='width: 200px;text-align:center;font-weight:bold;'>任务代码</th>";
		th+=  "<th style='width: 200px;text-align:center;font-weight:bold;'>计划工作量</th>";
		th+=    " <th style='text-align:center;font-weight:bold;'>累计工作量</th>";
		th+=    "<th style='text-align:center;font-weight:bold;'>本期工作量</th>";
		th+=    "<th style='text-align:center;font-weight:bold;'>任务状态</th>";	
		return th;
}

/**
 * 详细统计数据
 * @param data
 * @returns
 */
function createtd(data){
	var td="";
	var taskPlannedhours=0;
	var taskTotalhours=0;
	var taskCyclehours=0;
	for(var i=0;i<data.length;i++){
		td+="<tr>";
		td+="<td>"+data[i].proName+"</td>";
		td+="<td>"+data[i].taskName+"</td>";
		td+="<td align='center'>"+data[i].taskNumber+"</td>";
		td+="<td align='center'>"+data[i].taskPlannedhours+"</td>";
		td+="<td align='center'>"+data[i].taskTotalhours+"</td>";
		td+="<td align='center'>"+data[i].taskCyclehours+"</td>";
		if(data[i].taskStatus==4){
		td+="<td align='center'>"+"<span class='label label-primary'>打开</span>"+"</td>";
		}else if(data[i].taskStatus==0){
			td+="<td align='center'>"+"<span class='label label-danger'>完成</span>"+"</td>";	
		}else{
			td+="<td align='center'>"+"<span class='label label-success'>完成</span>"+"</td>";	
		}
		td+="</tr>";	
		taskPlannedhours+=data[i].taskPlannedhours;
		taskTotalhours+=data[i].taskTotalhours;
		taskCyclehours+=data[i].taskCyclehours;
	}
	
	 taskPlannedhoursTotal +=taskPlannedhours;
	 taskTotalhoursTotal +=taskTotalhours;
	 taskCyclehoursTotal +=taskCyclehours;
	
	td+="<tr style='background: silver;text-align:center;font-weight:bold;' class='success'>";
	td+="<td colspan=3>["+data[0].proName+"] 小计</td>";
	td+="<td>"+taskPlannedhours+"</td>";
	td+="<td>"+taskTotalhours+"</td>";
	td+="<td>"+taskCyclehours+"</td><td></td>";
	td+="</tr>"
	return td;
}

function createTotal(){
	
	var td="<tr style='background: silver;text-align:center;font-weight:bold;' class='danger'>";
	td+="<td colspan=3>合计</td>";
	td+="<td>"+taskPlannedhoursTotal+"</td>";
	td+="<td>"+taskTotalhoursTotal+"</td>";
	td+="<td>"+taskCyclehoursTotal+"</td><td></td>";
	td+="</tr>";
	
	return td;
}

/**
 * 按照proId对数据进行分组
 * @param data
 * @returns
 */
function groupdata(data){
	var arr=[data[0].proId];
	var proarr=[];
	for(var i=0;i<data.length;i++){			
		if(arr.indexOf(data[i].proId)<0){
			arr.push(data[i].proId);
		}
	}
	
	for(var i=0;i<arr.length;i++){
		var taskarr=[];
		for(var x=0;x<data.length;x++){
			if(data[x].proId==arr[i]){
				taskarr.push(data[x]);
			}
		}
		
		proarr.push(taskarr);
	}
	
	return proarr;
}