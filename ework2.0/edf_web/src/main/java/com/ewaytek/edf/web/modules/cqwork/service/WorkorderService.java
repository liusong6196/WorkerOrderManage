package com.ewaytek.edf.web.modules.cqwork.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.cqwork.entity.WorkorderEntity;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:30:56
 */
public interface WorkorderService {

	Page<WorkorderEntity> listWorkorder(Map<String, Object> params);
	
	R saveWorkorder(WorkorderEntity workorder);
	
	R getWorkorderById(Long id);
	
	R updateWorkorder(WorkorderEntity workorder);
	
	R batchRemove(Long[] id);
	
	List<WorkorderEntity> queryWorkorderEntityList(Map<String,Object> param);
	
}
