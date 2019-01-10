/**
 * 编辑-报销单表js
 *//*
var vm = new Vue({
	el:'#eway',
	data: {
		expenseAccount: {
			expAccId: 0,
			expAccType:null
		}
	},
	methods : {
		setForm: function() {
			//获取报销单和明细表单信息
			var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId))//listAccountAndDetailed(vm.expenseAccount.expAccId);
			if(data.account.expAccType==1){
				vm.expenseAccount.expAccType=1;
				$("#trafficTable").css('display','');
				$("#routineTable").css('display','none');
				setTrafficAndRoutine(data.account,data.traffic,data.routine);
			}else{
				vm.expenseAccount.expAccType=2;
				$("#trafficTable").css('display','none');
				$("#routineTable").css('display','');
				setAcountAndRoutine(data.account,data.routine)
			}
		},acceptClick:function(){
			if(vm.expenseAccount.expAccType==1){
				var tableData=$("#tableData");
				var traBottom=$("#traBottom");
				$("#print").append(tableData); 
				$("#print").append(traBottom);
				//var headstr = "<html><head><style>table{margin-left:5%;width:95%;} td{height:30%;}</style><title>打印报销单</title></head><body><br/><br/><br/>";
				//var footstr = "<div style='border-bottom: 1px solid #f00; margin-top: 8%;'></div></body>";
				var newstr = document.getElementById("printDiv").innerHTML;
				
				aa(newstr);
				//return false;
				
				//var oldstr = document.body.innerHTML;
				//document.body.innerHTML = headstr+newstr+footstr;
				//setTimeout(function(){
				//	dialogClose();
				//}, 200);
				//window.print(); 
				//document.body.innerHTML = oldstr;
			}else{
				var routineTaleData=$("#routineTaleData");
				var bottom=$("#bottom");
				$("#print").append(routineTaleData);
				$("#print").append(bottom);
				//var headstr = "<html><head><style>table{width:68%;} td{height:30%;}</style><title>打印报销单</title></head><body><br/><br/><br/>";
				//var footstr = "</body>";
				var newstr = document.getElementById("printDiv").innerHTML;
				
				aa(newstr);
				return false;
				
				//var oldstr = document.body.innerHTML;
				//document.body.innerHTML = headstr+newstr+footstr;
				//setTimeout(function(){
				//	dialogClose();
				//}, 200);
				//window.print(); 
				//document.body.innerHTML = oldstr;
			}
		}
	}
});
function aa(newstr){
	LODOP=getLodop();
	LODOP.PRINT_INIT("");
//	LODOP.SET_PRINT_STYLE("FontSize",15);
//	LODOP.SET_PRINT_STYLE("PenWidth",0);
	LODOP.SET_PRINT_PAGESIZE(1, 0, 0,"A4");
//	LODOP.SET_PRINT_STYLE("Bold",0);
	LODOP.ADD_PRINT_TABLE(35,50,1200,700,newstr);
	LODOP.SET_PRINT_STYLE("HOrient",0);
	LODOP.SET_PRINT_STYLE("VOrient",0);
//	LODOP.PREVIEW();
	LODOP.PRINT();
}
function dateToYMD(date){
	var result=[];
	if(date!="" ||date!=null ||date.length>0){
		var d=new Date(date);
		var year=d.getFullYear(); //获取当前年份
		var mon=d.getMonth()+1; //获取当前月份
		var da=d.getDate(); //获取当前日
		result[0]=year;
		result[1]=mon;
		result[2]=da;
		return result;
	}else{
		return null;
	}
}
function setAcountAndRoutine(account,routine){
	$("#rountineDeptId").html(getDeptName());
	if(dateToYMD(account.expAccDatetime)!=null){
		$("#rountineYear").html(dateToYMD(account.expAccDatetime)[0]+"年");
		$("#rountineMonth").html(dateToYMD(account.expAccDatetime)[1]+"月");
		$("#rountineDay").html(dateToYMD(account.expAccDatetime)[2]+"日");
	}
	//申报人
	getUserName(account.expAccUserid).done(function(name){
		$("#userName").html(name);
	});
	for(var i=0;i<routine.length;i++){
		//报销项目
		var expItemType="exp_item";
		var expItemOptionsArrayJson=getOptionsByType(expItemType);
		var expTtemValue="";
		for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
			if(expItemOptionsArrayJson[expItemTypeI].value==routine[i].expItem){
				expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
				break;
			}
		}
		if(routine[i].chcekMoney==null){
			routine[i].chcekMoney="";
		}
		var tr="<tr>" +
					"<td width='150px;'>"+expTtemValue+"</td>" +
					"<td colspan='7'>"+routine[i].expAbstract+"</td>" +
					"<td class='rountineAccDetMoney'>"+routine[i].accDetMoney+"</td>" +
					"<td>"+routine[i].chcekMoney+"</td>" +
				"</tr>";
		$("#routineTaleData").append(tr);
		//交通总和
		var list=document.getElementsByClassName("rountineAccDetMoney");
		var rountineAccDetMoneySum=0;
		for(var v=0;v<list.length;v++){
			if(list[v].innerHTML !=""){
				rountineAccDetMoneySum+=parseFloat(list[v].innerHTML);
			}
		}
		$("#rountineAccDetMoneySum").html(rountineAccDetMoneySum);
		$("#rountineSumAll").html("人民币（大写）："+numToCny(rountineAccDetMoneySum));
	}
	if(account.checkUserid != null){
		getUserName(account.checkUserid).done(function(name){
			$("#checkUseridCL").html(name);
		});
	}
	if(account.checkUseridTwo != null){
		getUserName(account.checkUseridTwo).done(function(name){
			$("#checkUseridTwoCL").html(name);
		});
	}
	if(account.doubleCheckUserid != null){
		getUserName(account.doubleCheckUserid).done(function(name){
			$("#doubleCheckUseridCL").html(name);
		});
	}
}
function setTrafficAndRoutine(account,traffics,routines){
	//设置项目
	var proOptionsArrayJson=getPro();
	for(var proOptionsI=proOptionsArrayJson.length-1;proOptionsI>=0;proOptionsI--){
		if(account.proId==proOptionsArrayJson[proOptionsI].proId){
			$("#proId").html(proOptionsArrayJson[proOptionsI].proName);
			break;
		}
	}
	$("#depName").html(getDeptName());
	if(dateToYMD(account.expAccDatetime)!=null){
		$("#year").html(dateToYMD(account.expAccDatetime)[0]+"年");
		$("#month").html(dateToYMD(account.expAccDatetime)[1]+"月");
		$("#day").html(dateToYMD(account.expAccDatetime)[2]+"日");
	}
	//申报人
	getUserName(account.expAccUserid).done(function(name){
		$("#tfaUserName").html(name);
	});
	var trafficLength=0;
	var routinesLength=0;
	if(traffics!=null){trafficLength=traffics.length;}
	if(routines!=null){routinesLength=routines.length;}
	if(trafficLength>routinesLength){
		for(var i=0;i<trafficLength;i++){
			//交通工具下拉框
			var vehicleType="vehicle_type";
			var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
			var vehicleTypeValue="";
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(traffics[i].vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(traffics[i].chcekMoney==null){
				traffics[i].chcekMoney="";
			}
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			if(i==0){
				travelAllowance=account.travelAllowance;
				travelDays=account.travelDays;
			}
			//日常
			//报销项
			var expTtemValue="";
			//报销金额
			var accDetMoney="";
			//审核金额
			var chcekMoney="";
			if(i<routinesLength){
				if(routines!=null){
					//报销项目
					var expItemType="exp_item";
					var expItemOptionsArrayJson=getOptionsByType(expItemType);
					for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
						if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
							expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
							break;
						}
					}
					accDetMoney=routines[i].accDetMoney;
					chcekMoney=routines[i].chcekMoney;
					if(chcekMoney = "null"){
						chcekMoney = "";
					}
				}
			}
			var tr="<tr>" +
					"<td>"+dateToMonthAndDay(traffics[i].expStartDatetime)+"</td>" +
					"<td>"+traffics[i].expStartSite+"</td>" +
					"<td>"+dateToMonthAndDay(traffics[i].expEndDatetime)+"</td>" +
					"<td>"+traffics[i].expEndSite+"</td>" +
					"<td>"+vehicleTypeValue+"</td>" +
					"<td class='trafficsMoney'>"+traffics[i].accDetMoney+"</td>" +
					"<td>"+traffics[i].chcekMoney+"</td>" +
					"<td class='travelDays'>"+travelDays+"</td>" +
					"<td class='travelAllowance'>"+travelAllowance+"</td>" +
					"<td>"+expTtemValue+"</td>" +
					"<td class='routinesMoney'>"+accDetMoney+"</td>" +
					"<td>"+chcekMoney+"</td>" +
					"<td></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney=0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				trafficSumMoney+=parseFloat(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(trafficSumMoney);
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney=0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML !=""){
				routinesSumMoney+=parseFloat(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(routinesSumMoney);
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var sum=parseFloat(trafficSumMoney==""?0:trafficSumMoney)+parseFloat(routinesSumMoney==""?0:routinesSumMoney)+
				parseFloat(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
					document.getElementsByClassName("travelAllowance")[0].innerHTML);
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(sum.toFixed(2)));
			$("#sumXMenoy").html(sum.toFixed(2));
		}
	}else if(routinesLength>trafficLength){
		for(var i=0;i<routinesLength;i++){
			var expTtemValue="";
			var expItemType="exp_item";
			var expItemOptionsArrayJson=getOptionsByType(expItemType);
			for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
				if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
					expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
					break;
				}
			}
			var expStartDatetime="";
			var expStartSite="";
			var expEndDatetime="";
			var expEndSite="";
			var vehicleTypeValue="";
			var accDetMoney="";
			var chcekMoney="";
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			var vehicleType="";
			if(i==0){
				travelAllowance=account.travelAllowance==null?"":account.travelAllowance;
				travelDays=account.travelDays==null?"":account.travelDays;
			}
			if(i<trafficLength){
				if(traffics!=null){
					expStartDatetime=traffics[i].expStartDatetime;
					expStartSite=traffics[i].expStartSite;
					expEndDatetime=traffics[i].expEndDatetime;
					expEndSite=traffics[i].expEndSite;
					vehicleType=traffics[i].vehicleType;
					accDetMoney=traffics[i].accDetMoney;
					chcekMoney=traffics[i].chcekMoney;
				}
			}		
			var vehicleOptionsArrayJson=getOptionsByType("vehicle_type");
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(chcekMoney == null){
				chcekMoney = "";
			}
			var tr="<tr>" +
						"<td>"+dateToMonthAndDay(expStartDatetime)+"</td>" +
						"<td>"+expStartSite+"</td>" +
						"<td>"+dateToMonthAndDay(expEndDatetime)+"</td>" +
						"<td>"+expEndSite+"</td>" +
						"<td>"+vehicleTypeValue+"</td>" +
						"<td class='trafficsMoney'>"+accDetMoney+"</td>" +
						"<td>"+chcekMoney+"</td>" +
						"<td class='travelDays'>"+travelDays+"</td>" +
						"<td class='travelAllowance'>"+travelAllowance+"</td>" +
						"<td>"+expTtemValue+"</td>" +
						"<td class='routinesMoney'>"+routines[i].accDetMoney+"</td>" +
						"<td></td>" +
						"<td></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney=0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				trafficSumMoney+=parseFloat(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(trafficSumMoney==0?"":trafficSumMoney);
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney=0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML !=""){
				routinesSumMoney+=parseFloat(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(routinesSumMoney==0?"":routinesSumMoney);
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var sum=parseFloat(trafficSumMoney==null?0:trafficSumMoney)+parseFloat(routinesSumMoney==null?0:routinesSumMoney)+
				parseFloat(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
					document.getElementsByClassName("travelAllowance")[0].innerHTML);
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(sum.toFixed(2)));
			$("#sumXMenoy").html(sum.toFixed(2));
		}
		
	}else if(routinesLength==trafficLength && routinesLength==0){
		//补差天数和补贴金额
		var travelAllowance="";
		var travelDays="";
		travelAllowance=account.travelAllowance;
		travelDays=account.travelDays;
		var tr="<tr>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td class='trafficsMoney'></td>" +
					"<td></td>" +
					"<td class='travelDays'>"+travelDays+"</td>" +
					"<td class='travelAllowance'>"+travelAllowance+"</td>" +
					"<td></td>" +
					"<td class='routinesMoney'></td>" +
					"<td></td>" +
					"<td></td>" +
				"</tr>";
		$("#tableData").append(tr);
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				trafficSumMoney+=parseFloat(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(trafficSumMoney);
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML !=""){
				routinesSumMoney+=parseFloat(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(routinesSumMoney);
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var sum=parseFloat(trafficSumMoney==null?0:trafficSumMoney)+parseFloat(routinesSumMoney==null?0:routinesSumMoney)+
				parseFloat(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
					document.getElementsByClassName("travelAllowance")[0].innerHTML);
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(sum.toFixed(2)));
			$("#sumXMenoy").html(sum.toFixed(2));
		}
	}else if (routinesLength==trafficLength){
		for(var i=0;i<trafficLength;i++){
			//交通工具下拉框
			var vehicleType="vehicle_type";
			var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
			var vehicleTypeValue="";
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(traffics[i].vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(traffics[i].chcekMoney==null){
				traffics[i].chcekMoney="";
			}
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			if(i==0){
				travelAllowance=account.travelAllowance;
				travelDays=account.travelDays;
			}
			var expTtemValue="";
			var expItemType="exp_item";
			var expItemOptionsArrayJson=getOptionsByType(expItemType);
			for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
				if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
					expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
					break;
				}
			}
			
			var tr="<tr>" +
						"<td>"+dateToMonthAndDay(traffics[i].expStartDatetime)+"</td>" +
						"<td>"+traffics[i].expStartSite+"</td>" +
						"<td>"+dateToMonthAndDay(traffics[i].expEndDatetime)+"</td>" +
						"<td>"+traffics[i].expEndSite+"</td>" +
						"<td>"+vehicleTypeValue+"</td>" +
						"<td class='trafficsMoney'>"+traffics[i].accDetMoney+"</td>" +
						"<td>"+traffics[i].chcekMoney+"</td>" +
						"<td class='travelDays'>"+travelDays+"</td>" +
						"<td class='travelAllowance'>"+travelAllowance+"</td>" +
						"<td>"+expTtemValue+"</td>" +
						"<td class='routinesMoney'>"+routines[i].accDetMoney+"</td>" +
						"<td></td>" +
						"<td></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}

		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney=0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				trafficSumMoney+=parseFloat(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(trafficSumMoney);
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney=0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML !=""){
				routinesSumMoney+=parseFloat(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(routinesSumMoney);
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var sum=parseFloat(trafficSumMoney==""?0:trafficSumMoney)+parseFloat(routinesSumMoney==""?0:routinesSumMoney)+
				parseFloat(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
					document.getElementsByClassName("travelAllowance")[0].innerHTML);
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(sum.toFixed(2)));
			$("#sumXMenoy").html(sum.toFixed(2));
		}
	}
	if(account.checkUserid != null){
		getUserName(account.checkUserid).done(function(name){
			$("#checkUseridCL").html(name);
		});
	}
	if(account.checkUseridTwo != null){
		getUserName(account.checkUseridTwo).done(function(name){
			$("#checkUseridTwoCL").html(name);
		});
	}
	if(account.doubleCheckUserid != null){
		getUserName(account.doubleCheckUserid).done(function(name){
			$("#doubleCheckUseridCL").html(name);
		});
	}
	
}
function dateToMonthAndDay(date){
	if(date!="" && date!=null && date.length>0){
		var d=new Date(date);
		var mon=d.getMonth()+1; //获取当前月份
		var da=d.getDate(); //获取当前日
		return mon.toString()+"月"+da.toString()+"日";
	}else{
		return "";
	}
}
 *//**
 * 金额转大写
 * @param money
 * @returns
 *//*
function numToCny(money){     
	//汉字的数字
	  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	  //基本单位
	  var cnIntRadice = new Array('', '拾', '佰', '仟');
	  //对应整数部分扩展单位
	  var cnIntUnits = new Array('', '万', '亿', '兆');
	  //对应小数部分单位
	  var cnDecUnits = new Array('角', '分', '毫', '厘');
	  //整数金额时后面跟的字符
	  var cnInteger = '整';
	  //整型完以后的单位
	  var cnIntLast = '元';
	  //最大处理的数字
	  var maxNum = 999999999999999.9999;
	  //金额整数部分
	  var integerNum;
	  //金额小数部分
	  var decimalNum;
	  //输出的中文金额字符串
	  var chineseStr = '';
	  //分离金额后用的数组，预定义
	  var parts;
	  if (money == '') { return ''; }
	  money = parseFloat(money);
	  if (money >= maxNum) {
	    //超出最大处理数字
	    return '';
	  }
	  if (money == 0) {
	    chineseStr = cnNums[0] + cnIntLast + cnInteger;
	    return chineseStr;
	  }
	  //转换为字符串
	  money = money.toString();
	  if (money.indexOf('.') == -1) {
	    integerNum = money;
	    decimalNum = '';
	  } else {
	    parts = money.split('.');
	    integerNum = parts[0];
	    decimalNum = parts[1].substr(0, 4);
	  }
	  //获取整型部分转换
	  if (parseInt(integerNum, 10) > 0) {
	    var zeroCount = 0;
	    var IntLen = integerNum.length;
	    for (var i = 0; i < IntLen; i++) {
	      var n = integerNum.substr(i, 1);
	      var p = IntLen - i - 1;
	      var q = p / 4;
	      var m = p % 4;
	      if (n == '0') {
	        zeroCount++;
	      } else {
	        if (zeroCount > 0) {
	          chineseStr += cnNums[0];
	        }
	        //归零
	        zeroCount = 0;
	        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	      }
	      if (m == 0 && zeroCount < 4) {
	        chineseStr += cnIntUnits[q];
	      }
	    }
	    chineseStr += cnIntLast;
	  }
	  //小数部分
	  if (decimalNum != '') {
	    var decLen = decimalNum.length;
	    for (var i = 0; i < decLen; i++) {
	      var n = decimalNum.substr(i, 1);
	      if (n != '0') {
	        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
	      }
	    }
	  }
	  if (chineseStr == '') {
	    chineseStr += cnNums[0] + cnIntLast + cnInteger;
	  } else if (decimalNum == '') {
	    chineseStr += cnInteger;
	  }
	  return chineseStr;
}       

var CreatedOKLodop7766=null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop(){
  try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ((verFF[0]>= 42)||(x64!==null)) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=42) return true;
		};
	};
      return false;
  } catch(err) {return true;};
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
	var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
	var oscript = document.createElement("script");
	oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
	head.insertBefore( oscript,head.firstChild );

	//引用双端口(8000和18000）避免其中某个被占用：
	oscript = document.createElement("script");
	oscript.src ="http://localhost:18000/CLodopfuncs.js?priority=0";
	head.insertBefore( oscript,head.firstChild );
};

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT,oEMBED){
  var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a style='color:red;' href='../../../lodop/install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a style='color:red;' href='../../../lodop/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a style='color:red;' href='../../../lodop/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a style='color:red;' href='../../../lodop/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtmFireFox="<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
  var strHtmChrome="<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
  var strCLodopInstall="<br><font color='#FF00FF'>打印服务未安装启动!点击<a style='color:red;' href='../../../lodop/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
  var strCLodopUpdate="<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='../../../lodop/CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
  var LODOP;
  try{
      var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
      if (needCLodop()) {
          try{ LODOP=getCLodop();} catch(err) {};
	    if (!LODOP && document.readyState!=="complete") {alert("C-Lodop没准备好，请稍后再试！"); return;};
          if (!LODOP) {
		 if (isIE) document.write(strCLodopInstall); else
		 document.documentElement.innerHTML=strCLodopInstall+document.documentElement.innerHTML;
               return;
          } else {

	         if (CLODOP.CVERSION<"2.1.3.0") { 
			if (isIE) document.write(strCLodopUpdate); else
			document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML;
		 };
		 if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
		 if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);	
	    };
      } else {
          var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
          //=====如果页面有Lodop就直接使用，没有则新建:==========
          if (oOBJECT!=undefined || oEMBED!=undefined) {
              if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
          } else if (CreatedOKLodop7766==null){
              LODOP=document.createElement("object");
              LODOP.setAttribute("width",0);
              LODOP.setAttribute("height",0);
              LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
              if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
              else LODOP.setAttribute("type","application/x-print-lodop");
              document.documentElement.appendChild(LODOP);
              CreatedOKLodop7766=LODOP;
           } else LODOP=CreatedOKLodop7766;
          //=====Lodop插件未安装时提示下载地址:==========
          if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
               if (navigator.userAgent.indexOf('Chrome')>=0)
                   document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
               if (navigator.userAgent.indexOf('Firefox')>=0)
                   document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
               if (is64IE) document.write(strHtm64_Install); else
               if (isIE)   document.write(strHtmInstall);    else
                   document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
               return LODOP;
          };
      };
      if (LODOP.VERSION<"6.2.1.8") {
          if (!needCLodop()){
          	if (is64IE) document.write(strHtm64_Update); else
          	if (isIE) document.write(strHtmUpdate); else
          	document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML;
	    };
          return LODOP;
      };
      //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

      //===========================================================
      return LODOP;
  } catch(err) {alert("getLodop出错:"+err);};
};*/






/**
 * 编辑-报销单表js
 */

var v="";

var vm = new Vue({
	el:'#eway',
	data: {
		expenseAccount: {
			expAccId: 0,
			expAccType:null
		}
	},
	methods : {
		setForm: function() {
			//获取报销单和明细表单信息
			var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId));//listAccountAndDetailed(vm.expenseAccount.expAccId);
			if(data.account.expAccType==1){
				vm.expenseAccount.expAccType=1;
				$("#trafficTable").css('display','');
				$("#routineTable").css('display','none');
				v=setTrafficAndRoutine(data.account,data.traffic,data.routine);
			}else{
				vm.expenseAccount.expAccType=2;
				$("#trafficTable").css('display','none');
				$("#routineTable").css('display','');
				v=setAcountAndRoutine(data.account,data.routine)
			}
		},acceptClick:function(){
			if(vm.expenseAccount.expAccType==1){
				var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId));
				var tableData=$("#tableData");
				var traBottom=$("#traBottom");
				var checkName = "";
				var checkNameTwo = "";
				if(data.account.checkName != null){
					checkName = data.account.checkName;
				}
				if(data.account.checkNameTwo != null){
					checkNameTwo = data.account.checkNameTwo;
				}
				$("#print").append(tableData);
				$("#print").append(traBottom);
				var headstr = "<html><head>" +
							"<style>" +
								"table{margin-left:5%;width:95%;} " +
								"td{height:30%;} " +
								"p{font-size: 25px; font-weight: bold; text-align:center;} " +
								"p2{font-size: 12px; padding-left:7%;} " +
								"p3{font-size: 12px;text-decoration:underline;}" +
								"p5{text-align: right; float: right;}" +
								"</style>" +
							"<title>打印报销单</title>" +
							"</head><body><br/><br/>" +
							"<div style="+"margin-bottom:10px; "+"><p>差旅费报销单</p><br/>" +
							"<p2>部门&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p2>" +
							"<p3>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+getDeptName()+"&nbsp;&nbsp;&nbsp;&nbsp;"+"</p3>" +
							"<p4>&nbsp;&nbsp;&nbsp;&nbsp;出差事由&nbsp;:&nbsp;项目研发</p4>" +
							"<p5>&nbsp;&nbsp;&nbsp;&nbsp;"+dateToYMD(v.expAccDatetime)[0]+"&nbsp;年&nbsp;"+""+dateToYMD(v.expAccDatetime)[1]+"&nbsp;月&nbsp;"+""+dateToYMD(v.expAccDatetime)[2]+"&nbsp;日&nbsp;"+"</p5><br/></div>";
				var footstr = "<div style="+"margin-top:10px;"+"><p2>主管</p2><p2 style="+"margin-left:1%;font-size:10px;"+">"+checkName+"</p2> " +
							"<p2 style="+"margin-left:1%"+">CFO</p2><p2 style="+"margin-left:1%;font-size:10px;"+">"+checkNameTwo+"</p2> " +
							"<p2 style="+"margin-left:1%"+">财务</p2><p2 style="+"margin-left:1%;font-size:10px;"+"></p2>  " +
							"<p2 style="+"margin-left:1%"+">领款人</p2></div>" +
							"<div style='position:absolute;width:100%;height:1px;color:red;border-bottom: 1px solid #f00;top:415px;align:center'></div></body>";
				var newstr = document.getElementById("printDiv").innerHTML;
				var oldstr = document.body.innerHTML;
				document.body.innerHTML = headstr+newstr+footstr;
				setTimeout(function(){
					dialogClose();
				}, 200);
				window.print(); 
				document.body.innerHTML = oldstr;
			}else{
				var data=JSON.parse(listAccountAndDetailed(vm.expenseAccount.expAccId));
				var routineTaleData=$("#routineTaleData");
				var bottom=$("#bottom");
				var checkName = "";
				var checkNameTwo = "";
				if(data.account.checkName != null){
					checkName = data.account.checkName;
				}
				if(data.account.checkNameTwo != null){
					checkNameTwo = data.account.checkNameTwo;
				}
				$("#print").append(routineTaleData);
				$("#print").append(bottom);
				var headstr = "<html><head>" +
							"<style>table{margin-left:5%;width:95%;} " +
							"table{margin-left:5%;width:95%;} " +
							"td{height:30%;} " +
							"p{font-size: 25px; font-weight: bold; text-align:center;} " +
							"p2{font-size: 12px; padding-left:7%;} " +
							"p3{font-size: 12px;text-decoration:underline;}" +
							"p5{text-align: right; float: right;}" +
							"</style>" +
							"<title>打印报销单</title></head><body><br/><br/><br/>";
				var footstr = "<div style="+"margin-top:10px;"+"><p2>主管</p2><p2 style="+"margin-left:1%;font-size:10px;"+">"+checkName+"</p2> " +
								"<p2 style="+"margin-left:1%"+">CFO</p2><p2 style="+"margin-left:1%;font-size:10px;"+">"+checkNameTwo+"</p2> " +
								"<p2 style="+"margin-left:1%"+">财务</p2><p2 style="+"margin-left:1%;font-size:10px;"+"></p2>  " +
								"<p2 style="+"margin-left:1%"+">领款人</p2></div>" +
								"<div style='position:absolute;width:100%;height:1px;color:red;border-bottom: 1px solid #f00;top:415px;align:center'></div></body>";
				var newstr = document.getElementById("printDiv").innerHTML;
				var oldstr = document.body.innerHTML;
				document.body.innerHTML = headstr+newstr+footstr;
				setTimeout(function(){
					dialogClose();
				}, 200);
				window.print(); 
				document.body.innerHTML = oldstr;
			}
		}
	}
});

function formatMoney (val) {
	var result = '',
		counter = 0,
		num = (val || 0).toString();
    if(val === parseInt(val)) {
    	for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!(counter % 3) && i != 0) { result = ',' + result; }
        }
    	result = result+'.00';
	} else {
		var f = num.split('.')[1];
		num = num.split('.')[0];
		for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!((counter) % 3) && i != 0) { result = ',' + result; }
        }
		if(!f){
			return result;
		}
		if (f.length <2) {
			f = f+'0';
		} else if (f.length > 2) {
			f = f.slice(0, 2);
		}
		result = result+'.'+f;
	}
    
    return result;
}
function deFormatMoney (val) {
	var res = val.split(',');
	res = res.join('');
	return parseFloat(res);
}

function dateToYMD(date){
	var result=[];
	if(date!="" ||date!=null ||date.length>0){
		var d=new Date(date);
		var year=d.getFullYear(); //获取当前年份
		var mon=d.getMonth()+1; //获取当前月份
		if(mon <=9){           
			mon = "0" + mon;
		}
		var da=d.getDate(); //获取当前日
		if(da <=9){
			da = "0" + da;
		}
		result[0]=year;
		result[1]=mon;
		result[2]=da;
		return result;
	}else{
		return null;
	}
}
function setAcountAndRoutine(account,routine){
	$("#rountineDeptId").html(getDeptName());
	if(dateToYMD(account.expAccDatetime)!=null){
		$("#rountineYear").html(dateToYMD(account.expAccDatetime)[0]+"年");
		$("#rountineMonth").html(dateToYMD(account.expAccDatetime)[1]+"月");
		$("#rountineDay").html(dateToYMD(account.expAccDatetime)[2]+"日");
	}
	//申报人
	getUserName(account.expAccUserid).done(function(name){
		$("#userName").html(name);
	});
	for(var i=0;i<routine.length;i++){
		//报销项目
		var expItemType="exp_item";
		var expItemOptionsArrayJson=getOptionsByType(expItemType);
		var expTtemValue="";
		for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
			if(expItemOptionsArrayJson[expItemTypeI].value==routine[i].expItem){
				expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
				break;
			}
		}
		if(routine[i].chcekMoney==null){
			routine[i].chcekMoney="";
		}
		var accDetMoney = "";
		var chcekMoney = "";
		if(routine[i].accDetMoney != null){
			accDetMoney = formatMoney(routine[i].accDetMoney);
		}
		var tr="<tr>" +
					"<td colspan='2' width='80px' style='font-size: 8px'>"+expTtemValue+"</td>" +
					"<td colspan='10' style='font-size: 8px'>"+routine[i].expAbstract+"</td>" +
					"<td class='rountineAccDetMoney' style='font-size: 8px; text-align: right;'>"+accDetMoney+"</td>" +
					"<td style='font-size: 8px; text-align: right;'>"+routine[i].chcekMoney+"</td>" +
				"</tr>";
		$("#routineTaleData").append(tr);
		
		//交通总和
		var list=document.getElementsByClassName("rountineAccDetMoney");
		var rountineAccDetMoneySum=0;
		for(var y=0;y<list.length;y++){
			if(list[y].innerHTML !=""){
				rountineAccDetMoneySum+=parseFloat(list[y].innerHTML);
			}
		}
		$("#rountineAccDetMoneySum").html(formatMoney(rountineAccDetMoneySum));
		$("#rountineSumAll").html("人民币（大写）："+numToCny(formatMoney(rountineAccDetMoneySum)));
	}
	for (var j=0;j<(10-routine.length);j++) {
		var tr="<tr>" +
				"<td colspan='2' width='80px' style='font-size: 8px'>&nbsp;</td>" +
				"<td colspan='10' style='font-size: 8px'></td>" +
				"<td class='rountineAccDetMoney' style='font-size: 8px'></td>" +
				"<td style='font-size: 8px'></td>" +
				"</tr>";
			$("#routineTaleData").append(tr);
	}
	if(account.checkUserid != null){
		getUserName(account.checkUserid).done(function(name){
			$("#checkUserid").html(name);
		});
	}
	if(account.checkUseridTwo != null){
		getUserName(account.checkUseridTwo).done(function(name){
			$("#checkUseridTwo").html(name);
		});
	}
	if(account.doubleCheckUserid != null){
		getUserName(account.doubleCheckUserid).done(function(name){
			$("#doubleCheckUserid").html(name);
		});
	}
}
function setTrafficAndRoutine(account,traffics,routines){
	 
	//设置项目
	var proOptionsArrayJson=getPro();
	for(var proOptionsI=proOptionsArrayJson.length-1;proOptionsI>=0;proOptionsI--){
		if(account.proId==proOptionsArrayJson[proOptionsI].proId){
			$("#proId").html(proOptionsArrayJson[proOptionsI].proNumber+"&nbsp;"+proOptionsArrayJson[proOptionsI].proName);
			break;
		}
	}
	$("#depName").html(getDeptName());
	if(dateToYMD(account.expAccDatetime)!=null){
		$("#year").html(dateToYMD(account.expAccDatetime)[0]+"年");
		$("#month").html(dateToYMD(account.expAccDatetime)[1]+"月");
		$("#day").html(dateToYMD(account.expAccDatetime)[2]+"日");
	}
	//申报人
	getUserName(account.expAccUserid).done(function(name){
		$("#tfaUserName").html(name);
	});
	var trafficLength=0;
	var routinesLength=0;
	if(traffics!=null){trafficLength=traffics.length;}
	if(routines!=null){routinesLength=routines.length;}
	if(trafficLength>routinesLength){
		for(var i=0;i<trafficLength;i++){
			//交通工具下拉框
			var vehicleType="vehicle_type";
			var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
			var vehicleTypeValue="";
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(traffics[i].vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(traffics[i].chcekMoney==null){
				traffics[i].chcekMoney="&nbsp;";
			}
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			if(i==0){
				travelAllowance=account.travelAllowance;
				travelDays=account.travelDays;
			}
			//日常
			//报销项
			var expTtemValue="";
			//报销金额
			var accDetMoney="";
			//审核金额
			var chcekMoney="";
			if(i<routinesLength){
				if(routines!=null){
					//报销项目
					var expItemType="exp_item";
					var expItemOptionsArrayJson=getOptionsByType(expItemType);
					for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
						if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
							expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
							break;
						}
					}
					accDetMoney=formatMoney(routines[i].accDetMoney);
					chcekMoney=routines[i].chcekMoney;
					if(chcekMoney = "null"){
						chcekMoney = "";
					}
				}
			}
			var trafficsAccDetMoney ="";
			var travelAllowances = "";
			if(traffics[i].accDetMoney != null){
				trafficsAccDetMoney = formatMoney(traffics[i].accDetMoney);
			}
			if(travelAllowance != null && travelAllowance != ''){
				travelAllowances = formatMoney(travelAllowance);
			}
			var tr="<tr>" +
					"<td style='font-size: 8px'>"+dateToMonthAndDay(traffics[i].expStartDatetime)+"</td>" +
					"<td style='font-size: 8px'>"+traffics[i].expStartSite+"</td>" +
					"<td style='font-size: 8px'>"+dateToMonthAndDay(traffics[i].expEndDatetime)+"</td>" +
					"<td style='font-size: 8px'>"+traffics[i].expEndSite+"</td>" +
					"<td style='font-size: 8px'>"+vehicleTypeValue+"</td>" +
					"<td class='trafficsMoney' style='font-size: 8px; text-align: right;'>"+trafficsAccDetMoney+"</td>" +
					"<td style='font-size: 8px; text-align: right;'>"+traffics[i].chcekMoney+"</td>" +
					"<td class='travelDays' style='font-size: 8px'>"+travelDays+"</td>" +
					"<td class='travelAllowance' style='font-size: 8px; text-align: right;'>"+travelAllowances+"</td>" +
					"<td style='font-size: 8px'>"+expTtemValue+"</td>" +
					"<td class='routinesMoney' style='font-size: 8px; text-align: right;'>"+accDetMoney+"</td>" +
					"<td style='font-size: 8px; text-align: right;'>"+chcekMoney+"</td>" +
					"<td style='font-size: 8px'></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}
		
		for (var j=0;j<(10-trafficLength);j++) {
			var tr="<tr>" +
				"<td style='font-size: 8px'> &nbsp;</td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='trafficsMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='travelDays' style='font-size: 8px'> </td>" +
				"<td class='travelAllowance' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='routinesMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'></td>" +
				"</tr>";
				$("#tableData").append(tr);
		}
		
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney= 0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML && parseFloat(list[i].innerHTML)){
				trafficSumMoney+=deFormatMoney(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(formatMoney(trafficSumMoney));
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney= 0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML && parseFloat(list1[i].innerHTML)){
				routinesSumMoney+=deFormatMoney(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(formatMoney(routinesSumMoney));
		
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		trafficSumMoney == parseFloat(trafficSumMoney);
		routinesSumMoney == parseFloat(routinesSumMoney);
		var travelAllowance = parseFloat(deFormatMoney(document.getElementsByClassName("travelAllowance")[0].innerHTML));
		
		var sum = 0;
		if (trafficSumMoney) {
			sum += trafficSumMoney;
		}
		if (routinesSumMoney) {
			sum += routinesSumMoney;
		}
		if (travelAllowance) {
			sum += travelAllowance;
		}
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(formatMoney(sum)));
			$("#sumXMenoy").html(formatMoney(sum));
		}
	}else if(routinesLength>trafficLength){
		for(var i=0;i<routinesLength;i++){
			var expTtemValue="";
			var expItemType="exp_item";
			var expItemOptionsArrayJson=getOptionsByType(expItemType);
			for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
				if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
					expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
					break;
				}
			}
			var expStartDatetime="";
			var expStartSite="";
			var expEndDatetime="";
			var expEndSite="";
			var vehicleTypeValue="";
			var accDetMoney="";
			var chcekMoney="";
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			var vehicleType="";
			if(i==0){
				travelAllowance=formatMoney(account.travelAllowance==null?"":account.travelAllowance);
				travelDays=account.travelDays==null?"":account.travelDays;
			}
			if(i<trafficLength){
				if(traffics!=null){
					expStartDatetime=traffics[i].expStartDatetime;
					expStartSite=traffics[i].expStartSite;
					expEndDatetime=traffics[i].expEndDatetime;
					expEndSite=traffics[i].expEndSite;
					vehicleType=traffics[i].vehicleType;
					accDetMoney=formatMoney(traffics[i].accDetMoney);
					chcekMoney=traffics[i].chcekMoney;
				}
			}		
			var vehicleOptionsArrayJson=getOptionsByType("vehicle_type");
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(chcekMoney == null){
				chcekMoney = "";
			}
			var tr="<tr>" +
						"<td style='font-size: 8px'>"+dateToMonthAndDay(expStartDatetime)+"</td>" +
						"<td style='font-size: 8px'>"+expStartSite+"</td>" +
						"<td style='font-size: 8px'>"+dateToMonthAndDay(expEndDatetime)+"</td>" +
						"<td style='font-size: 8px'>"+expEndSite+"</td>" +
						"<td style='font-size: 8px'>"+vehicleTypeValue+"</td>" +
						"<td class='trafficsMoney' style='font-size: 8px; text-align: right;'>"+accDetMoney+"</td>" +
						"<td style='font-size: 8px; text-align: right;'>"+chcekMoney+"</td>" +
						"<td class='travelDays' style='font-size: 8px'>"+travelDays+"</td>" +
						"<td class='travelAllowance style='font-size: 8px; text-align: right;''>"+travelAllowance+"</td>" +
						"<td style='font-size: 8px'>"+expTtemValue+"</td>" +
						"<td class='routinesMoney' style='font-size: 8px; text-align: right;'>"+formatMoney(routines[i].accDetMoney)+"</td>" +
						"<td style='font-size: 8px; text-align: right;'>"+chcekMoney+"</td>"+
						"<td style='font-size: 8px'></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}
		for (var j=0;j<(10-routinesLength);j++) {
			var tr="<tr>" +
				"<td style='font-size: 8px'> &nbsp;</td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='trafficsMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='travelDays' style='font-size: 8px'> </td>" +
				"<td class='travelAllowance' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='routinesMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'></td>" +
				"</tr>";
				$("#tableData").append(tr);
		}
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney=0;
		for(var k=0;k<list.length;k++){
			if(list[k].innerHTML && parseFloat(list[k].innerHTML)){
				trafficSumMoney+=deFormatMoney(list[k].innerHTML);
			}
		}
		$("#trafficSumMoney").html(formatMoney(trafficSumMoney));
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney=0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML && parseFloat(list1[i].innerHTML)){
				routinesSumMoney+=deFormatMoney(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(formatMoney(routinesSumMoney==0?"":routinesSumMoney));
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var trafficSumMoney = trafficSumMoney==null?0:trafficSumMoney;
		var routinesSumMoney = (routinesSumMoney==null?0:routinesSumMoney);
		var rest = deFormatMoney(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
			document.getElementsByClassName("travelAllowance")[0].innerHTML);
		var sum= trafficSumMoney + routinesSumMoney + rest;
		
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(formatMoney(sum)));
			$("#sumXMenoy").html(formatMoney(sum));
		}
	}else if(routinesLength==trafficLength && routinesLength==0){
		//补差天数和补贴金额
		var travelAllowance="";
		var travelDays="";
		travelAllowance=account.travelAllowance;
		travelDays=account.travelDays;
		var tr="<tr>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td></td>" +
					"<td class='trafficsMoney' style='font-size: 8px'></td>" +
					"<td></td>" +
					"<td class='travelDays' style='font-size: 8px'>"+travelDays+"</td>" +
					"<td class='travelAllowance' style='font-size: 8px'>"+travelAllowance+"</td>" +
					"<td></td>" +
					"<td class='routinesMoney' style='font-size: 8px'></td>" +
					"<td></td>" +
					"<td></td>" +
				"</tr>";
		$("#tableData").append(tr);
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				trafficSumMoney+=parseFloat(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(trafficSumMoney);
		for (var j=0;j<(10-list.length);j++) {
			var tr="<tr>" +
				"<td style='font-size: 8px'> &nbsp;</td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='trafficsMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='travelDays' style='font-size: 8px'> </td>" +
				"<td class='travelAllowance' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='routinesMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'></td>" +
				"</tr>";
				$("#tableData").append(tr);
		}
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML !=""){
				routinesSumMoney+=parseFloat(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(routinesSumMoney);
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		var sum=parseFloat(trafficSumMoney==null?0:trafficSumMoney)+parseFloat(routinesSumMoney==null?0:routinesSumMoney)+
				parseFloat(document.getElementsByClassName("travelAllowance")[0].innerHTML==""?0:
					document.getElementsByClassName("travelAllowance")[0].innerHTML);
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(formatMoney(sum)));
			$("#sumXMenoy").html(formatMoney(sum));
		}
	}else if (routinesLength==trafficLength){
		for(var i=0;i<trafficLength;i++){
			//交通工具下拉框
			var vehicleType="vehicle_type";
			var vehicleOptionsArrayJson=getOptionsByType(vehicleType);
			var vehicleTypeValue="";
			for(var vehicleTypeI=vehicleOptionsArrayJson.length-1;vehicleTypeI>=0;vehicleTypeI--){
				if(traffics[i].vehicleType==vehicleOptionsArrayJson[vehicleTypeI].value){
					vehicleTypeValue=vehicleOptionsArrayJson[vehicleTypeI].label;
					break;
				}
			}
			if(traffics[i].chcekMoney==null){
				traffics[i].chcekMoney="";
			}
			//补差天数和补贴金额
			var travelAllowance="";
			var travelDays="";
			if(i==0){
				travelAllowance=account.travelAllowance;
				travelDays=account.travelDays;
			}
			var expTtemValue="";
			var expItemType="exp_item";
			var expItemOptionsArrayJson=getOptionsByType(expItemType);
			for(var expItemTypeI=expItemOptionsArrayJson.length-1;expItemTypeI>=0;expItemTypeI--){
				if(expItemOptionsArrayJson[expItemTypeI].value==routines[i].expItem){
					expTtemValue=expItemOptionsArrayJson[expItemTypeI].label;
					break;
				}
			}
			
			var trafficsAccDetMoney ="";
			var travelAllowances = "";
			if(traffics[i].accDetMoney != null){
				trafficsAccDetMoney = formatMoney(traffics[i].accDetMoney);
			}
			if(travelAllowance != null && travelAllowance != ''){
				travelAllowances = formatMoney(travelAllowance);
			}
			
			var tr="<tr>" +
						"<td>"+dateToMonthAndDay(traffics[i].expStartDatetime)+"</td>" +
						"<td>"+traffics[i].expStartSite+"</td>" +
						"<td>"+dateToMonthAndDay(traffics[i].expEndDatetime)+"</td>" +
						"<td>"+traffics[i].expEndSite+"</td>" +
						"<td>"+vehicleTypeValue+"</td>" +
						"<td class='trafficsMoney'>"+trafficsAccDetMoney+"</td>" +
						"<td>"+traffics[i].chcekMoney+"</td>" +
						"<td class='travelDays'>"+travelDays+"</td>" +
						"<td class='travelAllowance'>"+travelAllowances+"</td>" +
						"<td>"+expTtemValue+"</td>" +
						"<td class='routinesMoney'>"+formatMoney(routines[i].accDetMoney)+"</td>" +
						"<td></td>" +
						"<td></td>" +
					"</tr>";
			$("#tableData").append(tr);
		}
		
		for (var j=0;j<(10-trafficLength);j++) {
			var tr="<tr>" +
				"<td style='font-size: 8px'> &nbsp;</td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='trafficsMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='travelDays' style='font-size: 8px'> </td>" +
				"<td class='travelAllowance' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td class='routinesMoney' style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'> </td>" +
				"<td style='font-size: 8px'></td>" +
				"</tr>";
				$("#tableData").append(tr);
		}
		
		//交通总和
		var list=document.getElementsByClassName("trafficsMoney");
		var trafficSumMoney=0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML && parseFloat(list[i].innerHTML)){
				trafficSumMoney+=deFormatMoney(list[i].innerHTML);
			}
		}
		$("#trafficSumMoney").html(formatMoney(trafficSumMoney));
		
		//其他总和
		var list1=document.getElementsByClassName("routinesMoney");
		var routinesSumMoney=0;
		for(var i=0;i<list1.length;i++){
			if(list1[i].innerHTML && parseFloat(list1[i].innerHTML)){
				routinesSumMoney+=deFormatMoney(list1[i].innerHTML);
			}
		}
		$("#routinesSumMoney").html(formatMoney(routinesSumMoney));
		//补差天数
		$("#daySum").html(document.getElementsByClassName("travelDays")[0].innerHTML);
		//补差金额
		$("#travelAllowanceSumMoney").html(document.getElementsByClassName("travelAllowance")[0].innerHTML);
		//总金额
		trafficSumMoney == parseFloat(trafficSumMoney);
		routinesSumMoney == parseFloat(routinesSumMoney);
		var travelAllowance = parseFloat(deFormatMoney(document.getElementsByClassName("travelAllowance")[0].innerHTML));
		var sum = 0;
		if (trafficSumMoney) {
			sum += trafficSumMoney;
		}
		if (routinesSumMoney) {
			sum += routinesSumMoney;
		}
		if (travelAllowance) {
			sum += travelAllowance;
		}
		if(sum>0){
			$("#sumALlMoney").html("人民币（大写）："+numToCny(formatMoney(sum)));
			$("#sumXMenoy").html(formatMoney(sum));
		}
	}
	if(account.checkUserid != null){
		getUserName(account.checkUserid).done(function(name){
			$("#checkUseridCL").html(name);
		});
	}
	if(account.checkUseridTwo != null){
		getUserName(account.checkUseridTwo).done(function(name){
			$("#checkUseridTwoCL").html(name);
		});
	}
	if(account.doubleCheckUserid != null){
		getUserName(account.doubleCheckUserid).done(function(name){
			$("#doubleCheckUseridCL").html(name);
		});
	}
	
	
	return account;
	
}

function dateToMonthAndDay(date){
	if(date!="" && date!=null && date.length>0){
		var d=new Date(date);
		var mon=d.getMonth()+1; //获取当前月份
		var da=d.getDate(); //获取当前日
		return mon.toString()+"月"+da.toString()+"日";
	}else{
		return "";
	}
}
/**
 * 金额转大写
 * @param money
 * @returns
 */
function numToCny(money){     
	//汉字的数字
	  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	  //基本单位
	  var cnIntRadice = new Array('', '拾', '佰', '仟');
	  //对应整数部分扩展单位
	  var cnIntUnits = new Array('', '万', '亿', '兆');
	  //对应小数部分单位
	  var cnDecUnits = new Array('角', '分', '毫', '厘');
	  //整数金额时后面跟的字符
	  var cnInteger = '整';
	  //整型完以后的单位
	  var cnIntLast = '元';
	  //最大处理的数字
	  var maxNum = 999999999999999.9999;
	  //金额整数部分
	  var integerNum;
	  //金额小数部分
	  var decimalNum;
	  //输出的中文金额字符串
	  var chineseStr = '';
	  //分离金额后用的数组，预定义
	  var parts;
	  if (money == '') { return ''; }
	  money = money.split(',').join('');
	  money = parseFloat(money);
	  if (money >= maxNum) {
	    //超出最大处理数字
	    return '';
	  }
	  if (money == 0) {
	    chineseStr = cnNums[0] + cnIntLast + cnInteger;
	    return chineseStr;
	  }
	  //转换为字符串
	  money = money.toString();
	  if (money.indexOf('.') == -1) {
	    integerNum = money;
	    decimalNum = '';
	  } else {
	    parts = money.split('.');
	    integerNum = parts[0];
	    decimalNum = parts[1].substr(0, 4);
	  }
	  //获取整型部分转换
	  if (parseInt(integerNum, 10) > 0) {
	    var zeroCount = 0;
	    var IntLen = integerNum.length;
	    for (var i = 0; i < IntLen; i++) {
	      var n = integerNum.substr(i, 1);
	      var p = IntLen - i - 1;
	      var q = p / 4;
	      var m = p % 4;
	      if (n == '0') {
	        zeroCount++;
	      } else {
	        if (zeroCount > 0) {
	          chineseStr += cnNums[0];
	        }
	        //归零
	        zeroCount = 0;
	        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	      }
	      if (m == 0 && zeroCount < 4) {
	        chineseStr += cnIntUnits[q];
	      }
	    }
	    chineseStr += cnIntLast;
	  }
	  //小数部分
	  if (decimalNum != '') {
	    var decLen = decimalNum.length;
	    for (var i = 0; i < decLen; i++) {
	      var n = decimalNum.substr(i, 1);
	      if (n != '0') {
	        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
	      }
	    }
	  }
	  if (chineseStr == '') {
	    chineseStr += cnNums[0] + cnIntLast + cnInteger;
	  } else if (decimalNum == '') {
	    chineseStr += cnInteger;
	  }
	  return chineseStr;
} 

/**
 * 获取表单初始化所有的值
 * @param id 报销单号
 * @returns
 */
function listAccountAndDetailed(id){
	var result=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/listAccountAndDetailed',
		data:{id:vm.expenseAccount.expAccId},
		async: false ,
		success: function (json) {
			if(json.code==0){
				result=json.data;
			}
		}
	});
	return result;
}



/**
 * 获取交通工具
 * @returns
 */
function getOptionsByType(type){
	var optionsArrayJson=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getOptions',
		data:{type:type},
		async: false ,
		success: function (json) {
			if(json.code==0){
				optionsArrayJson=json.data;
			}
		}
	});
	return optionsArrayJson;
}
/**
 * 获取当前用户参与的项目--proId为获取业务类型需要
 * @param proId
 * @returns
 */
function getPro(proId){
	var proArrayJson=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getPro',
		data:{proId:proId},
		async: false ,
		success: function (json) {
			if(json.code==0){
				proArrayJson=json.data;
			}
		}
	});
	return proArrayJson;
}
/**
 * 获取部门名称
 * @param deptId
 * @returns
 */
function getDeptName(){
	var result=null;
	$.ajax({
		type: "post",
		url : '../../api/exAccount/getDeptName',
		data:{},
		async: false ,
		success: function (json) {
			if(json.code==0){
				result=json.rows.depName;
			}
		}
	});
	return result;
}
/**
 * 获取当前用户姓名
 * @returns
 */
function getUserName(userId){
	var userName="";
	var dtd = $.Deferred();
	$.ajax({	
		type: "post",
		url : '../../api/sys/user/userInfo',
		data:{userId:userId},
		async: false ,
		success: function (json) {
			userName=json.userName;
			dtd.resolve(userName);
		}
	});
	return dtd;
}

