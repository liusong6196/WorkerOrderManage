package com.ewaytek.edf.web.modules.sys.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.common.utils.MD5Utils;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.entity.UserLevelEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 系统用户
 *
 * @author 张静普
 */
@RestController
@RequestMapping("/api/sys/user")
public class SysUserController {
	
	@Autowired
	private SysUserService sysUserService;
	
	@RequestMapping("/getUserId")
	private Long getUserId(){
		return ShiroUtils.getUserId();
	}
	
	/**
	 * 用户列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:user:list")
	public Page<SysUserEntity> list(@RequestBody Map<String, Object> params) {
		return sysUserService.listUser(params);
	}
	
	/**
	 * 通讯录
	 * @param params
	 * @return
	 */
	@RequestMapping("/ressbook")
	public Page<SysUserEntity> ressbook(@RequestBody Map<String, Object> params) {
		return sysUserService.listRessbook(params);
	}
	
	
	@RequestMapping("/all")
	@ResponseBody
	public List<SysUserEntity>  getAlluser(){
		return sysUserService.listAllUser();
	}
	
	/**
	 *用户下拉列表
	 */
	@RequestMapping("/userList")
	@ResponseBody
	public R userList(){
		return CommonUtils.msgNotCheckNull(sysUserService.listAllUser()) ;
	}
	
	/**
	 * 获取登录的用户信息
	 */
	@RequestMapping("/info")
	public R info(){
		return R.ok().put("user", ShiroUtils.getUserEntity());
	}
	
	/**
	 * 用户权限
	 * @return
	 */
	@RequestMapping("/perms")
	public R listUserPerms() {
		return sysUserService.listUserPerms(ShiroUtils.getUserId());
	}
	
	@RequestMapping("/userInfo")
	public R getUserInfo(Long userId){
		String userName=sysUserService.getUserNameByUserId(userId);
		return R.ok().put("userName", userName);
	}
	
	/**
	 * 新增用户
	 * @param user
	 * @return
	 */
	@SysLog("新增用户")
	@RequestMapping("/save")
	public R save(@RequestBody SysUserEntity user) {
		return sysUserService.saveUser(user);
	}
	
	/**
	 * 根据id查询详情
	 * @param userId
	 * @return
	 */
	@RequestMapping("/infoUser")
	public R getById(@RequestBody Long userId) {
		return sysUserService.getUserById(userId);
	}
	
	/**
	 * 修改用户
	 * @param user
	 * @return
	 */
	@SysLog("修改用户")
	@RequestMapping("/update")
	public R update(@RequestBody SysUserEntity user) {
		return sysUserService.updateUser(user);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除用户")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return sysUserService.batchRemove(id);
	}
	
	/**
	 * 用户修改密码
	 * @param pswd
	 * @param newPswd
	 * @return
	 */
	@SysLog("修改密码")
	@RequestMapping("/updatePswd")
	public R updatePswdByUser(String pswd, String newPswd) {
		SysUserEntity user = ShiroUtils.getUserEntity();
		//所传密码加密
		String pswd1 = MD5Utils.encrypt(pswd);
		//判断原密码是否相等
		if(!user.getPassword().equals(pswd1)) {
			return R.error("原密码错误！");
		}
		user.setPassword(newPswd);//
		return sysUserService.updatePswdByUser(user);
	}
	
	/**
	 * 启用账户
	 * @param id
	 * @return
	 */
	@SysLog("启用账户")
	@RequestMapping("/enable")
	public R updateUserEnable(@RequestBody Long[] id) {
		return sysUserService.updateUserEnable(id);
	}
	
	/**
	 * 禁用账户
	 * @param id
	 * @return
	 */
	@SysLog("禁用账户")
	@RequestMapping("/disable")
	public R updateUserDisable(@RequestBody Long[] id) {
		return sysUserService.updateUserDisable(id);
	}
	
	/**
	 * 重置密码
	 * @param user
	 * @return
	 */
	@SysLog("重置密码")
	@RequestMapping("/reset")
	public R updatePswd(@RequestBody SysUserEntity user) {
		return sysUserService.updatePswd(user);
	}
	
	/**
	 * 获取所有用户级别
	 * @return
	 */
	@RequestMapping("/allTerritorial")
	@ResponseBody
	public List<UserLevelEntity>  getAllTerritorial(){
		return sysUserService.getAllTerritorial();
	}
	
	/**
	 * 根据部门ID查询用户信息
	 * @return
	 */
	@RequestMapping("/getUserByDepId")
	@ResponseBody
	public SysUserEntity  getUserByDepId(String depId){
		return sysUserService.getUserByDepId(depId);
	}
}
