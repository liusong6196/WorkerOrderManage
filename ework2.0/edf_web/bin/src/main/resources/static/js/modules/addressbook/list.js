/**
 * 用户管理js
 */

$(function() {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {
			height : $(window).height() - 54
		});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url : '../../api/sys/user/list?_' + $.now(),
		height : $(window).height() - 54,
		queryParams : function(params) {
			params.username = vm.keyword;
			return params;
		},
		columns : [ {
			checkbox : true
		}, {
			field : "userId",
			title : "编号",
			width : "50px",
			align : "center"
		},  {
			field : "username",
			title : "姓名",
			width : "200px",
			align : "center"
		}, {
			field : "email",
			title : "邮箱",
			width : "300px",
			align : "center"
		}, {
			field : "mobile",
			title : "手机号",
			width : "150px",
			align : "center"
		}, {
			field : "status",
			title : "状态",
			width : "100px",
			align : "center",
			formatter : function(value, row, index) {
				if (value == '0') {
					return '<span class="label label-danger">禁用</span>';
				} else if (value == '1') {
					return '<span class="label label-success">正常</span>';
				}
			}
		}, {
			field : "remark",
			title : "备注",
			align : "center"
		} ]
	})
}

var vm = new Vue({
	el : '#eway',
	data : {
		keyword : null
	},
	methods : {
		load : function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		edit : function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if (checkedRow(ck)) {
				dialogOpen({
					title : '编辑员工通讯录',
					url : 'sys/addressbook/edit.html?_' + $.now(),
					width : '600px',
					height : '350px',
					scroll : true,
					success : function(iframeId) {
						top.frames[iframeId].vm.user.userId = ck[0].userId;
						top.frames[iframeId].vm.setForm();
					},
					yes : function(iframeId) {
						top.frames[iframeId].vm.acceptClick();
					},
				});
			}
		},
		disable : function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections'), ids = [];
			if (checkedArray(ck)) {
				$.each(ck, function(idx, item) {
					ids[idx] = item.userId;
				});
				$.ConfirmForm({
					msg : '您是否要禁用所选账户吗？',
					url : '../../api/sys/user/disable?_' + $.now(),
					param : ids,
					success : function(data) {
						vm.load();
					}
				});
			}
		},
		enable : function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections'), ids = [];
			if (checkedArray(ck)) {
				$.each(ck, function(idx, item) {
					ids[idx] = item.userId;
				});
				$.ConfirmForm({
					msg : '您是否要启用所选账户吗？',
					url : '../../api/sys/user/enable?_' + $.now(),
					param : ids,
					success : function(data) {
						vm.load();
					}
				});
			}
		}
	}
})