package com.ewaytek.edf.web.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.dao.SysDictMapper;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;

/**
 * 系统数据字典表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月13日 上午10:38:08
 */
@Service("sysDictService")
public class SysDictServiceImpl implements SysDictService {

	@Autowired
	private SysDictMapper sysDictMapper;

	@Override
	public Page<SysDictEntity> listSysDict(Map<String, Object> params) {
		Query query = new Query(params);
		Page<SysDictEntity> page = new Page<>(query);
		sysDictMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveSysDict(SysDictEntity role) {
		int count = sysDictMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getSysDictById(Long id) {
		SysDictEntity sysDict = sysDictMapper.getObjectById(id);
		return CommonUtils.msg(sysDict);
	}

	@Override
	public R updateSysDict(SysDictEntity sysDict) {
		int count = sysDictMapper.update(sysDict);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = sysDictMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<SysDictEntity> listSysDictAll(Map<String, Object> params) {
		Query query = new Query(params);
		return sysDictMapper.listSysDictAll(query);
	}

	@Override
	public SysDictEntity getDictLabel(String type, String value) {
		return sysDictMapper.getDictLabel(type, value);
	}

	@Override
	public List<SysDictEntity> listSysDictByIds(List<Long> ids) {
		return sysDictMapper.listSysDictByIds(ids);
	}

	@Override
	public List<SysDictEntity> listForTimesheet(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return sysDictMapper.listForTimesheet(new Query(params));
	}

	@Override
	public List<SysDictEntity> listForTimesheetShow(Map<String, Object> params) {
		// TODO 自动生成的方法存根
		return sysDictMapper.listForTimesheetShow(new Query(params));
	}

	@Override
	public List<SysDictEntity> listQuarterType() {
		return sysDictMapper.listQuarterType();
	}

	@Override
	public List<SysDictEntity> listScoreType() {
		return sysDictMapper.listScoreType();
	}

	@Override
	public List<SysDictEntity> getDict() {
		// TODO Auto-generated method stub
		return sysDictMapper.getDict();
	}

	@Override
	public List<SysDictEntity> getUserSelectDict(Map<String, Object> params) {
		Query query = new Query(params);
		return sysDictMapper.getUserSelectDict(query);
	}
}
