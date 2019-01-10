package com.ewaytek.edf.web.modules.cqwork.entity;

import java.io.Serializable;


/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:33:00
 */
public class SocietydistlistEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 
	 */
	private String distid;
	
	/**
	 * 
	 */
	private String explain;
	
	/**
	 * 
	 */
	private String updistid;
	
	/**
	 * 
	 */
	private String selectlevel;
	
	/**
	 * 
	 */
	private String belong;
	

	public SocietydistlistEntity() {
		super();
	}

	public void setDistid(String distid) {
		this.distid = distid;
	}
	
	public String getDistid() {
		return distid;
	}
	
	public void setExplain(String explain) {
		this.explain = explain;
	}
	
	public String getExplain() {
		return explain;
	}
	
	public void setUpdistid(String updistid) {
		this.updistid = updistid;
	}
	
	public String getUpdistid() {
		return updistid;
	}
	
	public void setSelectlevel(String selectlevel) {
		this.selectlevel = selectlevel;
	}
	
	public String getSelectlevel() {
		return selectlevel;
	}

	public String getBelong() {
		return belong;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}
	
}
