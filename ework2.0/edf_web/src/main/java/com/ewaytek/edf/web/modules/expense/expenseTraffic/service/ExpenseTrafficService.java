package com.ewaytek.edf.web.modules.expense.expenseTraffic.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;

/**
 * 交通明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:44:02
 */
public interface ExpenseTrafficService {

	Page<ExpenseTrafficEntity> listExpenseTraffic(Map<String, Object> params);
	
	R saveExpenseTraffic(ExpenseTrafficEntity expenseTraffic);
	
	R getExpenseTrafficById(Long id);
	
	R updateExpenseTraffic(ExpenseTrafficEntity expenseTraffic);
	
	R batchRemove(Long[] id);
	List<ExpenseTrafficEntity> listByExpAccNo(String expAccNo);
}
