package com.ewaytek.edf.web.modules.equip.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentRecordEntity;
import com.ewaytek.edf.web.modules.equip.dao.EquipmentRecordMapper;
import com.ewaytek.edf.web.modules.equip.service.EquipmentRecordService;

/**
 * 设备记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:53:35
 */
@Service("equipmentRecordService")
public class EquipmentRecordServiceImpl implements EquipmentRecordService {

	@Autowired
	private EquipmentRecordMapper equipmentRecordMapper;

	@Override
	public Page<EquipmentRecordEntity> listEquipmentRecord(Map<String, Object> params) {
		Query query = new Query(params);
		Page<EquipmentRecordEntity> page = new Page<>(query);
		equipmentRecordMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveEquipmentRecord(EquipmentRecordEntity role) {
		int count = equipmentRecordMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getEquipmentRecordById(Long id) {
		EquipmentRecordEntity equipmentRecord = equipmentRecordMapper.getObjectById(id);
		return CommonUtils.msg(equipmentRecord);
	}

	@Override
	public R updateEquipmentRecord(EquipmentRecordEntity equipmentRecord) {
		int count = equipmentRecordMapper.update(equipmentRecord);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = equipmentRecordMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
