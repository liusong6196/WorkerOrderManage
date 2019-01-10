/**
 * 新增-设备表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		equipment: {
			equId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/equip/save?_' + $.now(),
		    	param: vm.equipment,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
