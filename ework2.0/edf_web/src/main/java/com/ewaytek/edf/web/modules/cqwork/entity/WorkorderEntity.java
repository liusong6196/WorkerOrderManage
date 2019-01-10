package com.ewaytek.edf.web.modules.cqwork.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:30:56
 */
public class WorkorderEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 主键
	 */
	private Integer id;
	
	/**
	 * 区县
	 */
	private String area;
	
	/**
	 * 乡镇街道
	 */
	private String town;
	
	/**
	 * 村社
	 */
	private String village;
	
	/**
	 * 姓名
	 */
	private String name;
	
	/**
	 * 所属项目
	 */
	private String project;
	
	/**
	 * 问题类型
	 */
	private String type;
	
	/**
	 * 问题日期
	 */
	private Date occurDate;
	
	/**
	 * 处理完成时间
	 */
	private Date overTime;
	
	/**
	 * qq号
	 */
	private String qq;
	
	/**
	 * 电话
	 */
	private String tel;
	
	/**
	 * 问题描述
	 */
	private String description;
	
	/**
	 * 处理方法
	 */
	private String method;
	
	/**
	 * 处理方式
	 */
	private String manner;
	
	/**
	 * 问题来源
	 */
	private String source;
	
	/**
	 * 处理时长 (分钟数)
	 */
	private Integer processTime;
	
	/**
	 * 状态 1.已解决 2.未解决
	 */
	private String status;
	
	/**
	 * 处理人姓名
	 */
	private String processUser;
	
	/**
	 * 归属地 1重庆 2农垦 3河南 4吉林 5云南 6河北
	 */
	private String belong;
	
	//非数据库字段-用于接收字符串格式的日期
	private String strdate;
	
	public WorkorderEntity() {
		super();
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setArea(String area) {
		this.area = area;
	}
	
	public String getArea() {
		return area;
	}
	
	public void setTown(String town) {
		this.town = town;
	}
	
	public String getTown() {
		return town;
	}
	
	public void setVillage(String village) {
		this.village = village;
	}
	
	public String getVillage() {
		return village;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setProject(String project) {
		this.project = project;
	}
	
	public String getProject() {
		return project;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getType() {
		return type;
	}
	
	public void setOccurDate(Date occurDate) {
		this.occurDate = occurDate;
	}
	
	public Date getOccurDate() {
		return occurDate;
	}
	
	public void setOverTime(Date overTime) {
		this.overTime = overTime;
	}
	
	public Date getOverTime() {
		return overTime;
	}
	
	public void setQq(String qq) {
		this.qq = qq;
	}
	
	public String getQq() {
		return qq;
	}
	
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	public String getTel() {
		return tel;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setMethod(String method) {
		this.method = method;
	}
	
	public String getMethod() {
		return method;
	}
	
	public void setManner(String manner) {
		this.manner = manner;
	}
	
	public String getManner() {
		return manner;
	}
	
	public void setSource(String source) {
		this.source = source;
	}
	
	public String getSource() {
		return source;
	}
	
	public void setProcessTime(Integer processTime) {
		this.processTime = processTime;
	}
	
	public Integer getProcessTime() {
		return processTime;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setProcessUser(String processUser) {
		this.processUser = processUser;
	}
	
	public String getProcessUser() {
		return processUser;
	}

	public String getStrdate() {
		return strdate;
	}

	public void setStrdate(String strdate) {
		this.strdate = strdate;
	}

	public String getBelong() {
		return belong;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}
			
}
