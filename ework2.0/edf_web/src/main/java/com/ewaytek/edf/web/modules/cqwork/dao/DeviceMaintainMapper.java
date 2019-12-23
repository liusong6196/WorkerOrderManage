package com.ewaytek.edf.web.modules.cqwork.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.web.modules.cqwork.entity.DeviceMaintainEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2019年8月27日 上午9:38:01
 */
@Mapper
public interface DeviceMaintainMapper extends BaseMapper<DeviceMaintainEntity> {
	
	int updateDeviceProcessStatus(@Param("id")Integer id,@Param("overTime")String overTime);
}
