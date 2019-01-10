package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.entity.UserLevelEntity;

/**
 * 系统用户dao
 *
 * @author 张静普
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUserEntity> {

	SysUserEntity getByUserName(String username);
	
	List<Long> listAllMenuId(Long userId);
	
	int updatePswdByUser(Long userId,String pswd,String newPswd);
	
	int updateUserStatus(Query query);
	
	int updatePswd(SysUserEntity user);
	
	List<SysUserEntity> listAllUser();
	
	List<SysUserEntity> depUser(Map<String, Object> params);

	List<SysUserEntity> listForPageRessbook(Page<SysUserEntity> page, Query form);

	SysUserEntity getByUserLogno(String userLogno);

	List<UserLevelEntity> getAllTerritorial();

	SysUserEntity getUserByDepId(String depId);

}
