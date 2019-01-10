package com.ewaytek.edf.web.modules.equip_bor.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.equip_bor.entity.EquipmentBorrowEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;

/**
 * 设备借用表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:29:26
 */
public interface EquipmentBorrowService {

	Page<EquipmentBorrowEntity> listEquipmentBorrow(Map<String, Object> params);
	
	R saveEquipmentBorrow(EquipmentBorrowEntity equipmentBorrow);
	
	R getEquipmentBorrowById(Long id);
	
	R updateEquipmentBorrow(EquipmentBorrowEntity equipmentBorrow);
	
	R batchRemove(Long[] id);
	
	List<ProjectEntity> getProjectEntityAll();
	
	EquipmentEntity getEquimentById(Long id);
	
	R EquipmentReturn(EquipmentBorrowEntity equipmentBorrow);
	
}
