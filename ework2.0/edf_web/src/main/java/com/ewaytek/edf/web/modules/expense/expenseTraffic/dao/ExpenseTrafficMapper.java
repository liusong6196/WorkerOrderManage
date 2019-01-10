package com.ewaytek.edf.web.modules.expense.expenseTraffic.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 交通明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:44:02
 */
@Mapper
public interface ExpenseTrafficMapper extends BaseMapper<ExpenseTrafficEntity> {
	List<ExpenseTrafficEntity> listByExpAccNo(String expAccNo);
}
