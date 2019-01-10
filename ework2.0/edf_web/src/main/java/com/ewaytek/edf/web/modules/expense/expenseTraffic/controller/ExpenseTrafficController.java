package com.ewaytek.edf.web.modules.expense.expenseTraffic.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.service.ExpenseTrafficService;

/**
 * 交通明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:44:02
 */
@RestController
@RequestMapping("/api/expenseTraffic")
public class ExpenseTrafficController  {
	
	@Autowired
	private ExpenseTrafficService expenseTrafficService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ExpenseTrafficEntity> list(@RequestBody Map<String, Object> params) {
		return expenseTrafficService.listExpenseTraffic(params);
	}
		
	/**
	 * 新增
	 * @param expenseTraffic
	 * @return
	 */
	@SysLog("新增交通明细表")
	@RequestMapping("/save")
	public R save(@RequestBody ExpenseTrafficEntity expenseTraffic) {
		return expenseTrafficService.saveExpenseTraffic(expenseTraffic);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return expenseTrafficService.getExpenseTrafficById(id);
	}
	
	/**
	 * 修改
	 * @param expenseTraffic
	 * @return
	 */
	@SysLog("修改交通明细表")
	@RequestMapping("/update")
	public R update(@RequestBody ExpenseTrafficEntity expenseTraffic) {
		return expenseTrafficService.updateExpenseTraffic(expenseTraffic);
	}
	/**
	 * 单个删除
	 * @param id
	 * @return
	 */
	@SysLog("单个删除交通明细表")
	@RequestMapping("/deleteOne")
	public R delete(String id){
		Long[] ids=new Long[1];
		ids[0]=Long.valueOf(id);
		return expenseTrafficService.batchRemove(ids);
	}
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除交通明细表")
	@RequestMapping("/remove")
	public R batchRemove(String ids) {
		String[] str=ids.replace("[", "").replace("]", "").split(",");
		Long[] id = new Long[str.length];
        for (int i = 0; i < str.length; i++) {
            id[i] = Long.valueOf(str[i]);
        }
		return expenseTrafficService.batchRemove(id);
	}
	
}
