package com.ewaytek.edf.web.modules.filltimesheet.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetApproveEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.dao.TimesheetApproveMapper;
import com.ewaytek.edf.web.modules.filltimesheet.dao.TimesheetMapper;
import com.ewaytek.edf.web.modules.filltimesheet.service.TimesheetService;

/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
@Service("timesheetService")
public class TimesheetServiceImpl implements TimesheetService {

	@Autowired
	private TimesheetMapper timesheetMapper;
	@Autowired
	private TimesheetApproveMapper timesheetapproveMapper;
	@Override
	public Page<TimesheetEntity> listTimesheet(Map<String, Object> params) {
		Query query = new Query(params);
		Page<TimesheetEntity> page = new Page<>(query);
		timesheetMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveTimesheet(TimesheetEntity role) {
		int count = timesheetMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getTimesheetById(Long id) {
		TimesheetEntity timesheet = timesheetMapper.getObjectById(id);
		return CommonUtils.msg(timesheet);
	}

	@Override
	public R updateTimesheet(TimesheetEntity timesheet) {
		int count = timesheetMapper.update(timesheet);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = timesheetMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<TimesheetEntity> findTimesheets(String startTime, String endTime, String userId) {
		return timesheetMapper.findTimesheets(startTime, endTime, userId);
	}

	@Override
	public List<TimesheetEntity> listTimesheets(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetMapper.listTimesheets(new Query(params));
	}

	@Override
	public int exsitsTimesheets(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetMapper.exsitsTimesheets(new Query(params));
	}

	@Override
	public int timesheetUpdate(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetMapper.timesheetUpdate(new Query(params));
	}

	@Override
	public List<TimesheetApproveEntity> listProject(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetapproveMapper.listProject(new Query(params));
	}

	@Override
	public List<TimesheetApproveEntity> listNoProject(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetapproveMapper.listNoProject(new Query(params));
	}

	@Override
	public int pojectsTasksApprove(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetapproveMapper.pojectsTasksApprove(new Query(params));
	}

	@Override
	public int noPojectsTasksApprove(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetapproveMapper.noPojectsTasksApprove(new Query(params));
	}
	
	@Override
	public int updateTaskStatus(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetapproveMapper.updateTaskStatus(new Query(params));
	}

	@Override
	public List<TimesheetEntity> getTimesheetState(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetMapper.getTimesheetState(new Query(params));
	}

	@Override
	public int timesheetUpdateForHelper(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return timesheetMapper.timesheetUpdateForHelper(new Query(params));
	}

}
