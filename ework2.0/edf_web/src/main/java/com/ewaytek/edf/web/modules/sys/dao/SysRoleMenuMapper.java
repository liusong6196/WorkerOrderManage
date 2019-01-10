package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.sys.entity.SysRoleMenuEntity;

/**
 * 系统角色与菜单关系
 *
 * @author 张静普
 */
@Mapper
public interface SysRoleMenuMapper extends BaseMapper<SysRoleMenuEntity> {

	int batchRemoveByMenuId(Long[] id);
	
	int batchRemoveByRoleId(Long[] id);
	
	List<Long> listMenuId(Long id);
	
}
