package com.ewaytek.edf.gen.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.gen.entity.GeneratorParamEntity;
import com.ewaytek.edf.gen.entity.TableEntity;

/**
 * 代码生成器
 * @author 张静普
 */
public interface GeneratorService {

	Page<TableEntity> listTable(Map<String, Object> params);
	
	byte[] generator(GeneratorParamEntity params);
}
