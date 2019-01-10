package com.ewaytek.edf.web.modules.exAccount.entity;

import java.io.Serializable;

public class ProUtilEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//项目ID
	private String proId;
	//项目名称
	private String proName;
	//业务类型
	private String proBusinesstype;
	//项目编号
	private String proNumber;
	
	public String getProNumber() {
		return proNumber;
	}
	public void setProNumber(String proNumber) {
		this.proNumber = proNumber;
	}
	public ProUtilEntity() {
		// TODO Auto-generated constructor stub
	}
	public String getProId() {
		return proId;
	}
	public void setProId(String proId) {
		this.proId = proId;
	}
	public String getProName() {
		return proName;
	}
	public void setProName(String proName) {
		this.proName = proName;
	}
	public String getProBusinesstype() {
		return proBusinesstype;
	}
	public void setProBusinesstype(String proBusinesstype) {
		this.proBusinesstype = proBusinesstype;
	}
	@Override
	public String toString() {
		return "ProUtilEntity [proId=" + proId + ", proName=" + proName + ", proBusinesstype=" + proBusinesstype + "]";
	}
	
	
}
