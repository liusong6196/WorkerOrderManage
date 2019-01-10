package com.ewaytek.edf.web.modules.sys.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.entity.UserLevelEntity;

/**
 * 系统用户
 *
 * @author 张静普
 */
public interface SysUserService {

	Page<SysUserEntity> listUser(Map<String, Object> params);
	
	Page<SysUserEntity> listRessbook(Map<String, Object> params);
	
	R saveUser(SysUserEntity user);
	
	R getUserById(Long userId);
	
	R updateUser(SysUserEntity user);
	
	R batchRemove(Long[] id);
	
	Set<String> listUserPermSet(Long userId);
	
	Set<String> listUserRoleSet(Long userId);
	
	R listUserPerms(Long userId);
	
	R listUserRoles(Long userId);
	
	R updatePswdByUser(SysUserEntity user);
	
	R updateUserEnable(Long[] id);
	
	R updateUserDisable(Long[] id);
	
	R updatePswd(SysUserEntity user);
	
	R saveUserToken(Long userId,String isSame);
	
	R updateUserToken(Long userId);
	
	SysUserEntity getByUserName(String username);
	
     List<SysUserEntity> listAllUser();
     
     String getUserNameByUserId(Long id);
     
     List<SysUserEntity> depUser(Map<String, Object> params);

	SysUserEntity getByUserLogno(String userLogno);

	List<UserLevelEntity> getAllTerritorial();

	SysUserEntity getUserByDepId(String depId);
	
}
