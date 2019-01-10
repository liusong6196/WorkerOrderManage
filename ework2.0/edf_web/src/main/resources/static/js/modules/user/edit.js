/**
 * 编辑-用户管理js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		roleList:{},
		userList:[],
		territorialList:[],
		departList:[],
		levelList:[],
		user:{
			orgId: 0,
			orgName: null,
			status: 1,
			roleIdList:[]
		},
		isShow : 0
	}, 
	created : function(){
		 this.getRoleList();
	},
	methods : {
		getRoleList: function(){
			$.get('../../api/sys/role/select?_' + $.now(), function(data){
				vm.roleList = data.rows;
			});
			$.get("../../api/sys/depart/listInfo?_" + $.now(), function(data) {
				vm.departList = eval(data).rows;
			});
		    $.get("../../api/sys/user/info?_" + $.now(), function(r) {
		        vm.user.userIdCreate = r.user.userId;
		    });
			$.get("../../api/sys/user/all?_" + $.now(), function(data) {
				vm.userList = data;
			});
			$.get("../../api/sys/user/allTerritorial?_" + $.now(), function(data) {
				vm.levelList = data;
			});
			$.get("../../sys/dict/getTerritorialDict?_" + $.now(), function(data) {
				vm.territorialList = data;
			});
			this.setForm();
		},
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/user/infoUser?_' + $.now(),
		    	param: vm.user.userId,
		    	success: function(data) {
		    		vm.user = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/user/update?_' + $.now(),
		    	param: vm.user,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})

