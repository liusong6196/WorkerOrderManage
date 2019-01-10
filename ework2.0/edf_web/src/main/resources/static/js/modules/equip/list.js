/**
 * 设备表js
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
	
	$.getJSON("../../api/sys/user/info?_" + $.now(),function(r) {
		vm.userId= r.user.userId;
	});
	
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/equip/list?_' + $.now(),
		height: $(window).height()-54,
		scroll:false,
		queryParams: function(params){
			params.name = vm.keyword;
			params.source = vm.esource;
			params.etype = vm.etype;
			return params;
		},
		columns: [
			{checkbox: true},
			{
				field : "gmtCreate",
				title : "入库日期", 
				width : "10%",
				align : "center",
				formatter : function(value, row, index) {
					return value.substring(0,10);
				}
			},
			{field : "equName", title : "设备名称", width : "10%",align : "left"}, 
			{field : "equStyleid", title : "规格型号", width : "15%",align : "left"}, 
			{field : "equSourceName",title : "设备来源",width : "5%",align : "center"},
			{field : "equSupplier",title : "供应商",width : "20%",align : "left"},
			{field : "equSiteName",title : "库存地点",width : "5%",align : "center"},
			{field : "equCount", title : "数量", width : "5%",align : "center"},
			{
				field : "equPrice", 
				title : "设备单价",
				width : "10%",
				align : "right",
				formatter : function(value, row, index) {
					if(vm.userId == '91'){
						return value.toFixed(2);
					}else{
						value = "*******";
						return value;
					}
				}
			},
			{field : "overdueDatetime", title : "过期时间", width : "10%",align : "center"},
			{field : "equTypeName",title : "设备类型",width : "5%",align : "center"},
			{field : "remark", title : "备注", width : "20%",align : "left"}
		]
	})
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
		esource:'',
		etype:'',
		UserId:''
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '入 库',
				url: 'sys/equip/add.html?_' + $.now(),
				width: '500px',
				scroll:true,
				height: '92%',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		search: function() {
			dialogOpen({
				title: '记录查询',
				url: 'sys/equip/record_list.html?_' + $.now(),
				width: '85%',
				scroll:true,
				height: '92%'
			});
		},
		equout: function() {
			dialogOpen({
				title: '发 货',
				url: 'sys/equip/equout.html?_' + $.now(),
				width: '600px',
				scroll:true,
				height: '95%',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑设备表',
					url: 'sys/equip/edit.html?_' + $.now(),
					width: '490px',
					height: '92%',
					success: function(iframeId){
						top.frames[iframeId].vm.equipment.equId = ck[0].equId;
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
					ids[idx] = item.equId;
				});
				$.RemoveForm({
					url: '../../api/equip/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})