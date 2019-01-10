/**
 * 编辑-项目关键结果js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		projectKr: {
			id: 0
		},
		items:[],
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../sys/dict/listScoreType?_' + $.now(),
		    	success: function(data) {
		    		var list = eval(data);
		    		for(var i in list){
		    			vm.items.push({name:list[i].label,value:list[i].value});
		    		}
		    	}
			});
			$.SetForm({
				url: '../../api/sys/projectkr/info?_' + $.now(),
		    	param: vm.projectKr.id,
		    	success: function(data) {
		    		vm.projectKr = data;
		    	}
			});
		},
		acceptClick: function(grid) {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/projectkr/update?_' + $.now(),
		    	param: vm.projectKr,
		    	success: function(data) {
		    		grid & grid();
		    	}
		    });
		}
	}
})