package com.ewaytek.edf.web.modules.documents.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.documents.entity.DocumentsEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;

/**
 * 文档管理表; InnoDB free: 16384 kB
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:43:33
 */
@Mapper
public interface DocumentsMapper extends BaseMapper<DocumentsEntity> {

	SysUserEntity getUserBYName(String userName);

	List<DocumentsEntity> getdocType();
	
}
