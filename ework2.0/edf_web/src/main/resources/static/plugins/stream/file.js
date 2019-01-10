
/**
 * 弹框上传
 */
var fileids = [];
var filenames = [];
var filesizes = [];

/**
 * 是否单文件上传 isSingleUpload   格式： true false  默认 false
 * 限制后缀limitSuffix           0:格式不限  1：只图片 2：只视频 3：只文档 4：只音乐
 * 是否保存到数据库 isSaveFileDb 格式： true 是  false 否  默认 true
 * 保存到位置  type  默认空,自动上传到attach目录
 */
var UPLOAD_FUN = {
		DIALOG: function(callback,isSingleUpload,limitSuffix,isSaveFileDb,Utype){
			//先清掉缓存
			fileids = [];
			filenames = [];
			filesizes = [];
			
			//文件类型
			var pic_type=[".jpg", ".gif",".jpeg",".png",".bmp"];
			var word_type=[".txt",".doc",".docx",".xls",".xlsx",".htm",".html",".css",".ppt",".pptx",".js",".jsp",".rtf",".pdf",".xml"];
			var video_type=[".flv", ".rmvb",".avi",".3gp",".mp4",".mkv",".mpg",".mts",".m2ts",".f4v",".mov",".vob",".wmv"];
			var music_type=[ ".mp3", ".wma",".wav",".ape",".flac",".aac",".mmf",".amr",".m4a",".m4r",".ogg",".mp2"];
			
			if(typeof(isSingleUpload) == "undefined"){
				isSingleUpload = false;
			}
			if(typeof(limitSuffix) == "undefined"){
				limitSuffix = 0;
			}
			
			if(typeof(isSaveFileDb) == "undefined"){
				isSaveFileDb = true;
			}
			
			if(typeof(Utype) == "undefined"){
				Utype = -1;
			}
			
			if(limitSuffix == 1){
				limitSuffix = pic_type;
			}else if(limitSuffix == 2){
				limitSuffix = video_type;
			}else if(limitSuffix == 3){
				limitSuffix = word_type;
			}else if(limitSuffix == 4){
				limitSuffix = music_type;
			}
			var htm = '';
			if(isSingleUpload && limitSuffix==0){
				htm = '只能上传一个文件<br>上传格式不限';
			}
			if(isSingleUpload && limitSuffix!=""){
				htm = '只能上传一个文件<br>上传格式为:'+limitSuffix+'';
			}
			var html = '<div style="width:600px;margin:15px" id="dialogUploadId">'+
							'<div id="i_select_files1" class="stream-upload-button" style="float: left;margin-top: 0px;border: 1px solid #4cae4c;padding: 5px 10px;'+
		    				'background: #5cb85c; color: #fff;border-radius: 5px;margin-bottom: 10px; cursor: pointer;"></div>'+
							'<div style="float: left;line-height: 16px;margin-left: 20px;color: #ff0000;">'+htm+'</div>'+
							'<div id="i_select_files" style="display:none"></div>'+
							'<div id="i_stream_files_queue"></div>'+
							//'<button onclick="javascript:_t.upload();">开始上传</button>|<button onclick="javascript:_t.stop();">停止上传</button>|<button onclick="javascript:_t.cancel();">取消</button>'+
							//'|<button onclick="javascript:_t.disable();">禁用文件选择</button>|<button onclick="javascript:_t.enable();">启用文件选择</button>'+
							//'|<button id="i_select_folder">上传文件夹</button>'+
							//'<button onclick="javascript:_t.destroy();_t=null;_t=new Stream(config);">销毁重新生成按钮</button>'+
							'<div style="margin: 12px 0 10px 2px;">上传结果：</div>'+
							'<div id="i_stream_message_container" class="stream-main-upload-box" style="overflow: auto;height:0px;display:none"></div>'+
							'<div id="i_stream_message_container1" class="stream-main-upload-box" style="overflow: auto;height:160px;padding:10px"></div>'+
						'</div>';
		    //询问框
		    layer.open({
		        type: 1,
		        content: html,
		        btn: ['确定', '取消'], //按钮
		        title: '文件上传',
		        area: ['640px',"380px"],
		        zIndex:9999999999,
		        yes: function (index) {
		        	
		            layer.close(index);
		            callback(fileids, filenames,filesizes);
		        }, cancel: function () {
		        },success: function(layero){
		        	streamConfig = initUpload(isSingleUpload,limitSuffix,isSaveFileDb,Utype);
		          	_t = new Stream(streamConfig);
		        }
		    });
		}
}
//初始化上传框
function initUpload(isSingleUpload,limitSuffix,isSaveFileDb,Utype){
		    var  num = 99999;
		    var uploadType = '';
		    if(isSingleUpload){
		    	num = 1;
		    }
		    var suffix = [];
		    if(limitSuffix!=""){
		    	suffix = limitSuffix;
		    }
		    uploadType = Utype;
		    
		    if($("#diskUploadFileBoxId")[0]){
		    	uploadType = 9999;
		    	isSaveFileDb = true;
		    }
		   /**
			 * 配置文件（如果没有默认字样，说明默认值就是注释下的值）
			 * 但是，on*（onSelect， onMaxSizeExceed...）等函数的默认行为
			 * 是在ID为i_stream_message_container的页面元素中写日志
			 */
		    var time = new Date().getTime();
		 	var fileArr = [];
			var config = {
				browseFileId : "i_select_files1", /** 选择文件的ID, 默认: i_select_files */
				browseFileBtn : "浏览文件", /** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */
				dragAndDropArea: "i_select_files", /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */
				filesQueueId : "i_stream_files_queue", /** 文件上传容器的ID, 默认: i_stream_files_queue */
				filesQueueHeight : 0, /** 文件上传容器的高度（px）, 默认: 450 */
				messagerId : "i_stream_message_container", /** 消息显示容器的ID, 默认: i_stream_message_container */
				multipleFiles: false, /** 多个文件一起上传, 默认: false */
				onRepeatedFile: function(f) {
					return true;	
				},
//				onAddTask: function(file) {
//					console.log("Add to task << name: [" + file.name);
//				}
				autoUploading: true, /** 选择文件后是否自动上传, 默认: true */
				autoRemoveCompleted : true, /** 是否自动删除容器中已上传完毕的文件, 默认: false */
				//maxSize: 200000000000, /** 单个文件的最大大小，默认:2G */
				retryCount : 5, /** HTML5上传失败的重试次数 */
				postVarsPerFile : { /** 上传文件时传入的参数，默认: {} */
					type : uploadType,
					personal : "",
				},
				swfURL : "./swf/FlashUploader.swf", /** SWF文件的位置 */
				tokenURL : "../../stream/tk", /** 根据文件名、大小等信息获取Token的URI（用于生成断点续传、跨域的令牌） */
				frmUploadURL : "../../stream/fd;", /** Flash上传的URI */
				uploadURL : "../../stream/upload", /** HTML5上传的URI */
				simLimit: num, /** 单次最大上传文件个数 */
				//extFilters: [".txt", ".rpm", ".rmvb", ".gz", ".rar", ".zip", ".avi", ".mkv", ".mp3"], /** 允许的文件扩展名, 默认: [] */
				extFilters: suffix, /** 允许的文件扩展名, 默认: [] */
			    onSelect: function(list) {
			    	fileArr = [];
			    	//如果在资源库里面
					if($("#diskUploadFileBoxId")[0]){
						$("#diskUploadFileBoxId").show();
					}
					}, /** 选择文件后的响应事件 */
				onMaxSizeExceed: function(size, limited, name) {layer.msg( "文件大小不能超过2G" ,{zIndex :99999999999} );}, /** 文件大小超出的响应事件 */
				onFileCountExceed: function(selected, limit) {layer.msg( "只能上传一个文件",{zIndex :99999999999} );}, /** 文件数量超出的响应事件 */
//				onExtNameMismatch: function(name, filters) {alert('onExtNameMismatch')}, /** 文件的扩展名不匹配的响应事件 */
//				onCancel : function(file) {alert('Canceled:  ' + file.name)}, /** 取消上传文件的响应事件 */
				onComplete: function(file) {
					 fileArr.push(file);
					// _t.destroy();_t=null;_t=new Stream(config);
				}, /** 单个文件上传完毕的响应事件 */
				onQueueComplete: function(files) {
					 for(var i=0;i<fileArr.length;i++){
						 var file = fileArr[i];
						 var filename = file.name;
						 
						 if(filename.indexOf("/")!=-1){
							 filename = filename.substring(0,filename.indexOf("/"));
						 }
						 var finalFileName = $.parseJSON(file.msg).finalFileName;
						 var FileSuffix =  finalFileName.substring(finalFileName.lastIndexOf(".")+1,finalFileName.length);
						 var FileSize = file.size;
						 var FileMd5 = finalFileName.substring(0,finalFileName.lastIndexOf("."));
						 //此处通过接口添加到服务器，添加完后返回文件id和name后，回填到页面上
						 writeFileInfo(filename, "上传完成");
						 fileids.push(finalFileName);
						 filenames.push(filename);
						 if(FileSize){
							 FileSize = changeToBk(FileSize)
						 }
						 filesizes.push(FileSize);
					 
						// console.log(fileIds.join(",")+"======"+nowDirectoryId);
					}
				}, /** 所以文件上传完毕的响应事件 */
//				onUploadError: function(status, msg) {alert('上传出现错误')} /** 文件上传出错的响应事件 */
//				onDestroy: function() {alert('onDestroy')} /** 文件上传出错的响应事件 */
			};
			return config;
	}
	
	function writeFileInfo(filename , str){
		$("#i_stream_message_container1").append("<div style='padding: 3px 15px;'><span>文件：</span> <span style='font-weight:bold'>"+filename+"</span><span style='padding-left:20px;color:green'>上传成功！</span></div>");
	}
	
	//检测一个变量是否是数组
	function is_array(v){
	    return toString.apply(v) === '[object Array]';
	}
	//检测一个变量是否在一个数组中
	//needle 待检测字符串
	//haystack 数组或者是以|分割的字符串
	function in_array(needle,haystack) {
	    haystack=is_array(haystack)?haystack:haystack.split("|");
	    if(typeof needle == 'string' || typeof needle == 'number') {
	        for(var i in haystack) {
	            if(haystack[i] == needle) {
	                return true;
	            }
	        }
	    }
	    return false;
	}
	
	//格式化文件大小
	function changeToBk(filesize){
		var ksizeStr = (filesize/1024).toFixed(1)+"KB";
		var ksize = (filesize/1024).toFixed(1);
		if(Number(ksize) > 1024){
			ksizeStr = (ksize/1024).toFixed(1)+"MB";
			ksize = (ksize/1024).toFixed(1);
		}
		if(Number(ksize)>1024){
			ksizeStr = (ksize/1024).toFixed(1)+"GB";
		}
		return ksizeStr;
	}
