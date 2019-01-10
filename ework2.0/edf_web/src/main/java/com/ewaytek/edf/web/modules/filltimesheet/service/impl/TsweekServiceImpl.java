package com.ewaytek.edf.web.modules.filltimesheet.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.filltimesheet.entity.TsweekEntity;
import com.ewaytek.edf.web.modules.filltimesheet.dao.TsweekMapper;
import com.ewaytek.edf.web.modules.filltimesheet.service.TsweekService;

/**
 * 周记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:13:49
 */
@Service("tsweekService")
public class TsweekServiceImpl implements TsweekService {

	@Autowired
	private TsweekMapper tsweekMapper;

	@Override
	public Page<TsweekEntity> listTsweek(Map<String, Object> params) {
		Query query = new Query(params);
		Page<TsweekEntity> page = new Page<>(query);
		tsweekMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveTsweek(TsweekEntity role) {
		int count = tsweekMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getTsweekById(Long id) {
		TsweekEntity tsweek = tsweekMapper.getObjectById(id);
		return CommonUtils.msg(tsweek);
	}

	@Override
	public R updateTsweek(TsweekEntity tsweek) {
		int count = tsweekMapper.update(tsweek);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = tsweekMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public TsweekEntity getTsweekByDate(String date) {
		return tsweekMapper.getTsweekByDate(date);
	}

}
