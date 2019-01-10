/**
 * 天任务时间表js
 */

$(function () {
	getGrid();
	$(".savefilltimesheet").click(function() {
		var checks = $(".modal").find(":checked");
		var html = '<tr><td >项目类型</td> <td class="itemtitle" colspan="3">项目编号</td> <td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td><input type="text" maxlength="5" size="3"></td><td></td></tr>';
		
		var tr = $("");
		$.each(checks, function(index, item) {
			var temp = $(html).clone();
			temp.find(".itemtitle").text($(item).parent().text());
			if (index == 0) {
				temp.find("td:first").text($(item).parent().parent().siblings().attr("title"));
				temp.find("td:first").attr("rowspan", checks.size() + 1);
			} else {
				temp.find("td:first").remove();
			}
			$(".datatable .adddataend").before(temp);
		});
		$(".datatable .adddataend").before($('<tr><td colspan="3"><b>合计：</b>&nbsp;</td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>8</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>8</div></b></td></tr>'));
		$(".datatable .adddataend").before($('<tr><td colspan="4"><b>合计：</b>&nbsp;</td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>8</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>&nbsp;</div></b></td> <td><b><div>8</div></b></td></tr>'));
		checks.parent().remove();
		$(".modal .modal-body .text-center").each(function(index, item) {
			if ($(item).siblings().children().size() == 0) $(item).parent().remove();
		});
		$(".modal").modal("hide");
	});
});

function getGrid() {
	$.ajax({
		type: "post",
		url :'../../api/sys/filltimesheet/loadData?_' + $.now(),		
		success: function (data) {
			var deps=data.deps;
			
			var html="<option value='-1'>请选择</option>";
			for(var i=0;i<deps.length;i++){
				html +="<option value='"+deps[i].depId+"'>"+deps[i].depName+"</option>";
			}
			$("#department").html(html);
		}
		});
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/sys/filltimesheet/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: false},
			{field : "proType", title : "项目类型", width : "100px"}, 
			{field : "proNumber", title : "项目编号", width : "100px"}, 
			{field : "proName", title : "项目名称", width : "100px"}, 
			{field : "taskName", title : "任务名称", width : "100px"}, 
			{field : "gmtModified", title : "修改时间", width : "100px"}
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
		/*	dialogOpen({
				url: 'sys/filltimesheet/pro.html?_' + $.now(),
				width: '420px',
				height: '400px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});*/
		},
		add: function() {
//			dialogOpen({
//				title: '新增任务',
//				url: 'sys/filltimesheet/add.html?_' + $.now(),
//				width: '420px',
//				height: '400px',
//				yes : function(iframeId) {
//					//top.frames[iframeId].vm.acceptClick();
//					var checkItems = $(top.window.frames["layerForm"].document).find(".addfilltimesheet :checked");
//					top.layer.closeAll();
//					debugger;
//				},
//			});
			$(".modal").modal("show");
		},
		commit: function() {
			/*dialogOpen({
				title: '任务信息',
				url: 'sys/filltimesheet/task.html?_' + $.now(),
				width: '420px',
				height: '400px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});*/
		}
	}
})