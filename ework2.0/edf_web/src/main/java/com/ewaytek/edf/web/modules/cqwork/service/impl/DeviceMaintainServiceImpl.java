package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.cqwork.entity.DeviceMaintainEntity;
import com.ewaytek.edf.web.modules.cqwork.dao.DeviceMaintainMapper;
import com.ewaytek.edf.web.modules.cqwork.service.DeviceMaintainService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2019年8月27日 上午9:38:01
 */
@Service("deviceMaintainService")
public class DeviceMaintainServiceImpl implements DeviceMaintainService {

	@Autowired
	private DeviceMaintainMapper deviceMaintainMapper;

	@Override
	public Page<DeviceMaintainEntity> listDeviceMaintain(Map<String, Object> params) {
		Query query = new Query(params);
		Page<DeviceMaintainEntity> page = new Page<>(query);
		deviceMaintainMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveDeviceMaintain(DeviceMaintainEntity role) {
		int count = deviceMaintainMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getDeviceMaintainById(Long id) {
		DeviceMaintainEntity deviceMaintain = deviceMaintainMapper.getObjectById(id);
		return CommonUtils.msg(deviceMaintain);
	}

	@Override
	public R updateDeviceMaintain(DeviceMaintainEntity deviceMaintain) {
		int count = deviceMaintainMapper.update(deviceMaintain);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = deviceMaintainMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
