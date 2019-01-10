package com.ewaytek.edf.web.modules.equip_bor.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.equip_bor.entity.EquipmentBorrowEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 设备借用表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:29:26
 */
@Mapper
public interface EquipmentBorrowMapper extends BaseMapper<EquipmentBorrowEntity> {
	List<ProjectEntity> getProjectEntityAll();
}
