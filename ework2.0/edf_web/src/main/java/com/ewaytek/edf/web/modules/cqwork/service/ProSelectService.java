package com.ewaytek.edf.web.modules.cqwork.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.web.modules.cqwork.entity.ProSelectEntity;

public interface ProSelectService {

	List<ProSelectEntity> queryProSelectList(Map<String,Object> param);
}
