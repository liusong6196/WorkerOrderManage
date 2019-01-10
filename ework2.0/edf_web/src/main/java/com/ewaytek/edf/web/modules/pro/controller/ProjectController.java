package com.ewaytek.edf.web.modules.pro.controller;


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
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectQuestionEntity;
import com.ewaytek.edf.web.modules.pro.service.ProjectQuestionService;
import com.ewaytek.edf.web.modules.pro.service.ProjectService;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.modules.task.entity.TaskListEntity;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 项目表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午7:41:46
 */
@RestController
@RequestMapping("api/pro")
public class ProjectController  {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private SysUserService sysUserService;
	
	@Autowired
	private ProjectQuestionService projectQquestionService;
	
	@Autowired
	private SysDictService sysDictService;
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ProjectEntity> list(@RequestBody Map<String, Object> params) {
		return projectService.listProject(params);
	}
	
	
	/**
	 * 问题列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/questionlist")
	public Page<ProjectQuestionEntity> questionList(@RequestBody Map<String, Object> params) {
		
		params.put("userId", ShiroUtils.getUserId());
		
		return projectQquestionService.listProjectQuestion(params);
	}
	
	/**
	 * 新增问题
	 * @param project
	 * @return
	 */
	@SysLog("新增问题")
	@RequestMapping("/savequestion")
	public R save(@RequestBody ProjectQuestionEntity question) {
		question.setUserIdCreate(ShiroUtils.getUserId());
		question.setGmtCreate(new Date());
		question.setGmtModified(new Date());
		return projectQquestionService.saveProjectQuestion(question);
	}
	
	/**
	 * 删除问题
	 * @param id
	 * @return
	 */
	@SysLog("删除问题")
	@RequestMapping("/removequestion")
	public R questionBatchRemove(@RequestBody Long[] id) {
		return projectQquestionService.batchRemove(id);
	}
	
	
	/**
	 * 根据id查询问题详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/infoquestion")
	public R getProjectQuestionById(@RequestBody Long id) {
		
		return projectQquestionService.getProjectQuestionById(id);
	}
	
	
	/**
	 * 修改问题
	 * @param project
	 * @return
	 */
	@SysLog("修改问题")
	@RequestMapping("/updatequestion")
	public R update(@RequestBody ProjectQuestionEntity question) {
		question.setGmtModified(new Date());
		return projectQquestionService.updateProjectQuestion(question);
	}
	/**
	 * 新增
	 * @param project
	 * @return
	 */
	@SysLog("新增项目表")
	@RequestMapping("/save")
	public R save(@RequestBody ProjectEntity project) {
		List<ProjectEntity> proList = projectService.proList();
		for(ProjectEntity p:proList){
			if(project.getProName().equals(p.getProName()) && project.getProNumber().equals(p.getProNumber())){
				return R.ok().put("msg", "项目名称：" + project.getProName() + " 。 项目编号：" + project.getProNumber() + " 已存在");
			}else if(project.getProNumber().equals(p.getProNumber())){
				return R.ok().put("msg", "项目编号：" + project.getProNumber() + " 已存在");
			}else if(project.getProName().equals(p.getProName())){
				return R.ok().put("msg", "项目名称：" + project.getProName() + " 已存在");
			}
		}
		project.setUserIdCreate(ShiroUtils.getUserId());
		if(project.getProDevelopmanager().equals(-1)){
			project.setProDevelopmanager(null);
		}
		if(project.getProTestmanager().equals(-1)){
			project.setProTestmanager(null);
		}
		return projectService.saveProject(project);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {

		return projectService.getProjectById(id);
	}
	@RequestMapping("/getProNameById")
	public R getProNameById(Long id){
		return projectService.getProjectById(id);
	}
	@ResponseBody
	@RequestMapping("/infoentity")
	public Map<String, Object> getInfoEntity(@RequestParam Map<String, Object> params){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		Long id=Long.valueOf(params.get("id").toString());
		map.put("pro", projectService.getProjectEntityById(id));
		return map;
	}
	/**
	 * 修改
	 * @param project
	 * @return
	 */
	@SysLog("修改项目表")
	@RequestMapping("/update")
	public R update(@RequestBody ProjectEntity project) {
		return projectService.updateProject(project);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除项目表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return projectService.batchRemove(id);
	}
	
	/**
	 * 修改页面已选数据加载
	 * @param proId
	 * @return
	 */
	@RequestMapping("/members")
	@ResponseBody
	public Map<String, Object>  getAlluser(Long proId){
		List<SysUserEntity> users=sysUserService.listAllUser();
		List<Long> members=projectService.getMembers(proId);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("users", users);
		map.put("members", members);
		return map;
	}
	
	/**
	 * 新增页面数据加载
	 * @param proId
	 * @return
	 */
	@RequestMapping("/selections")
	@ResponseBody
	public Map<String, Object>  getSelections(Long proId){
		List<SysUserEntity> users=sysUserService.listAllUser();
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("type", "pro_businesstype");
		List<SysDictEntity> bussiness=sysDictService.listSysDictAll(params);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("users", users);
		map.put("bussiness", bussiness);
		return map;
	}
}
