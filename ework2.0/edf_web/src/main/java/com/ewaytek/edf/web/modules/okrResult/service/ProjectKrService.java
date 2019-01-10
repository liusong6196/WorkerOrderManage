package com.ewaytek.edf.web.modules.okrResult.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.GoalEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.ProjectKrEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;

/**
 * 项目关键结果
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:35:37
 */
public interface ProjectKrService {

	Page<ProjectKrEntity> listProjectKr(Map<String, Object> params);
	
	R saveProjectKr(ProjectKrEntity projectKr);
	
	R getProjectKrById(Long id);
	
	R updateProjectKr(ProjectKrEntity projectKr);
	
	R batchRemove(Long[] id);
	
	/**
	 * 部门列表
	 */
	List<ProjectKrEntity> listDepartOKRResult(Long id);
	
	/**
	 * 个人关键结果okr
	 */
	List<ProjectKrEntity> listUserOKRResult(Long id);
	
	Page<ProjectKrEntity> listProjectKrByNum(Map<String, Object> params);
	//我的个人okr
	Page<ProjectKrEntity> myPerOkr(Map<String, Object> params);
	//项目okr
	Page<ProjectKrEntity> myDepOkr(Map<String, Object> params);
	//我的项目
	Page<ProjectKrEntity> myProOkr(Map<String, Object> params);
	//个人目标
	GoalEntity perinfo(int quarter, Long userid, int year);
	//部门目标
	GoalEntity depinfo(int quarter, Long userid, int year);
	//项目目标
	GoalEntity proinfo(Long userid, String pronum);
	/**
	 * 获得登陆用户部门
	 * @param userid
	 * @return
	 */
	SysDepartmentEntity getUserDep(Long userid);
	/**
	 * 项目okrlist
	 * @return
	 */
	List<ProjectEntity> listProjectOkr();
	/**
	 * 个人okrlist
	 * @param quarter
	 * @param year
	 * @return
	 */
	List<ObjectiveEntity> listPerjectOkr(int quarter, int year);

	Page<ProjectKrEntity> myPerOkrT(Map<String, Object> params);
	
	/**
	 * 个人目标列表
	 * @param params 
	 * @return
	 */
	List<ObjectiveEntity> listPerson(Map<String, Object> params);

	List<ObjectiveEntity> listDepart(Map<String, Object> params);

	}
