/**
 * 新增-部门表js
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
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/depart/listInfo?_' + $.now(),
		    	success: function(data) {
		    		var list = eval(data);
		    		for(var i in list){
		    			vm.items.push({parentName:list[i].depName,depParentid:list[i].depId});
		    		}
		    	}
			});
			$.SetForm({
		    	url: '../../api/sys/user/userList?_' + $.now(),
		    	success: function(data) {
		    		var list = eval(data);
		    		for(var i in list){
		    			vm.itemx.push({depuserName:list[i].username,userId:list[i].userId});
		    		}
		    	},
			});
		},
			
		
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/depart/save?_' + $.now(),
		    	param: vm.department,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	},
		    });
		}
	},
})
