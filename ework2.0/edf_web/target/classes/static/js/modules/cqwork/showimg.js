/**
 * 编辑-js
 */


function bigimg(obj){
    //alert(parseInt(obj.style.zoom,10));
    var zoom = parseInt(obj.style.zoom,10)||100;
    zoom += event.wheelDelta / 12;
    if(zoom > 0 )
        obj.style.zoom=zoom+'%';
    return false;
}

$(function () {

	
});

var vm = new Vue({
	el:'#eway',
	data: {
		workorder: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
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
			var imgurl = vm.workorder.imgurl;
			var imgpath = imgurl.substring(imgurl.length-17);
			var basedomain = "http://"+ window.location.host
			var url = basedomain + "/api/cqwork/geterrorimg?imgPath="+imgpath+"&token="+token;
			$("#errimg").attr("src",url);
		}
	}
})