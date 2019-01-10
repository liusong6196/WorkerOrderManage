/**
 * 个人状态
 */


$(function() {
	loadSelections();
});

function loadSelections(){
	
	$.ajax({
		type: "post",
		url : '../../api/report/depreportselections?_' + $.now(),		
		success: function (data) {
			var deps=data.deps;	
			var html="<option value='-1'>请选择</option>";
			for(var i=0;i<deps.length;i++){
				html +="<option value='"+deps[i].depId+"'>"+deps[i].depName+"</option>";
			}
			$("#department").html(html);
		}
		});
	
}

var hourscount;
function searchreport(){
	if (!$('#form').Validform()) {
      return false;
    }
	$.ajax({
		type: "post",
		url : '../../api/report/departmentreport?_' + $.now(),
		data:{
			depId:$("#department").val(),
			start:$("#start").val(),
			end:$("#end").val()
		},
		success: function (data) {
			if(data.depinfolist.length==0){
				dialogAlert("没有查询到相关信息!");
				$("#datatable").html("");
				$("#timerange").html("");
				$("#companyname").html("");
				$("#depname").html("");
				$("#workhours").html("");
				return;
			}
			var pros=getAllPros(data);
			var workhours=computeDaysDelta($("#start").val(),$("#end").val())*8;
			$("#datatable").html(buildTable(data.users,pros));
			$("#timerange").html($("#start").val()+"至"+$("#end").val());
			$("#companyname").html("北京一维");
			$("#depname").html($("#department").find("option:selected").text());
			$("#workhours").html(workhours);

			var users=data.users;
			var depinfolist=data.depinfolist;
			var allpayhours=0;
			var alluserhours=0;
			for(var i=0;i<users.length;i++){
				var payhours=0;
				var userhours=0;
				for(var x=0;x<depinfolist.length;x++){			
					if(depinfolist[x].userId==users[i].userId){
						$("#"+depinfolist[x].proId+"_"+users[i].userId).html(depinfolist[x].proActualhours);
						userhours+=depinfolist[x].proActualhours;
						if(depinfolist[x].proChargetype=="0"){
							payhours+=depinfolist[x].proActualhours;
						}
					}
				}
				var effectivepercent=(userhours/workhours)*100;
				var paypercent=(payhours/workhours)*100;
				$("#effectivepercent"+users[i].userId).html(Math.floor(effectivepercent)+"%");
				$("#paypercent"+users[i].userId).html(Math.floor(paypercent)+"%");
				allpayhours+=payhours;
				alluserhours+=userhours;
			}
			
			var effectivepercentall=Math.floor(alluserhours/workhours*100);
			var paypercentall=Math.floor(allpayhours/workhours*100);
			$("#effectivepercentall").html(effectivepercentall+"%");
			$("#paypercentall").html(paypercentall+"%");
		
			
			
			for(var i=0;i<pros.length;i++){
				var userscount=0;
				var usershours=0;
				for(var x=0;x<depinfolist.length;x++){				
					if(depinfolist[x].proId==pros[i].proId){
						userscount+=1;
						usershours+=depinfolist[x].proActualhours;
					}
				}
				
				$("#sumperson"+pros[i].proId).html(userscount);
				$("#sumhours"+pros[i].proId).html(usershours);
			}
		}
	});
}


/**
 * 初始化表格
 * @param users
 * @param pros
 * @returns
 */
function buildTable(users,pros){
	var html="  <tr style='background: silver;height:30px;'>";
	 html+=" <th style='width: 300px;text-align:center;font-weight:bold; vertical-align:middle;border:1px solid #000' rowspan='2'>资源</th>";
	 html+=" <th style='text-align:center;font-weight:bold;border:1px solid #000' colspan='"+pros.length+"'>项目</th>";
	 html+=" <th style='width: 100px;text-align:center;font-weight:bold; vertical-align:middle;border:1px solid #000' rowspan='2'>有效率</th>";
	 html+=" <th style='width: 100px;text-align:center;font-weight:bold; vertical-align:middle;border:1px solid #000' rowspan='2'>收费率</th>";
	 html+="</tr>";
	 html+="<tr style='background: silver;height:30px;'>";
	 for(var i=0;i<pros.length;i++){
		 html+="<th style='text-align:center;font-weight:bold;border:1px solid #000'>"+pros[i].proName+"</th>";
	 }
	html+="</tr>";
	
	for(var i=0;i<users.length;i++){
		var style="";
		if(i%2==0){
			style="style='background-color: #d2d6de;'";
		}
		 html+="<tr "+style+">";
		
		 html+="<td align='center'>"+users[i].username+"</td>"
		for(var x=0;x<pros.length;x++){
			var createid=pros[x].proId+"_"+users[i].userId;
			html+="<td id='"+createid+"' align='center'></td>"
		}
		html+="<td id='"+"effectivepercent"+users[i].userId+"' align='center'></td>"
		html+="<td id='"+"paypercent"+users[i].userId+"' align='center'></td>"
		html+="</tr>"
	}
	
	html+="<tr style='background: silver;text-align:center;font-weight:bold;' class='danger'>"
	html+="<td style='border:1px solid #000'>合计(人时):</td>";
		for(var x=0;x<pros.length;x++){
			var createid="sumhours"+pros[x].proId;
			html+="<td id='"+createid+"' align='center' style='border:1px solid #000'></td>"
		}
	html+="<td id='effectivepercentall' style='border:1px solid #000'></td>";
	html+="<td id='paypercentall' style='border:1px solid #000'></td>";
	html+="</tr>"
		
	html+="<tr style='background: silver;text-align:center;font-weight:bold;' class='danger'>"
	html+="<td style='border:1px solid #000'>合计(人):</td>";
				for(var x=0;x<pros.length;x++){
					var createid="sumperson"+pros[x].proId;
					html+="<td id='"+createid+"' align='center' style='border:1px solid #000'></td>"
				}
	html+="<td style='border:1px solid #000'></td>";
	html+="<td style='border:1px solid #000'></td>";
	html+="</tr>"
	return html;
}

/**
 * 筛选出所有项目id和名称
 * @param data
 * @returns
 */
function getAllPros(data){
	var arr=[];
	var arrpro=[];
	var depinfolist=data.depinfolist;
	for(var i=0;i<depinfolist.length;i++){
		if(arr.indexOf(depinfolist[i].proId)<0){
			var depinfo=new Object();
			depinfo.proId=depinfolist[i].proId;
			depinfo.proName=depinfolist[i].proName;
			arrpro.push(depinfo);
			arr.push(depinfolist[i].proId);
		}
	}	
	return arrpro;
}



/**
 * 日期转换
 * @param dateString
 * @returns
 */
function convertStringToDate(dateString) 
{ 
    dateString = dateString.split('-'); 
    return new Date(dateString[0], dateString[1] - 1, dateString[2]); 
} 
 
 /**
  * 计算时间范围内工作日
  * @param date1
  * @param date2
  * @returns
  */
function computeDaysDelta(date1, date2) 
{ 
    date1 = convertStringToDate(date1); 
    date2 = convertStringToDate(date2); 
    delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1; 
 
    weekEnds = 0; 
    for(i = 0; i < delta; i++) 
    { 
        if(date1.getDay() == 0 || date1.getDay() == 6) weekEnds ++; 
        date1 = date1.valueOf(); 
        date1 += 1000 * 60 * 60 * 24; 
        date1 = new Date(date1); 
    } 
    return delta - weekEnds;  
} 