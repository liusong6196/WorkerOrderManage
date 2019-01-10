package com.ewaytek.edf.web.modules.customer.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.customer.entity.CustomerEntity;

/**
 * 客户表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:19:37
 */
public interface CustomerService {

	Page<CustomerEntity> listCustomer(Map<String, Object> params);
	
	R saveCustomer(CustomerEntity customer);
	
	R getCustomerById(Long id);
	
	R updateCustomer(CustomerEntity customer);
	
	R batchRemove(Long[] id);
	
	List<CustomerEntity> getCustomerAll();
}
