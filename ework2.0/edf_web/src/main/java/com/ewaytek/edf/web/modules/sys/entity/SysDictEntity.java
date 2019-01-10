package com.ewaytek.edf.web.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 系统数据字典表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月13日 上午10:38:08
 */
public class SysDictEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long id;
	
	/**
	 * 数据值
	 */
	private String value;
	
	/**
	 * 标签名
	 */
	private String label;
	
	/**
	 * 数据类型
	 */
	private String type;
	
	/**
	 * 数据描述
	 */
	private String description;
	
	/**
	 * 排序
	 */
	private String sort;
	
	/**
	 * 数据状态:1,启用；2，禁用
	 */
	private String state;
	
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
	
	//状态名称
	private String stateName;
	
	//创建人名称
	private String userIdCreateName;
	
	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getUserIdCreateName() {
		return userIdCreateName;
	}

	public void setUserIdCreateName(String userIdCreateName) {
		this.userIdCreateName = userIdCreateName;
	}

	public SysDictEntity() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setLabel(String label) {
		this.label = label;
	}
	
	public String getLabel() {
		return label;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getType() {
		return type;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setSort(String sort) {
		this.sort = sort;
	}
	
	public String getSort() {
		return sort;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public String getState() {
		return state;
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
