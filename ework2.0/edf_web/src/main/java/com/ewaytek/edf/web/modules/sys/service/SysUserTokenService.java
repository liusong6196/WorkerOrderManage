package com.ewaytek.edf.web.modules.sys.service;

import com.ewaytek.edf.web.modules.sys.entity.SysUserTokenEntity;

/**
 * 系统用户
 *
 * @author 张静普
 */
public interface SysUserTokenService {

	SysUserTokenEntity getByToken(String token);
	
}
