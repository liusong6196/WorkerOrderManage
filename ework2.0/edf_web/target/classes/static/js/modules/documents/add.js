/**
 * 新增-文档管理表; InnoDB free: 16384 kBjs
 */
$(function () {
	getUserName();
	getdocType();
});

function getUserName(){
	
		$.getJSON("../../api/sys/user/info?_" + $.now(), function(r) {
			var username = r.user.username;
			vm.documents.userName=username;
			/*$("#createdId").HTML(userid);*/
		});
	
}

function getdocType(){

	$.getJSON("../../api/sys/document/getdocType?_" + $.now(), function(data) {
		/*for ( var i in data) {
			$('#docSelect').append('<option value='+data[i].docType+'> '+data[i].docTypeName+'</option>')
		}*/
		vm.docTypeList = data;
	});
}

var vm = new Vue({
	el:'#eway',
	data: {
		docTypeList:[],
		documents: {
			id: 0,
			docName: "",
			url: ""
		}
	},
	methods : {
		uploadFiles:function(){
			UPLOAD_FUN.DIALOG(function (fileids, filenames) {
				vm.documents.docName = filenames[0];
				vm.documents.url = fileids[0];
			}, true, 0)
		},
		acceptClick: function() {
			
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../api/sys/document/save?_' + $.now(),
		    	param: vm.documents,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
