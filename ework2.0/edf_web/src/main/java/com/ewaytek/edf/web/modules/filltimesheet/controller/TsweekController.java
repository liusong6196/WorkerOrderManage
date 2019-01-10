package com.ewaytek.edf.web.modules.filltimesheet.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.filltimesheet.service.TsweekService;

/**
 * 周记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:13:49
 */
@RestController
@RequestMapping("/api/tsweek")
public class TsweekController  {
	
	@Autowired
	private TsweekService tsweekService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<TsweekEntity> list(@RequestBody Map<String, Object> params) {
		return tsweekService.listTsweek(params);
	}
		
	/**
	 * 新增
	 * @param tsweek
	 * @return
	 */
	@SysLog("新增周记录表")
	@RequestMapping("/save")
	public R save(@RequestBody TsweekEntity tsweek) {
		return tsweekService.saveTsweek(tsweek);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return tsweekService.getTsweekById(id);
	}
	
	/**
	 * 修改
	 * @param tsweek
	 * @return
	 */
	@SysLog("修改周记录表")
	@RequestMapping("/update")
	public R update(@RequestBody TsweekEntity tsweek) {
		return tsweekService.updateTsweek(tsweek);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除周记录表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return tsweekService.batchRemove(id);
	}

	@RequestMapping("/getCurrentWeek")
	public TsweekEntity getCurrentWeek() {
		Date date = new Date();
		/*TsweekEntity tsweekEntity = new TsweekEntity();
		tsweekEntity.setTsStartdate(DateUtils.addDays(date, -DateUtils.toCalendar(date).get(Calendar.DAY_OF_WEEK) + 2));
		tsweekEntity.setTsEnddate(DateUtils.addDays(tsweekEntity.getTsStartdate(), 6));*/
		return tsweekService.getTsweekByDate(DateFormatUtils.format(date, "yyyy-MM-dd"));
	}

	/**
	 * 按时间计算上、下周，周一和周日时间
	 * @param date 必须是周一
	 * @param before true表示上周， false表示下周
	 * @return TsweekEntity
	 */
	@RequestMapping("/getWeek")
	public TsweekEntity getWeek(String date, boolean before) {
		Assert.notNull(date, "计算的时间不能为null");
		/*TsweekEntity tsweekEntity = new TsweekEntity();
		tsweekEntity.setTsStartdate(DateUtils.addDays(date, before ? -7 : 7));
		tsweekEntity.setTsEnddate(DateUtils.addDays(date, before ? -1 : 13));*/
		return tsweekService.getTsweekByDate(date);
	}

}
