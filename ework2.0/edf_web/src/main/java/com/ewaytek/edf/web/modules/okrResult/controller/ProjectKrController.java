package com.ewaytek.edf.web.modules.okrResult.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.GoalEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.ProjectKrEntity;
import com.ewaytek.edf.web.modules.okrResult.service.ProjectKrService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 项目关键结果
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:35:37
 */
@RestController
@RequestMapping("/api/sys/projectkr")
public class ProjectKrController{
	
	@Autowired
	private ProjectKrService projectKrService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ProjectKrEntity> list(@RequestBody Map<String, Object> params) {
		return projectKrService.listProjectKr(params);
	}
	
	/**
	 * 部门OKR关键结果列表
	 */
	@RequestMapping("/listDepartOKRResult")
	public R listDepartOKRResult(@RequestBody Long id){
		return CommonUtils.msgNotCheckNull(projectKrService.listDepartOKRResult(id));
	}
	
	/**
	 * 个人OKR关键结果列表
	 */
	@RequestMapping("/listUserOKRResult")
	public R listUserOKRResult(@RequestBody Long id){
		return CommonUtils.msgNotCheckNull(projectKrService.listUserOKRResult(id));
	}
	
	/**
	 * 新增
	 * @param projectKr
	 * @return
	 */
	@SysLog("新增项目关键结果")
	@RequestMapping("/save")
	public R save(@RequestBody ProjectKrEntity projectKr) {
		return projectKrService.saveProjectKr(projectKr);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return projectKrService.getProjectKrById(id);
	}
	
	/**
	 * 修改
	 * @param projectKr
	 * @return
	 */
	@SysLog("修改项目关键结果")
	@RequestMapping("/update")
	public R update(@RequestBody ProjectKrEntity projectKr) {
		return projectKrService.updateProjectKr(projectKr);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除项目关键结果")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return projectKrService.batchRemove(id);
	}
	
	/**
	 * 根据项目编号列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/listByNum")
	public Page<ProjectKrEntity> listByNum(@RequestBody Map<String, Object> params) {
		return projectKrService.listProjectKrByNum(params);
	}
	

	
	/**
	 * 我的个人OKR关键结果列表
	 */
	@RequestMapping("/myPerOkr")
	public Page<ProjectKrEntity> myPerOkr(@RequestBody Map<String, Object> params){
				
		return projectKrService.myPerOkr(params);
		
//	
	}
	
	/**
	 * 我的部门OKR关键结果列表
	 */
	@RequestMapping("/myDepOkr")
	public Page<ProjectKrEntity> myDepOkr(@RequestBody Map<String, Object> params){
		//获得用户id
		Long userId=ShiroUtils.getUserId();
		params.put("userid", Long.valueOf(userId));		
		return projectKrService.myDepOkr(params);
		

	}
	
	/**
	 * 我的个人项目OKR关键结果列表
	 * 
	 */
	@RequestMapping("/myProOkr")
	public Page<ProjectKrEntity> myProOkr(@RequestBody Map<String, Object> params){
		
		Long userid=ShiroUtils.getUserId();
//		System.out.println("bumen用户id"+userId);
		//System.out.println("项目id"+userid);
		params.put("userid", Long.valueOf(userid));
		return projectKrService.myProOkr(params);
		

	}
	
	/**
	 * 我的OKR
	 * 获取姓名 个人目标
	 */
	
	@RequestMapping("/perinfo")
	public Map<String,Object> perinfo(int quarter,int year){
		Map<String,Object> result=new HashMap<String,Object>();
		try {
			//2018 3 12
			//获取用户id
			Long userid=ShiroUtils.getUserId();
			
			GoalEntity perinfo=new GoalEntity();
			perinfo= projectKrService.perinfo(quarter,userid,year);
			result.put("code", 0);
			result.put("perinfo", perinfo);
		} catch (Exception e) {
			// TODO: handle exception
			result.put("code", -1);
		}
		
		return result;
	}
	
	/**
	 * 我的OKR
	 * 获取部门名称 部门目标
	 */
	
	@RequestMapping("/depinfo")
	public Map<String,Object> depinfo(int quarter,int year){
		Map<String,Object> result=new HashMap<String,Object>();
		try {
			Long userid=ShiroUtils.getUserId();
			GoalEntity depinfo=new GoalEntity();
			 depinfo = projectKrService.depinfo(quarter,userid,year);
			result.put("code", 0);
			result.put("depinfo", depinfo);
		} catch (Exception e) {
			// TODO: handle exception
			result.put("code", -1);
		}
		return result;
	}
	
	/**
	 * 我的OKR
	 * 获取项目名称 项目目标
	 */
	
	@RequestMapping("/proinfo")
	public Map<String,Object> proinfo(String pronum){
		Map<String,Object> result=new HashMap<String,Object>();
		try {
			Long userid=ShiroUtils.getUserId();
			//System.out.println("proinfo");
			GoalEntity proinfo = new GoalEntity();
			proinfo=projectKrService.proinfo(userid,pronum);
			result.put("code", 0);
			result.put("proinfo", proinfo);
		} catch (Exception e) {
			result.put("code", -1);
			// TODO Auto-generated catch block
			
		}
		return result;
	}
	
	
	/**
	 * 我的OKR
	 *  部门名称
	 */
	
	@RequestMapping("/getUserDep")
	public @ResponseBody SysDepartmentEntity getUserDep(){
		//用户id
		Long userid=ShiroUtils.getUserId();
		
		SysDepartmentEntity departentity = projectKrService.getUserDep(userid);
		
		return departentity;
	}
	
	
	/**
	 * 项目okr遍历
	 * 
	 */
	@RequestMapping("/listProjectOkr")
	public List<ProjectEntity> listProjectOkr(){
		return projectKrService.listProjectOkr();
	}
	
	/**
	 * 个人OKR遍历listPerjectOkr
	 * 
	 */
	@RequestMapping("/listPerjectOkr")
	public List<ObjectiveEntity> listPerjectOkr(int quarter,int year){
		return projectKrService.listPerjectOkr(quarter,year);
	}
	/**
	 * 我的个人OKR关键结果列表2
	 * 
	 */
	@RequestMapping("/myPerOkrT")
	public Page<ProjectKrEntity> myPerOkrT(@RequestBody Map<String, Object> params){
		System.out.println("进入个人关键");
		return projectKrService.myPerOkrT(params);
		
		
	}
	/**
	 * 个人okr季度集合
	 */
	@RequestMapping("/listPerson")
	public R listPerson(@RequestBody Map<String, Object> params){
			return CommonUtils.msgNotCheckNull(projectKrService.listPerson(params));
	}
	/**
	 * 部门okr季度集合
	 */
	@RequestMapping("/listDepart")
	public R listDepartOKR(@RequestBody Map<String, Object> params){
		return CommonUtils.msgNotCheckNull(projectKrService.listDepart(params));
	}
}
