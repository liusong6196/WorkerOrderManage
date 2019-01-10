/**
 * 新增-用户管理js
 */
//获取当前用户
var vm = new Vue({
	el:'#eway',
	data: {
		roleList:{},
		userList:[],
		levelList:[],
		territorialList:[],
		departList:[],
		user:{
			orgId: 0,
			orgName: null,
			status: 1,
			roleIdList:[]
		}
	},
	methods : {
		getRoleList: function(){
			$.get('../../api/sys/role/select?_' + $.now(), function(r){
				vm.roleList = r.rows;
			});
			$.get("../../api/sys/depart/listInfo?_" + $.now(), function(data) {
				vm.departList = eval(data).rows;
			});
		    $.get("../../api/sys/user/info?_" + $.now(), function(r) {
		        vm.user.userIdCreate = r.user.userId;
		    });
			$.get("../../api/sys/user/all?_" + $.now(), function(data) {
				vm.userList = data;
			});

			$.get("../../api/sys/user/allTerritorial?_" + $.now(), function(data) {
				vm.levelList = data;
			});

			$.get("../../sys/dict/getTerritorialDict?_" + $.now(), function(data) {
				vm.territorialList = data;
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/user/save?_' + $.now(),
		    	param: vm.user,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	},
	mounted : function() {
		this.getRoleList();
	}
})

function select(){
    var depId = document.getElementById("depId").value;
    $("#userl").html("");
    $.ajax({
        url: "../../api/sys/user/getUserByDepId",
        data:{depId:depId},
        type: "POST",
        dataType:'json',
        success:function(data1){
            $.getJSON("../../api/sys/user/all?_" + $.now(), function(data) {
        		for ( var i in data) {
        			$('#userl').append('<option value='+data[i].userId+' selected> '+data[i].username+'</option>')
        		}
        			$('#userl').append('<option value='+data1.userId+' selected> '+data1.username+'</option>')
        	});
            
		},
        error:function(er){
            alert("直接上级追加失败")}
    });
}
