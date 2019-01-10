package com.ewaytek.edf.web.modules.okrResult.entity;

public class GoalEntity {

	private String pername;
	private String pergoal;
	private String proname;
	private String progoal;
	private String depname;
	private String depgoal;
	public String getPername() {
		return pername;
	}
	public void setPername(String pername) {
		this.pername = pername;
	}
	public String getPergoal() {
		return pergoal;
	}
	public void setPergoal(String pergoal) {
		this.pergoal = pergoal;
	}
	
	public String getProname() {
		return proname;
	}
	public void setProname(String proname) {
		this.proname = proname;
	}
	public String getProgoal() {
		return progoal;
	}
	public void setProgoal(String progoal) {
		this.progoal = progoal;
	}
	public String getDepname() {
		return depname;
	}
	public void setDepname(String depname) {
		this.depname = depname;
	}
	public String getDepgoal() {
		return depgoal;
	}
	public void setDepgoal(String depgoal) {
		this.depgoal = depgoal;
	}
	@Override
	public String toString() {
		return "GoalEntity [pername=" + pername + ", pergoal=" + pergoal + ", proname=" + proname + ", progoal="
				+ progoal + ", depname=" + depname + ", depgoal=" + depgoal + "]";
	}
	
	
	
}
