package com.ewaytek.edf.web.modules.equip.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentRecordEntity;
import com.ewaytek.edf.web.modules.equip.dao.EquipmentMapper;
import com.ewaytek.edf.web.modules.equip.dao.EquipmentRecordMapper;
import com.ewaytek.edf.web.modules.equip.service.EquipmentService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 设备表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月12日 下午8:57:52
 */
@Service("equipmentService")
public class EquipmentServiceImpl implements EquipmentService {

	@Autowired
	private EquipmentMapper equipmentMapper;
	
	@Autowired
	private EquipmentRecordMapper equipmentRecordMapper;

	@Override
	public Page<EquipmentEntity> listEquipment(Map<String, Object> params) {
		Query query = new Query(params);
		Page<EquipmentEntity> page = new Page<>(query);
		equipmentMapper.listForPage(page, query);
		return page;
	}

	@Override
	@Transactional
	public R saveEquipment(EquipmentEntity role) {
		EquipmentEntity e = equipmentMapper.getEequByAll(role.getEquName(),role.getEquStyleid(),role.getEquSite());
		EquipmentRecordEntity record = new EquipmentRecordEntity();
		Integer optionCount = role.getEquCount();
		Double price = role.getEquPrice();
		String remark = role.getRemark();
		if(e != null && !"".equals(e)){
			record.setEquId(e.getEquId());
			equipmentMapper.setEquCount(e.getEquId(),optionCount + e.getEquCount());
		}else{
			role.setGmtCreate(new Date());
			role.setUserIdCreate(ShiroUtils.getUserId());
			equipmentMapper.insertEquRetId(role);
			EquipmentEntity equ = equipmentMapper.getEequByAll(role.getEquName(),role.getEquStyleid(),role.getEquSite());
			record.setEquId(equ.getEquId());
		}
		record.setRecordPrice(price);
		record.setRecordCount(optionCount);
		record.setBillingAmount(price * optionCount);
		record.setRecordDatetime(role.getOptionDate());
		record.setOverDatetime(role.getOverdueDatetime());
		record.setRecState("1");
		record.setRemark(remark);
		record.setGmtCreate(new Date());
		record.setUserIdCreate(ShiroUtils.getUserId());
		int count = equipmentRecordMapper.save(record);
		return CommonUtils.msg(count);
	}

	@Override
	public R getEquipmentById(Long id) {
		EquipmentEntity equipment = equipmentMapper.getObjectById(id);
		return CommonUtils.msg(equipment);
	}

	@Override
	public R updateEquipment(EquipmentEntity equipment) {
		int count = equipmentMapper.update(equipment);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = equipmentMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<EquipmentEntity> getEquipmentEntityAll() {
		return equipmentMapper.getEquipmentEntityAll();
	}

	@Override
	public Integer getEquCount(Long equid) {
		return equipmentMapper.getEquCount(equid);
	}

	@Override
	public void setEquCount(Long equid, Integer count) {
		equipmentMapper.setEquCount(equid, count);
	}

	@Override
	@Transactional
	public R EquipmentOut(EquipmentEntity equipment) {
		EquipmentEntity afterEqu = equipmentMapper.getObjectById(equipment.getEquId());
		EquipmentEntity e = new EquipmentEntity();
		e.setEquId(equipment.getEquId());
		e.setEquCount(afterEqu.getEquCount() - equipment.getEquCount());
		equipmentMapper.update(e);
		EquipmentRecordEntity record = new EquipmentRecordEntity();
		record.setEquId(equipment.getEquId());
		record.setRecordPrice(equipment.getEquPrice());
		record.setRecordCount(equipment.getEquCount());
		record.setBillingAmount(equipment.getInvoiceMoney());
		record.setCusId(equipment.getCusName());
		record.setReceiveUnit(equipment.getUnit());
		record.setRecordDatetime(equipment.getOptionDate());
		record.setOverDatetime(equipment.getOverdueDatetime());
		record.setRecState("2");
		record.setRemark(equipment.getRemark());
		record.setUserIdCreate(ShiroUtils.getUserId());
		record.setGmtCreate(new Date());
		int count = equipmentRecordMapper.save(record);
		return CommonUtils.msg(count);
	}

}
