/**
 * 设备表js
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
		url: '../../api/equip/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "equId", title : "记录ID", width : "60px"}, 
			{field : "equName", title : "设备名称", width : "100px"}, 
			{field : "equStyleid", title : "厂商货号", width : "100px"}, 
			{field : "equPrice", title : "设备单价", width : "100px"}, 
			{
				field : "equSource",
				title : "设备来源",
				width : "100px",
				formatter : function(value, row, index) {
					if (value == '1') {
						return '采购';
					} else if (value == '2') {
						return '借用';
					}
				}
			}, 
			{field : "equCount", title : "库存数量", width : "60px"}, 
			{field : "userIdCreate", title : "创建人", width : "100px"}, 
			{field : "gmtCreate", title : "创建时间", width : "200px"}, 
			{field : "gmtModified", title : "修改时间", width : "200px"},
			{field : "remark", title : "备注", width : "200px"}
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
				title: '新增设备表',
				url: 'sys/equip/add.html?_' + $.now(),
				width: '490px',
				height: '66%',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑设备表',
					url: 'sys/equip/edit.html?_' + $.now(),
					width: '490px',
					height: '66%',
					success: function(iframeId){
						top.frames[iframeId].vm.equipment.equId = ck[0].equId;
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
					ids[idx] = item.equId;
				});
				$.RemoveForm({
					url: '../../api/equip/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})