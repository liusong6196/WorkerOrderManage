package com.ewaytek.edf.web.modules.expense.expenseRountine.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.expense.expenseRountine.dao.ExpenseRoutineMapper;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.expense.expenseRountine.service.ExpenseRoutineService;

/**
 * 日常明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:36:13
 */
@Service("expenseRoutineService")
@Transactional
public class ExpenseRoutineServiceImpl implements ExpenseRoutineService {

	@Autowired
	private ExpenseRoutineMapper expenseRoutineMapper;

	@Override
	public Page<ExpenseRoutineEntity> listExpenseRoutine(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ExpenseRoutineEntity> page = new Page<>(query);
		expenseRoutineMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveExpenseRoutine(ExpenseRoutineEntity role) {
		int count = expenseRoutineMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getExpenseRoutineById(Long id) {
		ExpenseRoutineEntity expenseRoutine = expenseRoutineMapper.getObjectById(id);
		return CommonUtils.msg(expenseRoutine);
	}

	@Override
	public R updateExpenseRoutine(ExpenseRoutineEntity expenseRoutine) {
		int count = expenseRoutineMapper.update(expenseRoutine);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = expenseRoutineMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<ExpenseRoutineEntity> listByExpAccNo(String expAccNo) {
		// TODO Auto-generated method stub
		return expenseRoutineMapper.listByExpAccNo(expAccNo);
	}

}
