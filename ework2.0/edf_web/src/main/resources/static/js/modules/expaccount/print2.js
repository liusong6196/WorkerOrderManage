/**
 * 编辑-报销单表js
 */
var id = "";
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
				id = "trafficTable";
				vm.expenseAccount.expAccType=1;
				$("#trafficTable").css('display','');
				$("#routineTable").css('display','none');
				setTrafficAndRoutine(data.account,data.traffic,data.routine);
			}else{
				id = "routineTable";
				vm.expenseAccount.expAccType=2;
				$("#trafficTable").css('display','none');
				$("#routineTable").css('display','');
				setAcountAndRoutine(data.account,data.routine)
			}
		},acceptClick:function(){
			this.onexport(id);
		},onexport : function(id){
	   		var wb = XLSX.utils.table_to_book(document.getElementById(id));
	   		var wswch = [{wch:12},{wch:25},{wch:35},{wch:45},{wch:55},{wch:55},{wch:55},{wch:55},{wch:55}]
	   		wb['!cols'] = wswch;
	   		var wbout = XLSX.write(wb,{bookType: 'xlsx' , type: 'binary' });
	   		var iname = "";
	   		if(id == "trafficTable"){ 
	   			iname = "差旅报销单.xlsx" ;
	   		}else{ 
	   			iname = "日常报销单.xlsx" ;
	   		}
	   	
	   		saveAs(new Blob([this.s2ab(wbout)],{type: 'application/octet-stream'}),iname);
	   }, s2ab: function(s){
			if(typeof ArrayBuffer !== 'undefined' ){
				var buf = new ArrayBuffer(s.length);
				var view = new Uint8Array(buf);
				for(var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				return buf;
			}else{
				var buf = new ArrayBuffer(s.length);
				for(var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
				return buf;
			}		   
		}
	}	
});

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
					"<td colspan='6'>"+routine[i].expAbstract+"</td>" +
					"<td class='rountineAccDetMoney'>"+routine[i].accDetMoney+"</td>" +
					"<td>"+routine[i].chcekMoney+"</td>" +
				"</tr>";
		$("#routineTaleData").append(tr);
		//交通总和
		var list=document.getElementsByClassName("rountineAccDetMoney");
		var rountineAccDetMoneySum=0;
		for(var i=0;i<list.length;i++){
			if(list[i].innerHTML !=""){
				rountineAccDetMoneySum+=parseFloat(list[i].innerHTML);
			}
		}
		$("#rountineAccDetMoneySum").html(rountineAccDetMoneySum);
		$("#rountineSumAll").html("人民币（大写）："+numToCny(rountineAccDetMoneySum));
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
					vehicleTypeValue=traffics[i].vehicleTypeValue;
					accDetMoney=traffics[i].accDetMoney;
					chcekMoney=traffics[i].chcekMoney;
				}
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
