/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		workorder: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/cqwork/info?_' + $.now(),
		    	param: vm.workorder.id,
		    	success: function(data) {
		    		vm.workorder = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/cqwork/update?_' + $.now(),
		    	param: vm.workorder,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})