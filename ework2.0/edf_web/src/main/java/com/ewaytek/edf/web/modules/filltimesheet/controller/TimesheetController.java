package com.ewaytek.edf.web.modules.filltimesheet.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.Assert;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.constant.MsgConstant;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetApproveEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.filltimesheet.entity.WeekTimesheetEntity;
import com.ewaytek.edf.web.modules.filltimesheet.service.TimesheetService;
import com.ewaytek.edf.web.modules.filltimesheet.service.TsweekService;
import com.ewaytek.edf.web.modules.filltimesheet.service.WeekTimesheetService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.pro.service.ProjectService;
import com.ewaytek.edf.web.modules.report.entity.TimesheetReportEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserTokenEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserTokenService;
import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;
import com.ewaytek.edf.web.modules.task.service.TaskListService;
import com.ewaytek.edf.web.utils.ShiroUtils;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.common.collect.Lists;

/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
@RestController
@RequestMapping("/api/timesheet")
public class TimesheetController {

	@Autowired
	private TimesheetService timesheetService;
	@Autowired
	private TaskListService taskListService;
	@Autowired
	private ProjectService projectService;
	/*@Autowired
	private SysUserTokenService sysUserTokenService;*/
	@Autowired
	private SysDictService sysDictService;

	@Autowired
	private TsweekService tsweekService;
	
	@Autowired
	private WeekTimesheetService weekTimesheetService;
	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<TimesheetEntity> list(@RequestBody Map<String, Object> params) {
		return timesheetService.listTimesheet(params);
	}

	/**
	 * 新增
	 * 
	 * @param timesheet
	 * @return
	 */
	@SysLog("新增天任务时间表")
	@RequestMapping("/save")
	public R save(@RequestBody TimesheetEntity timesheet) {
		return timesheetService.saveTimesheet(timesheet);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return timesheetService.getTimesheetById(id);
	}

	/**
	 * 修改
	 * 
	 * @param timesheet
	 * @return
	 */
	@SysLog("修改天任务时间表")
	@RequestMapping("/update")
	public R update(@RequestBody TimesheetEntity timesheet) {
		return timesheetService.updateTimesheet(timesheet);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@SysLog("删除天任务时间表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return timesheetService.batchRemove(id);
	}

	@RequestMapping("/loadData")
	public JSONObject loadData(String startDate, String endDate) {
//		String token = req.getHeader("token");
//		SysUserTokenEntity sysUserTokenEntity = sysUserTokenService.getByToken(token);
		SysUserEntity sysUser = ((SysUserEntity) SecurityUtils.getSubject().getPrincipal());
		Map<String, Object> paras = new HashMap<>();
		List<String> states = Lists.newArrayList("2", "3");
		paras.put("userId", sysUser.getUserId());
		paras.put("states", states);
		paras.put("startDate", startDate);
		List<TaskListEntity> tasks = taskListService.findTasks(paras);
		List<TimesheetEntity> timesheets = timesheetService.findTimesheets(startDate, endDate, sysUser.getUserId().toString());
		return initData(tasks, timesheets);
	}
	
	private JSONObject initData(List<TaskListEntity> tasks, List<TimesheetEntity> timesheets) {
		JSONObject jsonObject = new JSONObject();
		Map<Long, List<TimesheetEntity>> sheetMap = timesheets.stream().parallel().collect(Collectors.groupingBy(timesheet -> timesheet.getTaskId(), Collectors.toList()));
		JSONArray implProjectJsonArray = initJsonData(tasks, sheetMap, (taskList) -> ((TaskListEntity) taskList).getProId(), "implProject");
		jsonObject.put("ipmlproject", implProjectJsonArray);

		JSONArray otherProjectJsonArray = new JSONArray();
		if (!sheetMap.isEmpty()) {
			List<SysDictEntity> sysDicts = sysDictService.listSysDictByIds(sheetMap.keySet().stream().collect(Collectors.toList()));
			otherProjectJsonArray = initJsonData(sysDicts, sheetMap, (sysDict) -> ((SysDictEntity) sysDict).getDescription(), "otherProject");
		}
		jsonObject.put("otherproject", otherProjectJsonArray);
		return jsonObject;
	}

	private JSONArray initJsonData(List<?> lists, Map<Long, List<TimesheetEntity>> sheetMap, Function<Object, ?> function, String implProject) {
		JSONArray implProjectJsonArray = new JSONArray();
		lists.stream().parallel().collect(Collectors.groupingBy(function, Collectors.toList())).forEach((key, value) -> {
			JSONObject projectJsonObject = new JSONObject();
			JSONArray taskJsonArray = new JSONArray();
			value.forEach(task -> {
				JSONArray jsonArray = new JSONArray();
				Long id = task instanceof TaskListEntity  && "implProject".equals(implProject) ? ((TaskListEntity) task).getTaskId() : ((SysDictEntity) task).getId();
				Optional.ofNullable(sheetMap.remove(id)).ifPresent(item -> item.forEach(timesheet -> jsonArray.add(timesheet)));
				JSONObject taskJsonObject = new JSONObject();
				taskJsonObject.put("task", task);
				taskJsonObject.put("timesheets", jsonArray);
				taskJsonArray.add(taskJsonObject);
			});
			if ("implProject".equals(implProject)) {
				ProjectEntity project = (ProjectEntity) projectService.getProjectById((Long) key).get(MsgConstant.DATA_ROWS);
				projectJsonObject.put("project", project);
			} else {
				projectJsonObject.put("project", key);
			}
			projectJsonObject.put("tasks", taskJsonArray);
			implProjectJsonArray.add(projectJsonObject);
		});
		return implProjectJsonArray;
	}

	@RequestMapping("/saveTimeSheets")
	public void saveOrUpdateTimeSheets(@RequestBody JSONArray jsonArray) {
		Assert.notNull(jsonArray, "修改/更新失败: null");
		jsonArray.stream().parallel().forEach(jsonObject -> {
			TimesheetEntity timesheetEntity = ((JSONObject) jsonObject).toJavaObject(TimesheetEntity.class);
			if (Objects.isNull(timesheetEntity.getId())) {
				timesheetService.saveTimesheet(timesheetEntity);
			} else {
				timesheetService.updateTimesheet(timesheetEntity);
			}
		});
	}

	/*
	private boolean saveOrUpdateTask(JSONArray jsonArray) {
		jsonArray.stream().forEach(project -> {
			JSONObject tempP = ((JSONObject) project);
			JSONObject jsonProject = tempP.getJSONObject("project");
			JSONArray jsonTasks = tempP.getJSONArray("tasks");
			jsonTasks.stream().forEach(tast -> {
				JSONObject tempT = (JSONObject) task;
				JSONObject jsonTask = tempT.getJSONObject("task");
				JSONArray jsonTimesheets = tempT.getJSONArray("timesheets");
				jsonTimesheets.stream().forEach(timesheet -> {

				});
			});
		});

		return false;
	}*/
	
	
	@RequestMapping("/timesheetsearch")
	@ResponseBody
	public Map<String, Object>  timesheetSearch(@RequestParam Map<String, Object> params){
		SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd" );
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		 if (tsweek==null) return null;
		 Map<String, Object> timesheetquery = new LinkedHashMap<String, Object>();
		 timesheetquery.put("userId", ShiroUtils.getUserId());
		 timesheetquery.put("start",sdf.format(tsweek.getTsStartdate()));
		 timesheetquery.put("end", sdf.format(tsweek.getTsEnddate()));
		 timesheetquery.put("tsid", tsweek.getTsId());	
		 //将符合条件的任务初始化到timesheet表
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
		 List<TimesheetEntity> timesheets=timesheetService.listTimesheets(timesheetquery);
		 List<TaskListEntity> taskfortimsheet=taskListService.listForTimesheetResult(timesheetquery);
		 
		 List<SysDictEntity> dicts=sysDictService.listForTimesheetShow(timesheetquery);
		 
		Map<String, Object> wtquery=new LinkedHashMap<String, Object>();
		wtquery.put("tsId", tsweek.getTsId());
		wtquery.put("userId", ShiroUtils.getUserId());
		 WeekTimesheetEntity weektime=weekTimesheetService.getWeekTimesheetByUserIdAndTsId(wtquery);
		if(weektime==null){
				weektime=new WeekTimesheetEntity();
				weektime.setWeekStatus("1");
				weektime.setTsId(tsweek.getTsId());
				weektime.setUserId(ShiroUtils.getUserId());
				weektime.setWeekActualhours("0");
				weektime.setWeekOvertimehours("0");
				weekTimesheetService.saveWeekTimesheet(weektime);
		 }
		 
		 map.put("weekts", weektime);
		 map.put("tsweek", tsweek);
		 map.put("tasks", taskfortimsheet);
		 map.put("timesheets", timesheets);
		 map.put("dicts", dicts);
		
		return map;
	}
	
	@RequestMapping("/timesheetinsertlist")
	@ResponseBody
	public Map<String, Object>  timesheetInsertList(@RequestParam Map<String, Object> params){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		 if (tsweek==null) return null;
		 Map<String, Object> timesheetquery = new LinkedHashMap<String, Object>();
		 timesheetquery.put("userId", ShiroUtils.getUserId());
		 timesheetquery.put("tsid",tsweek.getTsId());
		 List<TaskListEntity> tasks=taskListService.listForTimesheetInsert(timesheetquery);
		 List<SysDictEntity> dicts=sysDictService.listForTimesheet(timesheetquery);
		 map.put("tsweek", tsweek);
		 map.put("tasks", tasks);
		 map.put("dicts", dicts);
		return map;
	} 
	
	
	@RequestMapping("/timesheetinsert")
	@ResponseBody
	public Map<String, Object>  timesheetInsert(@RequestParam Map<String, Object> params){
		SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd" );
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		 if (tsweek==null) return null;
		 Map<String, Object> timesheetquery = new LinkedHashMap<String, Object>();
		 timesheetquery.put("userId", ShiroUtils.getUserId());
		 timesheetquery.put("tsid",sdf.format(tsweek.getTsStartdate()));
		 String [] taskids=new String[0];
		 String [] noprojecttaskids=new String[0];
		 if(!"".equals(params.get("taskids"))){
		 taskids=params.get("taskids").toString().split(",");
		 }
		 if(!"".equals(params.get("noprojecttaskids"))){
		 noprojecttaskids=params.get("noprojecttaskids").toString().split(",");
		 }
		 int onedaySeconds=1000*60*60*24;	 
		for(int x=0;x<noprojecttaskids.length;x++){
			Map<String, Object> exsitsparam=new LinkedHashMap<String, Object>();
			 exsitsparam.put("tsid", tsweek.getTsId());
			 exsitsparam.put("userId", ShiroUtils.getUserId());
			 exsitsparam.put("taskId", noprojecttaskids[x]);
			 int exsits=timesheetService.exsitsTimesheets(exsitsparam); //获取关联任务的timesheet是否存在
			 if(exsits>0){
				 continue;
			 }
			 for(int i=0;i<7;i++){
				 TimesheetEntity timesheet=new TimesheetEntity();
				 timesheet.setTaskId(Long.valueOf(noprojecttaskids[x]));
				 timesheet.setUserId(ShiroUtils.getUserId());
				 timesheet.setTimesheetType("2");
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
		
		for(int x=0;x<taskids.length;x++){
			Map<String, Object> exsitsparam=new LinkedHashMap<String, Object>();
			 exsitsparam.put("tsid", tsweek.getTsId());
			 exsitsparam.put("userId", ShiroUtils.getUserId());
			 exsitsparam.put("taskId", taskids[x]);
			 int exsits=timesheetService.exsitsTimesheets(exsitsparam); //获取关联任务的timesheet是否存在
			 if(exsits>0){
				 continue;
			 }
			TaskListEntity task=taskListService.getTaskEntityById(Long.valueOf(taskids[x]));
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
		
		map.put("code", 101);
		return map;
	} 
	
	
	/**
	 * 保存timesheet
	 * @param params
	 * @return
	 */
	@RequestMapping("/timesheetsave")
	@ResponseBody
	public Map<String, Object>  timesheetSave(@RequestParam Map<String, Object> params){
		
		String task=params.get("task").toString();
		String noprojects=params.get("noprojects").toString();
		String remark=params.get("remark").toString();
		String weekactualhours=params.get("weekactualhours").toString();
		String weekovertimehours=params.get("weekovertimehours").toString();
		String submitflag=params.get("submitflag").toString(); //0保存 1提交
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		String [] taskarr={};
		String [] dictsarr={};
		if(task!=null&&!"".equals(task)){
			taskarr=task.split(",");
		}
		if(noprojects!=null&&!"".equals(noprojects)){
			dictsarr=noprojects.split(",");
		}
		
		Map<String, Object> map=new LinkedHashMap<String, Object>();
		try {
			//更新项目任务
			for(int i=0;i<taskarr.length;i++){
				String [] tmpInfo=taskarr[i].split("_");
				Map<String, Object> tmpParams=new LinkedHashMap<String, Object>();
				tmpParams.put("taskId", tmpInfo[0]);
				tmpParams.put("userId", ShiroUtils.getUserId());
				tmpParams.put("day", tmpInfo[1]);
				tmpParams.put("type","1");
				tmpParams.put("hours", tmpInfo[2]);
				tmpParams.put("tsId", tsweek.getTsId());
				if("1".equals(submitflag)){
					tmpParams.put("state", "2");
				}
				timesheetService.timesheetUpdate(tmpParams);	
				taskListService.taskUpdateForHelper(tmpParams);
			}
			//更新非项目任务
			for(int i=0;i<dictsarr.length;i++){
				String [] tmpInfo=dictsarr[i].split("_");
				Map<String, Object> tmpParams=new LinkedHashMap<String, Object>();
				tmpParams.put("taskId", tmpInfo[0]);
				tmpParams.put("userId", ShiroUtils.getUserId());
				tmpParams.put("day", tmpInfo[1]);
				tmpParams.put("type","2");
				tmpParams.put("hours", tmpInfo[2]);
				if("1".equals(submitflag)){
					tmpParams.put("state", "2");
				}
				tmpParams.put("tsId", tsweek.getTsId());
				timesheetService.timesheetUpdate(tmpParams);		
			}
			//weektimesheet处理
			Map<String, Object> wtquery=new LinkedHashMap<String, Object>();
			wtquery.put("tsId", tsweek.getTsId());
			wtquery.put("userId", ShiroUtils.getUserId());
			WeekTimesheetEntity weektime=weekTimesheetService.getWeekTimesheetByUserIdAndTsId(wtquery);
			if(weektime==null){
				weektime=new WeekTimesheetEntity();
				weektime.setWeekStatus("1");
				weektime.setTsId(tsweek.getTsId());
				weektime.setUserId(ShiroUtils.getUserId());
				weektime.setRemark(remark);
				weektime.setWeekActualhours(weekactualhours);
				weektime.setWeekOvertimehours(weekovertimehours);
				weekTimesheetService.saveWeekTimesheet(weektime);
			}else{
			weektime.setRemark(remark);
			weektime.setWeekActualhours(weekactualhours);
			weektime.setWeekOvertimehours(weekovertimehours);
			if("1".equals(submitflag)){
				weektime.setWeekStatus("2");
			}
			weekTimesheetService.updateWeekTimesheet(weektime);
			}
			
		
			
			map.put("rs", "ok");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			map.put("rs", "error");
		}
		
		
		
		return map;
	}
	
	
	@RequestMapping("/approvelist")
	@ResponseBody
	public Map<String, Object> timesheetApproveList(@RequestParam Map<String, Object> params){
		System.out.println("TimesheetController.timesheetApproveList()");
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		System.out.println(tsweek.getTsId());
		Map<String, Object> queryParam = new LinkedHashMap<String, Object>();
		queryParam.put("tsId", tsweek.getTsId());
		queryParam.put("userId", ShiroUtils.getUserId());
		List<TimesheetApproveEntity> list=timesheetService.listProject(queryParam);
		List<TimesheetApproveEntity> listnoproject=timesheetService.listNoProject(queryParam);
		map.put("tsweek", tsweek);
		map.put("list", list);
		map.put("listnoproject", listnoproject);
		return map;
	}

	@RequestMapping("/approve")
	@ResponseBody
	public Map<String, Object> timesheetApprove(@RequestParam Map<String, Object> params){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		String noprojects=params.get("noprojects").toString();
		String projects=params.get("projects").toString();
		String remark=params.get("remark").toString();
		String state=params.get("state").toString();
		String tsid=params.get("tsid").toString();
		String [] noprojectsarr={};
		String [] projectsarr={};
		if(noprojects!=null&&!"".equals(noprojects)){
			noprojectsarr=noprojects.split(",");
		}
		if(projects!=null&&!"".equals(projects)){
			projectsarr=projects.split(",");
		}
		try {
			for(int i=0;i<projectsarr.length;i++){
				Map<String, Object> query = new LinkedHashMap<String, Object>();
				query.put("tsId",tsid);
				query.put("state",state);
				if("4".equals(state)){
					query.put("remark", remark);
				}
				query.put("proId", projectsarr[i].split("_")[1]);
				query.put("userId", projectsarr[i].split("_")[2]);
				
				timesheetService.pojectsTasksApprove(query);
				timesheetService.updateTaskStatus(query);
				
				WeekTimesheetEntity weektime=weekTimesheetService.getWeekTimesheetByUserIdAndTsId(query);
				List<TimesheetEntity> tstates=timesheetService.getTimesheetState(query);
				if(tstates.size()==1&&"3".equals(tstates.get(0).getTimesheetState())){
					weektime.setWeekStatus("3");
					weekTimesheetService.updateWeekTimesheet(weektime);
				}
				if(tstates.size()==1&&"4".equals(tstates.get(0).getTimesheetState())){
					weekTimesheetService.updateWeekTimesheet(weektime);
				}
			}
			
			for(int i=0;i<noprojectsarr.length;i++){
				Map<String, Object> query = new LinkedHashMap<String, Object>();
				query.put("tsId", tsid);
				query.put("state", state);
				if("4".equals(state)){
					query.put("remark", remark);
				}
				query.put("taskId", noprojectsarr[i].split("_")[1]);
				query.put("userId", noprojectsarr[i].split("_")[2]);
				
				timesheetService.noPojectsTasksApprove(query);
				
				WeekTimesheetEntity weektime=weekTimesheetService.getWeekTimesheetByUserIdAndTsId(query);
				List<TimesheetEntity> tstates=timesheetService.getTimesheetState(query);
				if(tstates.size()==1&&"3".equals(tstates.get(0).getTimesheetState())){
					weektime.setWeekStatus("3");
					weekTimesheetService.updateWeekTimesheet(weektime);
				}
				if(tstates.size()==1&&"4".equals(tstates.get(0).getTimesheetState())){
					weekTimesheetService.updateWeekTimesheet(weektime);
				}
			}
			
			
			
			map.put("rs", "ok");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			map.put("rs", "error");
		}
		return map;
	}
	
}



