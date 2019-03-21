package com.ewaytek.edf.web.modules.cqwork.entity;

import java.io.Serializable;

public class ProSelectEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	private String proName;
	
	private String selectDesc;
	
	private String selectType;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getSelectDesc() {
		return selectDesc;
	}

	public void setSelectDesc(String selectDesc) {
		this.selectDesc = selectDesc;
	}

	public String getSelectType() {
		return selectType;
	}

	public void setSelectType(String selectType) {
		this.selectType = selectType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
