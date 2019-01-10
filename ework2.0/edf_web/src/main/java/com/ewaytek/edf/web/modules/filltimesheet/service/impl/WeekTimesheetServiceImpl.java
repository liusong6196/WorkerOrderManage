package com.ewaytek.edf.web.modules.filltimesheet.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.filltimesheet.entity.WeekTimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.dao.WeekTimesheetMapper;
import com.ewaytek.edf.web.modules.filltimesheet.service.WeekTimesheetService;

/**
 * 周任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:12:13
 */
@Service("weekTimesheetService")
public class WeekTimesheetServiceImpl implements WeekTimesheetService {

	@Autowired
	private WeekTimesheetMapper weekTimesheetMapper;

	@Override
	public Page<WeekTimesheetEntity> listWeekTimesheet(Map<String, Object> params) {
		Query query = new Query(params);
		Page<WeekTimesheetEntity> page = new Page<>(query);
		weekTimesheetMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveWeekTimesheet(WeekTimesheetEntity role) {
		int count = weekTimesheetMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getWeekTimesheetById(Long id) {
		WeekTimesheetEntity weekTimesheet = weekTimesheetMapper.getObjectById(id);
		return CommonUtils.msg(weekTimesheet);
	}

	@Override
	public R updateWeekTimesheet(WeekTimesheetEntity weekTimesheet) {
		int count = weekTimesheetMapper.update(weekTimesheet);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = weekTimesheetMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public WeekTimesheetEntity getWeekTimesheetByUserIdAndTsId(Map<String, Object> params) {
	
		return weekTimesheetMapper.getWeekTimesheetByUserIdAndTsId(new Query(params));
	}

}
