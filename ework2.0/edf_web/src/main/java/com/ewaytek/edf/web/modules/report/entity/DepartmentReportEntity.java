package com.ewaytek.edf.web.modules.report.entity;

public class DepartmentReportEntity {

	private Long proId;
	
	private Long userId;
	
	private String proName;
	/**
	 * 项目工时
	 */
	private int proActualhours;
	
	/**
	 * 收费类型
	 */
	private String proChargetype;

	public Long getProId() {
		return proId;
	}

	public void setProId(Long proId) {
		this.proId = proId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public int getProActualhours() {
		return proActualhours;
	}

	public void setProActualhours(int proActualhours) {
		this.proActualhours = proActualhours;
	}

	public String getProChargetype() {
		return proChargetype;
	}

	public void setProChargetype(String proChargetype) {
		this.proChargetype = proChargetype;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	@Override
	public String toString() {
		return "DepartmentReportEntity [proId=" + proId + ", userId=" + userId + ", proName=" + proName
				+ ", proActualhours=" + proActualhours + ", proChargetype=" + proChargetype + "]";
	}
	
	
}
