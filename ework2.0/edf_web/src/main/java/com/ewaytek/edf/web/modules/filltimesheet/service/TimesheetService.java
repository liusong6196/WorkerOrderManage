package com.ewaytek.edf.web.modules.filltimesheet.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetApproveEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetEntity;

/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
public interface TimesheetService {

	Page<TimesheetEntity> listTimesheet(Map<String, Object> params);
	
	R saveTimesheet(TimesheetEntity timesheet);
	
	R getTimesheetById(Long id);
	
	R updateTimesheet(TimesheetEntity timesheet);
	
	R batchRemove(Long[] id);
	
	List<TimesheetEntity> findTimesheets(String startTime,String endTime, String userId);
	
	List<TimesheetEntity> listTimesheets(Map<String, Object> params);
	
	/**
	 * 判断timesheet是否存在此任务
	 * @param params
	 * @return
	 */
	int exsitsTimesheets(Map<String, Object> params);
	
	int timesheetUpdate(Map<String, Object> params);
	
	/**
	 * 加载timesheet审批-项目任务
	 * @param params
	 * @return
	 */
	List<TimesheetApproveEntity> listProject(Map<String, Object> params);
	/**
	 * 加载timesheet审批-非项目任务
	 * @param params
	 * @return
	 */
	List<TimesheetApproveEntity> listNoProject(Map<String, Object> params);
	
	
	int pojectsTasksApprove(Map<String, Object> params);
	
	int noPojectsTasksApprove(Map<String, Object> params);
	
	int updateTaskStatus(Map<String, Object> params);
	
	List<TimesheetEntity> getTimesheetState(Map<String, Object> params);
	
	
	int timesheetUpdateForHelper(Map<String, Object> params);
}
