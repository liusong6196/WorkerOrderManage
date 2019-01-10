package com.ewaytek.edf.web.modules.expense.expenseRountine.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;

/**
 * 日常明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:36:13
 */
public interface ExpenseRoutineService {

	Page<ExpenseRoutineEntity> listExpenseRoutine(Map<String, Object> params);
	
	R saveExpenseRoutine(ExpenseRoutineEntity expenseRoutine);
	
	R getExpenseRoutineById(Long id);
	
	R updateExpenseRoutine(ExpenseRoutineEntity expenseRoutine);
	
	R batchRemove(Long[] id);
	List<ExpenseRoutineEntity> listByExpAccNo(String expAccNo);
}
