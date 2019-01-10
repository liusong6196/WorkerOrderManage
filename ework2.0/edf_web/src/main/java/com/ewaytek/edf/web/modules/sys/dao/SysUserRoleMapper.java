package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.sys.entity.SysUserRoleEntity;

/**
 * 用户与角色关系
 *
 * @author 张静普
 */
@Mapper
public interface SysUserRoleMapper extends BaseMapper<SysUserRoleEntity> {

	List<Long> listUserRoleId(Long userId);
	
	int batchRemoveByUserId(Long[] id);
	
	int batchRemoveByRoleId(Long[] id);
	
}
