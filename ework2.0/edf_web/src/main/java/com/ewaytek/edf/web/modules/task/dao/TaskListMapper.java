package com.ewaytek.edf.web.modules.task.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 任务表
 *
 * @author 
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月14日 上午10:24:08
 */
@Mapper
public interface TaskListMapper extends BaseMapper<TaskListEntity> {
	
	List<TaskListEntity> taskList(Long proId);

	List<ProjectEntity>  prolistForPage();
	
	List<TaskListEntity> listForPageByUserId(Page<TaskListEntity> page,Query query,@Param(value = "id") Long id);
	/**
	 * 通过用户id查询项目
	 */
	List<ProjectEntity>  prolist(Long id);

	List<Long> getTaskResource(Long proId);

	List<Long> getProNameById(Long proId);
	
	List<TaskListEntity> listStateForPage(Page<TaskListEntity> page, Query query);
	
	int countTaskOwn(@Param(value = "userId")Long userId);
	
	Integer sumTaskDays(Long userId);
	
	List<TaskListEntity> listStateForPage(@Param(value = "userId")Long userId,@Param(value = "status")String status);
	
	List<TaskListEntity> listForHelper(@Param(value = "userId")Long userId,@Param(value = "status")String status,@Param(value = "sort")String sort);

	List<TaskListEntity> listForHelper(Page<TaskListEntity> page, Query query);
	/**
	 * 根据用户Id及相应状态查找task
	 * @param userId 用户Id
	 * @param state 状态
	 * @param startDate 时间
	 * @return List<TaskListEntity>
	 */
	List<TaskListEntity> findTasks(Map<String, Object> paras);
	
	List<TaskListEntity> listForTimesheet(Query query);
	
	
	List<TaskListEntity> listForTimesheetResult(Query query);
	
	List<TaskListEntity> listForTimesheetInsert(Query query);
	
	TaskListEntity getTaskEntityById(Long id);
	
	int taskUpdateForHelper(Query query);
}
