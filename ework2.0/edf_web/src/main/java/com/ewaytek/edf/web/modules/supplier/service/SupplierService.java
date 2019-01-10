package com.ewaytek.edf.web.modules.supplier.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.supplier.entity.SupplierEntity;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年1月28日 下午2:35:28
 */
public interface SupplierService {

	Page<SupplierEntity> listSupplier(Map<String, Object> params);
	
	List<SupplierEntity> listSupplier();
	
	R saveSupplier(SupplierEntity supplier);
	
	R getSupplierById(Long id);
	
	R updateSupplier(SupplierEntity supplier);
	
	R batchRemove(Long[] id);
	
}
