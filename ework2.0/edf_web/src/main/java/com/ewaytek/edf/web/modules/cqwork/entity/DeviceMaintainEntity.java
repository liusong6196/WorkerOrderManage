package com.ewaytek.edf.web.modules.cqwork.entity;

import java.io.Serializable;


/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2019年8月27日 上午9:38:01
 */
public class DeviceMaintainEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 自增主键
	 */
	private Integer id;
	
	/**
	 * 用户姓名
	 */
	private String userName;
	
	/**
	 * 用户职位
	 */
	private String userPosition;
	
	/**
	 * 用户联系电话
	 */
	private String userTel;
	
	/**
	 * 区县
	 */
	private String distArea;
	
	/**
	 * 乡镇
	 */
	private String distTown;
	
	/**
	 * 村社
	 */
	private String distVillage;
	
	/**
	 * 设备类型：1.指纹仪 2.手持POS机 3.加密狗key盘 4.摄像头 5.身份证读卡器
	 */
	private String deviceType;
	
	/**
	 * 问题描述
	 */
	private String problemDesc;
	
	/**
	 * 创建时间
	 */
	private String createTime;
	
	/**
	 * 处理状态：0未处理1处理中2已处理
	 */
	private String processStatus;
	
	/**
	 * 结束时间
	 */
	private String overTime;
	
	/**
	 * 所属项目名称
	 */
	private String project;
	
	/**
	 * 处理时间
	 */
	private Integer protime;
	
	/**
	 * 处理方法
	 */
	private String promethod;
	
	public DeviceMaintainEntity() {
		super();
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserPosition(String userPosition) {
		this.userPosition = userPosition;
	}
	
	public String getUserPosition() {
		return userPosition;
	}
	
	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}
	
	public String getUserTel() {
		return userTel;
	}
	
	public void setDistArea(String distArea) {
		this.distArea = distArea;
	}
	
	public String getDistArea() {
		return distArea;
	}
	
	public void setDistTown(String distTown) {
		this.distTown = distTown;
	}
	
	public String getDistTown() {
		return distTown;
	}
	
	public void setDistVillage(String distVillage) {
		this.distVillage = distVillage;
	}
	
	public String getDistVillage() {
		return distVillage;
	}
	
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	
	public String getDeviceType() {
		return deviceType;
	}
	
	public void setProblemDesc(String problemDesc) {
		this.problemDesc = problemDesc;
	}
	
	public String getProblemDesc() {
		return problemDesc;
	}
	
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	public String getCreateTime() {
		return createTime;
	}
	
	public void setProcessStatus(String processStatus) {
		this.processStatus = processStatus;
	}
	
	public String getProcessStatus() {
		return processStatus;
	}
	
	public void setOverTime(String overTime) {
		this.overTime = overTime;
	}
	
	public String getOverTime() {
		return overTime;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public Integer getProtime() {
		return protime;
	}

	public void setProtime(Integer protime) {
		this.protime = protime;
	}

	public String getPromethod() {
		return promethod;
	}

	public void setPromethod(String promethod) {
		this.promethod = promethod;
	}
	
}
