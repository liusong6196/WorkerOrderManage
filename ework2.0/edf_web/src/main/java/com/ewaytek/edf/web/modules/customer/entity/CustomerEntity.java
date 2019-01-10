package com.ewaytek.edf.web.modules.customer.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 客户表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年1月02日 上午10:46:42
 */
public class CustomerEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 别名-简称，例如：河南省社保局
	 */
	private String cusAlias;
	
	/**
	 * 客户ID
	 */
	private Long cusId;
	
	/**
	 * 客户名称/供应商名称
	 */
	private String cusName;
	
	/**
	 * 单位编号
	 */
	private String cusNumber;
	
	/**
	 * 单位电话
	 */
	private String cusPhone;
	
	/**
	 * 单位邮箱
	 */
	private String cusEmail;
	
	/**
	 * 所属行业: 对应数据字典的行业（例如：人社，安防，保险，银行，教育…)
	 */
	private String cusIndustry;
	
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
	 *  主要联系人
	 */
	private String cusContacts;
	
	/**
	 * 地址
	 */
	private String cusAddress;
	
	/**
	 * 邮政编码
	 */
	private String cusCode;
	
	/**
	 * 所在地 对应数据字典的所在地
	 */
	private String cusSite;
	
	/**
	 * 客户类型：1客户，2供应商
	 */
	private String cusType;
	
	/**
	 * 状态：1启用，0停用
	 */
	private String cusState;
	

	public CustomerEntity() {
		super();
	}

	public void setCusAlias(String cusAlias) {
		this.cusAlias = cusAlias;
	}
	
	public String getCusAlias() {
		return cusAlias;
	}
	
	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}
	
	public Long getCusId() {
		return cusId;
	}
	
	public void setCusName(String cusName) {
		this.cusName = cusName;
	}
	
	public String getCusName() {
		return cusName;
	}
	
	public void setCusNumber(String cusNumber) {
		this.cusNumber = cusNumber;
	}
	
	public String getCusNumber() {
		return cusNumber;
	}
	
	public void setCusPhone(String cusPhone) {
		this.cusPhone = cusPhone;
	}
	
	public String getCusPhone() {
		return cusPhone;
	}
	
	public void setCusEmail(String cusEmail) {
		this.cusEmail = cusEmail;
	}
	
	public String getCusEmail() {
		return cusEmail;
	}
	
	public void setCusIndustry(String cusIndustry) {
		this.cusIndustry = cusIndustry;
	}
	
	public String getCusIndustry() {
		return cusIndustry;
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
	
	public void setCusContacts(String cusContacts) {
		this.cusContacts = cusContacts;
	}
	
	public String getCusContacts() {
		return cusContacts;
	}
	
	public void setCusAddress(String cusAddress) {
		this.cusAddress = cusAddress;
	}
	
	public String getCusAddress() {
		return cusAddress;
	}
	
	public void setCusCode(String cusCode) {
		this.cusCode = cusCode;
	}
	
	public String getCusCode() {
		return cusCode;
	}
	
	public void setCusSite(String cusSite) {
		this.cusSite = cusSite;
	}
	
	public String getCusSite() {
		return cusSite;
	}
	
	public void setCusType(String cusType) {
		this.cusType = cusType;
	}
	
	public String getCusType() {
		return cusType;
	}
	
	public void setCusState(String cusState) {
		this.cusState = cusState;
	}
	
	public String getCusState() {
		return cusState;
	}
	
}
