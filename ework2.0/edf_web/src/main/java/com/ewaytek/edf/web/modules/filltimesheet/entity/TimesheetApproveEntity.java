package com.ewaytek.edf.web.modules.filltimesheet.entity;

import java.io.Serializable;

public class TimesheetApproveEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String proId;
	
	private String proType;
	
	private String proTypename;
	
	private String userId;
	
	private String username;
	
	private String proNumber;
	
	private String proName;
	
	private String actualhours;

	private String taskId;
	
	public String getProId() {
		return proId;
	}

	public void setProId(String proId) {
		this.proId = proId;
	}

	public String getProType() {
		return proType;
	}

	public void setProType(String proType) {
		this.proType = proType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getProNumber() {
		return proNumber;
	}

	public void setProNumber(String proNumber) {
		this.proNumber = proNumber;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getActualhours() {
		return actualhours;
	}

	public void setActualhours(String actualhours) {
		this.actualhours = actualhours;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getProTypename() {
		return proTypename;
	}

	public void setProTypename(String proTypename) {
		this.proTypename = proTypename;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	
	
}
