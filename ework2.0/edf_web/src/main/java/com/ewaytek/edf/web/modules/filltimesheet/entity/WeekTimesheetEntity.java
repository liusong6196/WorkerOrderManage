package com.ewaytek.edf.web.modules.filltimesheet.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 周任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:12:13
 */
public class WeekTimesheetEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 流水号
	 */
	private Long weekId;
	
	/**
	 * 员工ID
	 */
	private Long userId;
	
	/**
	 * 周ID
	 */
	private Long tsId;
	
	/**
	 * 任务ID
	 */
	private Long taskId;
	
	/**
	 * 本周实际工时
	 */
	private String weekActualhours;
	
	/**
	 * 本周加班工时
	 */
	private String weekOvertimehours;
	
	/**
	 * 提交时间
	 */
	private Date weekSubmittime;
	
	/**
	 * 状态（1:未提交 2:提交未审批 3:审批通过 4:审批未通过）
	 */
	private String weekStatus;
	
	/**
	 * 审批时间
	 */
	private Date weekApprovaltime;
	
	/**
	 * 备注
	 */
	private String remark;
	

	public WeekTimesheetEntity() {
		super();
	}

	public void setWeekId(Long weekId) {
		this.weekId = weekId;
	}
	
	public Long getWeekId() {
		return weekId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setTsId(Long tsId) {
		this.tsId = tsId;
	}
	
	public Long getTsId() {
		return tsId;
	}
	
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	
	public Long getTaskId() {
		return taskId;
	}
	
	public void setWeekActualhours(String weekActualhours) {
		this.weekActualhours = weekActualhours;
	}
	
	public String getWeekActualhours() {
		return weekActualhours;
	}
	
	public void setWeekOvertimehours(String weekOvertimehours) {
		this.weekOvertimehours = weekOvertimehours;
	}
	
	public String getWeekOvertimehours() {
		return weekOvertimehours;
	}
	
	public void setWeekSubmittime(Date weekSubmittime) {
		this.weekSubmittime = weekSubmittime;
	}
	
	public Date getWeekSubmittime() {
		return weekSubmittime;
	}
	
	public void setWeekStatus(String weekStatus) {
		this.weekStatus = weekStatus;
	}
	
	public String getWeekStatus() {
		return weekStatus;
	}
	
	public void setWeekApprovaltime(Date weekApprovaltime) {
		this.weekApprovaltime = weekApprovaltime;
	}
	
	public Date getWeekApprovaltime() {
		return weekApprovaltime;
	}
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getRemark() {
		return remark;
	}
	
}
