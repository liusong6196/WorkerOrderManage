package com.ewaytek.edf.web.modules.expense.expenseTraffic.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 交通明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:44:02
 */
public class ExpenseTrafficEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long expTraId;
	
	/**
	 * 报销单号
	 */
	private String expAccNo;
	
	/**
	 * 出发日期
	 */
	private Date expStartDatetime;
	
	/**
	 * 出发地点
	 */
	private String expStartSite;
	
	/**
	 * 到达日期
	 */
	private Date expEndDatetime;
	
	/**
	 * 到达地点
	 */
	private String expEndSite;
	
	/**
	 * 交通工具:1,飞机；2，火车；3，汽车；4，轮船
	 */
	private String vehicleType;
	
	/**
	 * 摘要明细
	 */
	private String expAbstract;
	
	/**
	 * 报销金额
	 */
	private Double accDetMoney;
	
	/**
	 * 审核金额
	 */
	private Double chcekMoney;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 创建用户id
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
	

	public ExpenseTrafficEntity() {
		super();
	}

	public void setExpTraId(Long expTraId) {
		this.expTraId = expTraId;
	}
	
	public Long getExpTraId() {
		return expTraId;
	}
	
	public void setExpAccNo(String expAccNo) {
		this.expAccNo = expAccNo;
	}
	
	public String getExpAccNo() {
		return expAccNo;
	}
	
	public void setExpStartDatetime(Date expStartDatetime) {
		this.expStartDatetime = expStartDatetime;
	}
	
	public Date getExpStartDatetime() {
		return expStartDatetime;
	}
	
	public void setExpStartSite(String expStartSite) {
		this.expStartSite = expStartSite;
	}
	
	public String getExpStartSite() {
		return expStartSite;
	}
	
	public void setExpEndDatetime(Date expEndDatetime) {
		this.expEndDatetime = expEndDatetime;
	}
	
	public Date getExpEndDatetime() {
		return expEndDatetime;
	}
	
	public void setExpEndSite(String expEndSite) {
		this.expEndSite = expEndSite;
	}
	
	public String getExpEndSite() {
		return expEndSite;
	}
	
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	
	public String getVehicleType() {
		return vehicleType;
	}
	
	public void setExpAbstract(String expAbstract) {
		this.expAbstract = expAbstract;
	}
	
	public String getExpAbstract() {
		return expAbstract;
	}
	
	public void setAccDetMoney(Double accDetMoney) {
		this.accDetMoney = accDetMoney;
	}
	
	public Double getAccDetMoney() {
		return accDetMoney;
	}
	
	public void setChcekMoney(Double chcekMoney) {
		this.chcekMoney = chcekMoney;
	}
	
	public Double getChcekMoney() {
		return chcekMoney;
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

	@Override
	public String toString() {
		return "ExpenseTrafficEntity [expTraId=" + expTraId + ", expAccNo=" + expAccNo + ", expStartDatetime="
				+ expStartDatetime + ", expStartSite=" + expStartSite + ", expEndDatetime=" + expEndDatetime
				+ ", expEndSite=" + expEndSite + ", vehicleType=" + vehicleType + ", expAbstract=" + expAbstract
				+ ", accDetMoney=" + accDetMoney + ", chcekMoney=" + chcekMoney + ", remark=" + remark
				+ ", userIdCreate=" + userIdCreate + ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified + "]";
	}
	
}
