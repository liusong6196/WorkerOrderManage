/**
 * 设备记录表js
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

function loadUserSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].userId+"'>"+data[i].username+"</option>";
	}
	$('#'+id).html(htmlstr);
	
}


$(function () {
	initialPage();
	getGrid();
	
	$.ajax({
		type: "post",
		url : '../../api/equ_bor/getuserlist?_' + $.now(),
		async: false,
		success: function (rs) {
			loadUserSelect(rs.userlist,"ruser");
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"util_site"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"rsite")
		}
	});
	
	$.ajax({
		type: "post",
		data:{type:"rec_state"},
		url : '../../api/equip/gettype?_' + $.now(),
		success: function (rs) {
			loadSelect(rs.typedata,"rtype")
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
		url: '../../api/equip/recordlist?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.start = vm.start;
			params.end = vm.end;
			params.ruser = vm.ruser;
			params.rsite = vm.rsite;
			params.equ_name = vm.equ_name;
			params.rtype = vm.rtype;
			return params;
		},
		columns: [
			//{checkbox: true},
			{field : "recordDatetime", title : "发生日期", width : "150px"}, 
			{field : "equSiteName", title : "发生地", width : "80px",align:"center"},
			{field : "optionName", title : "责任人", width : "100px"},
			{field : "equName", title : "设备名称", width : "200px"},
			{field : "styleId", title : "规格型号", width : "150px"},
			{field : "recordType", title : "类型", width : "80px",align:"center"},
			{field : "customerName", title : "客户/供应商", width : "200px"},
			{field : "receiveUnit", title : "收货单位", width : "200px"}, 
			{field : "recordCount", title : "数量", width : "60px",align:"center"},
			{
				field : "recordPrice", 
				title : "单价",
				width : "80px",
				align : "right",
				formatter : function(value, row, index) {
					return value.toFixed(2);
				}
			},
			{
				field : "billingAmount", 
				title : "金额",
				width : "120px",
				align:"right",
				formatter : function(value, row, index) {
					return value.toFixed(2);
				}
			},
			{field : "remark", title : "备注", width : "200px"}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		start:'',
		end:'',
		ruser:'',
		rsite:'',
		equ_name:'',
		rtype:''
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增设备记录表',
				url: 'sys/record/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑设备记录表',
					url: 'sys/record/edit.html?_' + $.now(),
					width: '420px',
					height: '350px',
					success: function(iframeId){
						top.frames[iframeId].vm.equipmentRecord.recordId = ck[0].recordId;
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
					ids[idx] = item.recordId;
				});
				$.RemoveForm({
					url: '../../sys/record/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})