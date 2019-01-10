package com.ewaytek.edf.web.modules.expense.expenseRountine.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 日常明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:36:13
 */
@Mapper
public interface ExpenseRoutineMapper extends BaseMapper<ExpenseRoutineEntity> {
	List<ExpenseRoutineEntity> listByExpAccNo(String expAccNo);
}
