package com.ewaytek.edf.web.modules.equip_bor.entity;

import java.io.Serializable;
import java.util.Date;

import com.ewaytek.edf.web.modules.equip.entity.EquipmentEntity;
import com.ewaytek.edf.web.modules.pro.entity.ProjectEntity;



/**
 * 设备借用表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:29:26
 */
public class EquipmentBorrowEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long equBorId;
	
	/**
	 * 设备名称
	 */
	private Long equId;
	
	/**
	 * 项目id
	 */
	private Long proId;
	
	/**
	 * 借用人
	 */
	private Long borUserId;
	
	/**
	 * 借用数量
	 */
	private Integer borCount;
	
	/**
	 * 借用日期
	 */
	private String borDatetime;
	
	/**
	 * 归还数量
	 */
	private Integer retCount;
	
	/**
	 * 计划借用时间
	 */
	private String borPlantime;
	
	/**
	 * 实际归还时间
	 */
	private String retDateTime;
	
	/**
	 * 使用地点
	 */
	private String borSite;
	
	/**
	 * 是否还清:1,还清；2，未还清；3，待归还
	 */
	private String borRetState;
	
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
	
	//设备名称
	private String equName;
	
	//设备型号
	private String equStyleIdName;
	
	//项目名称
	private String proName;
	
	//项目编号
	private String proNumber;
	
	//借用人名称
	private String borUserIdName;
	
	//使用地点名称
	private String borSiteName;
	
	//状态显示
	private String borRetStateName;
	
	//创建日期
	private String createTime;
	
	//归还人
	private Long retUserId;
	
	//参数使用
	private Integer paramRetCount;

	public Integer getParamRetCount() {
		return paramRetCount;
	}

	public void setParamRetCount(Integer paramRetCount) {
		this.paramRetCount = paramRetCount;
	}

	public Integer getRetCount() {
		return retCount;
	}

	public void setRetCount(Integer retCount) {
		this.retCount = retCount;
	}

	public Long getRetUserId() {
		return retUserId;
	}

	public void setRetUserId(Long retUserId) {
		this.retUserId = retUserId;
	}

	public String getRetDateTime() {
		return retDateTime;
	}

	public void setRetDateTime(String retDateTime) {
		this.retDateTime = retDateTime;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getEquName() {
		return equName;
	}

	public void setEquName(String equName) {
		this.equName = equName;
	}

	public String getEquStyleIdName() {
		return equStyleIdName;
	}

	public void setEquStyleIdName(String equStyleIdName) {
		this.equStyleIdName = equStyleIdName;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getProNumber() {
		return proNumber;
	}

	public void setProNumber(String proNumber) {
		this.proNumber = proNumber;
	}

	public String getBorRetStateName() {
		return borRetStateName;
	}

	public void setBorRetStateName(String borRetStateName) {
		this.borRetStateName = borRetStateName;
	}

	public String getBorSiteName() {
		return borSiteName;
	}

	public void setBorSiteName(String borSiteName) {
		this.borSiteName = borSiteName;
	}

	public String getBorUserIdName() {
		return borUserIdName;
	}

	public void setBorUserIdName(String borUserIdName) {
		this.borUserIdName = borUserIdName;
	}

	public EquipmentBorrowEntity() {
		super();
	}

	public void setEquBorId(Long equBorId) {
		this.equBorId = equBorId;
	}
	
	public Long getEquBorId() {
		return equBorId;
	}
	
	public void setEquId(Long equId) {
		this.equId = equId;
	}
	
	public Long getEquId() {
		return equId;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setBorUserId(Long borUserId) {
		this.borUserId = borUserId;
	}
	
	public Long getBorUserId() {
		return borUserId;
	}
	
	public void setBorCount(Integer borCount) {
		this.borCount = borCount;
	}
	
	public Integer getBorCount() {
		return borCount;
	}
	
	public void setBorDatetime(String borDatetime) {
		this.borDatetime = borDatetime;
	}
	
	public String getBorDatetime() {
		return borDatetime;
	}
	
	public void setBorPlantime(String borPlantime) {
		this.borPlantime = borPlantime;
	}
	
	public String getBorPlantime() {
		return borPlantime;
	}
	
	public void setBorSite(String borSite) {
		this.borSite = borSite;
	}
	
	public String getBorSite() {
		return borSite;
	}
	
	public void setBorRetState(String borRetState) {
		this.borRetState = borRetState;
	}
	
	public String getBorRetState() {
		return borRetState;
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
	
}
