package com.ewaytek.edf.web.modules.cqwork.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.util.Base64Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.cqwork.entity.WorkorderEntity;
import com.ewaytek.edf.web.modules.cqwork.dao.SocietydistlistMapper;
import com.ewaytek.edf.web.modules.cqwork.dao.WorkorderMapper;
import com.ewaytek.edf.web.modules.cqwork.service.WorkorderService;
import com.ewaytek.edf.web.utils.DateUtils;
import com.ewaytek.edf.web.utils.ShiroUtils;
import com.ewaytek.edf.web.utils.SystemParam;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:30:56
 */
@Service("workorderService")
public class WorkorderServiceImpl implements WorkorderService {

	@Autowired
	private WorkorderMapper workorderMapper;
	
	@Autowired
	private SocietydistlistMapper societydistlistMapper;
	
	@Autowired
	SystemParam systemParam;

	@Override
	public Page<WorkorderEntity> listWorkorder(Map<String, Object> params) {
		Query query = new Query(params);
		Page<WorkorderEntity> page = new Page<>(query);
		workorderMapper.listForPage(page, query);
		return page;
	}

	@Override
	@Transactional
	public R saveWorkorder(WorkorderEntity role) {
		String base64Str = "";
		String imgFilePath = "";
		OutputStream out = null;
		try {
			if(role.getErrImgpath() != null && !"".equals(role.getErrImgpath())){
				base64Str = role.getErrImgpath().split(",")[1];
				byte[] b = Base64Utils.decodeFromString(base64Str);
				for(int i=0;i<b.length;++i){  
	                if(b[i]<0)  {//调整异常数据  
	                    b[i]+=256;  
	                }  
		         }
				File path = new File(systemParam.getImgpath());
				if(!path.exists()){
					path.mkdirs();
				}
				imgFilePath = systemParam.getImgpath() + System.currentTimeMillis()+".jpg";
				out = new FileOutputStream(imgFilePath);
				out.write(b);  
	            out.flush();
			}
			role.setOccurDate(DateUtils.DateParse(role.getStrdate()));
			role.setProcessUser(ShiroUtils.getUserEntity().getUsername());
			role.setErrImgpath(imgFilePath);
			int count = workorderMapper.save(role);
			return CommonUtils.msg(count);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(out != null){
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return CommonUtils.msg(0);
		
	}

	@Override
	public R getWorkorderById(Long id) {
		WorkorderEntity workorder = workorderMapper.getObjectById(id);
		return CommonUtils.msg(workorder);
	}

	@Override
	public R updateWorkorder(WorkorderEntity workorder) {
		//System.out.println(workorder.getArea()+"-"+workorder.getTown()+"-"+workorder.getVillage());
		if(workorder.getArea() != null && !"".equals(workorder.getArea())){
			String area = societydistlistMapper.getSocietyExplainByDistId(workorder.getArea());
			workorder.setArea(area);
		}
		if(workorder.getTown() != null && !"".equals(workorder.getTown())){
			String town = societydistlistMapper.getSocietyExplainByDistId(workorder.getTown());
			workorder.setTown(town);
		}
		if(workorder.getVillage() != null && !"".equals(workorder.getVillage())){
			String village = societydistlistMapper.getSocietyExplainByDistId(workorder.getVillage());
			workorder.setVillage(village);
		}
		workorder.setOccurDate(DateUtils.DateParse(workorder.getStrdate()));
		int count = workorderMapper.update(workorder);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = workorderMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<WorkorderEntity> queryWorkorderEntityList(Map<String, Object> param) {
		return workorderMapper.queryWorkorderEntityList(param);
	}

}
