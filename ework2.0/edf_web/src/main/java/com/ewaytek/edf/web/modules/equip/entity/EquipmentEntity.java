package com.ewaytek.edf.web.modules.equip.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 设备表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月12日 下午8:57:52
 */
public class EquipmentEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long equId;
	
	/**
	 * 设备名称
	 */
	private String equName;
	
	/**
	 * 厂商货号
	 */
	private String equStyleid;
	
	/**
	 * 设备单价
	 */
	private Double equPrice;
	
	/**
	 * 设备来源：1，采购；2，借用
	 */
	private String equSource;
	
	/**
	 * 库存数量
	 */
	private Integer equCount;
	
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
	 * 过期时间
	 */
	private String overdueDatetime;
	
	/**
	 * 设备类型:1,实体设备；2，虚拟资产
	 */
	private String equType;
	
	/**
	 * 供应商
	 */
	private String equSupplier;
	
	/**
	 * 库存地
	 */
	private String equSite;
	
	//设备来源名
	private String equSourceName;
	
	//设备类型名
	private String equTypeName;
	
	//创建人名
	private String userIdCreateName;
	
	//库存地点名
	private String equSiteName;
	
	//操作时间
	private String optionDate;
	
	//开票金额
	private Double invoiceMoney;
	
	//客户名称
	private Long cusName;
	
	//收货单位
	private String unit;

	public Long getCusName() {
		return cusName;
	}

	public void setCusName(Long cusName) {
		this.cusName = cusName;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Double getInvoiceMoney() {
		return invoiceMoney;
	}

	public void setInvoiceMoney(Double invoiceMoney) {
		this.invoiceMoney = invoiceMoney;
	}

	public String getOptionDate() {
		return optionDate;
	}

	public void setOptionDate(String optionDate) {
		this.optionDate = optionDate;
	}

	public String getEquSiteName() {
		return equSiteName;
	}

	public void setEquSiteName(String equSiteName) {
		this.equSiteName = equSiteName;
	}

	public String getEquSupplier() {
		return equSupplier;
	}

	public void setEquSupplier(String equSupplier) {
		this.equSupplier = equSupplier;
	}

	public String getEquSite() {
		return equSite;
	}

	public void setEquSite(String equSite) {
		this.equSite = equSite;
	}

	public String getEquSourceName() {
		return equSourceName;
	}

	public void setEquSourceName(String equSourceName) {
		this.equSourceName = equSourceName;
	}

	public String getEquTypeName() {
		return equTypeName;
	}

	public void setEquTypeName(String equTypeName) {
		this.equTypeName = equTypeName;
	}

	public String getUserIdCreateName() {
		return userIdCreateName;
	}

	public void setUserIdCreateName(String userIdCreateName) {
		this.userIdCreateName = userIdCreateName;
	}

	public EquipmentEntity() {
		super();
	}

	public void setEquId(Long equId) {
		this.equId = equId;
	}
	
	public Long getEquId() {
		return equId;
	}
	
	public void setEquName(String equName) {
		this.equName = equName;
	}
	
	public String getEquName() {
		return equName;
	}
	
	public void setEquStyleid(String equStyleid) {
		this.equStyleid = equStyleid;
	}
	
	public String getEquStyleid() {
		return equStyleid;
	}
	
	public void setEquPrice(Double equPrice) {
		this.equPrice = equPrice;
	}
	
	public Double getEquPrice() {
		return equPrice;
	}
	
	public void setEquSource(String equSource) {
		this.equSource = equSource;
	}
	
	public String getEquSource() {
		return equSource;
	}
	
	public void setEquCount(Integer equCount) {
		this.equCount = equCount;
	}
	
	public Integer getEquCount() {
		return equCount;
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

	public String getOverdueDatetime() {
		return overdueDatetime;
	}

	public void setOverdueDatetime(String overdueDatetime) {
		this.overdueDatetime = overdueDatetime;
	}

	public String getEquType() {
		return equType;
	}

	public void setEquType(String equType) {
		this.equType = equType;
	}
	
}
