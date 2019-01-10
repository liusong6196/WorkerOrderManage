/**
 * 新增-用户管理js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		roleList:{},
		user:{
			orgId: 0,
			orgName: null,
			status: 1,
			roleIdList:[]
		}
	},
	methods : {
		getRoleList: function(){
			$.get('../../api/sys/role/select?_' + $.now(), function(r){
				vm.roleList = r.rows;
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/user/save?_' + $.now(),
		    	param: vm.user,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	},
	created : function() {
		this.getRoleList();
	}
})
