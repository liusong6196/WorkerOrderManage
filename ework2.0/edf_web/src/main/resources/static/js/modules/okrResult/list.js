/**
 * 项目关键结果js
 */

$(function () {
	setTimeout(function(){
		initialPage();
		getGrid();
	}, 200);	
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/sys/projectkr/listDepartOKRResult?_' + $.now(),
		height: $(window).height()-54,
		queryParams:localStorage.objId,
		columns: [
			{checkbox: true},
			{field : "quarterName", title : "季度名称", width : "100px",align:'center'}, 
			{field : "krResult", title : "关键结果", width : "100px",align:'center'}, 
			{field : "planIndex", title : "计划指标", width : "100px",align:'center'}, 
			{field : "actualIndex", title : "实际指标", width : "100px",align:'center'}, 
			{field : "krScore", title : "分段", width : "100px",align:'center'}, 
			{field : "createUserName", title : "创建人", width : "100px",align:'center'}
		],
		rowStyle: function (row, index) {
            var style = {};             
                style={css:{'color':'#ed5565'}};                
            return style;
		},
		pagination: false,
		height:380
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				id:"layerForm4",
				title: '新增部门目标关键结果',
				url: 'sys/okrResult/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				success:function(iframeId){
					localStorage.objId;
				},
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick(function(){
						$('#Reload').click();
					});
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					id:"layerForm5",
					title: '编辑部门目标关键结果',
					url: 'sys/okrResult/edit.html?_' + $.now(),
					width: '420px',
					height: '350px',
					success: function(iframeId){
						top.frames[iframeId].vm.projectKr.id = ck[0].id;
						top.frames[iframeId].vm.setForm();
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick(function(){
							$('#Reload').click();
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
			    		vm.load();
			    	}
				});
			}
		}
	}
})