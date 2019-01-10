package com.ewaytek.edf.web.modules.pro.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.pro.entity.ProjectQuestionEntity;
import com.ewaytek.edf.web.modules.pro.dao.ProjectQuestionMapper;
import com.ewaytek.edf.web.modules.pro.service.ProjectQuestionService;

/**
 * 项目问题表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月04日 上午10:17:52
 */
@Service("projectQuestionService")
public class ProjectQuestionServiceImpl implements ProjectQuestionService {

	@Autowired
	private ProjectQuestionMapper projectQuestionMapper;

	@Override
	public Page<ProjectQuestionEntity> listProjectQuestion(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ProjectQuestionEntity> page = new Page<>(query);
		projectQuestionMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveProjectQuestion(ProjectQuestionEntity role) {
		int count = projectQuestionMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getProjectQuestionById(Long id) {
		ProjectQuestionEntity projectQuestion = projectQuestionMapper.getObjectById(id);
		return CommonUtils.msg(projectQuestion);
	}

	@Override
	public R updateProjectQuestion(ProjectQuestionEntity projectQuestion) {
		int count = projectQuestionMapper.update(projectQuestion);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = projectQuestionMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
