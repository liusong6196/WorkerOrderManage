package com.ewaytek.edf.web.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 用户级别表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月27日 下午8:16:24
 */
public class UserLevelEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 级别ID
	 */
	private Long levelId;
	
	/**
	 * 级别代码
	 */
	private String levelValue;
	
	/**
	 * 级别名称
	 */
	private String levelName;
	
	/**
	 * 级别费用
	 */
	private Double levelCost;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 创建用户id
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
	

	public UserLevelEntity() {
		super();
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}
	
	public Long getLevelId() {
		return levelId;
	}
	
	public void setLevelValue(String levelValue) {
		this.levelValue = levelValue;
	}
	
	public String getLevelValue() {
		return levelValue;
	}
	
	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}
	
	public String getLevelName() {
		return levelName;
	}
	
	public void setLevelCost(Double levelCost) {
		this.levelCost = levelCost;
	}
	
	public Double getLevelCost() {
		return levelCost;
	}
	
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
