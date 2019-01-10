package com.ewaytek.edf.web.modules.sys.controller;

import java.util.Date;
import java.util.HashMap;
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
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 系统数据字典表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 下午7:09:03
 */
@RestController
@RequestMapping("/sys/dict")
public class SysDictController  {
	
	@Autowired
	private SysDictService sysDictService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/listall")
	public Page<SysDictEntity> list(@RequestBody Map<String, Object> params) {
		return sysDictService.listSysDict(params);
	}
		
	/**
	 * 新增
	 * @param sysDict
	 * @return
	 */
	@SysLog("新增系统数据字典表")
	@RequestMapping("/save")
	public R save(@RequestBody SysDictEntity sysDict) {
		sysDict.setUserIdCreate(ShiroUtils.getUserId());
		sysDict.setGmtCreate(new Date());
		return sysDictService.saveSysDict(sysDict);
	}
	
	/**
	 * OKR目标----季度类型列表
	 */
	@RequestMapping("/listQuarterType")
	public R listQuarterType(){
		return CommonUtils.msgNotCheckNull(sysDictService.listQuarterType());
	}
	
	/**
	 * OKR结果----分数列表
	 */
	@RequestMapping("/listScoreType")
	public R listScoreType(){
		return CommonUtils.msgNotCheckNull(sysDictService.listScoreType());
	}
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return sysDictService.getSysDictById(id);
	}
	
	/**
	 * 修改
	 * @param sysDict
	 * @return
	 */
	@SysLog("修改系统数据字典表")
	@RequestMapping("/update")
	public R update(@RequestBody SysDictEntity sysDict) {
		sysDict.setGmtModified(new Date());
		return sysDictService.updateSysDict(sysDict);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除系统数据字典表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return sysDictService.batchRemove(id);
	}
	
	@RequestMapping("/getlabel")
	@ResponseBody
	public Map<String,Object> getDictLabel(@RequestParam String type,@RequestParam String value){
		Map<String,Object> map = new HashMap<String, Object>();
		SysDictEntity dict = sysDictService.getDictLabel(type, value);
		map.put("dict", dict);
		return map;
	}
	
	/**
	 * 根据类型得到字典对象
	 * @param type
	 * @return
	 */
	@RequestMapping("/getTerritorialDict")
	@ResponseBody
	public List<SysDictEntity> getDict(){
		List<SysDictEntity> dictList  = sysDictService.getDict();
		return dictList;
	}
}
