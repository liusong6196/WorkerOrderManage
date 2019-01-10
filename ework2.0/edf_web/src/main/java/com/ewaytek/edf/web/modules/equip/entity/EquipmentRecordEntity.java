package com.ewaytek.edf.web.modules.equip.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 设备记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 上午10:53:35
 */
public class EquipmentRecordEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long recordId;
	
	/**
	 * 设备id
	 */
	private Long equId;
	
	/**
	 * 记录单价
	 */
	private Double recordPrice;
	
	/**
	 * 记录数量
	 */
	private Integer recordCount;
	
	/**
	 * 开票金额
	 */
	private Double billingAmount;
	
	/**
	 * 客户id
	 */
	private Long cusId;
	
	/**
	 * 收货单位
	 */
	private String receiveUnit;
	
	/**
	 * 记录日期
	 */
	private String recordDatetime;
	
	/**
	 * 过期时间
	 */
	private String overDatetime;
	
	/**
	 * 记录状态:1，入库；2，发货
	 */
	private String recState;
	
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
	
	//记录类型
	private String recordType;
	
	//客户名称
	private String customerName;
	
	//操作人
	private String optionName;
	
	//设备名称
	private String equName;
	
	//设备型号
	private String styleId;
	
	//库存地
	private String equSiteName;

	public String getEquName() {
		return equName;
	}

	public void setEquName(String equName) {
		this.equName = equName;
	}

	public String getStyleId() {
		return styleId;
	}

	public void setStyleId(String styleId) {
		this.styleId = styleId;
	}

	public String getEquSiteName() {
		return equSiteName;
	}

	public void setEquSiteName(String equSiteName) {
		this.equSiteName = equSiteName;
	}

	public String getRecordType() {
		return recordType;
	}

	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getOptionName() {
		return optionName;
	}

	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}

	public EquipmentRecordEntity() {
		super();
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}
	
	public Long getRecordId() {
		return recordId;
	}
	
	public void setEquId(Long equId) {
		this.equId = equId;
	}
	
	public Long getEquId() {
		return equId;
	}
	
	public void setRecordPrice(Double recordPrice) {
		this.recordPrice = recordPrice;
	}
	
	public Double getRecordPrice() {
		return recordPrice;
	}
	
	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}
	
	public Integer getRecordCount() {
		return recordCount;
	}
	
	public void setBillingAmount(Double billingAmount) {
		this.billingAmount = billingAmount;
	}
	
	public Double getBillingAmount() {
		return billingAmount;
	}
	
	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}
	
	public Long getCusId() {
		return cusId;
	}
	
	public void setReceiveUnit(String receiveUnit) {
		this.receiveUnit = receiveUnit;
	}
	
	public String getReceiveUnit() {
		return receiveUnit;
	}
	
	public void setRecordDatetime(String recordDatetime) {
		this.recordDatetime = recordDatetime;
	}
	
	public String getRecordDatetime() {
		return recordDatetime;
	}
	
	public void setOverDatetime(String overDatetime) {
		this.overDatetime = overDatetime;
	}
	
	public String getOverDatetime() {
		return overDatetime;
	}
	
	public void setRecState(String recState) {
		this.recState = recState;
	}
	
	public String getRecState() {
		return recState;
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
	
}
