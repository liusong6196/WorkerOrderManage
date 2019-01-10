package com.ewaytek.edf.web.modules.pro.service;

import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.pro.entity.ProjectQuestionEntity;

/**
 * 项目问题表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月04日 上午10:17:52
 */
public interface ProjectQuestionService {

	Page<ProjectQuestionEntity> listProjectQuestion(Map<String, Object> params);
	
	R saveProjectQuestion(ProjectQuestionEntity projectQuestion);
	
	R getProjectQuestionById(Long id);
	
	R updateProjectQuestion(ProjectQuestionEntity projectQuestion);
	
	R batchRemove(Long[] id);
	
}
