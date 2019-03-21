package com.ewaytek.edf.web.modules.cqwork.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.cqwork.entity.SocietydistlistEntity;
import com.ewaytek.edf.web.modules.cqwork.service.SocietydistlistService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:33:00
 */
@RestController
@RequestMapping("/api/cqwork/cqdist")
public class SocietydistlistController  {
	
	@Autowired
	private SocietydistlistService societydistlistService;
	
	@RequestMapping("/distlist")
	public Map<String,Object> getSelectDistList(HttpServletRequest request){
		String selectlevel = request.getParameter("selectlevel");
		String updistid = request.getParameter("updistid");
		String belong = request.getParameter("belong");
		Map<String,Object> param = new HashMap<String,Object>();
		if(selectlevel != null && !"".equals(selectlevel)){
			param.put("selectlevel", selectlevel);
		}
		if(updistid != null && !"".equals(updistid)){
			param.put("updistid", updistid);
		}
		if(belong != null && !"".equals(belong)){
			param.put("belong", belong);
		}
		List<SocietydistlistEntity> distlist = societydistlistService.querySocietydistlist(param);
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("distlist", distlist);
		return result;
	}
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<SocietydistlistEntity> list(@RequestBody Map<String, Object> params) {
		return societydistlistService.listSocietydistlist(params);
	}
		
	/**
	 * 新增
	 * @param societydistlist
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody SocietydistlistEntity societydistlist) {
		return societydistlistService.saveSocietydistlist(societydistlist);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return societydistlistService.getSocietydistlistById(id);
	}
	
	/**
	 * 修改
	 * @param societydistlist
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody SocietydistlistEntity societydistlist) {
		return societydistlistService.updateSocietydistlist(societydistlist);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return societydistlistService.batchRemove(id);
	}
	
}
