package com.ewaytek.edf.web.modules.sys.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.dao.SysLogMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysLogEntity;
import com.ewaytek.edf.web.modules.sys.service.SysLogService;

/**
 * 系统日志
 *
 * @author 张静普
 */
@Service("sysLogService")
public class SysLogServiceImpl implements SysLogService {

	@Autowired
	private SysLogMapper sysLogMapper;
	
	@Override
	public Page<SysLogEntity> listLog(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SysLogEntity> page = new Page<>(query);
		sysLogMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = sysLogMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public R batchRemoveAll() {
		int count = sysLogMapper.batchRemoveAll();
		return CommonUtils.msg(count);
	}

}
