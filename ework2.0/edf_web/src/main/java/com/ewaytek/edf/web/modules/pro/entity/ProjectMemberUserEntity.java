package com.ewaytek.edf.web.modules.pro.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 * 系统用户
 * @author 张静普
 */
public class ProjectMemberUserEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 用户id
	 */
	private Long userId;
	
	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 成员名称
	 */
	private List<ProjectMemberEntity> projectMemberEntities;
	
	
	public List<ProjectMemberEntity> getProjectMemberEntities() {
		return projectMemberEntities;
	}

	public void setProjectMemberEntities(List<ProjectMemberEntity> projectMemberEntities) {
		this.projectMemberEntities = projectMemberEntities;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	

}
