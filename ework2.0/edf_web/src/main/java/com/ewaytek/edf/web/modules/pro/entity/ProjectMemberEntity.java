package com.ewaytek.edf.web.modules.pro.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 项目成员表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年11月29日 上午9:26:32
 */
public class ProjectMemberEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记录id
	 */
	private Long id;
	
	/**
	 * 项目ID
	 */
	private Long proId;
	
	/**
	 * 项目成员ID
	 */
	private Long userId;
	

	public ProjectMemberEntity() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setProId(Long proId) {
		this.proId = proId;
	}
	
	public Long getProId() {
		return proId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getUserId() {
		return userId;
	}
	
}
