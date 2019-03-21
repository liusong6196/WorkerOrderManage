package com.ewaytek.edf.web.modules.cqwork.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.cqwork.entity.ProSelectEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

@Mapper
public interface ProSelectMapper extends BaseMapper<ProSelectEntity>{

	List<ProSelectEntity> queryProSelectList(Map<String,Object> param);
}
