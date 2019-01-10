var year = "";
var quarter = 1;

$(function () {
	//getUser()
	//initialPage();
	//登陆人姓名
	getUserName();
	//登陆人部门
	getUserDep();
	//个人目标
	//perinfo();
	//部门目标
	//depinfo();
	//项目目标
	//proinfo();
	//个人okr列表
	getGridPer();
	//部门okr列表
	getGridDep();
	//项目okr列表
	//getGridPro();
	listProjectOkr();
	
	//listPerjectOkr();


	
});




//个人okr查询
function perfresh(){
	//个人目标刷新
	//perinfo();
	//个人okr列表舒心
	$('#dataGridPer').bootstrapTable('refresh');
	//getGridPer();
}
//部门查询
function depfresh(){
	//部门目标刷新
	//depinfo();
	$('#dataGridDep').bootstrapTable('refresh');
}
//项目查询
/*function profresh(){
	//项目目标重置
	proinfo();
	alert("项目刷新");
	//项目列表刷新
	$('#dataGridPro').bootstrapTable('refresh');

}*/


//我的项目okr data[i].proName,data[i].proGoal
function getGridPro(i,data) {
	$('#mainForm').append('<div class="container-fluid">'+
			'<div class="box box-warning box-solid ">'+
				'<div class="box-header with-border">'+
					'<table class="form" id="form">'+
						'<tr>'+
							'<td class="formTitle">项目编号<font face="宋体">:</font></td>'+
							'<td class="formValue">'+
							'"'+data.proNumber+'"'+
							'</td>'+
							'<td>'+
							'<div class="form-group">'+
			   				'<!--<a class="btn btn-primary" onclick="profresh()"><i class="fa fa-search"></i>&nbsp;查询</a>-->'+
							'</div>'+
							'</td>'+
							'<td></td>'+
						
						'</tr>'+
						'<tr>'+
							'<td class="formTitle">项目名称<font face="宋体">:</font></td>'+
							'<td class="formValue"><span id="proname" >'+data.proName+'</span></td>'+
							'<td class="formTitle">目标<font face="宋体">:</font></td>'+
							'<td class="formValue"><span id="progoal">'+data.proGoal+'</span></td>'+
						'</tr>'+
					'</table>'+
					'<!-- <h3 class="box-title">我的项目okr</h3> -->'+
					'<div class="box-tools pull-right">'+
						'<button type="button" class="btn btn-box-tool"'+
							'data-widget="collapse">'+
							'<i class="fa fa-minus"></i>'+
						'</button>'+
					'</div>'+
					'<!-- /.box-tools -->'+
				'</div>'+
				'<!-- /.box-header -->'+
				'<div class="box-body">'+
					'<div class="row">'+
						'<table id="dataGridPro'+i+'"></table>'+
					'</div>'+
				'</div>'+
				'<!-- /.box-body -->'+
			'</div>'+
			'<!-- /.box -->'+
		'</div>');
	
	$('#dataGridPro'+i+'').bootstrapTableEx({
		url: '../../api/sys/projectkr/myProOkr?_' + $.now(),
		//height: $(window).height()-54,
		queryParams: function(params){
			params.pronum =data.proNumber;
			return params;
		},
		pageSize: 5,
		pageList: [5, 10, 20, 30, 40],
		columns: [
			//{checkbox: true},
			{field : "id", title : "序号", width : "70px",align:"center"}, 
			{field : "krResult", title : "关键结果", width : "220px",align:"center"}, 
			{field : "planIndex", title : "计划指标", width : "150px",align:"center"}, 
			{field : "actualIndex", title : "实际指标", width : "150px",align:"center"}, 
			{field : "krScore", title : "评分", width : "80px",align:"center"}
		]
	});
}

//我的部门okr
function getGridDep() {
	$('#dataGridDep').bootstrapTableEx({
		url: '../../api/sys/projectkr/listDepart?_' + $.now(),
		queryParams: function(params){
			var yearone=$("#depYear").val();
			year=yearone;
			if(year==null||year==""){
				year=new Date().getFullYear().toString();
				$("#depYear").val(year);
			}
			quarter=$("#depQuarter").val();
			params.quarter =parseInt(quarter);
			params.year =  parseInt(year);
			
//			params.quarter =parseInt($("#depQuarter").val());
//			params.year =  parseInt($("#depYear").val());
			//params.objid=data.objId;
			
			return params;
		},
		height: $(window).height()-100,
		columns: [	
			{checkbox: true},
			{field : "departName", title : "部门名称", width : "100px",align:'center'}, 
			{field : "year", title : "年度", width : "100px",align:'center'}, 
			{field : "quarterName", title : "季度", width : "100px",align:'center'}, 
			{field : "createName", title : "创建人", width : "100px",align:'center'}, 
			{field : "quarterObj", title : "季度目标", width : "100px",align:'center'}, 
			{title : "查看关键结果", width : "100px" ,align:'center',events:{
				"click .result":function (){
					var ck = $('#dataGridDep').bootstrapTable('getSelections');
					if(checkedRow(ck)){
						dialogOpen({
							id:"layerForm3",
							title: '关键结果表',
							url: 'sys/okrResult/list.html?_' + $.now(),
							width: '80%',
							height: '80%',
							success : function(iframeId) {
								localStorage.objId   =  ck[0].objId;
							},
						});
					}
				}
			},formatter: function(){
				return '<button class="result btn btn-primary"> 查看结果目标  </button>';
			}}
		],
		rowStyle: function (row, index) {
             var style = {};             
                 style={css:{'color':'#ed5565'}};                
             return style;
        },    
		pagination: false,
		height:380	
	})
	
}
/*function aa(){
	alert($("#perQuarter").val())
	return $("#perQuarter").val();
}*/

//我的个人okr
/*function getGridPer() {

	$('#dataGridPer').bootstrapTableEx({
		url: '../../api/sys/projectkr/myPerOkr?_' + $.now(),
//		height: $(window).height()-54,
		queryParams: function(params){
			params.quarter =parseInt($("#perQuarter").val());
			params.year =  parseInt($("#perYear").val());
			return params;
		},
		//pagination:false,
		pageSize: 5,
		pageList: [5, 10, 20, 30, 40],
		columns: [
			//{checkbox: true},
			{field : "id", title : "序号", width : "70px",align:"center"}, 
			{field : "krResult", title : "关键结果", width : "220px",align:"center"}, 
			{field : "planIndex", title : "计划指标", width : "150px",align:"center"}, 
			{field : "actualIndex", title : "实际指标", width : "150px",align:"center"}, 
			{field : "krScore", title : "评分", width : "80px",align:"center"}
		]
	})
}*/
function getGridPer() {
	$('#dataGridPer').bootstrapTableEx({
		url: '../../api/sys/projectkr/listPerson?_' + $.now(),
		queryParams: function(params){
			var yearone=$("#perYear").val();
			year=yearone;
			if(year==null||year==""){
				year=new Date().getFullYear().toString();
				$("#perYear").val(year);
			}
			quarter=$("#perQuarter").val();
			params.quarter =parseInt(quarter);
			params.year =  parseInt(year);
			//params.objid=data.objId;
			
			return params;
		},
		height: $(window).height()-54,
		columns: [	
			{checkbox: true},
			{field : "year", title : "年度", width : "100px",align:'center'}, 
			{field : "quarterName", title : "季度", width : "100px",align:'center'}, 
			{field : "createName", title : "创建人", width : "100px",align:'center'}, 
			{field : "quarterObj", title : "季度目标", width : "100px",align:'center'}, 
			{title : "查看关键结果", width : "100px" ,align:'center',events:{
				"click .result":function (){
					var ck = $('#dataGridPer').bootstrapTable('getSelections');
					if(checkedRow(ck)){
						dialogOpen({
							id:"layerForm4",
							title: '关键结果表',
							url: 'sys/okrResult/userlist.html?_' + $.now(),
							width: '80%',
							height: '80%',
							success : function(iframeId) {
								localStorage.objId   =  ck[0].objId;
							},
						});
					}
				}
			},formatter: function(){
				return '<button class="result btn btn-primary"> 查看结果目标  </button>';
			}}
		],
		rowStyle: function (row, index) {
             var style = {};             
                 style={css:{'color':'#ed5565'}};                
             return style;
        },    
		pagination: false,
		height:380	
})
}

//我的个人okr2
function getGridPerT(i,data) {
	$("#mainForm").prepend('<div class="container-fluid">'+
	'<div class="box box-success box-solid" style="margin-top: 20px">'+
	'<div class="box-header with-border">'+
		'<table class="form" id="form" >'+
			'<tr>'+
				'<td class="formTitle">年度<font face="宋体">:</font></td>'+
				'<td class="formValue">'+
				'<input style="width:80px;height:25px" type="text" id="perYear" class="form-control " placeholder="例:2018"  isvalid="yes" checkexpession="NotNull" >'+
				'</td>'+

				'<td class="formTitle">季度<font face="宋体">:</font></td>'+
				'<td class="formValue">'+
				'<select style="color:black" id="perQuarter">'+
					'<option value="1" selected>第一季度</option>'+
					'<option value="2">第二季度</option>'+
					'<option value="3">第三季度</option>'+
					'<option value="4">第四季度</option>'+
				'</select>'+
				'</td>'+
				'<td>'+
				'<div class="form-group">'+
   				 '<a class="btn btn-primary" onclick="perfresh()"><i class="fa fa-search"></i>&nbsp;查询</a>'+
				'</div>'+
				'</td>'+
				
			'</tr>'+

			'<tr>'+
				'<td class="formTitle">姓名<font face="宋体">:</font></td>'+
				'<td class="formValue"><span id="pername"></span></td>'+
				'<td class="formTitle">目标<font face="宋体">:</font></td>'+
				'<td class="formValue"><span id="pergoal"></span>"'+data.quarterObj+'"</td>'+
			'</tr>'+
		'</table>'+
		'<!--  <h3 class="box-title">我的部门okr</h3> -->'+
		'<div class="box-tools pull-right">'+
			'<button type="button" class="btn btn-box-tool"'+
				'data-widget="collapse">'+
				'<i class="fa fa-minus"></i>'+
			'</button>'+
		'</div>'+
		'<!-- /.box-tools -->'+
	'</div>'+
	'<!-- /.box-header -->'+
	'<div class="box-body">'+
		'<div class="row">'+
			'<table id="dataGridPer'+i+'"></table>'+
		'</div>'+
	'</div>'+
	'<!-- /.box-body -->'+
'</div>'+
'<!-- /.box -->'+
'</div>'
			
	);
	
	$('#dataGridPer'+i+'').bootstrapTableEx({
		url: '../../api/sys/projectkr/myPerOkrT?_' + $.now(),
//		height: $(window).height()-54,
		queryParams: function(params){
//			params.quarter =parseInt($("#perQuarter").val());
//			params.year =  parseInt($("#perYear").val());
			params.objid=data.objId;
			
			return params;
		},
		//pagination:false,
		pageSize: 5,
		pageList: [5, 10, 20, 30, 40],
		columns: [
			//{checkbox: true},
			{field : "id", title : "序号", width : "70px",align:"center"}, 
			{field : "krResult", title : "关键结果", width : "220px",align:"center"}, 
			{field : "planIndex", title : "计划指标", width : "150px",align:"center"}, 
			{field : "actualIndex", title : "实际指标", width : "150px",align:"center"}, 
			{field : "krScore", title : "评分", width : "80px",align:"center"}
		]
	})
}
//个人目标
function perinfo(){
	
	var yearone=$("#perYear").val();
	var year=yearone;
	if(year==null||year==""){
		year=new Date().getFullYear().toString();
		$("#perYear").val(year);
	}
	var quarter=$("#perQuarter").val();
//	alert(year);
//	alert(quarter);
	$.post({
		url:'../../api/sys/projectkr/perinfo?_' + $.now(),
		data:{year:year,quarter:quarter},
		success:function(data){
			if(data.code==0){
				var perinfo=data.perinfo;
				if(perinfo!=null){
					$("#pergoal").text(perinfo.pergoal);
				}else{
					$("#pergoal").text("");
				}
			}else{
				//alert(data.code);
				$("#pergoal").text("");
			}
		},
		error:function(data){
			$("#pergoal").text("");
		},
		dataType:"json"
		
	})
		
}

//部门目标
function depinfo(){
	var yeardep=$("#depYear").val();
	var year=yeardep;
	if(year==""||year==null){
		year=new Date().getFullYear().toString();
		$("#depYear").val(year);
	}
	var quarter=$("#depQuarter").val();
	$.post({
		url:'../../api/sys/projectkr/depinfo?_' + $.now(),
		data:{year:year,quarter:quarter},
		success:function(data){
			if(data.code==0){
				var depinfo=data.depinfo;
				if(depinfo!=null){
					//实体返回，部门目标赋值
					$("#depgoal").text(depinfo.depgoal);
				}else{
					//实体返回null,部门赋值
					$("#depgoal").text("");
				}
			}else{
				//传入非数字 为空
				$("#depgoal").text("");
			}
	
		},
		error:function(data){
			//异常访问设置为空
			$("#depgoal").text("");
		},
		dataType:"json"
	})
		
}
//项目目标
function proinfo(){
	var proNum= $("#proNum").val();
	$.post({
		url:'../../api/sys/projectkr/proinfo?_' + $.now(),
		data:{pronum:proNum},
		success:function(data){
			if(data.code==0){
				var proinfo=data.proinfo;
				if(proinfo!=null){
					//实体返回，给项目名，项目目标赋值
				$("#proname").text(proinfo.proname);
				$("#progoal").text(proinfo.progoal);
				}else{
					//实体没有返回，项目名，项目目标设为空
					$("#proname").text("");
					$("#progoal").text("");
				}
				
			}else{
				$("#proname").text("");
				$("#progoal").text("");
			}
		},
		error:function(data){
			//访问失设为空
			$("#proname").text("");
			$("#progoal").text("");
		},
		dataType:"json"
	})

}

//当前登录人姓名
function getUserName(){
	
	$.getJSON("../../api/sys/user/info?_" + $.now(), function(r) {
		var username = r.user.username;
		//alert(username);
		$("#pername").text(username);

	});
	

}

//当前登录人部门
function getUserDep(){
	$.post({
		url:'../../api/sys/projectkr/getUserDep?_' + $.now(),
		success:function(data){
			$("#depname").text(data.depName);

		}
	})

}

//项目okr
function listProjectOkr(){
	$.post({
		url:'../../api/sys/projectkr/listProjectOkr?_' + $.now(),
		success:function(data){
			//alert("进入了")
			for ( var i in data) {
				//alert(data[i].proName);
				//if(data[i])
				//getGridPro(i,data[i].proNumber,data[i].proName,data[i].proGoal);
				if(data[i].proStatus==1){
					getGridPro(i,data[i]);
				}
				
			}

		},
		error:function(data){
			
			alert("异常");
		},
		dataType:"json"
	})
	
}
//个人OKRlist
function listPerjectOkr(){
	var yearone=$("#perYear").val();
	var year=yearone;
	if(year==null||year==""){
		year=new Date().getFullYear().toString();
		$("#perYear").val(year);
	}
	var quarter=$("#perQuarter").val();
	$.post({
		url:'../../api/sys/projectkr/listPerjectOkr?_' + $.now(),
		data:{year:year,quarter:quarter},
		success:function(data){
			//alert("进入了")
			for ( var i in data) {
				getGridPerT(i,data[i]);
				$("#perYear").val(year);
			}

		},
		error:function(data){
			
			alert("异常");
		},
		dataType:"json"
	})
	
}

