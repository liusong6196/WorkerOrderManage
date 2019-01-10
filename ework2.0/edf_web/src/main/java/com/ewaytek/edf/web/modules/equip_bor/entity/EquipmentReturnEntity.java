package com.ewaytek.edf.web.modules.equip_bor.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 设备归还表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月19日 下午4:31:45
 */
public class EquipmentReturnEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long equRetId;
	
	/**
	 * 对应借用记录
	 */
	private Long equBorId;
	
	/**
	 * 归还人
	 */
	private Long retUserId;
	
	/**
	 * 归还数量
	 */
	private Integer retCount;
	
	/**
	 * 归还日期
	 */
	private String retDatetime;
	
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
	

	public EquipmentReturnEntity() {
		super();
	}

	public void setEquRetId(Long equRetId) {
		this.equRetId = equRetId;
	}
	
	public Long getEquRetId() {
		return equRetId;
	}
	
	public void setEquBorId(Long equBorId) {
		this.equBorId = equBorId;
	}
	
	public Long getEquBorId() {
		return equBorId;
	}
	
	public void setRetUserId(Long retUserId) {
		this.retUserId = retUserId;
	}
	
	public Long getRetUserId() {
		return retUserId;
	}
	
	public void setRetCount(Integer retCount) {
		this.retCount = retCount;
	}
	
	public Integer getRetCount() {
		return retCount;
	}
	
	public void setRetDatetime(String retDatetime) {
		this.retDatetime = retDatetime;
	}
	
	public String getRetDatetime() {
		return retDatetime;
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
	
}
