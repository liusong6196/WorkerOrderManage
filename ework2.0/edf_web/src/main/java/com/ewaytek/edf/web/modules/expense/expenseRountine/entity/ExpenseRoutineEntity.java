package com.ewaytek.edf.web.modules.expense.expenseRountine.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 日常明细表
 *
 * @author LF
 * @date 2017年12月15日 上午12:36:13
 */
public class ExpenseRoutineEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long expRouId;
	
	/**
	 * 报销单号
	 */
	private String expAccNo;
	
	/**
	 * 报销单类型：1，差旅；2，日常
	 */
	private String expAccType;
	
	/**
	 * 报销项：1,办公费;2,交通费;3,通讯费;4,招待费;5,礼品;6,快递费;7,广告宣传;8,其他
	 */
	private String expItem;
	
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
	

	public ExpenseRoutineEntity() {
		super();
	}

	public void setExpRouId(Long expRouId) {
		this.expRouId = expRouId;
	}
	
	public Long getExpRouId() {
		return expRouId;
	}
	
	public void setExpAccNo(String expAccNo) {
		this.expAccNo = expAccNo;
	}
	
	public String getExpAccNo() {
		return expAccNo;
	}
	
	public void setExpAccType(String expAccType) {
		this.expAccType = expAccType;
	}
	
	public String getExpAccType() {
		return expAccType;
	}
	
	public void setExpItem(String expItem) {
		this.expItem = expItem;
	}
	
	public String getExpItem() {
		return expItem;
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
		return "ExpenseRoutineEntity [expRouId=" + expRouId + ", expAccNo=" + expAccNo + ", expAccType=" + expAccType
				+ ", expItem=" + expItem + ", expAbstract=" + expAbstract + ", accDetMoney=" + accDetMoney
				+ ", chcekMoney=" + chcekMoney + ", remark=" + remark + ", userIdCreate=" + userIdCreate
				+ ", gmtCreate=" + gmtCreate + ", gmtModified=" + gmtModified + "]";
	}
	
}
