package com.ewaytek.edf.web.modules.task.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 任务表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月14日 上午10:24:08
 */
public class TaskListEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 任务ID
	 */
	private Long taskId;
	
	/**
	 * 项目ID
	 */
	private Long proId;
	
	/**
	 * 任务名称
	 */
	private String taskName;
	
	/**
	 * 任务编号
	 */
	private String taskNumber;
	
	/**
	 * 任务起始日期
	 */
	private String taskStartdate;
	
	/**
	 * 任务结束日期
	 */
	private String taskEnddate;
	
	/**
	 * 计划工时
	 */
	private Integer taskPlannedhours;
	
	/**
	 * 实际工时
	 */
	private Integer taskActualhours;
	
	/**
	 * 任务完成百分比
	 */
	private Double taskPercentage;
	
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
	 * 任务资源
	 */
	private String taskUser;
	
	/**
	 * 任务资源姓名
	 */
	private String username;
	
	/**
	 * 项目优先级
	 */
	private String taskPriority;
	
	/**
	 * 项目状态
	 */
	private String taskStatus;
    
	/**
	 * 项目编码
	 */
	private String proNumber;
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 项目类型
	 */
	private String proType;

	/**
	 * 资源名称
	 */
	private String taskUsername;
	
	public String getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}


	public String getTaskPriority() {
		return taskPriority;
	}

	public void setTaskPriority(String taskPriority) {
		this.taskPriority = taskPriority;
	}

	public TaskListEntity() {
		super();
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	
	public Long getTaskId() {
		return taskId;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	
	public String getTaskName() {
		return taskName;
	}
	
	public void setTaskNumber(String taskNumber) {
		this.taskNumber = taskNumber;
	}
	
	public String getTaskNumber() {
		return taskNumber;
	}
	
	public void setTaskStartdate(String taskStartdate) {
		this.taskStartdate = taskStartdate;
	}
	
	public String getTaskStartdate() {
		return taskStartdate;
	}
	
	public void setTaskEnddate(String taskEnddate) {
		this.taskEnddate = taskEnddate;
	}
	
	public String getTaskEnddate() {
		return taskEnddate;
	}
	
	public void setTaskPlannedhours(Integer taskPlannedhours) {
		this.taskPlannedhours = taskPlannedhours;
	}
	
	public Integer getTaskPlannedhours() {
		return taskPlannedhours;
	}
	
	public void setTaskActualhours(Integer taskActualhours) {
		this.taskActualhours = taskActualhours;
	}
	
	public Integer getTaskActualhours() {
		return taskActualhours;
	}
	
	public void setTaskPercentage(Double taskPercentage) {
		this.taskPercentage = taskPercentage;
	}
	
	public Double getTaskPercentage() {
		return taskPercentage;
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

	public String getProType() {
		return proType;
	}

	public void setProType(String proType) {
		this.proType = proType;
	}

	
	public String getTaskUser(){
		return taskUser;
	}
	
	public void setTaskUser(String taskUser){
		this.taskUser = taskUser;
	}


	public String getTaskUsername() {
		return taskUsername;
	}

	public void setTaskUsername(String taskUsername) {
		this.taskUsername = taskUsername;
	}

	@Override
	public String toString() {
		return "TaskListEntity [taskId=" + taskId + ", proId=" + proId + ", taskName=" + taskName + ", taskNumber="
				+ taskNumber + ", taskStartdate=" + taskStartdate + ", taskEnddate=" + taskEnddate
				+ ", taskPlannedhours=" + taskPlannedhours + ", taskActualhours=" + taskActualhours
				+ ", taskPercentage=" + taskPercentage + ", remark=" + remark + ", userIdCreate=" + userIdCreate
				+ ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified + ", taskUser=" + taskUser + ", username="
				+ username + ", taskPriority=" + taskPriority + ", taskStatus=" + taskStatus + ", proNumber="
				+ proNumber + ", proName=" + proName + ", proType=" + proType + ", taskUsername=" + taskUsername + "]";
	}



	
}
