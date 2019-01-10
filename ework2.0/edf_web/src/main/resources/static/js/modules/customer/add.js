/**
 * 新增-客户表js
 */

function loadSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请 选 择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

$(function(){
	$.ajax({
		type: "post",
		data:{type:"cus_industry"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"industry")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"cus_type"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"type")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"cus_state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"state")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadSelect(rs.typedata,"site")
		}
	});
	
});

var vm = new Vue({
	el:'#eway',
	data: {
		customer: {
			cusId: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
			vm.customer.cusIndustry = $("#industry").val();
			vm.customer.cusSite = $("#site").val();
			vm.customer.cusType = $("#type").val();
			vm.customer.cusState = $("#state").val();
		    $.SaveForm({
		    	url: '../../api/cus/save?_' + $.now(),
		    	param: vm.customer,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
