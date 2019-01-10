/**
 * 文档管理表
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
		url: '../../api/sys/document/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "docNo", title : "文档编号", width : "10%",align:"center"}, 
			{field : "docName", title : "文档名称", width : "15%",align:"center"}, 
			{field : "docTypeName", title : "文档类型", width : "5%",align:"center"}, 
			{field : "docDatetime", title : "发布时间", width : "10%",align:"center"}, 
			{field : "docVersion", title : "版本号", width : "80px",align:"center"}, 
			{field : "docAuthor", title : "作者", width : "50px",align:"center"}, 
			{field : "remark", title : "备注", width : "150px",align:"center"}, 
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
				title: '新增文档',
				url: 'sys/document/add.html?_' + $.now(),
				width: '50%',
				height: '500px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑文档',
					url: 'sys/document/edit.html?_' + $.now(),
					width: '50%',
					height: '500px',
					success: function(iframeId){
						top.frames[iframeId].vm.documents.id = ck[0].id;
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
					ids[idx] = item.id;
				});
				$.RemoveForm({
					url: '../../api/sys/document/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})