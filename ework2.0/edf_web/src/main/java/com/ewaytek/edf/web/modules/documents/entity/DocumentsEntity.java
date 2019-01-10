package com.ewaytek.edf.web.modules.documents.entity;


import java.io.Serializable;
import java.util.Date;



/**
 * 文档管理表; InnoDB free: 16384 kB
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:43:33
 */
public class DocumentsEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long id;
	
	/**
	 * 文档编号
	 */
	private String docNo;
	
	/**
	 * 文档名称
	 */
	private String docName;
	
	/**
	 * 文档类型:1,过程文档、2,检查单、3,模版、4,示例
	 */
	private String docType;
	
	/**
	 * 类型名称
	 */
	private String docTypeName;
	/**
	 * 发布时间
	 */
	private String docDatetime;
	
	/**
	 * 版本号
	 */
	private String docVersion;
	
	/**
	 * 作者
	 */
	private String docAuthor;
	
	/**
	 * url
	 */
	private String url;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 创建人
	 */
	private Long userIdCreate;
	
	/**
	 * 创建人姓名
	 */
	private String userName;
	/**
	 * 创建时间
	 */
	private Date gmtCreate;
	
	/**
	 * 修改时间
	 */
	private Date gmtModified;
	

	public DocumentsEntity() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	
	public String getDocNo() {
		return docNo;
	}
	
	public void setDocName(String docName) {
		this.docName = docName;
	}
	
	public String getDocName() {
		return docName;
	}
	
	public void setDocType(String docType) {
		this.docType = docType;
	}
	
	public String getDocType() {
		return docType;
	}
	
	public void setDocDatetime(String docDatetime) {
		this.docDatetime = docDatetime;
	}
	
	public String getDocDatetime() {
		return docDatetime;
	}
	
	public void setDocVersion(String docVersion) {
		this.docVersion = docVersion;
	}
	
	public String getDocVersion() {
		return docVersion;
	}
	
	public void setDocAuthor(String docAuthor) {
		this.docAuthor = docAuthor;
	}
	
	public String getDocAuthor() {
		return docAuthor;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getRemark() {
		return remark;
	}
	
	public void setUserIdCreate(Long userIdCreate) {
		this.userIdCreate = userIdCreate;
	}
	
	public Long getUserIdCreate() {
		return userIdCreate;
	}
	
	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}
	
	public Date getGmtCreate() {
		return gmtCreate;
	}
	
	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}
	
	public Date getGmtModified() {
		return gmtModified;
	}

	public String getDocTypeName() {
		return docTypeName;
	}

	public void setDocTypeName(String docTypeName) {
		this.docTypeName = docTypeName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "DocumentsEntity [id=" + id + ", docNo=" + docNo + ", docName=" + docName + ", docType=" + docType
				+ ", docTypeName=" + docTypeName + ", docDatetime=" + docDatetime + ", docVersion=" + docVersion
				+ ", docAuthor=" + docAuthor + ", url=" + url + ", remark=" + remark + ", userIdCreate=" + userIdCreate
				+ ", userName=" + userName + ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified + "]";
	}


	
}
