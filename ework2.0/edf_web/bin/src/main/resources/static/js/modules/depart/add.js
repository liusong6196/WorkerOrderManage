/**
 * 新增-部门表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		department: {
			depId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/depart/save?_' + $.now(),
		    	param: vm.department,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
