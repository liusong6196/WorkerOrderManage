package com.ewaytek.edf.web.modules.supplier.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.supplier.entity.SupplierEntity;
import com.ewaytek.edf.web.modules.supplier.dao.SupplierMapper;
import com.ewaytek.edf.web.modules.supplier.service.SupplierService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年1月28日 下午2:35:28
 */
@Service("supplierService")
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private SupplierMapper supplierMapper;

	@Override
	public Page<SupplierEntity> listSupplier(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SupplierEntity> page = new Page<>(query);
		supplierMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveSupplier(SupplierEntity role) {
		int count = supplierMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getSupplierById(Long id) {
		SupplierEntity supplier = supplierMapper.getObjectById(id);
		return CommonUtils.msg(supplier);
	}

	@Override
	public R updateSupplier(SupplierEntity supplier) {
		int count = supplierMapper.update(supplier);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = supplierMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<SupplierEntity> listSupplier() {		
		return supplierMapper.list();
	}
}
