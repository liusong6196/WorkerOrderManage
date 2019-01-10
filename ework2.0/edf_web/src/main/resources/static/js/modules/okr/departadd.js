/**
 * 新增-目标表js
 */
$(function () {
	setTimeout(function(){
		getUser();
	}, 200);
	
});

function getUser(){
	$.getJSON("../../api/sys/user/info?_" + $.now(),function(r) {
		vm.objective.userIdCreate = r.user.userId;
		vm.objective.departmentId = localStorage.departmentId;
	});
	
}

var vm = new Vue({
	el:'#eway',
	data: {
		objective: {
		},
		items:[]
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../sys/dict/listQuarterType?_' + $.now(),
		    	success: function(data) {
		    		var list = eval(data);
		    		for(var i in list){
		    			vm.items.push({name:list[i].label,value:list[i].value});
		    		}
		    	}
			});
		},
		acceptClick: function(grid) {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/objective/save?_' + $.now(),
		    	param: vm.objective,
		    	success: function(data) {
		    		grid && grid();
		    	}
		    });
		}
	}
})
