package com.ewaytek.edf.web.modules.sys.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.sys.entity.SysUserTokenEntity;

/**
 * 用户token
 *
 * @author 张静普
 */
@Mapper
public interface SysUserTokenMapper extends BaseMapper<SysUserTokenEntity> {

	SysUserTokenEntity getByToken(String token);
	
	SysUserTokenEntity getByUserId(Long userId);
	
}
