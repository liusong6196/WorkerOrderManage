package com.ewaytek.edf.web.modules.cqwork.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.cqwork.entity.SocietydistlistEntity;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:33:00
 */
public interface SocietydistlistService {

	Page<SocietydistlistEntity> listSocietydistlist(Map<String, Object> params);
	
	R saveSocietydistlist(SocietydistlistEntity societydistlist);
	
	R getSocietydistlistById(Long id);
	
	R updateSocietydistlist(SocietydistlistEntity societydistlist);
	
	R batchRemove(Long[] id);
	
	List<SocietydistlistEntity> querySocietydistlist(Map<String,Object> param);
	
}
