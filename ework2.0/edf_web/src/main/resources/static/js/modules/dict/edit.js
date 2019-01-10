/**
 * 编辑-系统数据字典表js
 */

function loadSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

$(function(){
	$.ajax({
		type: "post",
		data:{type:"state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"datastat")
		}
	});
});
var vm = new Vue({
	el:'#eway',
	data: {
		sysDict: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../sys/dict/info?_' + $.now(),
		    	param: vm.sysDict.id,
		    	success: function(data) {
		    		vm.sysDict = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../sys/dict/update?_' + $.now(),
		    	param: vm.sysDict,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})