package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.cqwork.entity.SocietydistlistEntity;
import com.ewaytek.edf.web.modules.cqwork.dao.SocietydistlistMapper;
import com.ewaytek.edf.web.modules.cqwork.service.SocietydistlistService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:33:00
 */
@Service("societydistlistService")
public class SocietydistlistServiceImpl implements SocietydistlistService {

	@Autowired
	private SocietydistlistMapper societydistlistMapper;

	@Override
	public Page<SocietydistlistEntity> listSocietydistlist(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SocietydistlistEntity> page = new Page<>(query);
		societydistlistMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveSocietydistlist(SocietydistlistEntity role) {
		int count = societydistlistMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getSocietydistlistById(Long id) {
		SocietydistlistEntity societydistlist = societydistlistMapper.getObjectById(id);
		return CommonUtils.msg(societydistlist);
	}

	@Override
	public R updateSocietydistlist(SocietydistlistEntity societydistlist) {
		int count = societydistlistMapper.update(societydistlist);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = societydistlistMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<SocietydistlistEntity> querySocietydistlist(Map param) {
		return societydistlistMapper.querySocietydistlist(param);
	}

}
