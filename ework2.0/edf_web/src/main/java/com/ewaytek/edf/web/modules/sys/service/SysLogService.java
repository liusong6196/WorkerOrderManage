package com.ewaytek.edf.web.modules.sys.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysLogEntity;

/**
 * 系统日志
 *
 * @author 张静普
 */
public interface SysLogService {

	Page<SysLogEntity> listLog(Map<String, Object> params);
	
	R batchRemove(Long[] id);
	
	R batchRemoveAll();
	
}
