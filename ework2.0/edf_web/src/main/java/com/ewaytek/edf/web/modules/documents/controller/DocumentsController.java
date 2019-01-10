package com.ewaytek.edf.web.modules.documents.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.documents.entity.DocumentsEntity;
import com.ewaytek.edf.web.modules.documents.service.DocumentsService;


/**
 * 文档管理表; InnoDB free: 16384 kB
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:43:33
 */
@RestController
@RequestMapping("/api/sys/document")
public class DocumentsController  {
	
	@Autowired
	private DocumentsService documentsService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<DocumentsEntity> list(@RequestBody Map<String, Object> params) {
		Page<DocumentsEntity> listDocuments = documentsService.listDocuments(params);
		return documentsService.listDocuments(params);
	}
		
	/**
	 * 新增
	 * @param documents
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@SysLog("新增文档管理表; InnoDB free: 16384 kB")
	@RequestMapping("/save")
	public R save(@RequestBody DocumentsEntity documents ) {
		
		return documentsService.saveDocuments(documents);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return documentsService.getDocumentsById(id);
	}
	
	/**
	 * 修改
	 * @param documents
	 * @return
	 */
	@SysLog("修改文档管理表; InnoDB free: 16384 kB")
	@RequestMapping("/update")
	public R update(@RequestBody DocumentsEntity documents) {
		return documentsService.updateDocuments(documents);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除文档管理表; InnoDB free: 16384 kB")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return documentsService.batchRemove(id);
	}
	/**
	 * 查询文档类型
	 * @param id
	 * @return
	 */
	
	@RequestMapping("/getdocType")
	public List<DocumentsEntity> getdocType() {
		List<DocumentsEntity> doclist=documentsService.getdocType();
		return doclist;
	}
}
