/**
 * 部门表js
 */

$(function () {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function() {
		TreeGrid.table.resetHeight({height: $(window).height()-100});
	});
}

function getGrid() {
	var colunms = TreeGrid.initColumn();
    var table = new TreeTable(TreeGrid.id, '../../api/sys/depart/listAll?_' + $.now(), colunms);
    table.setExpandColumn(1);
    table.setIdField("depId");
    table.setCodeField("depId");
    table.setParentCodeField("depParentid");
    table.setExpandAll(false);
    table.setHeight($(window).height()-100);
    table.init();
    TreeGrid.table = table;
}
var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null
	},
	methods : {
		load: function() {
			TreeGrid.table.refresh();
		},
		save: function() {
			dialogOpen({
				title: '新增部门表',
				url: 'sys/depart/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				success: function(iframeId){
					top.frames[iframeId].vm.setForm();
				},
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = TreeGrid.table.getSelectedRow();
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑部门表',
					url: 'sys/depart/edit.html?_' + $.now(),
					width: '420px',
					height: '350px',
					success: function(iframeId){
						top.frames[iframeId].vm.department.depId = ck[0].id;
						top.frames[iframeId].vm.setForm();
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		},
		departokr: function() {
			var ck = TreeGrid.table.getSelectedRow();
			if(checkedRow(ck)){
				dialogOpen({
					title: 'OKR季度目标表',
					url: 'sys/okr/departlist.html?_' + $.now(),
					width: '80%',
					height: '80%',
					success: function(iframeId){
						top.frames[iframeId].vm.id = ck[0].id;
					},
				});
			}
		},
		remove: function() {
			var ck = TreeGrid.table.getSelectedRow(), ids = [];
			if(checkedArray(ck)){
				$.each(ck, function(idx, item){
					ids[idx] = item.id;
				});
				$.RemoveForm({
					url: '../../api/sys/depart/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})
var TreeGrid = {
    id: "dataGrid",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TreeGrid.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '部门名称', field: 'depName', align:'center', valign: 'middle', width: '180px'},
        {title: '部门编号', field: 'depNumber', align:'center', valign: 'middle', width: '100px'},
        {title: '部门主管', field: 'depuserName', align:'center', valign: 'middle', width: '100px'},
        {title: '上级部门', field: 'parentName', align:'center', valign: 'middle', width: '100px'}
]
    return columns;
};
