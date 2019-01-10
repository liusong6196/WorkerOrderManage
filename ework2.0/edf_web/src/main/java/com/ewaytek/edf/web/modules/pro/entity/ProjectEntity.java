package com.ewaytek.edf.web.modules.pro.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.ewaytek.edf.web.modules.okrResult.entity.ProjectKrEntity;

/**
 * 项目表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月13日 下午7:41:46
 */
public class ProjectEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 项目ID
	 */
	private Long proId;

	/**
	 * 项目经理ID
	 */
	private Long userId;

	/**
	 * 客户ID
	 */
	private Long cusId;

	/**
	 * 客户经理ID
	 */
	private Long proAccountmanager;

	/**
	 * 项目名称
	 */
	private String proName;

	/**
	 * 项目编号
	 */
	private String proNumber;

	/**
	 * 项目类型(1:售前 2:实施 3:售后 4:研发)
	 */
	private String proType;

	/**
	 * 收费类型(0:收费 1:不收费)
	 */
	private String proChargetype;

	/**
	 * 项目起始日期
	 */
	private String proStartdate;

	/**
	 * 项目结束日期
	 */
	private String proEnddate;

	/**
	 * 项目状态
	 */
	private String proStatus;

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
	 * 开发负责人
	 */
	private Long proDevelopmanager;

	/**
	 * 测试负责人
	 */
	private Long proTestmanager;

	/**
	 * 业务类型
	 */
	private String proBusinesstype;
	/**
	 * 项目目标
	 */
	private String proGoal;

	private Long[] members;

	/**
	 * 项目经理名
	 */
	private String userName;

	/**
	 * 业务名
	 */
	private String proBusinesslabel;

	/**
	 * 开发负责人姓名
	 */
	private String proDevelopmanagername;
	/**
	 * 测试负责人姓名
	 */
	private String proTestmanagername;
	
	/**
	 * 项目关键结果list
	 */
	private List<ProjectKrEntity>  listokr;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getProBusinesslabel() {
		return proBusinesslabel;
	}

	public void setProBusinesslabel(String proBusinesslabel) {
		this.proBusinesslabel = proBusinesslabel;
	}

	public String getProDevelopmanagername() {
		return proDevelopmanagername;
	}

	public void setProDevelopmanagername(String proDevelopmanagername) {
		this.proDevelopmanagername = proDevelopmanagername;
	}

	public String getProTestmanagername() {
		return proTestmanagername;
	}

	public void setProTestmanagername(String proTestmanagername) {
		this.proTestmanagername = proTestmanagername;
	}

	public ProjectEntity() {
		super();
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

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	public Long getCusId() {
		return cusId;
	}

	public void setProAccountmanager(Long proAccountmanager) {
		this.proAccountmanager = proAccountmanager;
	}

	public Long getProAccountmanager() {
		return proAccountmanager;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getProName() {
		return proName;
	}

	public void setProNumber(String proNumber) {
		this.proNumber = proNumber;
	}

	public String getProNumber() {
		return proNumber;
	}

	public void setProType(String proType) {
		this.proType = proType;
	}

	public String getProType() {
		return proType;
	}

	public void setProChargetype(String proChargetype) {
		this.proChargetype = proChargetype;
	}

	public String getProChargetype() {
		return proChargetype;
	}

	public void setProStartdate(String proStartdate) {
		this.proStartdate = proStartdate;
	}

	public String getProStartdate() {
		return proStartdate;
	}

	public void setProEnddate(String proEnddate) {
		this.proEnddate = proEnddate;
	}

	public String getProEnddate() {
		return proEnddate;
	}

	public void setProStatus(String proStatus) {
		this.proStatus = proStatus;
	}

	public String getProStatus() {
		return proStatus;
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

	public Long[] getMembers() {
		return members;
	}

	public void setMembers(Long[] members) {
		this.members = members;
	}

	public Long getProDevelopmanager() {
		return proDevelopmanager;
	}

	public void setProDevelopmanager(Long proDevelopmanager) {
		this.proDevelopmanager = proDevelopmanager;
	}

	public Long getProTestmanager() {
		return proTestmanager;
	}

	public void setProTestmanager(Long proTestmanager) {
		this.proTestmanager = proTestmanager;
	}

	public String getProGoal() {
		return proGoal;
	}

	public void setProGoal(String proGoal) {
		this.proGoal = proGoal;
	}

	public String getProBusinesstype() {
		return proBusinesstype;
	}

	public void setProBusinesstype(String proBusinesstype) {
		this.proBusinesstype = proBusinesstype;
	}

	public List<ProjectKrEntity> getListokr() {
		return listokr;
	}

	public void setListokr(List<ProjectKrEntity> listokr) {
		this.listokr = listokr;
	}

}
