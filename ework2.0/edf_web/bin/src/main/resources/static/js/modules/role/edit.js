/**
 * 编辑-角色管理js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		role: {
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/role/info?_' + $.now(),
		    	param: vm.role.roleId,
		    	success: function(data) {
		    		vm.role = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/role/update?_' + $.now(),
		    	param: vm.role,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})