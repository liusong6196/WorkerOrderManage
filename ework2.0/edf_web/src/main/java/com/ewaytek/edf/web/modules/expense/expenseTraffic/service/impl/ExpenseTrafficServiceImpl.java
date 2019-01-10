package com.ewaytek.edf.web.modules.expense.expenseTraffic.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.dao.ExpenseTrafficMapper;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.service.ExpenseTrafficService;

/**
 * 交通明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:44:02
 */
@Service("expenseTrafficService")
public class ExpenseTrafficServiceImpl implements ExpenseTrafficService {

	@Autowired
	private ExpenseTrafficMapper expenseTrafficMapper;

	@Override
	public Page<ExpenseTrafficEntity> listExpenseTraffic(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ExpenseTrafficEntity> page = new Page<>(query);
		expenseTrafficMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveExpenseTraffic(ExpenseTrafficEntity role) {
		int count = expenseTrafficMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getExpenseTrafficById(Long id) {
		ExpenseTrafficEntity expenseTraffic = expenseTrafficMapper.getObjectById(id);
		return CommonUtils.msg(expenseTraffic);
	}

	@Override
	public R updateExpenseTraffic(ExpenseTrafficEntity expenseTraffic) {
		int count = expenseTrafficMapper.update(expenseTraffic);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = expenseTrafficMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<ExpenseTrafficEntity> listByExpAccNo(String expAccNo) {
		// TODO Auto-generated method stub
		return expenseTrafficMapper.listByExpAccNo(expAccNo);
	}

}
