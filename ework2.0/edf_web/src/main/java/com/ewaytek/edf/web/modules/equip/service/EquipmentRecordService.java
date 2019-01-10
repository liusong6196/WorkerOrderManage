package com.ewaytek.edf.web.modules.equip.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentRecordEntity;

/**
 * 设备记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:53:35
 */
public interface EquipmentRecordService {

	Page<EquipmentRecordEntity> listEquipmentRecord(Map<String, Object> params);
	
	R saveEquipmentRecord(EquipmentRecordEntity equipmentRecord);
	
	R getEquipmentRecordById(Long id);
	
	R updateEquipmentRecord(EquipmentRecordEntity equipmentRecord);
	
	R batchRemove(Long[] id);
	
}
