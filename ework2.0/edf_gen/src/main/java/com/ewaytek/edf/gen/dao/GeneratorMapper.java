package com.ewaytek.edf.gen.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.gen.entity.ColumnEntity;
import com.ewaytek.edf.gen.entity.TableEntity;

/**
 * 代码生成器，数据库访问层
 * @author 张静普
 */
@Mapper
public interface GeneratorMapper {

	List<TableEntity> listTable(Page<TableEntity> page, Query query);
	
	TableEntity getTableByName(String tableName);
	
	List<ColumnEntity> listColumn(String tableName);

}
