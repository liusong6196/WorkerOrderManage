/**
 * 报销单表js
 */

$(function () {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/exAccount/allList?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			params.type =2;
			params.reviewNum = "2";
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "expAccNo", title : "报销单号", width : "100px",align:"center"}, 
			{field : "expAccDatetime", title : "申报时间", width : "90px",align:"center",
				formatter:function(value,row,index){
					if(value!=null){
						// 转换日期格式
						value = value.replace(/-/g, '/'); 
						// 创建日期对象
						var date = new Date(value);
						value = date.getFullYear() + '-'
						// 因为js里month从0开始，所以要加1
						+ (parseInt(date.getMonth()) + 1) + '-'
						+ date.getDate();
					}
					return value;
				} 
			},
			{field : "userName", title : "申报人", width : "50px",align:"center",
				/*formatter:function(value,row,index){
					$.ajax({
						type: "post",
						url : '../../api/sys/user/userInfo',
						data:{userId:value},
						async: false ,
						success: function (json) {
							value=json.userName;
						}
					});
					return value;
				} */
			}, 
			{field : "proName", title : "关联项目", width : "300px",
				/*formatter : function(value, row, index) {
					$.ajax({
						type: "post",
						url : '../../api/pro/getProNameById',
						data:{id:value},
						async: false ,
						success: function (json) {
							if(json.code==0){
								value=json.rows.proName;
							}
						}
					});
					return value;
				} */
			},
			{field : "expAccType", title : "报销类型", width : "10px",align:"center",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": 
						return '差旅';
					case  "2": 
						return '日常';
					default: 
						return value;
					}
				} 
			},
			{field : "travelSite", title : "出差地", width : "10px",align:"center"}, 
			{field : "travelDays", title : "天数", width : "10px",align:"center"}, 
			{field : "travelAllowance", title : "补贴金额", width : "10px",align:"right"}, 
			{field : "num", title : "报销总金额", width : "100px",align:"right"}, 
			{field : "checkName", title : "审批人一", width : "50px",align:"center",
				/*formatter:function(value,row,index){
					$.ajax({
						type: "post",
						url : '../../api/sys/user/userInfo',
						data:{userId:value},
						async: false ,
						success: function (json) {
							value=json.userName;
						}
					});
					return value;
				} */
			}, 
			{field : "checkNameTwo", title : "审批人二", width : "50px",align:"center",
				/*formatter:function(value,row,index){
					$.ajax({
						type: "post",
						url : '../../api/sys/user/userInfo',
						data:{userId:value},
						async: false ,
						success: function (json) {
							value=json.userName;
						}
					});
					return value;
				} */
			}, 			
			{field : "doubleCheckName", title : "复核人", width : "50px",align:"center",
				/*formatter:function(value,row,index){
					$.ajax({
						type: "post",
						url : '../../api/sys/user/userInfo',
						data:{userId:value},
						async: false ,
						success: function (json) {
							value=json.userName;
						}
					});
					return value;
				}*/ 
			}, 
			{field : "doubleCheckMoney", title : "复核金额", width : "10px",align:"right"}, 
			{field : "expAccState", title : "报销状态", width : "10px",align:"center",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": 
						return '<span class="label label-default">待审批</span>';
					case  "2": 
						return '<span class="label label-info">审批通过</span>';
					case  "3": 
						return '<span class="label label-danger">审批不通过</span>';
					case  "4": 
						return '<span class="label label-success">已报销</span>';
					case  "5": 
						return '<span class="label label-success">审批中</span>';
					default: 
						return '<span class="label label-danger">'+value+'</span>';
					}
				}
			}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		check: function(){
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				var b =true;
				if(ck[0].expAccState!=2){
					b=false;
				}
				if(b){
					localStorage.expAccId = ck[0].expAccId;
					localStorage.sum = ck[0].num;
					window.location.href='checkAccount.html';
//					dialogOpen({
//						title: '复核报销单详细',
//						url: 'sys/checkExAccount/checkAccount.html?_' + $.now(),
//						width: '90%',
//						height:'80%',
//						success: function(iframeId){
//							top.frames[iframeId].vm.expenseAccount.expAccId = ck[0].expAccId;
//							top.frames[iframeId].vm.setForm();
//						},
//						yes: function(iframeId){
//							top.frames[iframeId].vm.acceptClick();
//						}
//					});
				}else{
					if(ck[0].expAccState==1){
						dialogMsg('该条信息未审批！');
					}else if(ck[0].expAccState==3){
						dialogMsg('该条信息审批未通过！');
					}else if(ck[0].expAccState==5){
						dialogMsg('该条信息未完成审批！');
					}else{
						dialogMsg('该条信息已复核！');
					}
				}
			}
		},find: function(){
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				localStorage.expAccId = ck[0].expAccId;
				window.location.href='find2.html';
//				dialogOpen({
//					title: '查看报销明细',
//					url: 'sys/expaccount/findAccount.html?_' + $.now(),
//					width: '90%',
//					height:'80%',
//					success: function(iframeId){
//						top.frames[iframeId].vm.expenseAccount.expAccId = ck[0].expAccId;
//						top.frames[iframeId].vm.setForm();
//					},
//					yes: function(iframeId){
//						top.frames[iframeId].vm.acceptClick();
//					}
//				});
			}
		},print:function(){
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '导出表格',
					url: 'sys/expaccount/print2.html?_' + $.now(),
					width: '90%',
					height:'85%',
					btn:['导出','取消'],
					success: function(iframeId){
						top.frames[iframeId].vm.expenseAccount.expAccId = ck[0].expAccId;
						top.frames[iframeId].vm.setForm();
						
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		}
	}
})