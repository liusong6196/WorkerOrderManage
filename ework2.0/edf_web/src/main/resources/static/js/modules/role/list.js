/**
 * 角色管理js
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
		url: '../../api/sys/role/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.roleName = vm.keyword;
			return params;
		},
		columns: [{
			checkbox: true
		}, {
			field : "roleId",
			title : "编号",
			width : "50px"
		}, {
			field : "roleName",
			title : "角色名称",
			width : "200px"
		}, {
			field : "roleSign",
			title : "角色标识",
			width : "200px"
		}, {
			field : "remark",
			title : "备注",
			width : "250px"
		}, {
			field : "gmtCreate",
			title : "创建时间"
		}]
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
				title: '新增角色',
				url: 'sys/role/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑角色',
					url: 'sys/role/edit.html?_' + $.now(),
					width: '420px',
					height: '350px',
					success: function(iframeId){
						top.frames[iframeId].vm.role.roleId = ck[0].roleId;
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
					ids[idx] = item.roleId;
				});
				$.RemoveForm({
					url: '../../api/sys/role/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		},
		authorizeOpt: function(){
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '操作权限',
					url: 'sys/role/opt.html?_' + $.now(),
					scroll : true,
					width: "300px",
					height: "450px",
					success: function(iframeId){
						top.frames[iframeId].vm.role.roleId = ck[0].roleId;
						top.frames[iframeId].vm.getMenu();
					},
					yes : function(iframeId) {
						top.frames[iframeId].vm.acceptClick();
					}
				})
			}
		}
	}
})