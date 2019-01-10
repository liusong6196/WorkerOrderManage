/**
 * 编辑-文档管理表; InnoDB free: 16384 kBjs
 */

$(function () {
	getdocType();
});
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
			id: 0
		}
	},
	methods : {
		uploadFiles(){
			UPLOAD_FUN.DIALOG(function (fileids, filenames) {
				vm.documents.docName = filenames[0];
				vm.documents.url = fileids[0];
			}, true, 0)
		},
		setForm: function() {
			$.SetForm({
				url: '../../api/sys/document/info?_' + $.now(),
		    	param: vm.documents.id,
		    	success: function(data) {
		    		vm.documents = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../api/sys/document/update?_' + $.now(),
		    	param: vm.documents,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})