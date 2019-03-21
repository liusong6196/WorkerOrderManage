package com.ewaytek.edf.web.modules.cqwork.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.web.modules.cqwork.entity.SocietydistlistEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:33:00
 */
@Mapper
public interface SocietydistlistMapper extends BaseMapper<SocietydistlistEntity> {
	
	List<SocietydistlistEntity> querySocietydistlist(Map<String,Object> param);
	
	String getSocietyExplainByDistId(String distid);
}
