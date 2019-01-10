package com.ewaytek.edf.web.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 系统用户
 * @author 张静普
 */
public class SysUserEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 员工ID
	 */
	private Long userId;
	
	/**
	 * 员工姓名
	 */
	private String username;
	
	/**
	 * 员工密码
	 */
	private String password;
	
	/**
	 * 电子邮箱
	 */
	private String email;
	
	/**
	 * 联系方式
	 */
	private String mobile;
	
	/**
	 * 按目前T系列，Q系列，M系列，P系列进行评级
	 */
	private String userLevel;
	/**
	 * 评级名称
	 */
	private String levelName;
	
	/**
	 * 员工生日
	 */
	private String birthDate;
	
	/**
	 * 最后一次评级时间
	 */
	private Date promoteDate;
	
	/**
	 * 紧急联系人
	 */
	private String emergencyContact;
	
	/**
	 * 紧急联系电话
	 */
	private String contactTelephone;
	
	/**
	 * 直接上级
	 */
	private Long superior;
	/**
	 * 直接上级姓名
	 */
	private String superiorName;
	
	/**
	 * 报销审核人
	 */
	private Long auditor;
	
	/**
	 * 报销审核人二
	 */
	private Long auditorTwo;
	
	/**
	 * 入职日期
	 */
	private String entryDate;
	
	/**
	 * 状态 0:禁用，1:正常
	 */
	private Integer status;
	
	/**
	 * 备注
	 */
	private String remark;
	
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
	 * 部门ID
	 */
	private Long depId;
	/**
	 * 部门名称
	 */
	private String depName;
	/**
	 * 员工登录名
	 */
	private String userLogno;
	/**
	 * 员工属地
	 */
	private String userTerritorial;
	/**
	 * 员工属地名称
	 */
	private String userTerritorialName;
	/**
	 * 角色id列表
	 */
	private List<Long> roleIdList;
	

	public SysUserEntity() {
		super();
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getMobile() {
		return mobile;
	}
	
	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	
	public String getUserLevel() {
		return userLevel;
	}
	
	public void setEmergencyContact(String emergencyContact) {
		this.emergencyContact = emergencyContact;
	}
	
	public String getEmergencyContact() {
		return emergencyContact;
	}
	
	public void setContactTelephone(String contactTelephone) {
		this.contactTelephone = contactTelephone;
	}
	
	public String getContactTelephone() {
		return contactTelephone;
	}
	
	public void setSuperior(Long superior) {
		this.superior = superior;
	}
	
	public Long getSuperior() {
		return superior;
	}
	
	public void setAuditor(Long auditor) {
		this.auditor = auditor;
	}
	
	public Long getAuditor() {
		return auditor;
	}
	
	public Long getAuditorTwo() {
		return auditorTwo;
	}

	public void setAuditorTwo(Long auditorTwo) {
		this.auditorTwo = auditorTwo;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public Integer getStatus() {
		return status;
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
	
	public void setDepId(Long depId) {
		this.depId = depId;
	}
	
	public Long getDepId() {
		return depId;
	}
	
	public void setUserLogno(String userLogno) {
		this.userLogno = userLogno;
	}
	
	public String getUserLogno() {
		return userLogno;
	}
	

	public List<Long> getRoleIdList() {
		return roleIdList;
	}

	public void setRoleIdList(List<Long> roleIdList) {
		this.roleIdList = roleIdList;
	}

	public String getSuperiorName() {
		return superiorName;
	}

	public void setSuperiorName(String superiorName) {
		this.superiorName = superiorName;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getLevelName() {
		return levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public Date getPromoteDate() {
		return promoteDate;
	}

	public void setPromoteDate(Date promoteDate) {
		this.promoteDate = promoteDate;
	}

	public String getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(String entryDate) {
		this.entryDate = entryDate;
	}
	
	public String getUserTerritorial() {
		return userTerritorial;
	}

	public void setUserTerritorial(String userTerritorial) {
		this.userTerritorial = userTerritorial;
	}
	
	
	public String getUserTerritorialName() {
		return userTerritorialName;
	}

	public void setUserTerritorialName(String userTerritorialName) {
		this.userTerritorialName = userTerritorialName;
	}

	@Override
	public String toString() {
		return "SysUserEntity [userId=" + userId + ", username=" + username + ", password=" + password + ", email="
				+ email + ", mobile=" + mobile + ", userLevel=" + userLevel + ", levelName=" + levelName
				+ ", birthDate=" + birthDate + ", promoteDate=" + promoteDate + ", emergencyContact=" + emergencyContact
				+ ", contactTelephone=" + contactTelephone + ", superior=" + superior + ", superiorName=" + superiorName
				+ ", auditor=" + auditor + ", entryDate=" + entryDate + ", status=" + status + ", remark=" + remark
				+ ", userIdCreate=" + userIdCreate + ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified
				+ ", depId=" + depId + ", depName=" + depName + ", userLogno=" + userLogno + ", roleIdList="
				+ roleIdList + "]";
	}
	
	
}