package com.ewaytek.edf.web.modules.filltimesheet.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.filltimesheet.entity.WeekTimesheetEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 周任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:12:13
 */
@Mapper
public interface WeekTimesheetMapper extends BaseMapper<WeekTimesheetEntity> {
	WeekTimesheetEntity getWeekTimesheetByUserIdAndTsId(Query query);
}
