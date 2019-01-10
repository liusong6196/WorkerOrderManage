package com.ewaytek.edf.web.modules.supplier.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年1月28日 下午2:35:28
 */
public class SupplierEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 流水号
	 */
	private Long supId;
	
	/**
	 * 供应商名称
	 */
	private String supName;
	
	/**
	 * 供应商地址
	 */
	private String supAddress;
	
	/**
	 * 供应商电话
	 */
	private String supTelephone;
	

	public SupplierEntity() {
		super();
	}

	public void setSupId(Long supId) {
		this.supId = supId;
	}
	
	public Long getSupId() {
		return supId;
	}
	
	public void setSupName(String supName) {
		this.supName = supName;
	}
	
	public String getSupName() {
		return supName;
	}
	
	public void setSupAddress(String supAddress) {
		this.supAddress = supAddress;
	}
	
	public String getSupAddress() {
		return supAddress;
	}
	
	public void setSupTelephone(String supTelephone) {
		this.supTelephone = supTelephone;
	}
	
	public String getSupTelephone() {
		return supTelephone;
	}
	
}
