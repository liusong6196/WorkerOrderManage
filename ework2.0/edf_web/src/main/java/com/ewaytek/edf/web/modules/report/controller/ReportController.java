package com.ewaytek.edf.web.modules.report.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.filltimesheet.service.TsweekService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.report.entity.DepartmentReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TaskReportEntity;
import com.ewaytek.edf.web.modules.report.entity.TimesheetReportEntity;
import com.ewaytek.edf.web.modules.report.service.ReportService;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDepartmentService;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.modules.task.service.TaskListService;

@RestController
@RequestMapping("api/report")
public class ReportController {
	
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private TaskListService taskListService;
	
	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private SysDepartmentService sysDepartmentService;
	
	@Autowired
	private TsweekService tsweekService;
	/**
	 * 菜单列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/taskreportlist")
	public List<TaskReportEntity> taskReport(@RequestParam Map<String, Object> params) {
		return reportService.getTaskReport(params);
	}
	
	
	/**
	 * 项目列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/selections")
	@ResponseBody
	public Map<String, Object>  getSelections(){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		
		List<ProjectEntity> prolist=taskListService.listProject();
		
		List<SysUserEntity> userlist=sysUserService.listAllUser();
		
		map.put("pros", prolist);
		
		map.put("users", userlist);
		
		return map;
	}
	
	/**
	 * 部门状态统计
	 * @param params
	 * @return
	 */
	@RequestMapping("/departmentreport")
	@ResponseBody
	public  Map<String, Object> departmentReprot(@RequestParam Map<String, Object> params){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		
		
		List<SysUserEntity> userlist=sysUserService.depUser(params);
		
		List<DepartmentReportEntity> depinfolist=reportService.depReport(params);
		
		map.put("users", userlist);
		
		map.put("depinfolist", depinfolist);
		
		return map;
	}
	
	
	/**
	 * 部门状态统计列表加载
	 * @param params
	 * @return
	 */
	@RequestMapping("/depreportselections")
	@ResponseBody
	public Map<String, Object>  getDepSelections(){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		
		
		List<SysDepartmentEntity> deps=sysDepartmentService.listAllDepartment();
		
		map.put("deps", deps);
		
		return map;
	}
	
	
	/**
	 * timesheet状态统计列表加载
	 * @param params
	 * @return
	 */
	@RequestMapping("/timesheetreport")
	@ResponseBody
	public Map<String, Object>  timesheetReport(@RequestParam Map<String, Object> params){
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		TsweekEntity tsweek=tsweekService.getTsweekByDate(params.get("date").toString());
		 if (tsweek==null) return null;
		 List<SysDepartmentEntity> deplist=sysDepartmentService.listAllDepartment();
		 Map<String, Object> query=new LinkedHashMap<String, Object>();
		 query.put("tsid", tsweek.getTsId());
		 List<TimesheetReportEntity> tslist=reportService.timesheetReport(query);
		 map.put("deplist", deplist);
		 map.put("tslist", tslist);
		 map.put("tsweek", tsweek);
		return map;
	}
	
}
