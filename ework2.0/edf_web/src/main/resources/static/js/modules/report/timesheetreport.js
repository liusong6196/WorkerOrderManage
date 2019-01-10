/**
 * 个人状态
 */

var nowenddate;

$(function() {
	loadfirst();
});

function loadfirst(){
	
	var nowdate=formatDate(new Date(),"yyyy-MM-dd");
	$.ajax({
		type: "post",
		url : '../../api/report/timesheetreport?_' + $.now(),
		data:{
			date:nowdate
		},
		success: function (data) {
			if(data==null) {
				dialogAlert("查询日期超出范围!");
			return
			};
			$("#dataGrid").html(buildTable(data.deplist));
			$("#startdate").html(data.tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(data.tsweek.tsEnddate.substring(0,10));		 
			nowenddate=data.tsweek.tsEnddate.substring(0,10);
			fillTable(data.tslist);
		}
		});
}


function getReport(flag){
	var datestr="";
	var date=new Date($("#enddate").html());	
	if(null==flag){
		if (!$('#form').Validform()) {
		      return false;
		    }
		 datestr=$("#selectdate").val();
		if(new Date(datestr)-new Date(nowenddate)>0){
			dialogAlert("查询日期超出范围!");
			return;
		}
				
	}else{
		date.setDate(date.getDate()+flag);
	    datestr=formatDate(date,"yyyy-MM-dd");
	}
	
	$.ajax({
		type: "post",
		url : '../../api/report/timesheetreport?_' + $.now(),
		data:{
			date:datestr
		},
		success: function (data) {
			if(data==null) {
				dialogAlert("查询日期超出范围!");
			return
			};
				
			$("#dataGrid").html(buildTable(data.deplist));
			$("#startdate").html(data.tsweek.tsStartdate.substring(0,10));
			$("#enddate").html(data.tsweek.tsEnddate.substring(0,10));	
			data.tsweek.tsEnddate.substring(0,10)==nowenddate? $("#nextweek").hide():$("#nextweek").show();		
			fillTable(data.tslist);
			
		}
		});
}




function fillTable(tslist){
	for(var i=0;i<tslist.length;i++){
		var weekstatus=(null==tslist[i].weekStatus||""==tslist[i].weekStatus)?"1":tslist[i].weekStatus;
		var elmentId=weekstatus+"_"+tslist[i].depId;
		(""==$("#"+elmentId).html())?$("#"+elmentId).html(tslist[i].username):$("#"+elmentId).html($("#"+elmentId).html()+","+tslist[i].username);
	}
	
}

function buildTable(deplist){

    var html="<tr style='background: silver;'>";
    html+= "<th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000'>状态</th>";
    html+= "<th style='width: 100px;text-align:center;font-weight:bold;border:1px solid #000'>公司</th>";
    html+= "<th style='width: 150px;text-align:center;font-weight:bold;border:1px solid #000'>部门</th>";
    html+= "<th style='text-align:center;font-weight:bold;border:1px solid #000'>员工</th>";
    html+="</tr>";
    
    var arr=["未提交","已提交","审批通过","审批未通过"];
    
    for(var i=0;i<arr.length;i++){
    	for(var x=0;x<deplist.length;x++){
    		var style="";
    		if(i%2==0){
    			style="style='background-color: #d2d6de;'";
    		}
    		html+="<tr "+style+">"
    		if(x==0){
    			html+="<td align='center' rowspan='"+deplist.length+"' style='vertical-align:middle; border:1px solid #000'>"+arr[i]+"</td>";
    			html+="<td align='center' rowspan='"+deplist.length+"' style='vertical-align:middle;border:1px solid #000'>一维科技</td>";
    		}
    		var createid=i+1+"_"+deplist[x].depId;
    		html+="<td align='center' style='border:1px solid #000'>"+deplist[x].depName+"</td>";
    		html+="<td align='center' id='"+createid+"' style='border:1px solid #000'></td>";
    		html+="</tr>"
    	}
    }
    
    return html;
}

