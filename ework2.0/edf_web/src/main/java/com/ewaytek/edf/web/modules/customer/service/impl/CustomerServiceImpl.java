package com.ewaytek.edf.web.modules.customer.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.customer.entity.CustomerEntity;
import com.ewaytek.edf.web.modules.customer.dao.CustomerMapper;
import com.ewaytek.edf.web.modules.customer.service.CustomerService;

/**
 * 客户表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:19:37
 */
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerMapper customerMapper;

	@Override
	public Page<CustomerEntity> listCustomer(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CustomerEntity> page = new Page<>(query);
		customerMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveCustomer(CustomerEntity role) {
		int count = customerMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getCustomerById(Long id) {
		CustomerEntity customer = customerMapper.getObjectById(id);
		return CommonUtils.msg(customer);
	}

	@Override
	public R updateCustomer(CustomerEntity customer) {
		int count = customerMapper.update(customer);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = customerMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<CustomerEntity> getCustomerAll() {
		return customerMapper.getCustomerAll();
	}

}
