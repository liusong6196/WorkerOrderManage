/**
 * 目标表js
 */





function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
	});
}

function getGrid() {
		$('#dataGrid').bootstrapTableEx({
			url: '../../api/sys/objective/listUserOKR?_' + $.now(),
			queryParams: function(){
				return vm.id;
			},
			height: $(window).height()-100,
			columns: [	
				{checkbox: true},
				{field : "year", title : "年度", width : "100px",align:'center'}, 
				{field : "quarterName", title : "季度", width : "100px",align:'center'}, 
				{field : "createName", title : "创建人", width : "100px",align:'center'}, 
				{field : "quarterObj", title : "季度目标", width : "100px",align:'center',events: {
					"click .select": function (e, value, $row, index) {
						vm.row = $row;
                		$('#myModal').modal('show');
					}
				},formatter: function() {
					return '<button class="select btn btn-primary" >查看详情</button>';
				}}, 
				{title : "查看关键结果", width : "100px" ,align:'center',events:{
					"click .result":function (){
						var ck = $('#dataGrid').bootstrapTable('getSelections');
						if(checkedRow(ck)){
							dialogOpen({
								id:"layerForm3",
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

function refreshGrid () {
	$('#dataGrid').bootstrapTable('refresh');
}


var vm = new Vue({
	el:'#eway',
	data: {
		keyword: null,
		id:0,
		row:{}
	},
	
	methods : {
		
		init: function(){
			initialPage();
			getGrid();
		},
	
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				id : 'layerForm1',
				title: '新增目标表',
				url: 'sys/okr/useradd.html?_' + $.now(),
				width: '420px',
				height: '350px',
				success: function(iframeId){
					top.frames[iframeId].vm.objective.userId = vm.id;
					top.frames[iframeId].vm.setForm();
				},
				yes : function(iframeId) {
					localStorage.userId = vm.id;
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = $('#dataGrid').bootstrapTable('getSelections');
			if(checkedRow(ck)){
				dialogOpen({
					id : 'layerForm2',
					title: '编辑目标表',
					url: 'sys/okr/useredit.html?_' + $.now(),
					width: '420px',
					height: '350px',
					success: function(iframeId){
//						console.log(ck[0].objId)
						top.frames[iframeId].vm.objective.objId = ck[0].objId;
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
					ids[idx] = item.objId;
				});
				$.RemoveForm({
					url: '../../api/sys/objective/remove?_' + $.now(),
			    	param: ids,
			    	success: function(data) {
			    		vm.load();
			    	}
				});
			}
		}
	}
})
