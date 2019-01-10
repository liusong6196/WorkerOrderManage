package com.ewaytek.edf.web.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.dao.SysRoleMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysRoleMenuMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysRoleEntity;
import com.ewaytek.edf.web.modules.sys.service.SysRoleService;

/**
 * 系统角色
 *
 * @author 张静普
 */
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {

	@Autowired
	private SysRoleMapper sysRoleMapper;
	
	@Autowired
	private SysRoleMenuMapper sysRoleMenuMapper;

	@Override
	public Page<SysRoleEntity> listRole(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SysRoleEntity> page = new Page<>(query);
		sysRoleMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveRole(SysRoleEntity role) {
		int count = sysRoleMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getRoleById(Long id) {
		SysRoleEntity role = sysRoleMapper.getObjectById(id);
		
		List<Long> menuId = sysRoleMenuMapper.listMenuId(id);
		role.setMenuIdList(menuId);
		
		return CommonUtils.msg(role);
	}

	@Override
	public R updateRole(SysRoleEntity role) {
		int count = sysRoleMapper.update(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = sysRoleMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public R listRole() {
		List<SysRoleEntity> roleList = sysRoleMapper.list();
		return CommonUtils.msgNotCheckNull(roleList);
	}

	@Override
	public R updateRoleOptAuthorization(SysRoleEntity role) {
		
		Long roleId = role.getRoleId();
		int count = sysRoleMenuMapper.remove(roleId);
		Query query = new Query();
		query.put("roleId", roleId);
		List<Long> menuId = role.getMenuIdList();
		if(menuId.size() > 0) {
			query.put("menuIdList", role.getMenuIdList());
			count = sysRoleMenuMapper.save(query);
		}
		
		return CommonUtils.msg(count);
	}
}
