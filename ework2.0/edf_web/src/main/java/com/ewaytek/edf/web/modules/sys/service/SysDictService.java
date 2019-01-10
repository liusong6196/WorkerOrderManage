package com.ewaytek.edf.web.modules.sys.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;

/**
 * 系统数据字典表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月13日 上午10:38:08
 */
public interface SysDictService {

	Page<SysDictEntity> listSysDict(Map<String, Object> params);
	
	R saveSysDict(SysDictEntity sysDict);
	
	R getSysDictById(Long id);
	
	R updateSysDict(SysDictEntity sysDict);
	
	R batchRemove(Long[] id);
	
	List<SysDictEntity> listSysDictAll(Map<String, Object> params);
	
	SysDictEntity getDictLabel(String type,String value);

	List<SysDictEntity> listSysDictByIds(List<Long> ids);
	
	List<SysDictEntity> listForTimesheet(Map<String, Object> params);
	
	List<SysDictEntity> listForTimesheetShow(Map<String, Object> params);
	
	List<SysDictEntity> listQuarterType();
	
	List<SysDictEntity> listScoreType();

	List<SysDictEntity> getDict();
}
