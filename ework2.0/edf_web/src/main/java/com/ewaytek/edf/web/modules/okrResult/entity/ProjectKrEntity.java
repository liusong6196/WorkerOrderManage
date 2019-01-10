package com.ewaytek.edf.web.modules.okrResult.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;



/**
 * 项目关键结果
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月23日 下午10:35:37
 */
public class ProjectKrEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long id;
	
	/**
	 * 目标id
	 */
	private String objId;
	/**
	 * 季度目标名称
	 */
	private String quarterName;
	
	/**
	 * 关键结果
	 */
	private String krResult;
	
	/**
	 * 计划指标
	 */
	private BigDecimal planIndex;
	
	/**
	 * 实际指标
	 */
	private BigDecimal actualIndex;
	
	/**
	 * 4个分段 1分,0.7分,0.3分,0分
	 */
	private BigDecimal krScore;
	
	/**
	 * 创建人
	 */
	private Long userIdCreate;
	
	/**
	 * 创建人姓名
	 */
	private String createUserName;
	
	/**
	 * 创建时间
	 */
	private Date gmtCreate;
	
	/**
	 * 修改时间
	 */
	private Date gmtModified;
	

	public ProjectKrEntity() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getObjId() {
		return objId;
	}

	public void setObjId(String objId) {
		this.objId = objId;
	}

	public void setKrResult(String krResult) {
		this.krResult = krResult;
	}
	
	public String getKrResult() {
		return krResult;
	}
	
	public void setPlanIndex(BigDecimal planIndex) {
		this.planIndex = planIndex;
	}
	
	public BigDecimal getPlanIndex() {
		return planIndex;
	}
	
	public void setActualIndex(BigDecimal actualIndex) {
		this.actualIndex = actualIndex;
	}
	
	public BigDecimal getActualIndex() {
		return actualIndex;
	}
	
	public void setKrScore(BigDecimal krScore) {
		this.krScore = krScore;
	}
	
	public BigDecimal getKrScore() {
		return krScore;
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

	public String getQuarterName() {
		return quarterName;
	}

	public void setQuarterName(String quarterName) {
		this.quarterName = quarterName;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	
}
