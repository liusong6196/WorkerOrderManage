/**
 * 项目表js
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
		url: '../../api/pro/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.proName = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "proNumber", title : "项目编号", width : "150px",align:"center"}, 
			{field : "proName", title : "项目名称", width : "300px"}, 
			{field : "userName", title : "项目经理", width : "100px",align:"center"}, 
			{field : "proDevelopmanagername", title : "开发负责人", width : "100px",align:"center"}, 
			{field : "proTestmanagername", title : "测试负责人", width : "100px",align:"center"}, 
			{field : "proType", title : "项目类型", align:"center",width : "100px",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": return "售前";
					case  "2": return "实施";
					case  "3": return "售后";
					case  "4": return "研发";
					case  "5": return "运营";
					default: return "其他";
					}
			
				}	
			}, 
			{field : "proBusinesslabel", title : "业务类型", width : "200px",align:"center"}, 
			{field : "proChargetype", title : "收费类型", width : "100px",align:"center",formatter : function(value, row, index) {
				return value=="0"?"收费":"不收费";
			}	
			}, 
			{field : "proStartdate", title : "项目起始日期", width : "100px",align:"center"}, 
			{field : "proEnddate", title : "项目结束日期", width : "100px",align:"center"}
			
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
		save: function() {
			dialogOpen({
				title: '新增立项信息',
				url: 'sys/pro/add.html?_' + $.now(),
				width: '820px',
				height: '650px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '修改立项信息',
					url: 'sys/pro/edit.html?_' + $.now(),
					width: '820px',
					height: '650px',
					success: function(iframeId){
						top.frames[iframeId].vm.project.proId = ck[0].proId;
						top.frames[iframeId].vm.setForm();
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		},
		remove: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections'), ids = [];	
			if(checkedArray(ck)){
				$.each(ck, function(idx, item){
					ids[idx] = item.proId;
				});
				$.RemoveForm({
					url: '../../api/pro/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		},
		proOkr: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '项目OKR',
					url: 'sys/proKr/list.html?_' + $.now(),
					width: '850px',
					height: '500px',
					success: function(iframeId){
						top.frames[iframeId].vm.project.proNumber = ck[0].proNumber;
						top.frames[iframeId].vm.project.proGoal = ck[0].proGoal;
						top.frames[iframeId].vm.load();
					},
					yes: function(iframeId){
						//top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		}
	}
})