/**
 * 新增-js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		supplier: {
			supId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/supplier/save?_' + $.now(),
		    	param: vm.supplier,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
