package com.ewaytek.edf.web.modules.report.dao;



import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.report.entity.TaskReportEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

@Mapper
public interface TaskReportMapper extends BaseMapper<TaskReportEntity> {
	List<TaskReportEntity> listReport(Query query);
}
