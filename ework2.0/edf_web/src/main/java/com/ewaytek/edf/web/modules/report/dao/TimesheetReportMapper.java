package com.ewaytek.edf.web.modules.report.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.report.entity.TimesheetReportEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

@Mapper
public interface TimesheetReportMapper  extends BaseMapper<TimesheetReportEntity>{
	List<TimesheetReportEntity> listReport(Query query);
}
