package com.ewaytek.edf.web.modules.task.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.task.dao.TaskListMapper;
import com.ewaytek.edf.web.modules.task.service.TaskListService;

/**
 * 任务表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月14日 上午10:24:08
 */
@Service("taskListService")
public class TaskListServiceImpl implements TaskListService {

	@Autowired
	private TaskListMapper taskListMapper;
	
	@Override
	public List<TaskListEntity> taskList(Long proId) {
		return taskListMapper.taskList(proId);
	}

	@Override
	public Page<TaskListEntity> listTask(Map<String, Object> params,Long id) {
		Query query = new Query(params);
		Page<TaskListEntity> page = new Page<>(query);
		taskListMapper.listForPageByUserId(page,query,id);
		return page;
	}
	
	@Override
	public List<ProjectEntity> listProject() {
//		Query query = new Query(params);
		return 	taskListMapper.prolistForPage();
	}

	@Override
	public R saveTask(TaskListEntity role) {
		int count = taskListMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getTaskById(Long id) {
		TaskListEntity task = taskListMapper.getObjectById(id);
		return CommonUtils.msg(task);
	}

	@Override
	public R updateTask(TaskListEntity task) {
		int count = taskListMapper.update(task);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = taskListMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<Long> getTaskResource(Long proId) {
	 
		return taskListMapper.getTaskResource(proId);
	}


	@Override
	public Page<TaskListEntity> listStateForPage(Map<String, Object> params){
		Query query = new Query(params);
		Page<TaskListEntity> page = new Page<TaskListEntity>(query);
		taskListMapper.listStateForPage(page, query);
		return page;
	}

	
	@Override
	public List<Long> getProNameById(Long proId) {
	 
		return taskListMapper.getProNameById(proId);
	}

	@Override
	public int countTaskOwn(Long userId) {
		// TODO 自动生成的方法存根
		return taskListMapper.countTaskOwn(userId);
	}

	@Override
	public Integer sumTaskDays(Long userId) {
		// TODO 自动生成的方法存根
		return taskListMapper.sumTaskDays(userId);
	}

	@Override
	public List<TaskListEntity> listForHelper(Long userId, String state,String sort){
		// TODO 自动生成的方法存根
		return taskListMapper.listForHelper(userId, state,sort);
	}

	@Override
	public Page<TaskListEntity> listForHelper(Map<String, Object> params) {
		Query query = new Query(params);
		Page<TaskListEntity> page = new Page<TaskListEntity>(query);
		taskListMapper.listForHelper(page, query);
		return page;
	}
	@Override
	public List<TaskListEntity> findTasks(Map<String, Object> paras) {
		return taskListMapper.findTasks(paras);
	}

	@Override
	public List<TaskListEntity> listForTimesheet(Map<String, Object> params){
		return taskListMapper.listForTimesheet(new Query(params));
	}

	@Override
	public List<TaskListEntity> listForTimesheetResult(Map<String, Object> params){
		// TODO 自动生成的方法存根
		return taskListMapper.listForTimesheetResult(new Query(params));
	}

	@Override
	public List<TaskListEntity> listForTimesheetInsert(Map<String, Object> params){
		// TODO 自动生成的方法存根
		return taskListMapper.listForTimesheetInsert(new Query(params));
	}

	@Override
	public TaskListEntity getTaskEntityById(Long id){
		// TODO 自动生成的方法存根
		return taskListMapper.getTaskEntityById(id);
	}

	/**
	 * 通过用户id查询项目
	 */
	@Override
	public List<ProjectEntity> prolist(Long id){
		return taskListMapper.prolist(id);
	}
	
	
	@Override
	public int taskUpdateForHelper(Map<String, Object> params){
		// TODO 自动生成的方法存根
		return taskListMapper.taskUpdateForHelper(new Query(params));
	}

}
