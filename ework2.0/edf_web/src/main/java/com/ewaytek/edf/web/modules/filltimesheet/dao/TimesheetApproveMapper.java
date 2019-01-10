package com.ewaytek.edf.web.modules.filltimesheet.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetApproveEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
@Mapper
public interface TimesheetApproveMapper extends BaseMapper<TimesheetApproveEntity> {
	
	List<TimesheetApproveEntity> listProject(Query query);
	
	List<TimesheetApproveEntity> listNoProject(Query query);
	
	int pojectsTasksApprove(Query query);
	
	int noPojectsTasksApprove(Query query);
	
	int updateTaskStatus(Query query);
}
