package com.ewaytek.edf.web.modules.supplier.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.supplier.entity.SupplierEntity;
import com.ewaytek.edf.web.modules.supplier.service.SupplierService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年1月28日 下午2:35:28
 */
@RestController
@RequestMapping("/api/sys/supplier")
public class SupplierController{
	
	@Autowired
	private SupplierService supplierService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<SupplierEntity> list(@RequestBody Map<String, Object> params) {
		return supplierService.listSupplier(params);
	}
	
	@RequestMapping("/Suplist")
	public List<SupplierEntity> Suplist() {
		return supplierService.listSupplier();
	}
		
	/**
	 * 新增
	 * @param supplier
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody SupplierEntity supplier) {
		return supplierService.saveSupplier(supplier);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return supplierService.getSupplierById(id);
	}
	
	/**
	 * 修改
	 * @param supplier
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody SupplierEntity supplier) {
		return supplierService.updateSupplier(supplier);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return supplierService.batchRemove(id);
	}
	
}
