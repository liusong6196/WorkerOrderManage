/**
 * 系统数据字典表js
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

$(function () {
	initialPage();
	getGrid();
	
	$.ajax({
		type: "post",
		data:{type:"state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"datastat")
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
		url: '../../sys/dict/listall?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			params.datastat = vm.datastat;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "value", title : "数据值", width : "30px"}, 
			{field : "label", title : "标签名", width : "200px"}, 
			{field : "type", title : "数据类型", width : "100px"}, 
			{field : "description", title : "数据描述", width : "100px"}, 
			{field : "sort", title : "排序", width : "30px"}, 
			{field : "stateName",title : "数据状态",width : "60px"}, 
			{field : "userIdCreateName", title : "创建人", width : "60px"}, 
			{field : "gmtCreate", title : "创建时间", width : "200px"}, 
			{field : "gmtModified", title : "修改时间", width : "200px"},
			{field : "remark", title : "备注", width : "200px"}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
		datastat:''
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增系统数据字典表',
				url: 'sys/dict/add.html?_' + $.now(),
				width: '500px',
				height: '76%',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑系统数据字典表',
					url: 'sys/dict/edit.html?_' + $.now(),
					width: '500px',
					height: '76%',
					success: function(iframeId){
						top.frames[iframeId].vm.sysDict.id = ck[0].id;
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
					ids[idx] = item.id;
				});
				$.RemoveForm({
					url: '../../sys/dict/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})