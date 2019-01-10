package com.ewaytek.edf.web.modules.pro.service.impl;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.pro.dao.ProjectMapper;
import com.ewaytek.edf.web.modules.pro.service.ProjectService;

/**
 * 项目表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午7:41:46
 */
@Service("projectService")
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectMapper projectMapper;
	
	@Override
	public List<ProjectEntity> proList() {
		return projectMapper.proList();
	}

	@Override
	public Page<ProjectEntity> listProject(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ProjectEntity> page = new Page<>(query);
		projectMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveProject(ProjectEntity project) {
	
		int rs = projectMapper.save(project);
		Long [] members=project.getMembers();
		if(rs>0&&null!=members){
			setMembers(project.getProId(),members);
		}
		return CommonUtils.msg(rs);
	}

	@Override
	public R getProjectById(Long id) {
		ProjectEntity project = projectMapper.getObjectById(id);
		return CommonUtils.msg(project);
	}

	@Override
	public R updateProject(ProjectEntity project) {
		int count = projectMapper.update(project);
		Long [] members=project.getMembers();
		Long [] proId={project.getProId()};
		projectMapper.deleteMembers(proId);
		if(null!=members){
			setMembers(project.getProId(),members);
		}
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
 
		projectMapper.deleteMembers(id);
		int count = projectMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public int setMembers(Long proId,Long[] member) {
		// TODO 自动生成的方法存根
		return projectMapper.setMembers(proId,member);
	}

	@Override
	public List<Long> getMembers(Long proId) {
	 
		return projectMapper.getMembersByProId(proId);
	}

	@Override
	public ProjectEntity getProjectEntityById(Long id) {
		// TODO 自动生成的方法存根
		return  projectMapper.getObjectById(id);
	}

}
