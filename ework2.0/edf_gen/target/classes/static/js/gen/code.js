/**
 * 生成代码-代码生成器js
 */
var vm = new Vue({
	el : '#eway',
	data : {
		generator : {
			tables : null,
			type : 2
		}
	},
	methods : {
		acceptClick : function() {
			if (!$('#form').Validform()) {
				return false;
			}
			toUrl('/api/gen/code?tables=' + vm.generator.tables
					+ '&module=' + vm.generator.module
					+ '&requestMapping=' + vm.generator.requestMapping
					+ '&viewPath=' + vm.generator.viewPath
					+ '&functionCode=' + vm.generator.functionCode
					+ '&type=' + vm.generator.type);
		}
	}
})
