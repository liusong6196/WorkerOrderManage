package com.ewaytek.edf.gen.service.impl;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.gen.dao.GeneratorMapper;
import com.ewaytek.edf.gen.entity.ColumnEntity;
import com.ewaytek.edf.gen.entity.GeneratorParamEntity;
import com.ewaytek.edf.gen.entity.TableEntity;
import com.ewaytek.edf.gen.service.GeneratorService;
import com.ewaytek.edf.gen.utils.GenUtils;

/**
 * 代码生成器
 * @author 张静普
 */
@Service("generatorService")
public class GeneratorServiceImpl implements GeneratorService {

	@Autowired
	private GeneratorMapper generatorMapper;
	
	/**
	 * 列出所以的Table
	 */
	@Override
	public Page<TableEntity> listTable(Map<String, Object> params) {
		Query query = new Query(params);
		Page<TableEntity> page = new Page<>(query);
		generatorMapper.listTable(page, query);
		return page;
	}

	/**
	 * 生成代码
	 * @throws Exception 
	 */
	@Override
	public byte[] generator(GeneratorParamEntity params) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ZipOutputStream zip = new ZipOutputStream(out);
		try {
			for(String table : params.getTables()) {
				TableEntity tableEntity = generatorMapper.getTableByName(table);
				List<ColumnEntity> columns = generatorMapper.listColumn(table);
				GenUtils.generatorCode(tableEntity, columns, params, zip);
			}
			IOUtils.closeQuietly(zip);
			return out.toByteArray();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

}
