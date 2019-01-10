package com.ewaytek.edf.web.modules.report.entity;

public class TaskReportEntity {

	/**
	 * 项目编号
	 */
	private Long proId;
	
	/**
	 * 任务编号
	 */
	private Long taskId;
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 任务名称
	 */
	private String taskName;
	
	/**
	 * 任务编码
	 */
	private String taskNumber;
	
	/**
	 * 计划工时
	 */
	private int  taskPlannedhours;
	
	/**
	 * 累计工时
	 */
	private int taskTotalhours;
	
	/**
	 * 本期工作量
	 */
	private int taskCyclehours;
	
	/**
	 * 任务状态
	 */
	private String taskStatus;

	public Long getProId() {
		return proId;
	}

	public void setProId(Long proId) {
		this.proId = proId;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskNumber() {
		return taskNumber;
	}

	public void setTaskNumber(String taskNumber) {
		this.taskNumber = taskNumber;
	}

	public int getTaskPlannedhours() {
		return taskPlannedhours;
	}

	public void setTaskPlannedhours(int taskPlannedhours) {
		this.taskPlannedhours = taskPlannedhours;
	}

	public int getTaskTotalhours() {
		return taskTotalhours;
	}

	public void setTaskTotalhours(int taskTotalhours) {
		this.taskTotalhours = taskTotalhours;
	}

	public int getTaskCyclehours() {
		return taskCyclehours;
	}

	public void setTaskCyclehours(int taskCyclehours) {
		this.taskCyclehours = taskCyclehours;
	}

	public String getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	
	
}
