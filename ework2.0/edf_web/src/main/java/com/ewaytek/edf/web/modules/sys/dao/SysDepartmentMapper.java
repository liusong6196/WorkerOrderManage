package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;


/**
 * 部门表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午4:33:35
 */
@Mapper
public interface SysDepartmentMapper extends BaseMapper<SysDepartmentEntity> {
	List<SysDepartmentEntity> listAllDepartment();
	
	/**
	 * 部门列表显示
	 * @return
	 */
	List<SysDepartmentEntity> listDepartment();
}
