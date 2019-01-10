package com.ewaytek.edf.web.modules.sys.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.constant.MsgConstant;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.dao.SysMenuMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysUserMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysMenuEntity;
import com.ewaytek.edf.web.modules.sys.service.SysMenuService;

/**
 * 系统菜单
 *
 * @author 张静普
 */
@Service("sysMenuService")
public class SysMenuServiceImpl implements SysMenuService {

	@Autowired
	private SysMenuMapper sysMenuMapper;
	
	@Autowired
	private SysUserMapper sysUserMapper;

	@Override
	public R listUserMenu(Long userId) {
		List<Long> menuIdList = sysUserMapper.listAllMenuId(userId);
		
		List<SysMenuEntity> userMenuList =  getAllMenuList(menuIdList);
		
		return R.ok().put("menuList", userMenuList);
	}
	
	/**
	 * 获取所有菜单列表
	 */
	private List<SysMenuEntity> getAllMenuList(List<Long> menuIdList){
		//查询根菜单列表
		List<SysMenuEntity> menuList = listParentId(0L, menuIdList);
		//递归获取子菜单
		getMenuTreeList(menuList, menuIdList);
		
		return menuList;
	}
	
	/**
	 * 递归
	 */
	private List<SysMenuEntity> getMenuTreeList(List<SysMenuEntity> menuList, List<Long> menuIdList){
		List<SysMenuEntity> subMenuList = new ArrayList<SysMenuEntity>();
		
		for(SysMenuEntity entity : menuList){
			if(entity.getType() == 0){//目录
				entity.setList(getMenuTreeList(listParentId(entity.getMenuId(), menuIdList), menuIdList));
			}
			subMenuList.add(entity);
		}
		return subMenuList;
	}
	
	/**
	 * 获取所有的父级节点
	 * @param parentId
	 * @param menuIdList
	 * @return
	 */
	public List<SysMenuEntity> listParentId(Long parentId, List<Long> menuIdList) {
		List<SysMenuEntity> menuList = sysMenuMapper.listParentId(parentId);
		if(menuIdList == null){
			return menuList;
		}
		
		List<SysMenuEntity> userMenuList = new ArrayList<>();
		for(SysMenuEntity menu : menuList){
			if(menuIdList.contains(menu.getMenuId())){
				userMenuList.add(menu);
			}
		}
		return userMenuList;
	}

	/**
	 * 获取所有菜单
	 */
	@Override
	public List<SysMenuEntity> listMenu(Map<String, Object> params) {
		Query query = new Query(params);
		List<SysMenuEntity> menuList = sysMenuMapper.list(query);
		return menuList;
	}

	@Override
	public R listNotButton() {
		List<SysMenuEntity> menuList = sysMenuMapper.listNotButton();
		SysMenuEntity root = new SysMenuEntity();
		root.setMenuId(0L);
		root.setName("一级菜单");
		root.setParentId(-1L);
		root.setOpen(true);
		menuList.add(root);
		return CommonUtils.msgNotCheckNull(menuList);
	}

	@Override
	public R saveMenu(SysMenuEntity menu) {
		int count = sysMenuMapper.save(menu);
		return CommonUtils.msg(count);
	}

	@Override
	public R getMenuById(Long id) {
		SysMenuEntity menu = sysMenuMapper.getObjectById(id);
		return CommonUtils.msg(menu);
	}

	@Override
	public R updateMenu(SysMenuEntity menu) {
		int count = sysMenuMapper.update(menu);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		
		boolean children = false;
		for(Long parentId : id) {
			int count = sysMenuMapper.countMenuChildren(parentId);
			if(CommonUtils.isIntThanZero(count)) {
				children = true;
				break;
			}
		}
		
		if(children) {
			return R.error(MsgConstant.MSG_HAS_CHILD);
		}
		int count = sysMenuMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
