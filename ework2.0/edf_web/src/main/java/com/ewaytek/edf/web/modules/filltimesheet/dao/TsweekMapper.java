package com.ewaytek.edf.web.modules.filltimesheet.dao;


import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 周记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:13:49
 */
@Mapper
public interface TsweekMapper extends BaseMapper<TsweekEntity> {
	TsweekEntity getTsweekByDate(String date);
}
