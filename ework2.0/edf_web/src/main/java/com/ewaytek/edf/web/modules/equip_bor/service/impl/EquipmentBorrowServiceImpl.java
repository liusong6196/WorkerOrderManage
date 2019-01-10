package com.ewaytek.edf.web.modules.equip_bor.service.impl;

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
import com.ewaytek.edf.web.modules.equip_bor.entity.EquipmentBorrowEntity;
import com.ewaytek.edf.web.modules.equip_bor.entity.EquipmentReturnEntity;
import com.ewaytek.edf.web.modules.equip.dao.EquipmentMapper;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.equip_bor.dao.EquipmentBorrowMapper;
import com.ewaytek.edf.web.modules.equip_bor.dao.EquipmentReturnMapper;
import com.ewaytek.edf.web.modules.equip_bor.service.EquipmentBorrowService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 设备借用表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:29:26
 */
@Service("equipmentBorrowService")
public class EquipmentBorrowServiceImpl implements EquipmentBorrowService {

	@Autowired
	private EquipmentBorrowMapper equipmentBorrowMapper;
	
	@Autowired
	private EquipmentMapper equipmentMapper;
	
	@Autowired
	EquipmentReturnMapper equipmentReturnMapper;

	@Override
	public Page<EquipmentBorrowEntity> listEquipmentBorrow(Map<String, Object> params) {
		Query query = new Query(params);
		Page<EquipmentBorrowEntity> page = new Page<>(query);
		equipmentBorrowMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveEquipmentBorrow(EquipmentBorrowEntity role) {
		Integer borCount = role.getBorCount();
		Integer equCount = equipmentMapper.getEquCount(role.getEquId());
		equCount = equCount - borCount;
		equipmentMapper.setEquCount(role.getEquId(),equCount);
		int count = equipmentBorrowMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getEquipmentBorrowById(Long id) {
		EquipmentBorrowEntity equipmentBorrow = equipmentBorrowMapper.getObjectById(id);
		return CommonUtils.msg(equipmentBorrow);
	}

	@Override
	public R updateEquipmentBorrow(EquipmentBorrowEntity equipmentBorrow) {
		int count = equipmentBorrowMapper.update(equipmentBorrow);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = equipmentBorrowMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<ProjectEntity> getProjectEntityAll() {
		return equipmentBorrowMapper.getProjectEntityAll();
	}

	@Override
	public EquipmentEntity getEquimentById(Long id) {
		return equipmentMapper.getObjectById(id);
	}

	@Override
	@Transactional
	public R EquipmentReturn(EquipmentBorrowEntity equipmentBorrow) {
		EquipmentEntity e = equipmentMapper.getObjectById(equipmentBorrow.getEquId());
		equipmentMapper.setEquCount(e.getEquId(),e.getEquCount()+equipmentBorrow.getParamRetCount());
		EquipmentBorrowEntity equ_bor = new EquipmentBorrowEntity();
		equ_bor.setEquBorId(equipmentBorrow.getEquBorId());
		Integer bcount = equipmentBorrow.getBorCount();
		Integer ycount = equipmentBorrow.getRetCount();
		Integer wcount = bcount - ycount;
		Integer retcount = equipmentBorrow.getParamRetCount();
		if(wcount > retcount ){
			equ_bor.setBorRetState("3");
		}else if(wcount == retcount){
			equ_bor.setBorRetState("4");
		}
		equ_bor.setRetCount(ycount+retcount);
		equ_bor.setRetDateTime(equipmentBorrow.getRetDateTime());
		equ_bor.setRemark(equipmentBorrow.getRemark());
		int count = equipmentBorrowMapper.update(equ_bor);
		EquipmentReturnEntity equ_ret = new EquipmentReturnEntity();
		equ_ret.setEquBorId(equipmentBorrow.getEquBorId());
		equ_ret.setRetUserId(equipmentBorrow.getRetUserId());
		equ_ret.setRetCount(equipmentBorrow.getParamRetCount());
		equ_ret.setRetDatetime(equipmentBorrow.getRetDateTime());
		equ_ret.setRemark(equipmentBorrow.getRemark());
		equ_ret.setUserIdCreate(ShiroUtils.getUserId());
		equ_ret.setGmtCreate(new Date());
		equipmentReturnMapper.save(equ_ret);
		return CommonUtils.msg(count);
	}

}
