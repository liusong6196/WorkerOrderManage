package com.ewaytek.edf.web.modules.documents.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.documents.entity.DocumentsEntity;

/**
 * 文档管理表; InnoDB free: 16384 kB
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:43:33
 */
public interface DocumentsService {

	Page<DocumentsEntity> listDocuments(Map<String, Object> params);
	
	R saveDocuments(DocumentsEntity documents);
	
	R getDocumentsById(Long id);
	
	R updateDocuments(DocumentsEntity documents);
	
	R batchRemove(Long[] id);

	List<DocumentsEntity> getdocType();
	
}
