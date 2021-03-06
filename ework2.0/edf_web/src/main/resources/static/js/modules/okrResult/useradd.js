/**
 * 新增-项目关键结果js
 */
$(function () {
	getUser();
});

function getUser(){
	$.getJSON("../../api/sys/user/info?_" + $.now(),function(r) {
		vm.projectKr.userIdCreate = r.user.userId;
		vm.projectKr.objId = localStorage.objId;
	});
	
}

var vm = new Vue({
	el:'#eway',
	data: {
		projectKr: {
			id: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/projectkr/save?_' + $.now(),
		    	param: vm.projectKr,
		    	success: function(data) {
		    		top.frames['layerForm3'].refreshGrid();
		    	}
		    });
		}
	}
})
