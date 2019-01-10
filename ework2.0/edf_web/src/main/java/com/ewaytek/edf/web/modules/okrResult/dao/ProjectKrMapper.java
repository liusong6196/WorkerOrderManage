package com.ewaytek.edf.web.modules.okrResult.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.GoalEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.ProjectKrEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;

/**
 * 项目关键结果
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:35:37
 */
@Mapper
public interface ProjectKrMapper extends BaseMapper<ProjectKrEntity> {
	/**
	 * 部门关键结果okr
	 */
	List<ProjectKrEntity> listDepartOKRResult(Long id);
	
	List<ProjectKrEntity> listForPageByNum(Page<ProjectKrEntity> page, Query query);
	/**
	 * 个人关键结果okr
	 */
	List<ProjectKrEntity> listUserOKRResult(Long id);
		//我的个人okr
	List<ProjectKrEntity> myPerOkr(Page<ProjectKrEntity> page, Query query);
	//部门
	List<ProjectKrEntity> myDepOkr(Page<ProjectKrEntity> page, Query query);
	//项目
	List<ProjectKrEntity> myProOkr(Page<ProjectKrEntity> page, Query query);
	//个人目标
	GoalEntity perinfo(Map<String, Object> params);
	//部门目标
	GoalEntity depinfo(Map<String, Object> params);
	//项目目标
	GoalEntity proinfo(Map<String, Object> params);
	
	//部门名称
	SysDepartmentEntity getUserDep(Long userid);
	//用户项目列
	List<ProjectEntity> getProList(Long userId);
	//项目对应状态
	List<ProjectKrEntity> getProKrResult(String pronum);
	
	//个人okrlist
	List<ObjectiveEntity> getPerList(Map<String, Object> params);
	//个人关键结果OKR
	List<ProjectKrEntity> myPerOkrT(Page<ProjectKrEntity> page, Query query);
	//个人目标list
	List<ObjectiveEntity> listPerson(Map<String, Object> params);
	//部门目标list
	List<ObjectiveEntity> listDepart(Map<String, Object> params);

	
}
