package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.cqwork.entity.DeviceMaintainEntity;
import com.ewaytek.edf.web.modules.cqwork.entity.WorkorderEntity;
import com.ewaytek.edf.web.modules.cqwork.dao.DeviceMaintainMapper;
import com.ewaytek.edf.web.modules.cqwork.dao.WorkorderMapper;
import com.ewaytek.edf.web.modules.cqwork.service.DeviceMaintainService;
import com.ewaytek.edf.web.utils.DateUtils;
import com.ewaytek.edf.web.utils.ShiroUtils;

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
	
	@Autowired
	private WorkorderMapper workorderMapper;

	@Override
	public Page<DeviceMaintainEntity> listDeviceMaintain(Map<String, Object> params) {
		Query query = new Query(params);
		Page<DeviceMaintainEntity> page = new Page<>(query);
		deviceMaintainMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveDeviceMaintain(DeviceMaintainEntity role) {
		role.setCreateTime(DateUtils.getDefaultTime());
		role.setProcessStatus("0");
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

	@Transactional
	@Override
	public R updateDeviceProcessStatus(Integer id) {
		deviceMaintainMapper.updateDeviceProcessStatus(id,DateUtils.getDefaultTime());
		DeviceMaintainEntity dev = deviceMaintainMapper.getObjectById(id);
		WorkorderEntity workOrder = new WorkorderEntity();
		workOrder.setArea(dev.getDistArea());
		workOrder.setTown(dev.getDistTown());
		workOrder.setVillage(dev.getDistVillage());
		workOrder.setName(dev.getUserName());
		workOrder.setProject(dev.getProject());
		workOrder.setType("设备问题");
		workOrder.setOccurDate(DateUtils.DateParse(dev.getCreateTime()));
		workOrder.setTel(dev.getUserTel());
		workOrder.setDescription(dev.getProblemDesc());
		workOrder.setMethod(dev.getPromethod());
		workOrder.setManner("其他方式");
		workOrder.setSource("设备故障反馈平台");
		workOrder.setProcessTime(dev.getProtime());
		workOrder.setStatus("1");
		workOrder.setProcessUser(ShiroUtils.getUserEntity().getUsername());
		workOrder.setBelong("1");
		int count = workorderMapper.save(workOrder);
		return CommonUtils.msg(count);
	}

}
