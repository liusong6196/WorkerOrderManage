$(function () {
	getGrid();
	getGrid_done();
});


function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/tasklist/liststatus?_' + $.now()+"&status=9",
		pageSize: 5,
		pageList: [5, 10, 20, 30, 40],
		columns: [
			{field : "proNumber", title : "项目编号", width : "100px",align:"center"}, 
			{field : "proName", title : "项目名称", width : "200px"}, 
			{field : "taskNumber", title : "任务编号", width : "50px",align:"center"},
			{field : "taskName", title : "任务名称", width : "200px"}, 		
			{field : "taskPriority", title : "任务优先级", width : "100px",align:"center",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": return "A";
					case  "2": return "B";
					case  "3": return "C";
					case  "4": return "D";
					default: return "-";
					}
			
				}	
			},
			{field : "taskStartdate", title : "任务起始日期", width : "100px",align:"center"}, 
			{field : "taskEnddate", title : "任务结束日期", width : "100px",align:"center"}, 
			{field : "taskPlannedhours", title : "计划工时", width : "20px",align:"center"}
		]
	})
}

function getGrid_done() {
	$('#dataGrid_done').bootstrapTableEx({
		url: '../../api/tasklist/liststatus?_' + $.now()+"&status=4",
		pageSize: 5,
		pageList: [5, 10, 20, 30, 40],
		columns: [
			{field : "proNumber", title : "项目编号", width : "100px",align:"center"}, 
			{field : "proName", title : "项目名称", width : "200px"}, 
			{field : "taskNumber", title : "任务编号", width : "50px",align:"center"},
			{field : "taskName", title : "任务名称", width : "200px"}, 		
			{field : "taskPriority", title : "任务优先级", width : "100px",align:"center",
				formatter : function(value, row, index) {
					switch (value){
					case  "1": return "A";
					case  "2": return "B";
					case  "3": return "C";
					case  "4": return "D";
					default: return "-";
					}
			
				}	
			},
			{field : "taskStartdate", title : "任务起始日期", width : "100px",align:"center"}, 
			{field : "taskEnddate", title : "任务结束日期", width : "100px",align:"center"}, 
			{field : "taskPlannedhours", title : "计划工时", width : "20px",align:"center"},
			{field : "taskActualhours", title : "实际工时", width : "20px",align:"center"}		
		]
	})
}