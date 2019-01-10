package com.ewaytek.edf.web.modules.okr.controller;

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
import com.ewaytek.edf.web.modules.okr.service.ObjectiveService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 目标表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 下午5:21:24
 */
@RestController
@RequestMapping("/api/sys/objective")
public class ObjectiveController  {
	
	@Autowired
	private ObjectiveService objectiveService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ObjectiveEntity> list(@RequestBody Map<String, Object> params) {
		return objectiveService.listObjective(params);
	}
	
	/**
	 * 部门OKR列表
	 */
	@RequestMapping("/listDepartOKR")
	public R listDepartOKR(@RequestBody Long id){
		return CommonUtils.msgNotCheckNull(objectiveService.listDepartOKR(id));
	}
		
	/**
	 * 个人OKR列表
	 */
	@RequestMapping("/listUserOKR")
	public R listUserOKR(@RequestBody Long id){
		if(id == -1){
			id = ShiroUtils.getUserEntity().getUserId();
		}
		return CommonUtils.msgNotCheckNull(objectiveService.listUserOKR(id));
	}
	
	/**
	 * 新增
	 * @param objective
	 * @return
	 */
	@SysLog("新增目标表")
	@RequestMapping("/save")
	public R save(@RequestBody ObjectiveEntity objective) {
		return objectiveService.saveObjective(objective);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return objectiveService.getObjectiveById(id);
	}
	
	/**
	 * 修改
	 * @param objective
	 * @return
	 */
	@SysLog("修改目标表")
	@RequestMapping("/update")
	public R update(@RequestBody ObjectiveEntity objective) {
		return objectiveService.updateObjective(objective);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除目标表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return objectiveService.batchRemove(id);
	}
	
}
