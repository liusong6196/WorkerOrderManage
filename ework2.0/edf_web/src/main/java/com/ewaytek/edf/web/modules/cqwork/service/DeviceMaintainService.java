package com.ewaytek.edf.web.modules.cqwork.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.cqwork.entity.DeviceMaintainEntity;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2019年8月27日 上午9:38:01
 */
public interface DeviceMaintainService {

	Page<DeviceMaintainEntity> listDeviceMaintain(Map<String, Object> params);
	
	R saveDeviceMaintain(DeviceMaintainEntity deviceMaintain);
	
	R getDeviceMaintainById(Long id);
	
	R updateDeviceMaintain(DeviceMaintainEntity deviceMaintain);
	
	R batchRemove(Long[] id);
	
}
