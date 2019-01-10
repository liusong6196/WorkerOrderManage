package com.ewaytek.edf.web.modules.okr.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;

/**
 * 目标表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 下午5:21:24
 */
public interface ObjectiveService {

	Page<ObjectiveEntity> listObjective(Map<String, Object> params);
	
	R saveObjective(ObjectiveEntity objective);
	
	R getObjectiveById(Long id);
	
	R updateObjective(ObjectiveEntity objective);
	
	R batchRemove(Long[] id);
	
	/**
	 * 部门ORK列表
	 */
	List<ObjectiveEntity> listDepartOKR(Long id);
	
	/**
	 * 个人OKR列表
	 */
	List<ObjectiveEntity> listUserOKR(Long id);
}
