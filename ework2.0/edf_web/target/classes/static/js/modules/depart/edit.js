/**
 * 编辑-部门表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		department: {
			depId: 0
		},
		items:[],
		itemx:[],
		selected:'' 
	},
	created : function(){
	   this.setForm();
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/depart/listInfo?_' + $.now(),
		    	success: function(data) {
		    			vm.items=data;
		    	}
			});
			$.SetForm({
		    	url: '../../api/sys/user/userList?_' + $.now(),
		    	success: function(data) {
		    			vm.itemx=data;
		    	},
			});
			this.getInfo();
		},		
		getInfo: function(){
			$.SetForm({
				url: '../../api/sys/depart/info?_' + $.now(),
		    	param: vm.department.depId,
		    	success: function(data) {
		    		vm.department = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/depart/update?_' + $.now(),
		    	param: vm.department,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
