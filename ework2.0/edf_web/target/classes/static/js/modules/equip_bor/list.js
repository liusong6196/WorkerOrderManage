/**
 * 设备借用表js
 */

function loadUserSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请 选 择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].userId+"'>"+data[i].username+"</option>";
	}
	$('#'+id).html(htmlstr);
	
}

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
		data:{type:"bor_ret_state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"bor_state")
		}
	});
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getuserlist?_' + $.now(),
		async: false,
		success: function (rs) {
			loadUserSelect(rs.userlist,"borUser");
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
		url: '../../api/equ_bor/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			params.boruser = vm.borUser;
			params.start = vm.dateStart;
			params.end = vm.dateEnd;
			return params;
		},
		columns: [
			{checkbox: true},
			{
				field : "borDatetime", 
				title : "发生日期",
				width : "160px",
				align : "center", 
				formatter : function(value, row, index) {
					return value.substring(0,10);
				}
			},
			{field : "borUserIdName", title : "责任人", width : "100px",align : "center"},
			{field : "equName", title : "设备名称", width : "100px",align : "left"},
			{field : "equStyleIdName", title : "规格型号", width : "100px",align : "left"},
			{field : "borCount", title : "数量", width : "100px",align : "center"},
			{field : "borSiteName", title : "使用地点", width : "100px",align : "center"},
			{field : "borPlantime", title : "计划归还日期", width : "100px",align : "center"},
			{field : "proNumber", title : "项目编号", width : "150px",align : "center"},
			{field : "proName", title : " 项 目 名 称 ", width : "300px",align : "left"},
			{field : "remark", title : "备注", width : "200px",align : "left"},
			{
				field : "borRetStateName",
				title : "状态",
				width : "150px",
				align : "center"
			}
			
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
		dateStart:"",
		dateEnd:"",
		borUser:""
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '设备申请',
				url: 'sys/equip_bor/add.html?_' + $.now(),
				width: '600px',
				height: '90%',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑设备借用表',
					url: 'sys/equip_bor/edit.html?_' + $.now(),
					width: '600px',
					height: '90%',
					scroll:true,
					success: function(iframeId){
						top.frames[iframeId].vm.equipmentBorrow.equBorId = ck[0].equBorId;
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
					ids[idx] = item.equBorId;
				});
				$.RemoveForm({
					url: '../../api/equ_bor/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})