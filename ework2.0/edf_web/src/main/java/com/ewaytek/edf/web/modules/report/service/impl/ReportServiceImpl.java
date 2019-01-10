package com.ewaytek.edf.web.modules.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.report.dao.DepartmentReportMapper;
import com.ewaytek.edf.web.modules.report.dao.TaskReportMapper;
import com.ewaytek.edf.web.modules.report.dao.TimesheetReportMapper;
import com.ewaytek.edf.web.modules.report.entity.DepartmentReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TaskReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TimesheetReportEntity;
import com.ewaytek.edf.web.modules.report.service.ReportService;

@Service("reportService")
public class ReportServiceImpl implements ReportService {

	@Autowired
	private TaskReportMapper taskreportMapper;
	@Autowired
	private DepartmentReportMapper departmentreportMapper;
	@Autowired
	private TimesheetReportMapper timesheetreportMapper;
	@Override
	public List<TaskReportEntity> getTaskReport(Map<String, Object> params) {
		Query query = new Query(params);
		return taskreportMapper.listReport(query);
	}

	@Override
	public List<DepartmentReportEntity> depReport(Map<String, Object> params) {
		Query query = new Query(params);
		return departmentreportMapper.depReport(query);
	}

	@Override
	public List<TimesheetReportEntity> timesheetReport(Map<String, Object> params) {
		Query query = new Query(params);
		return timesheetreportMapper.listReport(query);
	}

}
