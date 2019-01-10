package com.ewaytek.edf.web.modules.sys.controller;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.AbstractController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDepartmentService;


/**
 * 部门表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午4:33:35
 */
@RestController
@RequestMapping("/api/sys/depart")
public class SysDepartmentController  {
	
	@Autowired
	private SysDepartmentService departmentService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<SysDepartmentEntity> list(@RequestBody Map<String, Object> params) {
		return departmentService.listDepartment(params);
	}	
	/**
	 * 全列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/listAll")
	public List<SysDepartmentEntity> listAll() {
		return departmentService.listDepartment();
	}
	
	/**
	 * 全列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/listInfo")
	public R listInfo() {
		return CommonUtils.msgNotCheckNull(departmentService.listDepartment()) ;
	}
		
	/**
	 * 新增
	 * @param department
	 * @return
	 */
	@SysLog("新增部门表")
	@RequestMapping("/save")
	public R save(@RequestBody SysDepartmentEntity department) {
		return departmentService.saveDepartment(department);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return departmentService.getDepartmentById(id);
	}
	
	/**
	 * 修改
	 * @param department
	 * @return
	 */
	@SysLog("修改部门表")
	@RequestMapping("/update")
	public R update(@RequestBody SysDepartmentEntity department) {
		return departmentService.updateDepartment(department);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除部门表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return departmentService.batchRemove(id);
	}
}
