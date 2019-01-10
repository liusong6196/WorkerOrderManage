package com.ewaytek.edf.web.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;


/**
 * 部门表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午4:33:35
 */
public interface SysDepartmentService {

	Page<SysDepartmentEntity> listDepartment(Map<String, Object> params);
	
	R saveDepartment(SysDepartmentEntity department);
	
	R getDepartmentById(Long id);
	
	R updateDepartment(SysDepartmentEntity department);
	
	R batchRemove(Long[] id);
	
	List<SysDepartmentEntity> listAllDepartment();
	
	/**
	 * 部门列表
	 * @return
	 */
	List<SysDepartmentEntity> listDepartment();
	
}