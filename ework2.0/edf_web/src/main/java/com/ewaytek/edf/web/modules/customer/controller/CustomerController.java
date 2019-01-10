package com.ewaytek.edf.web.modules.customer.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.customer.entity.CustomerEntity;
import com.ewaytek.edf.web.modules.customer.service.CustomerService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 客户表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:19:37
 */
@RestController
@RequestMapping("/api/cus")
public class CustomerController  {
	
	@Autowired
	private CustomerService customerService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CustomerEntity> list(@RequestBody Map<String, Object> params) {
		return customerService.listCustomer(params);
	}
		
	/**
	 * 新增
	 * @param customer
	 * @return
	 */
	@SysLog("新增客户表")
	@RequestMapping("/save")
	public R save(@RequestBody CustomerEntity customer) {
		customer.setUserIdCreate(ShiroUtils.getUserId());
		customer.setGmtCreate(new Date());
		return customerService.saveCustomer(customer);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return customerService.getCustomerById(id);
	}
	
	/**
	 * 修改
	 * @param customer
	 * @return
	 */
	@SysLog("修改客户表")
	@RequestMapping("/update")
	public R update(@RequestBody CustomerEntity customer) {
		customer.setGmtModified(new Date());
		return customerService.updateCustomer(customer);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除客户表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return customerService.batchRemove(id);
	}
	
}
