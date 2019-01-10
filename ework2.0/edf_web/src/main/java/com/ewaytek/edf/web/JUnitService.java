package com.ewaytek.edf.web;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ewaytek.edf.web.modules.report.entity.DepartmentReportEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDepartmentService;

// JUnit标准注解，Junit单元测试不需要使用内置的方法进行单元测试，使用RunWith类来提供单元测试
@RunWith(SpringRunner.class)
// 用户Spring Boot 应用单元测试 ， 默认顺序根据包名逐级往上找。
@SpringBootTest
public class JUnitService {
	@Autowired
	SysDepartmentService sysDepartmentService;
	
	@BeforeClass
	public static void beforeClassTest(){
		System.out.println("单元测试开始之前进行初始化 : 时间  "  + System.currentTimeMillis());
	}
	
	@Test
	public void testService(){
		SysDepartmentEntity depart = new SysDepartmentEntity();
		/**
		 * 测试查询方法Service业务逻辑
		 */
		sysDepartmentService.getDepartmentById((long)depart.getDepId());
		/**
		 * 测试listAllDepartment方法Service业务逻辑
		 */
		sysDepartmentService.listAllDepartment();
		/**
		 * 测试listDepartment方法Service业务逻辑
		 */
		sysDepartmentService.listDepartment();
		/**
		 * 测试saveDepartment方法Service业务逻辑
		 */
		sysDepartmentService.saveDepartment(depart);
		/**
		 * 测试updateDepartment方法Service业务逻辑
		 */
		sysDepartmentService.updateDepartment(depart);
	}
	
	@AfterClass
	public void afterClassTest(){
		System.out.println("单元测试结束之后执行  : 时间 " + System.currentTimeMillis());
	}
}
