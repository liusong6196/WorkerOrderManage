package com.ewaytek.edf.web.modules.exAccount.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.exAccount.entity.ExpenseAccountEntity;
import com.ewaytek.edf.web.modules.exAccount.entity.ProUtilEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 报销单表
 *
 * @author LF
 * @date 2017年12月14日 上午9:52:37
 */
@Mapper
public interface ExpenseAccountMapper extends BaseMapper<ExpenseAccountEntity> {
	List<ProUtilEntity> listPro();
}
