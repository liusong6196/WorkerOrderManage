package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.cqwork.entity.WorkorderEntity;
import com.ewaytek.edf.web.modules.cqwork.dao.WorkorderMapper;
import com.ewaytek.edf.web.modules.cqwork.service.WorkorderService;
import com.ewaytek.edf.web.utils.DateUtils;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:30:56
 */
@Service("workorderService")
public class WorkorderServiceImpl implements WorkorderService {

	@Autowired
	private WorkorderMapper workorderMapper;

	@Override
	public Page<WorkorderEntity> listWorkorder(Map<String, Object> params) {
		Query query = new Query(params);
		Page<WorkorderEntity> page = new Page<>(query);
		workorderMapper.listForPage(page, query);
		return page;
	}

	@Override
	@Transactional
	public R saveWorkorder(WorkorderEntity role) {
		//System.out.println(role);
		if(role.getTown() != null && "请选择".equals(role.getTown())){
			role.setTown("");
		}
		if(role.getVillage() != null && "请选择".equals(role.getVillage())){
			role.setVillage("");
		}
		role.setOccurDate(DateUtils.DateParse(role.getStrdate()));
		//role.setOverTime(DateUtils.DateFormatfromDate(new Date()));
		role.setProcessUser(ShiroUtils.getUserEntity().getUsername());
		int count = workorderMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getWorkorderById(Long id) {
		WorkorderEntity workorder = workorderMapper.getObjectById(id);
		return CommonUtils.msg(workorder);
	}

	@Override
	public R updateWorkorder(WorkorderEntity workorder) {
		int count = workorderMapper.update(workorder);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = workorderMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<WorkorderEntity> queryWorkorderEntityList(Map<String, Object> param) {
		return workorderMapper.queryWorkorderEntityList(param);
	}

}
