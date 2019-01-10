package com.ewaytek.edf.web.modules.customer.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.customer.entity.CustomerEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 客户表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:19:37
 */
@Mapper
public interface CustomerMapper extends BaseMapper<CustomerEntity> {
	
	List<CustomerEntity> getCustomerAll();
}
