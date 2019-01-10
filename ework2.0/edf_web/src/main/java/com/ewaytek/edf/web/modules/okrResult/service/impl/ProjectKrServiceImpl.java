package com.ewaytek.edf.web.modules.okrResult.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.okrResult.dao.ProjectKrMapper;
import com.ewaytek.edf.web.modules.okrResult.entity.GoalEntity;
import com.ewaytek.edf.web.modules.okrResult.entity.ProjectKrEntity;
import com.ewaytek.edf.web.modules.okrResult.service.ProjectKrService;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 项目关键结果
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:35:37
 */
@Service("projectKrService")
public class ProjectKrServiceImpl implements ProjectKrService {

	@Autowired
	private ProjectKrMapper projectKrMapper;

	@Override
	public Page<ProjectKrEntity> listProjectKr(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ProjectKrEntity> page = new Page<>(query);
		projectKrMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveProjectKr(ProjectKrEntity role) {
		int count = projectKrMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getProjectKrById(Long id) {
		ProjectKrEntity projectKr = projectKrMapper.getObjectById(id);
		return CommonUtils.msg(projectKr);
	}

	@Override
	public R updateProjectKr(ProjectKrEntity projectKr) {
		int count = projectKrMapper.update(projectKr);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = projectKrMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<ProjectKrEntity> listDepartOKRResult(Long id) {
		
		return projectKrMapper.listDepartOKRResult(id);
	}
	@Override
	public Page<ProjectKrEntity> listProjectKrByNum(Map<String, Object> params) {
		Query query = new Query(params);
		Page<ProjectKrEntity> page = new Page<>(query);
		projectKrMapper.listForPageByNum(page, query);
		return page;
	}
	@Override
	public List<ProjectKrEntity> listUserOKRResult(Long id){
		return projectKrMapper.listUserOKRResult(id);
	}
	
	//我的个人OKR
	@Override
	public Page<ProjectKrEntity> myPerOkr(Map<String, Object> params) {
		// TODO Auto-generated method stub 
		//获得用户id
		Long userId=ShiroUtils.getUserId();
		
		params.put("userid", Long.valueOf(userId));
		
		Query query = new Query(params);
		Page<ProjectKrEntity> page=new Page<>(query);
		projectKrMapper.myPerOkr(page, query);
		
		return page;
	}
	//我的部门okr
	@Override
	public Page<ProjectKrEntity> myDepOkr(Map<String, Object> params) {
		// TODO Auto-generated method stub
		Query query = new Query(params);
		Page<ProjectKrEntity> page=new Page<>(query);
		projectKrMapper.myDepOkr(page, query);
//		Map<String, Object> paramsDep=new HashMap<>();
//		paramsDep.put("userid", userid);
//		paramsDep.put("quarter", quarter);
//		paramsDep.put("year", year);
		
		return page;
	}
	//我的项目ork
	@Override
	public Page<ProjectKrEntity> myProOkr(Map<String, Object> params) {
		// TODO Auto-generated method stub
		Query query = new Query(params);
		Page<ProjectKrEntity> page=new Page<>(query);
		projectKrMapper.myProOkr(page, query);
//		Map<String, Object> paramspro=new HashMap<>();
//		paramspro.put("userid", userid);
//		paramspro.put("pronum", pronum);
		return page;
	}
	//个人目标
	@Override
	public GoalEntity perinfo(int quarter, Long userid, int year) {
		// TODO Auto-generated method stub
		Map<String, Object> params=new HashMap<>();
		params.put("userid", userid);
		params.put("quarter", quarter);
		params.put("year", year);
		return projectKrMapper.perinfo(params);
	}
	//部门目标
	@Override
	public GoalEntity depinfo(int quarter, Long userid, int year) {
		Map<String, Object> params=new HashMap<>();
		params.put("userid", userid);
		params.put("quarter", quarter);
		params.put("year", year);
		return projectKrMapper.depinfo(params);
	}

	@Override
	public GoalEntity proinfo(Long userid, String pronum) {
		Map<String, Object> params=new HashMap<>();
		params.put("userid", userid);
		params.put("pronum", pronum);
		return projectKrMapper.proinfo(params);
	}

	@Override
	public SysDepartmentEntity getUserDep(Long userid) {
		// TODO Auto-generated method stub
		return projectKrMapper.getUserDep(userid);
	}

	@Override
	public List<ProjectEntity> listProjectOkr() {
		// TODO Auto-generated method stub
		Long userId=ShiroUtils.getUserId();
		//获得用户项目集合
		List<ProjectEntity> prolist=new ArrayList<>();
		prolist=projectKrMapper.getProList(userId);
		//获取项目的关键结果
		/*for (ProjectEntity proentity : prolist) {
			String status=proentity.getProStatus();
			if(status.equals("1")) {
			String pronum=proentity.getProNumber();
			List<ProjectKrEntity> prokr =projectKrMapper.getProKrResult(pronum);
			proentity.setListokr(prokr);
			}
		}*/
		
		return prolist;
	}
	/**
	 * 个人Okrlist
	 */
	@Override
	public List<ObjectiveEntity> listPerjectOkr(int quarter, int year) {
		// TODO Auto-generated method stub
		//获得用户id
		Long userId=ShiroUtils.getUserId();
		Map<String, Object> params=new HashMap<>();
		params.put("userid", Long.valueOf(userId));
		params.put("quarter", quarter);
		params.put("year", year);
		return projectKrMapper.getPerList(params);
	}

	@Override
	public Page<ProjectKrEntity> myPerOkrT(Map<String, Object> params) {
		// TODO Auto-generated method stub
		Query query = new Query(params);
		Page<ProjectKrEntity> page=new Page<>(query);
		projectKrMapper.myPerOkrT(page, query);
		return page;
	}
	/**
	 * 个人目标list
	 */
	@Override
	public List<ObjectiveEntity> listPerson(Map<String, Object> params) {
		Long id=ShiroUtils.getUserId();
		params.put("id", Long.valueOf(id));
		List<ObjectiveEntity> list = projectKrMapper.listPerson(params);
		return list;
	}

	@Override
	public List<ObjectiveEntity> listDepart(Map<String, Object> params) {
		Long id=ShiroUtils.getUserId();
		params.put("id", Long.valueOf(id));
		List<ObjectiveEntity> list = projectKrMapper.listDepart(params);
		return list;
	}
	
}

