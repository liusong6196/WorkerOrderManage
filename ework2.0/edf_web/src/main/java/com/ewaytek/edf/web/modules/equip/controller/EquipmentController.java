package com.ewaytek.edf.web.modules.equip.controller;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.customer.entity.CustomerEntity;
import com.ewaytek.edf.web.modules.customer.service.CustomerService;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentRecordEntity;
import com.ewaytek.edf.web.modules.equip.service.EquipmentRecordService;
import com.ewaytek.edf.web.modules.equip.service.EquipmentService;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 设备表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月12日 下午8:57:52
 */
@RestController
@RequestMapping("/api/equip")
public class EquipmentController  {
	
	@Autowired
	private EquipmentService equipmentService;
	
	@Autowired
	private SysDictService sysDictService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private EquipmentRecordService equipmentRecordService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<EquipmentEntity> list(@RequestBody Map<String, Object> params) {
		return equipmentService.listEquipment(params);
	}
		
	/**
	 * 新增
	 * @param equipment
	 * @return
	 */
	@SysLog("新增设备表")
	@RequestMapping("/save")
	public R save(@RequestBody EquipmentEntity equipment) {
		return equipmentService.saveEquipment(equipment);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return equipmentService.getEquipmentById(id);
	}
	
	/**
	 * 修改
	 * @param equipment
	 * @return
	 */
	@SysLog("修改设备表")
	@RequestMapping("/update")
	public R update(@RequestBody EquipmentEntity equipment) {
		equipment.setGmtModified(new Date());
		return equipmentService.updateEquipment(equipment);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除设备表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return equipmentService.batchRemove(id);
	}
	
	/**
	 * 新增
	 * @param equipment
	 * @return
	 */
	@RequestMapping("/equ_out")
	public R equOut(@RequestBody EquipmentEntity equipment) {
		return equipmentService.EquipmentOut(equipment);
	}
	
	/**
	 * 获取字段类型
	 * @param id
	 * @return
	 */
	@SysLog("获取字段类型")
	@RequestMapping("/gettype")
	@ResponseBody
	public Map<String,Object> getDataType(@RequestParam String type){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("type",type);
		List<SysDictEntity> bussiness=sysDictService.listSysDictAll(params);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("typedata", bussiness);
		return map;
	}
	
	@RequestMapping("/getequcount")
	@ResponseBody
	public Map<String,Object> getEquCount(@RequestParam("id")Long id) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		Integer count = equipmentService.getEquCount(id);
		map.put("count",count);
		return map;
	}
	
	/**
	 * 获取设备下拉框选项
	 * @return
	 */
	@RequestMapping("/getcustomers")
	@ResponseBody
	public Map<String,Object> getSelectEquject(){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<CustomerEntity> customers = customerService.getCustomerAll();
		map.put("customers",customers);
		return map;
	}
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/recordlist")
	public Page<EquipmentRecordEntity> recordlist(@RequestBody Map<String, Object> params) {
		return equipmentRecordService.listEquipmentRecord(params);
	}
	
}
