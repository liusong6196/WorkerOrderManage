package com.ewaytek.edf.web.modules.okr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.okr.dao.ObjectiveMapper;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.okr.service.ObjectiveService;

/**
 * 目标表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 下午5:21:24
 */
@Service("objectiveService")
public class ObjectiveServiceImpl implements ObjectiveService {

	@Autowired
	private ObjectiveMapper objectiveMapper;

	@Override
	public Page<ObjectiveEntity> listObjective(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ObjectiveEntity> page = new Page<>(query);
		objectiveMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveObjective(ObjectiveEntity role) {
		int count = objectiveMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getObjectiveById(Long id) {
		ObjectiveEntity objective = objectiveMapper.getObjectById(id);
		return CommonUtils.msg(objective);
	}

	@Override
	public R updateObjective(ObjectiveEntity objective) {
		int count = objectiveMapper.update(objective);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = objectiveMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}
	
	/**
	 * 部门OKR列表
	 */
	@Override
	public List<ObjectiveEntity> listDepartOKR(Long id) {		
		return objectiveMapper.listDepartOKR(id);
	}
	
	/**
	 * 个人OKR列表
	 */
	@Override
	public List<ObjectiveEntity> listUserOKR(Long id){
		List<ObjectiveEntity> list = objectiveMapper.listUserOKR(id);
		return list;
	}

}
