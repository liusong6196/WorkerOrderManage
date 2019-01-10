/**
 * 新增-天任务时间表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		timesheet: {
			id: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/filltimesheet/save?_' + $.now(),
		    	param: vm.timesheet,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
