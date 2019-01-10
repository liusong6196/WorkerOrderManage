package com.ewaytek.edf.web.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 部门表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午4:27:20
 */
public class SysDepartmentEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 部门ID
	 */
	private Integer depId;
	/**
	 * 上级部门，顶级部门此项为0
	 */
	private Integer depParentid;
	
	/**
	 * 员工ID(部门负责人)
	 */
	private Integer userId;
	/**
	 * 部门负责人姓名
	 */
	private String depuserName;
	/**
	 * 部门名称
	 */
	private String depName;
	/**
	 * 上级部门名称
	 */
	private String parentName;
	/**
	 * 部门编号
	 */
	private String depNumber;
	
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
	

	public SysDepartmentEntity() {
		super();
	}

	public void setDepId(Integer depId) {
		this.depId = depId;
	}
	
	public Integer getDepId() {
		return depId;
	}
	
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	public Integer getUserId() {
		return userId;
	}
	
	public void setDepName(String depName) {
		this.depName = depName;
	}
	
	public String getDepName() {
		return depName;
	}
	
	public void setDepNumber(String depNumber) {
		this.depNumber = depNumber;
	}
	
	public String getDepNumber() {
		return depNumber;
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

	public String getDepuserName() {
		return depuserName;
	}

	public void setDepuserName(String depuserName) {
		this.depuserName = depuserName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Integer getDepParentid() {
		return depParentid;
	}

	public void setDepParentid(Integer depParentid) {
		this.depParentid = depParentid;
	}
	
}	
