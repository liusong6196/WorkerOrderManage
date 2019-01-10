package com.ewaytek.edf.web.modules.pro.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 项目问题表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月04日 上午10:17:52
 */
public class ProjectQuestionEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 流水号
	 */
	private Long proQueId;
	
	/**
	 * 项目ID
	 */
	private Long proId;
	
	/**
	 * 员工ID
	 */
	private Long userId;
	
	/**
	 * 期望完成时间
	 */
	private String proQueHopedate;
	
	/**
	 * 实际完成时间
	 */
	private String proQueEnddate;
	
	/**
	 * 0.待解决   1.解决中  2.已解决
	 */
	private String proQueStatus;
	
	/**
	 * 问题
	 */
	private String proQueQuestion;
	
	/**
	 * 创建人
	 */
	private Long userIdCreate;
	
	/**
	 * 创建时间
	 */
	private Date gmtCreate;
	
	/**
	 * 修改时间
	 */
	private Date gmtModified;
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 用户名
	 */
	private String userName;
	
	private String userCreateName;
	
	public ProjectQuestionEntity() {
		super();
	}

	public void setProQueId(Long proQueId) {
		this.proQueId = proQueId;
	}
	
	public Long getProQueId() {
		return proQueId;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setProQueHopedate(String proQueHopedate) {
		this.proQueHopedate = proQueHopedate;
	}
	
	public String getProQueHopedate() {
		return proQueHopedate;
	}
	
	public void setProQueEnddate(String proQueEnddate) {
		this.proQueEnddate = proQueEnddate;
	}
	
	public String getProQueEnddate() {
		return proQueEnddate;
	}
	
	public void setProQueStatus(String proQueStatus) {
		this.proQueStatus = proQueStatus;
	}
	
	public String getProQueStatus() {
		return proQueStatus;
	}
	
	public void setProQueQuestion(String proQueQuestion) {
		this.proQueQuestion = proQueQuestion;
	}
	
	public String getProQueQuestion() {
		return proQueQuestion;
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

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserCreateName() {
		return userCreateName;
	}

	public void setUserCreateName(String userCreateName) {
		this.userCreateName = userCreateName;
	}
	
}
