package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.web.modules.cqwork.dao.ProSelectMapper;
import com.ewaytek.edf.web.modules.cqwork.entity.ProSelectEntity;
import com.ewaytek.edf.web.modules.cqwork.service.ProSelectService;

@Service("proSelectService")
public class ProSelectServiceImpl implements ProSelectService{

	@Autowired
	private ProSelectMapper proSelectMapper;

	@Override
	public List<ProSelectEntity> queryProSelectList(Map<String, Object> param){
		return proSelectMapper.queryProSelectList(param);
	}

	
}
