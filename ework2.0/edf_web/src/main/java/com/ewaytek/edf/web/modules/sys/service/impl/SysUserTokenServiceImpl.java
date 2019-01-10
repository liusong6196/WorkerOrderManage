package com.ewaytek.edf.web.modules.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.web.modules.sys.dao.SysUserTokenMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysUserTokenEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserTokenService;

/**
 * 系统用户
 *
 * @author 张静普
 */
@Service
public class SysUserTokenServiceImpl implements SysUserTokenService {

	
	/**
	 * 用户Token管理
	 */
	@Autowired
	private SysUserTokenMapper sysUserTokenMapper;

	@Override
	public SysUserTokenEntity getByToken(String token) {
		// TODO Auto-generated method stub
		return sysUserTokenMapper.getByToken(token);
	}
	
	
}
