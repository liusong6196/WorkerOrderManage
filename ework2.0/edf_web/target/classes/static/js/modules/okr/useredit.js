/**
 * 编辑-目标表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		objective: {
			objId: 0
		},
		items:[],
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
			$.SetForm({
				url: '../../api/sys/objective/info?_' + $.now(),
		    	param: vm.objective.objId,
		    	success: function(data) {
		    		vm.objective = data;
		    	}
			});
		},
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/objective/update?_' + $.now(),
		    	param: vm.objective,
		    	success: function(data) {
		    		top.frames['layerForm'].refreshGrid();
		    	}
		    });
		}
	}
})