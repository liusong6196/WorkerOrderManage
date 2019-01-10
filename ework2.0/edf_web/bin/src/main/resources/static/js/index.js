//生成菜单
var menuItem = Vue
		.extend({
			name : 'menu-item',
			props : {
				item : {}
			},
			template : [
					'<li>',
					'<a v-if="item.type === 0" href="javascript:;">',
					'<i v-if="item.icon != null" :class="item.icon"></i>',
					'<span>{{item.name}}</span>',
					'<i class="fa fa-angle-left pull-right"></i>',
					'</a>',
					'<ul v-if="item.type === 0" class="treeview-menu">',
					'<menu-item :item="item" v-for="item in item.list"></menu-item>',
					'</ul>',
					'<a v-if="item.type === 1" :href="\'#\'+item.url"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>',
					'</li>' ].join('')
		});

// iframe自适应
$(window).on('resize', function() {
	var $content = $('.content');
	$content.height($(this).height() - 110);
	$content.find('iframe').each(function() {
		$(this).height($content.height());
	});
}).resize();

// 注册菜单组件
Vue.component('menuItem', menuItem);
// 默认是收缩状态
var isSidebarCollapse = true;

var vm = new Vue({
	el : '#eway',
	data : {
		user : {},
		menuList : {},
		main : "sys/index/main.html",
		pswd : null,
		newPswd : null,
		navTitle : "控制台"
	},
	methods : {
		hideMenu : function() {
			if (!$("body").hasClass("sidebar-collapse")) {
				$("body").addClass("sidebar-collapse");
				removeScroll();
				isSidebarCollapse = true;
			} else {
				$("body").removeClass("sidebar-collapse");
				setScroll();
				isSidebarCollapse = false;
			}
		},
		getMenuList : function(event) {
			$.getJSON("api/sys/menu/user?_" + $.now(), function(r) {
				vm.menuList = r.menuList;
			});
		},
		getPermList : function(event) {
			$.getJSON("api/sys/user/perms?_" + $.now(), function(r) {
				window.perms = r.rows;
			});
		},
		getUser : function() {
			$.getJSON("api/sys/user/info?_" + $.now(), function(r) {
				vm.user = r.user;
			});
		},
		updatePassword : function() {
			dialogContent({
				title : "修改密码",
				width : '420px',
				height : '250px',
				content : $("#passwordLayer"),
				btn : [ '确定', '取消' ],
				yes : function(index) {
					if(isNullOrEmpty(vm.pswd)) {
						dialogMsg('原密码为空！');
						return false;
					}
					if(isNullOrEmpty(vm.newPswd)) {
						dialogMsg('新密码为空！');
						return false;
					}
					var data = "pswd=" + vm.pswd + "&newPswd="
							+ vm.newPswd;
					$.ajax({
						type : "POST",
						url : "api/sys/user/updatePswd?_" + $.now(),
						data : data,
						dataType : "json",
						success : function(result) {
							if (result.code == 0) {
								layer.close(index);
								dialogMsg(result.msg, 'success');
								location.reload();
							} else {
								dialogAlert(result.msg, 'error');
							}
						}
					});
				}
			});
		},
		logout : function() {
			layer.open({
				title : '系统提示',
				area : '338px',
				icon : 3,
				anim : -1,
				isOutAnim : false,
				move : false,
				content : '注：您确定要安全退出本次登录吗？',
				btn : [ '确定', '取消' ],
				btnAlign : 'c',
				yes : function() {
					dialogLoading(true);
					setTimeout(function() {
						$.ajax({
			                type: "POST",
			                url: "api/sys/logout",
			                dataType: "json",
			                success: function(r){
			                    localStorage.removeItem("token");
			                    toUrl('login.html');
			                }
			            });
					}, 500);
				}
			});
		}
	},
	created : function() {
		this.getMenuList();
		this.getPermList();
		this.getUser();
		// 菜单点击事件
		$(document).off('click', ".sidebar-menu li a").on('click', ".sidebar-menu li a", function(e) {
			var $this = $(this);
			if (isSidebarCollapse && $this.parent().parent().hasClass('sidebar-menu')) {
				e.preventDefault();
				return false;
			}
			var checkElement = $this.next();
			if ((checkElement.is('.treeview-menu'))
					&& (checkElement.is(':visible'))) {
				checkElement.slideUp('fast', function() {
					checkElement.removeClass('menu-open');
				});
				checkElement.parent("li").removeClass("active");
			} else if ((checkElement.is('.treeview-menu'))
					&& (!checkElement.is(':visible'))) {
				var parent = $this.parents('ul').first();
				var ul = parent.find('ul:visible').slideUp('fast');
				ul.removeClass('menu-open');
				var parent_li = $this.parent("li");

				checkElement.slideDown('fast', function() {
					checkElement.addClass('menu-open');
					parent.find('li.active').removeClass('active');
					parent_li.addClass('active');
					
					var _height1 = $(window).height() - $("#sidebar-menu >li.active").position().top - 41;
                    var _height2 = $("#sidebar-menu li > ul.menu-open").height() + 10
                    if (_height2 > _height1) {
                        $("#sidebar-menu >li > ul.menu-open").css({
                            overflow: "auto",
                            height: _height1
                        })
                    }
					
				});
			}
			if (checkElement.is('.treeview-menu')) {
				e.preventDefault();
			}
		});
		
		$(document).on('mouseenter', '.sidebar>.sidebar-menu>li', function(){
			$('.sidebar-menu>li:eq(' + $(this).index() + ')').siblings().addClass('displayAll');
			$('.sidebar>.toAll>div').addClass('second');
			$('.sidebar>.sidebar-menu>li>a>.pull-right').removeClass("fa-angle-left").addClass("fa-angle-right");
		}).on('mouseleave', '.sidebar>.sidebar-menu>li', function() {
			$('.sidebar-menu>li').removeClass('displayAll');
			$('.sidebar>.toAll>div').removeClass('second');
			let treeView = $(this).children(".treeview-menu");
			treeView.removeAttr("style");
			treeView.removeClass("active");
			$('.sidebar>.sidebar-menu>li>a>.pull-right').removeClass("fa-angle-right").addClass("fa-angle-left");
		}).on('mouseenter', '.sidebar>.sidebar-menu>li>a>span', function() {
			let treeView = $(this).parent().siblings(".treeview-menu");
			treeView.addClass("active");
			treeView.height($('.sidebar').innerHeight());
		}).on('mouseleave', '.sidebar>.sidebar-menu>li>a>span', function() {
			$(this).parent().siblings(".treeview-menu").removeAttr("style");
			$(this).parent().siblings(".treeview-menu").removeClass("active");
		}).on('mouseenter', '.sidebar>.sidebar-menu>li>.treeview-menu', function() {
			$(this).addClass("active");
			$(this).height($('.sidebar').innerHeight());
		}).on('click', '.treeview-menu li a', function() {
			if ($(this).next().size() == 0) {
				$(this).parents('li:last').siblings().removeClass('active').find('li').removeClass('active');
			}
		});
	},
	updated : function() {
		// 路由
		var router = new Router();
		routerList(router, vm.menuList);
		router.start();
		//默认展开第一个菜单
		if(!$('.sidebar-menu li').hasClass('active')) {
			$('.sidebar-menu li:eq(1)').addClass('active');
		}
		//自适应滚动条
		setScroll();
		if ($("body").hasClass("sidebar-collapse")) {
			removeScroll();
		}
	}
});

function routerList(router, menuList) {
	for ( var key in menuList) {
		var menu = menuList[key];
		if (menu.type == 0) {
			routerList(router, menu.list);
		} else if (menu.type == 1) {
			router.add('#' + menu.url, function() {
				var url = window.location.hash;

				// 替换iframe的url
				vm.main = url.replace('#', '');

				// 导航菜单展开
				$(".treeview-menu li").removeClass("active");
				$("a[href='" + url + "']").parents("li").addClass("active");

				vm.navTitle = $("a[href='" + url + "']").text();
			});
		}
	}
}


//菜单滚动条自适应
function setScroll(){
    $("#sidebar-menu").slimScroll({
        height: $(this).height() - 15,
        alwaysVisible: false,
    });
    $(window).on("resize", function() {
    	$("#sidebar-menu").slimScroll({
            height: $(this).height() - 15,
            alwaysVisible: false,
        });
    });
}

function removeScroll() {
	$('.sidebar').prepend($('#sidebar-menu'));
	$('#sidebar-menu').removeAttr('style');
	$('.slimScrollDiv').remove();
	addFillRegion();
}

// 添加填充域
function addFillRegion() {
	if($('.sidebar>.toAll').size() <= 0){
		$('.sidebar-menu').after("<div class='toAll'><div class=''></div></div>");
	}
	let sidebarHeight = $('.sidebar-menu').innerHeight();
	mainSidebarHeight = $(window).innerHeight();
	if (sidebarHeight < mainSidebarHeight && sidebarHeight > 0) {
		let fillHeight = mainSidebarHeight - sidebarHeight;
		$('.sidebar>.toAll').height(fillHeight);
		$('.sidebar>.toAll>div').height(fillHeight);
	}
}
