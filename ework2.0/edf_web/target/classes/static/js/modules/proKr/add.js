/**
 * 新增-项目关键结果js
 */


$(function () {
	getUser();
});

function getUser(){
		$.getJSON("../../api/sys/user/info?_" + $.now(), function(r) {
			vm.projectKr.userIdCreate = r.user.userId;

		});
	}


var vm = new Vue({
	el:'#eway',
	data: {
		projectKr: {
			id: 0,
			userIdCreate: 0
		}
	},
	methods : {
		acceptClick: function(grid) {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/projectkr/save?_' + $.now(),
		    	param: vm.projectKr,
		    	success: function(data) {
		    		grid && grid();
		    	}
		    });
		}
		
	}
})
