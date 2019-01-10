
function loadSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

$(function(){
	$.ajax({
		type: "post",
		data:{type:"equ_source"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"tSource")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"equ_type"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"tetype")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"equ_site")
		}
	});
	
});

/**
 * 编辑-设备表js
 */
var vm = new Vue({
	el:'#eway',
	data: {
		equipment: {
			equId: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../api/equip/info?_' + $.now(),
		    	param: vm.equipment.equId,
		    	success: function(data) {
		    		vm.equipment = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/equip/update?_' + $.now(),
		    	param: vm.equipment,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})