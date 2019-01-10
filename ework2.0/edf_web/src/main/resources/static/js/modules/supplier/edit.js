/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		supplier: {
			supId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/supplier/info?_' + $.now(),
		    	param: vm.supplier.supId,
		    	success: function(data) {
		    		vm.supplier = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/supplier/update?_' + $.now(),
		    	param: vm.supplier,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})