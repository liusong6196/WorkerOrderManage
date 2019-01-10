package com.ewaytek.edf.web.modules.documents.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.web.modules.documents.dao.DocumentsMapper;
import com.ewaytek.edf.web.modules.documents.entity.DocumentsEntity;
import com.ewaytek.edf.web.modules.documents.service.DocumentsService;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;

/**
 * 文档管理表; InnoDB free: 16384 kB
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:43:33
 */
@Service("documentsService")
public class DocumentsServiceImpl implements DocumentsService {

	@Autowired
	private DocumentsMapper documentsMapper;

	@Override
	public Page<DocumentsEntity> listDocuments(Map<String, Object> params) {
		Query query = new Query(params);
		Page<DocumentsEntity> page = new Page<>(query);
		documentsMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R saveDocuments(DocumentsEntity role) {
		//设置发布时间
		role.setDocDatetime(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		//通过登陆人姓名查询创建人id
		SysUserEntity user= documentsMapper.getUserBYName(role.getUserName());
		//将创建人id放入实体
		role.setUserIdCreate(user.getUserIdCreate());
		//保存数据
		int count = documentsMapper.save(role);
		return CommonUtils.msg(count);
	}

	@Override
	public R getDocumentsById(Long id) {
		DocumentsEntity documents = documentsMapper.getObjectById(id);
		return CommonUtils.msg(documents);
	}

	@Override
	public R updateDocuments(DocumentsEntity documents) {
		int count = documentsMapper.update(documents);
		return CommonUtils.msg(count);
	}

	@Override
	public R batchRemove(Long[] id) {
		int count = documentsMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<DocumentsEntity> getdocType() {
		// TODO Auto-generated method stub
		return documentsMapper.getdocType();
		
	}

}
