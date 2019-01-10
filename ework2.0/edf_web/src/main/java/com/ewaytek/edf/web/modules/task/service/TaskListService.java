package com.ewaytek.edf.web.modules.task.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;

/**
 * 任务表
 *
 * @author 
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月14日 上午10:24:08
 */
public interface TaskListService {
	
	List<TaskListEntity> taskList(Long proId);

	/*Page<TaskListEntity> listTask(Map<String, Object> params);*/
	Page<TaskListEntity> listTask(Map<String, Object> params,Long id);
	
	List<ProjectEntity> listProject();
	
	/**
	 * 通过用户id查询项目
	 */
	List<ProjectEntity>  prolist(Long id);
	
	R saveTask(TaskListEntity task);
	
	R getTaskById(Long id);
	
	R updateTask(TaskListEntity task);
	
	R batchRemove(Long[] id);

	List<Long> getTaskResource(Long proId);
	

	Page<TaskListEntity> listStateForPage(Map<String, Object> params);
	

	List<Long> getProNameById(Long proId);

	int countTaskOwn(Long userId);
	
	Integer sumTaskDays(Long userId);

	List<TaskListEntity> listForHelper(Long userId,String state,String sort);
	
	Page<TaskListEntity> listForHelper(Map<String, Object> params);
	/**
	 * 根据用户Id及相应状态查找task
	 * @param userId 用户Id
	 * @param state 状态
	 * @param startDate 时间
	 * @return List<TaskListEntity>
	 */
	List<TaskListEntity> findTasks(Map<String, Object> paras);
	
	/**
	 * 筛选归属本周所有的task
	 * @param params
	 * @return
	 */
	List<TaskListEntity> listForTimesheet(Map<String, Object> params);
	
	/**
	 * 查找timesheet里存在的task
	 * @param params
	 * @return
	 */
	List<TaskListEntity> listForTimesheetResult(Map<String, Object> params);
	/**
	 * 加载timesheet增加列表
	 * @param params
	 * @return
	 */
	List<TaskListEntity> listForTimesheetInsert(Map<String, Object> params);
	
	
	TaskListEntity getTaskEntityById(Long id);
	
	int taskUpdateForHelper(Map<String, Object> params);
}
