package com.ewaytek.edf.web.modules.report.service;

import java.util.List;
import java.util.Map;
import com.ewaytek.edf.web.modules.report.entity.DepartmentReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TaskReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TimesheetReportEntity;

public interface ReportService {

	List<TaskReportEntity> getTaskReport(Map<String, Object> params);
	
	List<DepartmentReportEntity> depReport(Map<String, Object> params);
	
	List<TimesheetReportEntity> timesheetReport(Map<String, Object> params);
}
