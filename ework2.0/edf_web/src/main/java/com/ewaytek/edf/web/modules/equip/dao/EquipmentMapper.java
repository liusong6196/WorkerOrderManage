package com.ewaytek.edf.web.modules.equip.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 设备表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月12日 下午8:57:52
 */
@Mapper
public interface EquipmentMapper extends BaseMapper<EquipmentEntity> {
	List<EquipmentEntity> getEquipmentEntityAll();
	
	Integer getEquCount(@Param("equid")Long equid);
	
	void setEquCount(@Param("equid")Long equid,@Param("count")Integer count);
	
	EquipmentEntity getEequByAll(@Param("equName")String equName,@Param("styleId")String styleId,@Param("equSite")String equSite);
	
	Long insertEquRetId(EquipmentEntity e);
}
