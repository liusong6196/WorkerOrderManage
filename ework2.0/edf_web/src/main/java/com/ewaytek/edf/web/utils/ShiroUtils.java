package com.ewaytek.edf.web.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;

/**
 * 用户Shiro Utils
 * @author 张静普
 */
public class ShiroUtils {

	/**
	 * 获取Session信息
	 * @return
	 */
	public static Session getSession() {
		return SecurityUtils.getSubject().getSession();
	}

	/**
	 * 获取登陆的票据
	 * @return
	 */
	public static Subject getSubject() {
		return SecurityUtils.getSubject();
	}
	
	/**
	 * 获取登陆用户
	 * @return
	 */
	public static SysUserEntity getUserEntity() {
		return (SysUserEntity)SecurityUtils.getSubject().getPrincipal();
	}

	/**
	 * 获取用户ID
	 * @return
	 */
	public static Long getUserId() {
		return getUserEntity().getUserId();
	}
	
	/**
	 * 设置用户的信息
	 * @param key
	 * @param value
	 */
	public static void setSessionAttribute(Object key, Object value) {
		getSession().setAttribute(key, value);
	}

	/**
	 * 获取用户的信息
	 * @param key
	 * @return
	 */
	public static Object getSessionAttribute(Object key) {
		return getSession().getAttribute(key);
	}

	/**
	 * 是否登陆
	 * @return
	 */
	public static boolean isLogin() {
		return SecurityUtils.getSubject().getPrincipal() != null;
	}

	/**
	 * 退出登陆
	 */
	public static void logout() {
		SecurityUtils.getSubject().logout();
	}
	
	/**
	 * 获取验证码
	 * @param key
	 * @return
	 */
	public static String getKaptcha(String key) {
		String kaptcha = getSessionAttribute(key).toString();
		getSession().removeAttribute(key);
		return kaptcha;
	}
	
}
