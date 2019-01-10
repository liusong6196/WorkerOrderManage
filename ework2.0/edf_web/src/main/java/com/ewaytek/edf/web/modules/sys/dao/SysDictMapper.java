package com.ewaytek.edf.web.modules.sys.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 系统数据字典表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月13日 上午10:38:08
 */
@Mapper
public interface SysDictMapper extends BaseMapper<SysDictEntity> {
	
	 List<SysDictEntity> listSysDictAll(Map<String, Object> params);
	 
	 SysDictEntity getDictLabel(@Param("type")String type,@Param("value")String value);

	 List<SysDictEntity> listSysDictByIds(List<Long> ids);
	 
	 /**
	  * 得到非项目任务列表
	  * @return
	  */
	 List<SysDictEntity> listForTimesheet(Query query);
	 
	 /**
	  * timesheet加载非项目任务
	  */
	 List<SysDictEntity> listForTimesheetShow(Query query);
	 
	 /**
	  * 下列列表   季度目标--季度类型
	  */
	 List<SysDictEntity> listQuarterType();
	 
	 /**
	  * 下列列表   目标结果--分数类型
	  */
	 List<SysDictEntity> listScoreType();
	 
	 /**
	  * 下拉列表所属地区
	  * @param type
	  * @return
	  */
	List<SysDictEntity> getDict();
}
