package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.sys.entity.SysRoleEntity;

/**
 * 系统角色
 *
 * @author 张静普
 */
@Mapper
public interface SysRoleMapper extends BaseMapper<SysRoleEntity> {
	
	List<String> listUserRoles(Long userId);
	
}
