package com.ewaytek.edf.web.modules.equip.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;

/**
 * 设备表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月12日 下午8:57:52
 */
public interface EquipmentService {

	Page<EquipmentEntity> listEquipment(Map<String, Object> params);
	
	R saveEquipment(EquipmentEntity equipment);
	
	R getEquipmentById(Long id);
	
	R updateEquipment(EquipmentEntity equipment);
	
	R batchRemove(Long[] id);
	
	List<EquipmentEntity> getEquipmentEntityAll();
	
	Integer getEquCount(Long equid);
	
	void setEquCount(Long equid,Integer count);
	
	R EquipmentOut(EquipmentEntity equipment);
}
