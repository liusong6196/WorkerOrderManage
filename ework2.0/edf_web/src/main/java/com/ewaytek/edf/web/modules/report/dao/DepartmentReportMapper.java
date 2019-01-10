package com.ewaytek.edf.web.modules.report.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.report.entity.DepartmentReportEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

@Mapper
public interface DepartmentReportMapper extends BaseMapper<DepartmentReportEntity> {
	List<DepartmentReportEntity> depReport(Query query);
}
