/**
 * 用户管理js
 */

$(function() {
	$.getJSON("../../api/sys/user/info?_" + $.now(),function(r) {
		vm.logId= r.user.userId;
	});
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
		url : '../../api/sys/user/ressbook?_' + $.now(),
		height : $(window).height() - 54,
		queryParams : function(params) {
			params.username = vm.keyword;
			return params;
		},
		columns : [ {
			checkbox : true
		}, {
			field : "username",
			title : "姓名",
			width : "100px",
			align : "center"
		}, {
			field : "depName",
			title : "部门",
			width : "200px",
			align : "center"
		},{
			field : "email",
			title : "邮箱",
			width : "250px",
			align : "center"
		}, {
			field : "mobile",
			title : "手机号",
			width : "150px",
			align : "center"
		}, {
			field : "levelName",
			title : "级别",
			width : "150px",
			align : "center"
		}, {
			field : "superiorName",
			title : "直接上级",
			width : "100px",
			align : "center"
		},{
			field : "birthDate",
			title : "生日",
			width : "150px",
			align : "center",
			formatter : formatterdate
		},{
			field : "emergencyContact",
			title : "紧急联系人",
			width : "100px",
			align : "center"
		},{
			field : "contactTelephone",
			title : "紧急联系电话",
			width : "150px",
			align : "center"
		}]
	})
}


function formatterdate(val, row) {
	if (val != null) {
	var date = new Date(val);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
	+ date.getDate();
	}
}

var vm = new Vue({
	el : '#eway',
	data : {
		keyword : null,
		logId:0
	},
	methods : {
		load : function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		edit : function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if (checkedRow(ck)) {
				if(vm.logId != ck[0].userId){
					layer.msg('仅限修改当前用户！', function(){
						//关闭后的操作
					});
					return false;
				}
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