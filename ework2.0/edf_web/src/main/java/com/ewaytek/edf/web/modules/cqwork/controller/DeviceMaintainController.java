package com.ewaytek.edf.web.modules.cqwork.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.cqwork.entity.DeviceMaintainEntity;
import com.ewaytek.edf.web.modules.cqwork.service.DeviceMaintainService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2019年8月27日 上午9:38:01
 */
@RestController
@RequestMapping("/api/device")
public class DeviceMaintainController  {
	
	@Autowired
	private DeviceMaintainService deviceMaintainService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<DeviceMaintainEntity> list(@RequestBody Map<String, Object> params) {
		return deviceMaintainService.listDeviceMaintain(params);
	}
		
	/**
	 * 新增
	 * @param deviceMaintain
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody DeviceMaintainEntity deviceMaintain) {
		return deviceMaintainService.saveDeviceMaintain(deviceMaintain);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return deviceMaintainService.getDeviceMaintainById(id);
	}
	
	/**
	 * 修改
	 * @param deviceMaintain
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody DeviceMaintainEntity deviceMaintain) {
		return deviceMaintainService.updateDeviceMaintain(deviceMaintain);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return deviceMaintainService.batchRemove(id);
	}
	
}
