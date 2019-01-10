package com.ewaytek.edf.web.modules.sys.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.MD5Utils;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 用户登陆controller
 * @author 张静普
 */
@RestController
@RequestMapping("/api/sys")
public class SysLoginController {

	/**
	 * 用户管理服务
	 */
	@Autowired
	private SysUserService sysUserService;
	
	/**
	 * 登录
	 */
	@SysLog("登录")
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public R login(String username, String password,String isSame)throws IOException {
		SysUserEntity user1 = sysUserService.getByUserName(username);
		if(user1 == null) {
			SysUserEntity user2 = sysUserService.getByUserLogno(username);
			if(user2 == null) {
				return R.error("该用户不存在");
			}else {
				username = user2.getUsername();
				user1 = user2;
			}
		}
		
		if(user1.getStatus() == 0) {
			return R.error("账号已被锁定,请联系管理员");
		}

		password = MD5Utils.encrypt(password);
		if(!user1.getPassword().equals(password) ) {
			return R.error("密码错误");
		}
		return sysUserService.saveUserToken(user1.getUserId(),isSame);
	
	}
	
	/**
	 * 退出
	 */
	@SysLog("退出系统")
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public R logout() {		
		R r = sysUserService.updateUserToken(ShiroUtils.getUserId());
		ShiroUtils.logout();
		return r;
	}

}
