package com.ewaytek.edf.web.modules.filltimesheet.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 天任务时间表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:03:55
 */
public class TimesheetEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long id;
	
	/**
	 * 员工ID
	 */
	private Long userId;
	
	/**
	 * 归属日期
	 */
	private String timeDate;
	
	/**
	 * 项目id
	 */
	private Long proId;
	
	/**
	 * 任务ID（非必填）
	 */
	private Long taskId;
	
	/**
	 * 当天实际工时
	 */
	private Integer timeActualhours;
	
	/**
	 * 任务类型：1，项目任务；2，非项目任务
	 */
	private String timesheetType;
	
	/**
	 * 填写状态：1，已经保存；2，待审批；3，审批通过；4，审批不通过
	 */
	private String timesheetState;
	
	/**
	 * 创建人
	 */
	private Long userIdCreate;
	
	/**
	 * 操作时间
	 */
	private Date gmtCreate;
	
	/**
	 * 修改时间
	 */
	private Date gmtModified;
	
	private Long tsId;
	
	public TimesheetEntity() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setTimeDate(String timeDate) {
		this.timeDate = timeDate;
	}
	
	public String getTimeDate() {
		return timeDate;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	
	public Long getTaskId() {
		return taskId;
	}
	
	public void setTimeActualhours(Integer timeActualhours) {
		this.timeActualhours = timeActualhours;
	}
	
	public Integer getTimeActualhours() {
		return timeActualhours;
	}
	
	public void setTimesheetType(String timesheetType) {
		this.timesheetType = timesheetType;
	}
	
	public String getTimesheetType() {
		return timesheetType;
	}
	
	public void setTimesheetState(String timesheetState) {
		this.timesheetState = timesheetState;
	}
	
	public String getTimesheetState() {
		return timesheetState;
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

	public Long getTsId() {
		return tsId;
	}

	public void setTsId(Long tsId) {
		this.tsId = tsId;
	}
	
}
