package com.ewaytek.edf.web.modules.filltimesheet.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.filltimesheet.entity.WeekTimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.service.WeekTimesheetService;

/**
 * 周任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:12:13
 */
@RestController
@RequestMapping("/api/weektimesheet")
public class WeekTimesheetController  {
	
	@Autowired
	private WeekTimesheetService weekTimesheetService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<WeekTimesheetEntity> list(@RequestBody Map<String, Object> params) {
		return weekTimesheetService.listWeekTimesheet(params);
	}
		
	/**
	 * 新增
	 * @param weekTimesheet
	 * @return
	 */
	@SysLog("新增周任务时间表")
	@RequestMapping("/save")
	public R save(@RequestBody WeekTimesheetEntity weekTimesheet) {
		return weekTimesheetService.saveWeekTimesheet(weekTimesheet);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return weekTimesheetService.getWeekTimesheetById(id);
	}
	
	/**
	 * 修改
	 * @param weekTimesheet
	 * @return
	 */
	@SysLog("修改周任务时间表")
	@RequestMapping("/update")
	public R update(@RequestBody WeekTimesheetEntity weekTimesheet) {
		return weekTimesheetService.updateWeekTimesheet(weekTimesheet);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return`
	-  -*/
	@SysLog("删除周任务时间表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return weekTimesheetService.batchRemove(id);
	}
	
}
