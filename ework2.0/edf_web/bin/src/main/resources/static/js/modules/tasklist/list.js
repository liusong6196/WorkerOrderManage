/**
 * 任务表js
 */

$(function () {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/tasklist/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "proId", title : "项目ID", width : "100px"}, 
			{field : "taskName", title : "任务名称", width : "100px"}, 
			{field : "taskNumber", title : "任务编号", width : "100px"}, 
			{field : "taskStartdate", title : "任务起始日期", width : "100px"}, 
			{field : "taskEnddate", title : "任务结束日期", width : "100px"}, 
			{field : "taskPlannedhours", title : "计划工时", width : "100px"}, 
			{field : "taskActualhours", title : "实际工时", width : "100px"}, 
			{field : "taskPercentage", title : "任务完成百分比", width : "100px"}, 
			{field : "remark", title : "备注", width : "100px"}, 
			{field : "userIdCreate", title : "创建人", width : "100px"}, 
			{field : "gmtCreate", title : "创建时间", width : "100px"}, 
			{field : "gmtModified", title : "修改时间", width : "100px"},
			{field : "taskUser", title : "任务资源", width : "100px"},
			{field : "taskPriority", title : "任务优先级", width : "100px",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": return "A-紧急重要";
					case  "2": return "B-紧急";
					case  "3": return "C-一般";
					case  "4": return "D-不着急";
//					default: return "其他";
					}
			
				}	
			},
			{field : "taskStatus", title : "任务状态", width : "100px",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": return "未分配";
					case  "2": return "准备做";
					case  "3": return "进行中";
					case  "4": return "已完成";
					case  "4": return "已取消";
//					default: return "其他";
					}
			
				}	
			}
		]
	})
	
}

var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增任务表',
				url: '/sys/tasklist/add.html?_' + $.now(),
				width : '620px',
				height: '650px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑任务表',
					url: '/sys/tasklist/edit.html?_' + $.now(),
					width : '620px',
					height: '650px',
					success: function(iframeId){
						top.frames[iframeId].vm.task.taskId = ck[0].taskId;
						top.frames[iframeId].vm.setForm();
//						getProName(ck[0].proId);
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
					ids[idx] = item.taskId;
				});
				$.RemoveForm({
					url: '../../api/tasklist/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})

/**
 * 获取项目名称下拉
 */
function getProName(proId){
	$.ajax({
		type: "post",
		data:{proId:proId},
		url : '../../api/tasklist/proName?_' + $.now(),
//		url : '../../api/sys/user/all?_' + $.now(),
		success: function (rs) {
			var pro = rs.proName;
//			   alert(pro[0]);
			   $("#pro-name").attr("value","123");
			   alert( $("#pro-name").val());
		}
	});
}