/**
 * 客户表js
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

$(function () {
	initialPage();
	getGrid();
	
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
	
	
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/cus/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			params.industry = vm.industry;
			params.type = vm.type;
			params.state = vm.state;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "cusName", title : "客户名称", width : "200px"}, 
			{field : "cusAlias", title : "别 名", width : "200px"}, 
			{field : "cusNumber", title : "单位编号", width : "80px",align:"center"},
			{field : "cusPhone", title : "单位电话", width : "200px",align:"right"}, 
			{field : "cusEmail", title : "单位邮箱", width : "100px"}, 
			{field : "cusIndustry", title : "所属行业", width : "100px",align:"center"}, 
			{field : "cusContacts", title : "主要联系人", width : "100px",align:"center"}, 
			{field : "cusAddress", title : "地    址", width : "400px",align:"left"}, 
			{field : "cusCode", title : "邮政编码", width : "100px",align:"right"}, 
			{field : "cusSite", title : "所在地", width : "80px",align:"center"}, 
			{field : "cusType", title : "客户类型", width : "80px",align:"center"}, 
			{field : "cusState", title : "状 态", width : "80px",align:"center"}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
		industry:null,
		type:null,
		state:null
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增客户表',
				url: 'sys/customer/add.html?_' + $.now(),
				width: '500px',
				height: '85%',
				scroll:true,
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑客户表',
					url: 'sys/customer/edit.html?_' + $.now(),
					width: '500px',
					height: '85%',
					scroll:true,
					success: function(iframeId){
						top.frames[iframeId].vm.customer.cusId = ck[0].cusId;
						top.frames[iframeId].vm.setForm();
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		},
		remove: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections'), ids = [];	
			if(checkedArray(ck)){
				$.each(ck, function(idx, item){
					ids[idx] = item.cusId;
				});
				$.RemoveForm({
					url: '../../api/cus/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})