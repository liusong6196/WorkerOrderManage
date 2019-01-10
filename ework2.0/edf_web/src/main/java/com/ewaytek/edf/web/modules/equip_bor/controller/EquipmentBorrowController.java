package com.ewaytek.edf.web.modules.equip_bor.controller;

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
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.equip.service.EquipmentService;
import com.ewaytek.edf.web.modules.equip_bor.entity.EquipmentBorrowEntity;
import com.ewaytek.edf.web.modules.equip_bor.service.EquipmentBorrowService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 设备借用表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:29:26
 */
@RestController
@RequestMapping("/api/equ_bor")
public class EquipmentBorrowController  {
	
	@Autowired
	private EquipmentBorrowService equipmentBorrowService;
	
	@Autowired
	private EquipmentService equipmentService;
	
	@Autowired
	private SysUserService sysUserService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<EquipmentBorrowEntity> list(@RequestBody Map<String, Object> params) {
		return equipmentBorrowService.listEquipmentBorrow(params);
	}
		
	/**
	 * 新增
	 * @param equipmentBorrow
	 * @return
	 */
	@SysLog("新增设备借用表")
	@RequestMapping("/save")
	public R save(@RequestBody EquipmentBorrowEntity equipmentBorrow) {
		equipmentBorrow.setGmtCreate(new Date());
		equipmentBorrow.setBorRetState("1");
		equipmentBorrow.setRetCount(0);
		equipmentBorrow.setUserIdCreate(ShiroUtils.getUserId());
		return equipmentBorrowService.saveEquipmentBorrow(equipmentBorrow);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return equipmentBorrowService.getEquipmentBorrowById(id);
	}
	
	/**
	 * 修改
	 * @param equipmentBorrow
	 * @return
	 */
	@SysLog("修改设备借用表")
	@RequestMapping("/update")
	public R update(@RequestBody EquipmentBorrowEntity equipmentBorrow) {
		equipmentBorrow.setGmtModified(new Date());
		return equipmentBorrowService.updateEquipmentBorrow(equipmentBorrow);
	}
	
	@RequestMapping("/equ_ret")
	public R equRet(@RequestBody EquipmentBorrowEntity equipmentBorrow) {
		return equipmentBorrowService.EquipmentReturn(equipmentBorrow);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除设备借用表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return equipmentBorrowService.batchRemove(id);
	}
	
	/**
	 * 获取项目下拉框选项
	 * @return
	 */
	@RequestMapping("/getprolist")
	@ResponseBody
	public Map<String,Object> getSelectProject(){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<ProjectEntity> proList = equipmentBorrowService.getProjectEntityAll();
		map.put("prolist",proList);
		return map;
	}
	
	/**
	 * 获取人员下拉框选项
	 * @return
	 */
	@RequestMapping("/getuserlist")
	@ResponseBody
	public Map<String,Object> getSelectUserject(){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<SysUserEntity> userList = sysUserService.listAllUser();
		map.put("userlist",userList);
		return map;
	}
	
	/**
	 * 获取设备下拉框选项
	 * @return
	 */
	@RequestMapping("/getequlist")
	@ResponseBody
	public Map<String,Object> getSelectEquject(){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<EquipmentEntity> equList = equipmentService.getEquipmentEntityAll();
		map.put("equlist",equList);
		return map;
	}
	
	@RequestMapping("/getloginuserid")
	@ResponseBody
	public Map<String,Object> getLoginUserId(){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("userid",ShiroUtils.getUserId());
		return map;
	}
	
	@RequestMapping("/getequinfo")
	@ResponseBody
	public Map<String,Object> getEquInfo(@RequestParam Long id){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		EquipmentEntity e = equipmentBorrowService.getEquimentById(id);
		map.put("equ",e);
		return map;
	}
	
}
