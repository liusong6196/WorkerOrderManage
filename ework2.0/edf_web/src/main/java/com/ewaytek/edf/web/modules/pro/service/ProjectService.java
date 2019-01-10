package com.ewaytek.edf.web.modules.pro.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;

/**
 * 项目表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午7:41:46
 */
public interface ProjectService {

	List<ProjectEntity> proList();
	
	Page<ProjectEntity> listProject(Map<String, Object> params);
	
	R saveProject(ProjectEntity project);
	
	R getProjectById(Long id);
	
	R updateProject(ProjectEntity project);
	
	R batchRemove(Long[] id);
	
	int setMembers(Long proId,Long [] member);
	
	List<Long>  getMembers(Long proId);
	
	ProjectEntity getProjectEntityById(Long id);
}
