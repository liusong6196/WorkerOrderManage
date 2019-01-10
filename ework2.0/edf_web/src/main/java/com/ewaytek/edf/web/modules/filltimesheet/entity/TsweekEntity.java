package com.ewaytek.edf.web.modules.filltimesheet.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 周记录表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月14日 上午12:13:49
 */
public class TsweekEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 周ID
	 */
	private Long tsId;
	
	/**
	 * 起始日期（周为单位）
	 */
	private Date tsStartdate;
	
	/**
	 * 结束日期（周为单位）
	 */
	private Date tsEnddate;
	

	public TsweekEntity() {
		super();
	}

	public void setTsId(Long tsId) {
		this.tsId = tsId;
	}
	
	public Long getTsId() {
		return tsId;
	}
	
	public void setTsStartdate(Date tsStartdate) {
		this.tsStartdate = tsStartdate;
	}
	
	public Date getTsStartdate() {
		return tsStartdate;
	}
	
	public void setTsEnddate(Date tsEnddate) {
		this.tsEnddate = tsEnddate;
	}
	
	public Date getTsEnddate() {
		return tsEnddate;
	}
	
}
