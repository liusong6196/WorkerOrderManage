
$(function(){
	$.ajax({
		type: "post",
		url : '../../api/pro/infoentity?_' + $.now(),
		data:{
			id:GetQueryString("id"),
		},
		success: function (data) {
			$("#proName").html(data.pro.proName);
			$("#proNumber").html(data.pro.proName);
			var protype=data.pro.proType;
			if(protype=="1"){
				protype="售前";
			}
			if(protype=="2"){
				protype="实施";
			}
			if(protype=="3"){
				protype="售后";
			}
			if(protype=="4"){
				protype="研发";
			}
			$("#proType").html(protype);
			$("#proDevelopmanager").html(data.pro.proDevelopmanagername);
			$("#proDate").html(data.pro.proStartdate+"至"+data.pro.proEnddate);
		}
	});
});

 

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}