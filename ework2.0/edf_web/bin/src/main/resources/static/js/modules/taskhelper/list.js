
$(function () {
	// initialPage();
	draw();
	getGrid();
	getGrid_ready();
	getGrid_finished();
	getGrid_question();
});

/**
 * 正在进行中的任务加载
 * 
 * @returns
 */
function getGrid() {
	$('#dataGrid').bootstrapTableExByBox({
		url: '../../api/tasklist/liststatus?_' + $.now()+"&status=3",
		columns: [
			{field : "proNumber", title : "项目编号", width : "100px",align:"center"}, 
			{field : "proName", title : "项目名称", width : "100px"}, 
			{field : "taskNumber", title : "任务编号", width : "100px"}, 
			{field : "taskName", title : "任务名称", width : "100px"}, 
			{field : "taskPriority", title : "优先级", width : "30px",align:"center",
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
			{field : "taskPlannedhours", title : "计划工时", width : "100px",align:"center"}, 
			{field : "taskId",title : "实际工时", width : "20px",align:"center",formatter : function(value, row, index) {
				return  "<input type='text'  class='form-control' id='actualhours"+value+"'>"	;
			}},
			{field : "taskId", title : "操作", width : "100px",align:"center",formatter : function(value, row, index) {
				return  "<a class='btn btn-success' onclick=taskfinish('"+value+"') ></i>完成任务</a>";
			}	}
		]
	})
}

/**
 * 准备做的任务加载
 * 
 * @returns
 */
function getGrid_ready() {
	$('#dataGrid_ready').bootstrapTableExByBox({
		url: '../../api/tasklist/liststatus?_' + $.now()+"&status=2",
		height:306,
		columns: [
			{field : "proNumber", title : "项目编号", width : "100px",align:"center"}, 
			{field : "taskName", title : "任务名称", width : "250px"}, 
			{field : "taskPriority", title : "优先级", width : "30px",align:"center",
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
			{field : "taskEnddate", title : "计划结束", width : "100px",align:"center"}, 
			{field : "taskPlannedhours", title : "计划工时", width : "30px",align:"center"}, 
			{field : "taskId", title : "操作", width : "100px",align:"center",formatter : function(value, row, index) {
				return  "<a class='btn btn-success' onclick=taskbegin('"+value+"') ></i>开始任务</a>";
			}	}
		]
	})
}

/**
 * 已完成任务加载
 * 
 * @returns
 */
function getGrid_finished() {
	$('#dataGrid_finished').bootstrapTableExByBox({
		url: '../../api/tasklist/liststatus?_' + $.now()+"&status=4",
		columns: [
			{field : "proNumber", title : "项目编号", width : "100px",align:"center"}, 
			{field : "proName", title : "项目名称", width : "100px"}, 
			{field : "taskNumber", title : "任务编号", width : "100px"}, 
			{field : "taskName", title : "任务名称", width : "100px"}, 
			{field : "taskPriority", title : "优先级", width : "30px",align:"center",
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
			{field : "taskPlannedhours", title : "计划工时", width : "100px",align:"center"}, 
			{field : "taskId",title : "实际工时", width : "20px",align:"center"},
			{field : "remark", title : "备注", width : "200px"}
		]
	})
}

/**
 * 问题/障碍加载
 * 
 * @returns
 */
function getGrid_question() {
	$('#dataGrid_question').bootstrapTableExByBox({
		url: '../../api/pro/questionlist?_' + $.now(),
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "proName", title : "所属项目", width : "100px",align:"center"}, 
			{field : "userName", title : "员工", width : "100px",align:"center"}, 
			{field : "proQueHopedate", title : "期望完成时间", width : "20px",align:"center"}, 
			{field : "proQueEnddate", title : "实际完成时间", width : "20px",align:"center"}, 
			{field : "proQueStatus", title : "状态", width : "30px",align:"center",formatter : function(value, row, index) {
				switch (value){
				case  "0": return "待解决";
				case  "1": return "解决中";
				case  "2": return "以解决";
				default: return "-";
				}
			}}, 
			{field : "proQueQuestion", title : "问题", width : "300px"}, 
			{field : "userCreateName", title : "创建人", width : "30px",align:"center"}, 
			{field : "gmtCreate", title : "创建时间", width : "100px",align:"center"}, 
			{field : "gmtModified", title : "修改时间", width : "100px",align:"center"}
		]
	})
}





$.fn.bootstrapTableExByBox = function(opt){
	var defaults = {
		url: '',
		dataField: "rows",
		method: 'post',
		dataType: 'json',
		selectItemName: 'id',
		clickToSelect: true,
		pagination: true,
		smartDisplay: false,
		pageSize: 4,
		pageList: [10, 20, 30, 40, 50],
		paginationPreText: '上一页',
		paginationNextText: '下一页',
		sidePagination: 'server',
		queryParamsType : null,
		paginationDetailHAlign:"right",
		columns: []
	}
	var option = $.extend({}, defaults, opt);
	$(this).bootstrapTable(option);
}


function taskbegin(v){	

	dialogConfirm("开始任务？",function(){
		$.ajax({
			type: "post",
			url : '../../api/tasklist/updatestatus?_' + $.now(),
			data:{
				taskId:v,
				status:"3",
				actualhours:0
			},
			success: function (data) {
				dialogMsg(data.msg, 'success');
				$('#dataGrid_ready').bootstrapTable('refresh');
				$('#dataGrid').bootstrapTable('refresh');
			}
		});
	
	});

	
}


function taskfinish(v){

	var hours=$("#actualhours"+v).val();
	

	if(hours==""){
		dialogAlert("请输入工时!");
		return;
	}
	
	dialogConfirm("确定已完成任务？",function(){
		$.ajax({
			type: "post",
			url : '../../api/tasklist/updatestatus?_' + $.now(),
			data:{
				taskId:v,
				status:"4",
				actualhours:hours
			},
			success: function (data) {
				dialogMsg(data.msg, 'success');
				$('#dataGrid_finished').bootstrapTable('refresh');
				$('#dataGrid').bootstrapTable('refresh');
				draw();
			}
		});
	
	});
}



 


function draw(){
	
	$.ajax({
		type: "post",
		url : '../../api/tasklist/progressdata?_' + $.now(),
		success: function (data) {
			var taskcount=data.taskcount;
			var donetask=data.donetask;
			var days=data.days;
			var sin = [], cos = [];
			for (var i = 0; i <=days; i += 1) {
				  sin.push([i, taskcount-(taskcount/days)*i]);
			}		
			var hours=0;
			cos.push([0,taskcount]);
			for(var x=0;x<donetask.length;x++){
				
				hours+=donetask[x].taskActualhours;
			 
				cos.push([hours/8,taskcount-(x+1)]);			
			}
			
			var line_data1 = {
					  label:"计划",
					  data: sin,
					  color: "#FFD700"
					};
					var line_data2 = {
					  label:"实际",
					  data: cos,
					  color: "#00c0ef"
					};
					$.plot("#line-chart", [line_data1, line_data2], {
					  grid: {
					    hoverable: true,
					    borderColor: "#f3f3f3",
					    borderWidth: 1,
					    tickColor: "#f3f3f3"
					  },
					  series: {
					    shadowSize: 0,
					    lines: {
					      show: true
					    },
					    points: {
					      show: true
					    }
					  },
					  lines: {
					    fill: false,
					    color: ["#3c8dbc", "#f56954"]
					  },
					  yaxis: {
					    show: true
					  },
					  xaxis: {
					    show: true
					  }
					  
					});
			
		}
	});

}


var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null
	},
	methods : {
		load: function() {	
			$('#dataGrid_question').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增问题/障碍',
				url: 'sys/taskhelper/add.html?_' + $.now(),
				width: '620px',
				height: '450px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid_question').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					title: '编辑问题/障碍',
					url: 'sys/taskhelper/edit.html?_' + $.now(),
					width: '620px',
					height: '450px',
					success: function(iframeId){
						top.frames[iframeId].vm.projectQuestion.proQueId = ck[0].proQueId;
						top.frames[iframeId].vm.setForm();
					},
					yes: function(iframeId){
						top.frames[iframeId].vm.acceptClick();
					}
				});
			}
		},
		remove: function() {
			var ck = $('#dataGrid_question').bootstrapTable('getSelections'), ids = [];	
			if(checkedArray(ck)){
				$.each(ck, function(idx, item){
					ids[idx] = item.proQueId;
				});
				$.RemoveForm({
					url: '../../api/pro/removequestion?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})