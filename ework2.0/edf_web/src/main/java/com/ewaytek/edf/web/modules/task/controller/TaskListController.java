package com.ewaytek.edf.web.modules.task.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.filltimesheet.service.TimesheetService;
import com.ewaytek.edf.web.modules.filltimesheet.service.TsweekService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;
import com.ewaytek.edf.web.modules.task.service.TaskListService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 任务表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月14日 上午10:24:08
 */
@RestController
@RequestMapping("api/tasklist")
public class TaskListController  {
	
	@Autowired
	private TaskListService taskListService;
	@Autowired
	private TsweekService tsweekService;
	@Autowired
	private TimesheetService timesheetService;
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<TaskListEntity> list(@RequestBody Map<String, Object> params,Long id) {
		return taskListService.listTask(params,id);
	}
	
	/**
	 * 根据操作员和状态获取列表
	 * @param params
	 * @param status
	 * @return
	 */
	@RequestMapping("/liststatus")
	public Page<TaskListEntity> listByState(@RequestBody Map<String, Object> params,@RequestParam("status") String status) {
	
	
		Long userId=ShiroUtils.getUserId();
		String sort="";
		switch (status) {
		case "2":
			sort="task_enddate";
			break;
		case "3":
			sort="task_priority";
			break;
		default:
			sort="gmt_modified";
			break;
		}
		params.put("userId", userId);
		params.put("sort", sort);
		params.put("status", status);
		return taskListService.listForHelper(params);
	}
	
	/**
	 * 修改任务状态
	 * @param taskId
	 * @param status
	 * @param actualhours
	 * @return
	 */
	@RequestMapping("/updatestatus")
	@ResponseBody
	public R updateStatus(Long taskId,String status,int actualhours,String date){
		SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd" );
		TaskListEntity thistask=new TaskListEntity();
		
		thistask.setTaskId(taskId);
		thistask.setTaskStatus(status);
		thistask.setGmtModified(new Date());
		if("4".equals(status)){
			thistask.setTaskActualhours(actualhours);
		}
		TsweekEntity tsweek=tsweekService.getTsweekByDate(date);
		 Map<String, Object> timesheetquery = new LinkedHashMap<String, Object>();
		 timesheetquery.put("userId", ShiroUtils.getUserId());
		 timesheetquery.put("start",sdf.format(tsweek.getTsStartdate()));
		 timesheetquery.put("end", sdf.format(tsweek.getTsEnddate()));
		 timesheetquery.put("tsid", tsweek.getTsId());	
		
		 List<TaskListEntity> tasks=taskListService.listForTimesheet(timesheetquery);
		 
		 
		 int onedaySeconds=1000*60*60*24;
		 
		 for(TaskListEntity task:tasks){
			 Map<String, Object> exsitsparam=new LinkedHashMap<String, Object>();
			 exsitsparam.put("tsid", tsweek.getTsId());
			 exsitsparam.put("userId", ShiroUtils.getUserId());
			 exsitsparam.put("taskId", task.getTaskId());
			 int exsits=timesheetService.exsitsTimesheets(exsitsparam); //获取关联任务的timesheet是否存在
			 if(exsits>0){
				 continue;
			 }
			 for(int i=0;i<7;i++){
			 TimesheetEntity timesheet=new TimesheetEntity();
			 timesheet.setProId(task.getProId());
			 timesheet.setTaskId(task.getTaskId());
			 timesheet.setUserId(Long.valueOf(task.getTaskUser()));
			 timesheet.setTimesheetType("1");
			 timesheet.setTsId(tsweek.getTsId());
			 Date timedate=new Date(tsweek.getTsStartdate().getTime()+(i*onedaySeconds));
			 timesheet.setTimeDate(sdf.format(timedate));
			 timesheet.setTimeActualhours(0);
			 timesheet.setGmtCreate(new Date());
			 timesheet.setGmtModified(new Date());
			 timesheet.setTimesheetState("1");
			 timesheet.setUserIdCreate(ShiroUtils.getUserId());
			 timesheetService.saveTimesheet(timesheet);
			 }
		 }
		 
		 
		 if("4".equals(status)){
		 Map<String, Object> timesheetSearchparam=new LinkedHashMap<String, Object>();
		 timesheetSearchparam.put("tsId", tsweek.getTsId());
		 timesheetSearchparam.put("date", date);
		 timesheetSearchparam.put("taskId", taskId);
		 timesheetSearchparam.put("userId", ShiroUtils.getUserId());
		 timesheetSearchparam.put("actualhours", actualhours);
		 timesheetService.timesheetUpdateForHelper(timesheetSearchparam);
		 }
		
		
		return taskListService.updateTask(thistask);
	}
	
	/**
	 * 修改任务状态
	 * @param taskId
	 * @param status
	 * @param actualhours
	 * @return
	 */
	@RequestMapping("/updatestatusNotTimeSheet")
	@ResponseBody
	public R updatestatusNotTimeSheet(Long taskId,String status,int actualhours,String date){
		TaskListEntity thistask=new TaskListEntity();
		
		thistask.setTaskId(taskId);
		thistask.setTaskStatus(status);
		thistask.setGmtModified(new Date());
		if("4".equals(status)){
			thistask.setTaskActualhours(actualhours);
		}		 
		return taskListService.updateTask(thistask);
	}
	
	
	/**
	 * 项目列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/prolist")
	@ResponseBody
	public List<ProjectEntity>  getAlluser(Long id){
		return taskListService.prolist(id);
	}
	
	/**
	 * 新增
	 * @param task
	 * @return
	 */
	@SysLog("新增任务表")
	@RequestMapping("/save")
	public R save(@RequestBody TaskListEntity task) {
		Long proId = task.getProId();
		List<TaskListEntity> taskList = taskListService.taskList(proId);
		for(TaskListEntity t:taskList){
			if(task.getTaskNumber().equals(t.getTaskNumber())){
				return R.ok().put("msg", "任务编号："+task.getTaskNumber()+" 已存在");
			}
		}
		task.setUserIdCreate(ShiroUtils.getUserId());
		return taskListService.saveTask(task);
		
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return taskListService.getTaskById(id);
	}
	
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/infoentity")
	public Map<String, Object> getEntityById(@RequestParam Map<String, Object> params) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		Long id=Long.valueOf(params.get("id").toString());
		map.put("task", taskListService.getTaskEntityById(id));
		return map;
	}
	
	/**
	 * 修改
	 * @param task
	 * @return
	 */
	@SysLog("修改任务表")
	@RequestMapping("/update")
	public R update(@RequestBody TaskListEntity task) {
		return taskListService.updateTask(task);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除任务表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return taskListService.batchRemove(id);
	}
	/**
	 * 获取资源列表
	 * @param id
	 * @return
	 */
	@RequestMapping("/memberslist")
	@ResponseBody
	public Map<String, Object>  getTaskResource(Long proId){
		List<Long> members=taskListService.getTaskResource(proId);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("members", members);
		return map;
	}
	/**
	 * 获取项目名称列表
	 * @param id
	 * @return
	 */
	@RequestMapping("/proName")
	@ResponseBody
	public Map<String, Object>  getProNameById(Long proId){
		List<Long> proName=taskListService.getProNameById(proId);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("proName", proName);
		return map;
	}
	
	@RequestMapping("/progressdata")
	@ResponseBody
	public Map<String, Object> getProgressData(){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		Long userId=ShiroUtils.getUserId();
		System.out.println(userId);
		int taskcount=taskListService.countTaskOwn(userId);
		System.out.println(taskcount);
		Integer days=taskListService.sumTaskDays(userId);
		List<TaskListEntity> donetask=taskListService.listForHelper(userId, "4","gmt_modified");
		map.put("taskcount", taskcount);
		map.put("days", days);
		map.put("donetask", donetask);
		return map;
	}
}
