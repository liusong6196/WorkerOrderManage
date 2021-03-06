loadImgDialogOpen = function(opt){
   var defaults = {
      id : 'layerForm',
      title : '',
      width: '',
      height: '',
      url : null,
      scroll : false,
      data : {},
    //btn: ['', '关闭'],
      success: function(){},
      yes: function(){}
   }
   var option = $.extend({}, defaults, opt), content = null;
   if(option.scroll){
      content = [option.url]
   }else{
      content = [option.url, 'no']
   }
   top.layer.open({
      type : 2,
      id : option.id,
      title : option.title,
      closeBtn : 1,
      anim: -1,
      isOutAnim: false,
      shadeClose : false,
      shade : 0.3,
      area : [option.width, option.height],
      content : content,
      btn: option.btn,
      success: function(){
         option.success(option.id);
      },
      yes: function(){
         option.yes(option.id);
      }
    });
}

/**
 * js
 */
var uName = "";

function getFormatDate(date){
	var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function localweek(){
	var Nowdate = new Date();     
    var WeekFirstDay = new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
    var WeekLastDay = new Date((WeekFirstDay/1000+6*86400)*1000);
    var formatFirst = getFormatDate(WeekFirstDay);
    var formatLast = getFormatDate(WeekLastDay);
    $('#td_start').val(formatFirst);
    $('#td_end').val(formatLast);
}


function localmonth(){
	var Nowdate = new Date();     
    var MonthFirstDay = new Date(Nowdate.getFullYear(),Nowdate.getMonth(),1);
    var MonthNextFirstDay = new Date(Nowdate.getFullYear(),Nowdate.getMonth()+1,1);     
    var MonthLastDay = new Date(MonthNextFirstDay-86400000);
    var formatFirst = getFormatDate(MonthFirstDay);
    var formatLast = getFormatDate(MonthLastDay);
    $('#td_start').val(formatFirst);
    $('#td_end').val(formatLast);
}

function loadOtherSelect(data,id){
	if(data == null || data == ''){
		return;
	}
	var htmlstr = "<option value=''>请选择</option>";
	for(var i=0;i<data.length;i++){
		htmlstr += "<option value='"+data[i].value+"'>"+data[i].label+"</option>";
	}
	$('#'+id).html(htmlstr);
}

//加载所属项目下拉框
function loadProjectList(){
	$.ajax({
		type: "post",
		data:{type:"wo_project"},
		url : '../../api/cqwork/gettype?_' + $.now(),
		async:false,
		success: function (rs) {
			loadOtherSelect(rs.typedata,"pro_name");
		}
	});
}

function loadUserName(){
	$.ajax({
		type: "post",
		data:{},
		url : '../../api/cqwork/getusername?_' + $.now(),
		async:false,
		success: function (rs) {
			uName = rs.username;
		}
	});
}

function searchRset(){
	$('#pro_name').val('');
	$('#td_start').val('');
	$('#td_end').val('');
	$('#p_user').val('');
}

function expWorkorderData(){
	var proname = $('#pro_name').val();
	var processuser = $('#p_user').val();
	var tdstart = $('#td_start').val();
	var tdend = $('#td_end').val();
	var token = "";
	$.ajax({
		type: "post",
		data:{},
		url : '../../api/cqwork/gettokenstr?_' + $.now(),
		async:false,
		success: function (rs) {
			token = rs.tokenstr;
		}
	});
	window.location.href = "../../api/cqwork/expworkorder?token="+token+"+&proname="+proname+"&processuser="+processuser+"&tdstart="+tdstart+"&tdend="+tdend;	
}

function showErrorImg(imgUrl){
	//alert(imgUrl);
	if(imgUrl == null || imgUrl == 'null' || imgUrl == ''){
		layer.msg('此工单没有异常图片', {icon: 2});
		return;
	}	
	loadImgDialogOpen({
		title: '异常图片',
		url: 'sys/cqwork/showimg.html?_' + $.now(),
		width: '60%',
		height: '80%',
		success: function(iframeId){		
			top.frames[iframeId].vm.workorder.imgurl = imgUrl;
			top.frames[iframeId].vm.setForm();
		}
	});

}

$(function () {
	$('#td_start').val(getFormatDate(new Date()));
	initialPage();
	getGrid();
	loadProjectList();
	loadUserName();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../api/cqwork/list?_' + $.now(),
		height: $(window).height()-54,
		queryParams: function(params){
			var proname = $('#pro_name').val();
			var processuser = $('#p_user').val();
			var tdstart = $('#td_start').val();
			var tdend = $('#td_end').val();
			if(proname != '' && proname != null){
				params.proname = proname;
			}
			if(tdstart != '' && tdstart != null){
				params.tdstart = tdstart;
			}
			if(tdend != '' && tdend != null){
				params.tdend = tdend;
			}
			if(processuser != '' && processuser != null){
				params.processuser = processuser;
			}
			return params;
		},
		columns: [
			{checkbox: true},
			{
				field : "area", 
				title : "单位地址", 
				width : "200px",
				formatter : function(value, row, index) {
					var address = row.area;
					if(row.town != null){
						address += row.town;
					}
					if(row.village != null){
						address += row.village;
					}
					return address;
				}
			},
			//{field : "name", title : "姓名", width : "100px"}, 
			{field : "project", title : "所属项目", width : "100px"}, 
			{field : "type", title : "问题类型", width : "100px"}, 
			{
				field : "occurDate",
				title : "问题日期", 
				width : "100px",
				formatter : function(value, row, index) {
					return value.substring(0,10);
				}
			}, 
			//{field : "overTime", title : "处理完成时间", width : "100px"}, 
			//{field : "qq", title : "qq号", width : "100px"}, 
			//{field : "tel", title : "电话", width : "100px"}, 
			{field : "description", title : "问题描述", width : "100px"}, 
			{field : "method", title : "处理方法", width : "100px"}, 
			{field : "manner", title : "处理方式", width : "100px"}, 
			{field : "source", title : "问题来源", width : "100px"}, 
			{
				field : "processTime",
				title : "处理时长 ",
				width : "60px",
				formatter : function(value, row, index) {
					return value + "分钟";
				}
			}, 
			{
				field : "status",
				title : "状态 ",
				width : "100px",
				formatter : function(value, row, index) {
					if(value == '1'){
						return '已解决';
					}else{
						return '未解决';
					}
				}
			},
			{field : "processUser", title : "处理人", width : "100px"},
			{
				field : "errImgpath",
				title : "异常图片", 
				width : "100px",
				formatter:function(value, row, index){
					return '<input type="button" onclick="showErrorImg(\''+value+'\')" class="btn btn-default" value="查看">';
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
				title: '新增',
				url: 'sys/cqwork/add.html?_' + $.now(),
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
				var id = ck[0].processUser;
				if(id != uName){
					layer.msg('无法编辑其他人员的工单', {icon: 2});
					return false;
				}
				dialogOpen({
					title: '编辑',
					url: 'sys/cqwork/edit.html?_' + $.now(),
					width: '80%',
					height: '60%',
					success: function(iframeId){
						top.frames[iframeId].vm.workorder.id = ck[0].id;
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
					url: '../../api/cqwork/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})