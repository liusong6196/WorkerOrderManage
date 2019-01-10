package com.ewaytek.edf.web.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.dao.SysDepartmentMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDepartmentService;

/**
 * 部门表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午4:33:35
 */

@Service("departmentService")
public class SysDepartmentServiceImpl implements SysDepartmentService {

	@Autowired
	private SysDepartmentMapper departmentManager;

	@Override
	public Page<SysDepartmentEntity> listDepartment(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SysDepartmentEntity> page = new Page<>(query);
		departmentManager.listForPage(page, query);
		return page;
	}

	@Override
	public R saveDepartment(SysDepartmentEntity role) {
		int count = departmentManager.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getDepartmentById(Long id) {
		SysDepartmentEntity department = departmentManager.getObjectById(id);
		return CommonUtils.msg(department);
	}

	@Override
	public R updateDepartment(SysDepartmentEntity department) {
		int count = departmentManager.update(department);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = departmentManager.batchRemove(id);
		return CommonUtils.msg(id, count);
	}
	
	@Override
	public List<SysDepartmentEntity> listAllDepartment() {
		// TODO 自动生成的方法存根
		return departmentManager.listAllDepartment();
	}

	@Override
	/**
	 * 部门列表显示
	 */
	public List<SysDepartmentEntity> listDepartment() {
		
		return departmentManager.list();
	}
}
