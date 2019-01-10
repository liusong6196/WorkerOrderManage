package com.ewaytek.edf.web.modules.filltimesheet.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
@Mapper
public interface TimesheetMapper extends BaseMapper<TimesheetEntity> {
	
	List<TimesheetEntity> findTimesheets(@Param(value = "startTime")String startTime, @Param(value = "endTime")String endTime, @Param(value = "userId")String userId);
	
	List<TimesheetEntity> listTimesheets(Query query);
	
	int exsitsTimesheets(Query query);
	
	int timesheetUpdate(Query query);
	
	List<TimesheetEntity> getTimesheetState(Query query);
	
	int timesheetUpdateForHelper(Query query);
}
