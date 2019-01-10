package com.ewaytek.edf.web.modules.exAccount.service.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.exAccount.entity.ExpenseAccountEntity;
import com.ewaytek.edf.web.modules.exAccount.entity.ProUtilEntity;
import com.ewaytek.edf.web.modules.exAccount.dao.ExpenseAccountMapper;
import com.ewaytek.edf.web.modules.exAccount.service.ExpenseAccountService;
import com.ewaytek.edf.web.modules.expense.expenseRountine.dao.ExpenseRoutineMapper;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.dao.ExpenseTrafficMapper;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 报销单表
 *
 * @author LF
 * @date 2017年12月14日 上午9:52:37
 */
@Service("expenseAccountService")
@Transactional
public class ExpenseAccountServiceImpl implements ExpenseAccountService {

	@Autowired
	private ExpenseAccountMapper expenseAccountMapper;

	@Autowired
	private ExpenseRoutineMapper expenseRoutineMapper;
	@Autowired
	private ExpenseTrafficMapper expenseTrafficMapper;

	@Override
	public Page<ExpenseAccountEntity> listExpenseAccount(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ExpenseAccountEntity> page = new Page<>(query);
		expenseAccountMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveExpenseAccount(ExpenseAccountEntity role) {
		int count = expenseAccountMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getExpenseAccountById(Long id) {
		ExpenseAccountEntity expenseAccount = expenseAccountMapper.getObjectById(id);
		return CommonUtils.msg(expenseAccount);
	}

	@Override
	public R updateExpenseAccount(ExpenseAccountEntity expenseAccount) {
		int count = expenseAccountMapper.update(expenseAccount);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = expenseAccountMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<ProUtilEntity> listPro() {
		// TODO Auto-generated method stub
		return expenseAccountMapper.listPro();
	}

	@Override
	public int saveAccountAndDetailed(ExpenseAccountEntity expenseAccount,List<ExpenseTrafficEntity> expTrafficEntity,List<ExpenseRoutineEntity> expRoutineEntity,int type) {
		try {
			//新增
			if(1==type){
				expenseAccountMapper.save(expenseAccount);
				for (ExpenseRoutineEntity expenseRoutineEntity : expRoutineEntity) {
					expenseRoutineMapper.save(expenseRoutineEntity);
				}
				for (ExpenseTrafficEntity expenseTrafficEntity : expTrafficEntity) {
					expenseTrafficMapper.save(expenseTrafficEntity);
				}
			}
			//修改或新增
			else{
				expenseAccountMapper.update(expenseAccount);
				for (ExpenseRoutineEntity expenseRoutineEntity : expRoutineEntity) {
					if(null==expenseRoutineEntity.getExpRouId()){
						//新增
						expenseRoutineMapper.save(expenseRoutineEntity);
					}else{
						expenseRoutineMapper.update(expenseRoutineEntity);
					}
				}
				for (ExpenseTrafficEntity expenseTrafficEntity : expTrafficEntity) {
					if(null==expenseTrafficEntity.getExpTraId()){
						//新增
						expenseTrafficMapper.save(expenseTrafficEntity);
					}else{
						expenseTrafficMapper.update(expenseTrafficEntity);
					}
				}
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public R checkPerson() {
		// TODO Auto-generated method stub
		boolean b=false;
		Long userId = ShiroUtils.getUserId();
		if(userId==90)
		b=true;
		return CommonUtils.msgNotCheckNull(b);
	}


}
