package com.ewaytek.edf.web.modules.filltimesheet.service;

import java.util.Date;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;

/**
 * 周记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:13:49
 */
public interface TsweekService {

	Page<TsweekEntity> listTsweek(Map<String, Object> params);
	
	R saveTsweek(TsweekEntity tsweek);
	
	R getTsweekById(Long id);
	
	R updateTsweek(TsweekEntity tsweek);
	
	R batchRemove(Long[] id);
	
	TsweekEntity getTsweekByDate(String date);

}
