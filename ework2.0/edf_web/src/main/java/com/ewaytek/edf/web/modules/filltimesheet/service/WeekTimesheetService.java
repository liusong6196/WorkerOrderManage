package com.ewaytek.edf.web.modules.filltimesheet.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.filltimesheet.entity.WeekTimesheetEntity;

/**
 * 周任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:12:13
 */
public interface WeekTimesheetService {

	Page<WeekTimesheetEntity> listWeekTimesheet(Map<String, Object> params);
	
	R saveWeekTimesheet(WeekTimesheetEntity weekTimesheet);
	
	R getWeekTimesheetById(Long id);
	
	R updateWeekTimesheet(WeekTimesheetEntity weekTimesheet);
	
	R batchRemove(Long[] id);
	
	WeekTimesheetEntity getWeekTimesheetByUserIdAndTsId(Map<String, Object> params);
	
}
