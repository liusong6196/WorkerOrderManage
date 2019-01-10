package com.ewaytek.edf.web.modules.report.entity;

public class TimesheetReportEntity {

	private Long userId;
	
	private String username;
	
	/**
	 * timesheet提交状态
	 */
	private String weekStatus;
	
	/**
	 * 部门编号
	 */
	private String depId;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getWeekStatus() {
		return weekStatus;
	}

	public void setWeekStatus(String weekStatus) {
		this.weekStatus = weekStatus;
	}

	public String getDepId() {
		return depId;
	}

	public void setDepId(String depId) {
		this.depId = depId;
	}
	
	
}
