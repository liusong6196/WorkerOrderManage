/**
 * 编辑-设备表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		equipment: {
			equId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/equip/info?_' + $.now(),
		    	param: vm.equipment.equId,
		    	success: function(data) {
		    		vm.equipment = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/equip/update?_' + $.now(),
		    	param: vm.equipment,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})