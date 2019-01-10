package com.ewaytek.edf.web.modules.expense.expenseRountine.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.expense.expenseRountine.service.ExpenseRoutineService;

/**
 * 日常明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:36:13
 */
@RestController
@RequestMapping("/api/expenseRoutine")
public class ExpenseRoutineController  {
	
	@Autowired
	private ExpenseRoutineService expenseRoutineService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ExpenseRoutineEntity> list(@RequestBody Map<String, Object> params) {
		return expenseRoutineService.listExpenseRoutine(params);
	}
		
	/**
	 * 新增
	 * @param expenseRoutine
	 * @return
	 */
	@SysLog("新增日常明细表")
	@RequestMapping("/save")
	public R save(@RequestBody ExpenseRoutineEntity expenseRoutine) {
		return expenseRoutineService.saveExpenseRoutine(expenseRoutine);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return expenseRoutineService.getExpenseRoutineById(id);
	}
	
	/**
	 * 修改
	 * @param expenseRoutine
	 * @return
	 */
	@SysLog("修改日常明细表")
	@RequestMapping("/update")
	public R update(@RequestBody ExpenseRoutineEntity expenseRoutine) {
		return expenseRoutineService.updateExpenseRoutine(expenseRoutine);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除日常明细表")
	@RequestMapping("/removeOne")
	public R batchRemove(Long id) {
		Long[] ids=new Long[1];
		ids[0]=Long.valueOf(id);
		return expenseRoutineService.batchRemove(ids);
	}
	
}
