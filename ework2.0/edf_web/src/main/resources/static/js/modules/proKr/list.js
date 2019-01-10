/**
 * 项目关键结果js
 */

//$(function () {
//	initialPage();
//	// getGrid();
//});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	//给项目目标赋值
	$(function(){
		$("#proGoal").html(vm.project.proGoal);
	});
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/sys/projectkr/listByNum?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.objId = vm.project.proNumber;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "id", title : "序号", width : "70px",align:"center"}, 
			{field : "krResult", title : "关键结果", width : "220px",align:"center"}, 
			{field : "planIndex", title : "计划指标", width : "150px",align:"center"}, 
			{field : "actualIndex", title : "实际指标", width : "150px",align:"center"}, 
			{field : "krScore", title : "评分", width : "80px",align:"center"}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		    keyword: null,
			project: {
				proNumber:"",
				proGoal:""
			}	
	},
	methods : {
		load: function() {
			// $('#dataGrid').bootstrapTable('refresh');
			initialPage();
			getGrid();
		},
		save: function() {
			dialogOpen({
				id:"iframeIds",
				title: '新增项目关键结果',
				url: 'sys/proKr/add.html?_' + $.now(),
				width: '400px',
				height: '200px',
				yes : function(iframeIds) {
					top.frames[iframeIds].vm.projectKr.objId = vm.project.proNumber;
					top.frames[iframeIds].vm.acceptClick(function () {
						$('#gridReload').click();
					});
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					id:"iframeIde",
					title: '编辑项目关键结果',
					url: 'sys/proKr/edit.html?_' + $.now(),
					width: '400px',
					height: '280px',
					success: function(iframeIde){
						top.frames[iframeIde].vm.projectKr.id = ck[0].id;
						top.frames[iframeIde].vm.setForm();
					},
					yes: function(iframeIde){
						top.frames[iframeIde].vm.acceptClick(function () {
							$('#gridReload').click();
						});
					}
				});
			}
		},
		remove: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections'), ids = [];	
			if(checkedArray(ck)){
				$.each(ck, function(idx, item){
					ids[idx] = item.id;
				});
				$.RemoveForm({
					url: '../../api/sys/projectkr/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		$('#gridReload').click();
			    	}
				});
			}
		}
	}
})