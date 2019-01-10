package com.ewaytek.edf.web.modules.exAccount.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.exAccount.entity.ExpenseAccountEntity;
import com.ewaytek.edf.web.modules.exAccount.entity.ProUtilEntity;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;

/**
 * 报销单表
 *
 * @author LF
 * @date 2017年12月14日 上午9:52:37
 */
public interface ExpenseAccountService {

	Page<ExpenseAccountEntity> listExpenseAccount(Map<String, Object> params);
	
	R saveExpenseAccount(ExpenseAccountEntity expenseAccount);
	
	R getExpenseAccountById(Long id);
	
	R updateExpenseAccount(ExpenseAccountEntity expenseAccount);
	
	R batchRemove(Long[] id);
	List<ProUtilEntity> listPro();
	int saveAccountAndDetailed(ExpenseAccountEntity expenseAccount,List<ExpenseTrafficEntity> expTrafficEntity,List<ExpenseRoutineEntity> expRoutineEntity,int type);

	R checkPerson();
	
}
