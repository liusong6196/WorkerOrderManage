package com.ewaytek.edf.web.modules.sys.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.sys.entity.SysLogEntity;

/**
 * 系统日志
 * @author 张静普
 */
@Mapper
public interface SysLogMapper extends BaseMapper<SysLogEntity> {

	int batchRemoveAll();
	
}
