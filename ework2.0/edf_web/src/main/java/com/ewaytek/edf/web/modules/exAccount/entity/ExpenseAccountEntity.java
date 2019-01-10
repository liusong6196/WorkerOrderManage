package com.ewaytek.edf.web.modules.exAccount.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 报销单表
 *
 * @author LF
 * @date 2017年12月14日 上午9:52:37
 */
public class ExpenseAccountEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long expAccId;
	
	/**
	 * 项目ID
	 */
	private Long proId;
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	
	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	/**
	 * 业务类型：来源于基础数据表，QQD 全渠道多模态 ZNKF 智能客服 ZYPX 职业培训 AFFZ 机场安防辅助，以后还会逐年增加
	 */
	private String proBusinesstype;
	
	/**
	 * 报销单号
	 */
	private String expAccNo;
	
	/**
	 * 报销单类型：1，差旅；2，日常
	 */
	private String expAccType;
	
	/**
	 * 申报人
	 */
	private Long expAccUserid;
	
	/**
	 * 申报人名称
	 */
	private String userName;
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 申报时间
	 */
	private Date expAccDatetime;
	
	/**
	 * 审批人一
	 */
	private Long checkUserid;
	
	/**
	 * 审批人一名称
	 */
	private String checkName;
	
	public String getCheckName() {
		return checkName;
	}

	public void setCheckName(String checkName) {
		this.checkName = checkName;
	}

	/**
	 * 审批时间一
	 */
	private Date checkDatetime;
	
	/**
	 * 审批人二
	 */
	private Long checkUseridTwo;
	
	/**
	 * 审批人二名称
	 */
	private String checkNameTwo;
	
	public String getCheckNameTwo() {
		return checkNameTwo;
	}

	public void setCheckNameTwo(String checkNameTwo) {
		this.checkNameTwo = checkNameTwo;
	}

	/**
	 * 审批时间二
	 */
	private Date checkDatetimeTwo;
	
	/**
	 * 复核人
	 */
	private Long doubleCheckUserid;
	
	/**
	 * 复核人名称
	 */
	private String doubleCheckName;
	
	public String getDoubleCheckName() {
		return doubleCheckName;
	}

	public void setDoubleCheckName(String doubleCheckName) {
		this.doubleCheckName = doubleCheckName;
	}

	/**
	 * 复核时间
	 */
	private Date doubleCheckDatetime;
	
	/**
	 * 复核金额
	 */
	private Double doubleCheckMoney;
	
	/**
	 * 出差地
	 */
	private String travelSite;
	
	/**
	 * 天数
	 */
	private Integer travelDays;
	
	/**
	 * 补贴金额
	 */
	private Double travelAllowance;
	
	/**
	 * 报销状态：1，待审批；2，审批通过；3，审批不通过；4，已复核
	 */
	private String expAccState;
	
	private String num;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 复核过程编号
	 */
	private String reviewNum;
	
	public ExpenseAccountEntity() {
		super();
	}

	public void setExpAccId(Long expAccId) {
		this.expAccId = expAccId;
	}
	
	public Long getExpAccId() {
		return expAccId;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setProBusinesstype(String proBusinesstype) {
		this.proBusinesstype = proBusinesstype;
	}
	
	public String getProBusinesstype() {
		return proBusinesstype;
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
	
	public void setExpAccUserid(Long expAccUserid) {
		this.expAccUserid = expAccUserid;
	}
	
	public Long getExpAccUserid() {
		return expAccUserid;
	}
	
	public void setExpAccDatetime(Date expAccDatetime) {
		this.expAccDatetime = expAccDatetime;
	}
	
	public Date getExpAccDatetime() {
		return expAccDatetime;
	}
	
	public void setCheckUserid(Long checkUserid) {
		this.checkUserid = checkUserid;
	}
	
	public Long getCheckUserid() {
		return checkUserid;
	}
	
	public void setCheckDatetime(Date checkDatetime) {
		this.checkDatetime = checkDatetime;
	}
	
	public Date getCheckDatetime() {
		return checkDatetime;
	}
	
	public void setCheckUseridTwo(Long checkUseridTwo) {
		this.checkUseridTwo = checkUseridTwo;
	}
	
	public Long getCheckUseridTwo() {
		return checkUseridTwo;
	}
	
	public void setCheckDatetimeTwo(Date checkDatetimeTwo) {
		this.checkDatetimeTwo = checkDatetimeTwo;
	}
	
	public Date getCheckDatetimeTwo() {
		return checkDatetimeTwo;
	}
	
	public void setDoubleCheckUserid(Long doubleCheckUserid) {
		this.doubleCheckUserid = doubleCheckUserid;
	}
	
	public Long getDoubleCheckUserid() {
		return doubleCheckUserid;
	}
	
	public void setDoubleCheckDatetime(Date doubleCheckDatetime) {
		this.doubleCheckDatetime = doubleCheckDatetime;
	}
	
	public Date getDoubleCheckDatetime() {
		return doubleCheckDatetime;
	}
	
	public void setDoubleCheckMoney(Double doubleCheckMoney) {
		this.doubleCheckMoney = doubleCheckMoney;
	}
	
	public Double getDoubleCheckMoney() {
		return doubleCheckMoney;
	}
	
	public void setTravelSite(String travelSite) {
		this.travelSite = travelSite;
	}
	
	public String getTravelSite() {
		return travelSite;
	}
	
	public void setTravelDays(Integer travelDays) {
		this.travelDays = travelDays;
	}
	
	public Integer getTravelDays() {
		return travelDays;
	}
	
	public void setTravelAllowance(Double travelAllowance) {
		this.travelAllowance = travelAllowance;
	}
	
	public Double getTravelAllowance() {
		return travelAllowance;
	}
	
	public void setExpAccState(String expAccState) {
		this.expAccState = expAccState;
	}
	
	public String getExpAccState() {
		return expAccState;
	}
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getRemark() {
		return remark;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}
	
	public String getReviewNum() {
		return reviewNum;
	}

	public void setReviewNum(String reviewNum) {
		this.reviewNum = reviewNum;
	}

	@Override
	public String toString() {
		return "ExpenseAccountEntity [expAccId=" + expAccId + ", proId=" + proId + ", proBusinesstype="
				+ proBusinesstype + ", expAccNo=" + expAccNo + ", expAccType=" + expAccType + ", expAccUserid="
				+ expAccUserid + ", expAccDatetime=" + expAccDatetime + ", checkUserid=" + checkUserid
				+ ", checkDatetime=" + checkDatetime + ", doubleCheckUserid=" + doubleCheckUserid
				+ ", doubleCheckDatetime=" + doubleCheckDatetime + ", doubleCheckMoney=" + doubleCheckMoney
				+ ", travelSite=" + travelSite + ", travelDays=" + travelDays + ", travelAllowance=" + travelAllowance
				+ ", expAccState=" + expAccState + ", num=" + num + ", remark=" + remark + "]";
	}

	
}
