package com.ewaytek.edf.web.modules.pro.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 项目表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午7:41:46
 */
@Mapper
public interface ProjectMapper extends BaseMapper<ProjectEntity> {
	
	 List<ProjectEntity> proList();
		
	 int setMembers(@Param(value = "proId")Long proId,@Param(value = "member")Long [] member);

	 List<Long> getMembersByProId(Long proId);
	 
	 int deleteMembers(Long [] members);
}
