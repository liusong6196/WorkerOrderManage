package com.ewaytek.edf.web.modules.okr.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 目标表
 *
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 下午5:42:40
 */
public class ObjectiveEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 目标表ID
	 */
	private Long objId;
		
	/**
	 * 员工ID
	 */
	private Long userId;
	
	/**
	 * 部门ID
	 */
	private Long departmentId;
	
	/**
	 * 部门名称
	 */
	private String departName;
	
	/**
	 * 年度
	 */
	private Integer year;
	
	/**
	 * 季度
	 */
	private Integer quarter;
	
	/**
	 * 季度名称
	 */
	private String quarterName;
	
	/**
	 * 季度目标
	 */
	private String quarterObj;
	
	/**
	 * 创建人
	 */
	private Long userIdCreate;
	
	/**
	 * 创建人名称
	 */
	private String createName;
	
	/**
	 * 创建时间
	 */
	private Date gmtCreate;
	
	/**
	 * 修改时间
	 */
	private Date gmtModified;
	
	/**
	 * 用户名
	 */
	private String username;

	public ObjectiveEntity() {
		super();
	}

	public void setObjId(Long objId) {
		this.objId = objId;
	}
	
	public Long getObjId() {
		return objId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
	
	public Long getDepartmentId() {
		return departmentId;
	}
	
	public void setYear(Integer year) {
		this.year = year;
	}
	
	public Integer getYear() {
		return year;
	}
	
	public void setQuarter(Integer quarter) {
		this.quarter = quarter;
	}
	
	public Integer getQuarter() {
		return quarter;
	}
	
	public void setQuarterObj(String quarterObj) {
		this.quarterObj = quarterObj;
	}
	
	public String getQuarterObj() {
		return quarterObj;
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

	public String getCreateName() {
		return createName;
	}

	public void setCreateName(String createName) {
		this.createName = createName;
	}

	public String getDepartName() {
		return departName;
	}

	public void setDepartName(String departName) {
		this.departName = departName;
	}

	public String getQuarterName() {
		return quarterName;
	}

	public void setQuarterName(String quarterName) {
		this.quarterName = quarterName;
	}
	
	public String getUsername(){
		return username;
	}
	
	public void setUsername(String username){
		this.username = username;
	}

	@Override
	public String toString() {
		return "ObjectiveEntity [objId=" + objId + ", userId=" + userId + ", departmentId=" + departmentId
				+ ", departName=" + departName + ", year=" + year + ", quarter=" + quarter + ", quarterName="
				+ quarterName + ", quarterObj=" + quarterObj + ", userIdCreate=" + userIdCreate + ", createName="
				+ createName + ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified + ", username=" + username
				+ "]";
	}
	
	
}
