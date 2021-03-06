package com.ewaytek.edf.web.modules.sys.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysRoleEntity;
import com.ewaytek.edf.web.modules.sys.service.SysRoleService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 系统角色
 * @author 张静普
 */
@RestController
@RequestMapping("/api/sys/role")
public class SysRoleController {

	@Autowired
	private SysRoleService sysRoleService;
	
	/**
	 * 角色列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<SysRoleEntity> list(@RequestBody Map<String, Object> params) {
		return sysRoleService.listRole(params);
	}
	
	/**
	 * 用户角色
	 * @return
	 */
	@RequestMapping("/select")
	public R listRole() {
		return sysRoleService.listRole();
	}
	
	/**
	 * 新增角色
	 * @param role
	 * @return
	 */
	@SysLog("新增角色")
	@RequestMapping("/save")
	public R saveRole(@RequestBody SysRoleEntity role) {
		role.setUserIdCreate(ShiroUtils.getUserId());
		return sysRoleService.saveRole(role);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getRoleById(@RequestBody Long id) {
		return sysRoleService.getRoleById(id);
	}
	
	/**
	 * 修改角色
	 * @param role
	 * @return
	 */
	@SysLog("修改角色")
	@RequestMapping("/update")
	public R updateRole(@RequestBody SysRoleEntity role) {
		return sysRoleService.updateRole(role);
	}
	
	/**
	 * 批量删除
	 * @param id
	 * @return
	 */
	@SysLog("删除角色")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return sysRoleService.batchRemove(id);
	}
	
	/**
	 * 分配权限
	 * @param role
	 * @return
	 */
	@SysLog("操作权限")
	@RequestMapping("/authorize/opt")
	public R updateRoleOptAuthorization(@RequestBody SysRoleEntity role) {
		return sysRoleService.updateRoleOptAuthorization(role);
	}
}
