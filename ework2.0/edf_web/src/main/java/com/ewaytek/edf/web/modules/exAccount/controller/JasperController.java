package com.ewaytek.edf.web.modules.exAccount.controller;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRResultSetDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller  
@RequestMapping(value = "/api/sys/reports")
public class JasperController {
	 private static final String REPORT_NAME = "reportName";  
	  private static final String FILE_FORMAT = "format";  
	  private static final String DATASOURCE = "datasource";  
	  
	  private static final String queryStr = "你的sql语句";  
	  
	  @Autowired  
	  private DataSource dbSource;  
	  
	  /** 
	   * 直接使用模板文件中的sql语句得到报表 
	   * @param modelMap 
	   * @param reportName 
	   * @param format 
	   * @return 
	   */  
	  @RequestMapping("/{reportName}")  
	  public ModelAndView reportName(final ModelMap modelMap,  
	      @PathVariable(REPORT_NAME) final String reportName,  
	      @RequestParam(FILE_FORMAT) final String format) {
	    modelMap.put(DATASOURCE, dbSource);  
	    modelMap.put(FILE_FORMAT, format);  
	    ModelAndView modelAndView = new ModelAndView(reportName, modelMap);  
	    return modelAndView;  
	  }
	 
	    
	    
	  /** 
	   * 自定义sql语句并生成报表，要注意一点，select ? from ? where XXX 
	   * where前面的语句需要写死，后面的where条件可以灵活传入 
	   * 因为模板中的field需要先定义好并对应select A from中的A，才能出数据 
	   * @param modelMap 
	   * @param reportName 
	   * @param format 
	   * @param modelAndView 
	   * @return 
	   */  
	  @RequestMapping("/query/{reportName}")  
	  public ModelAndView query(final ModelMap modelMap,  
	      @PathVariable(REPORT_NAME) final String reportName,  
	      @RequestParam(FILE_FORMAT) final String format, ModelAndView modelAndView) {  
	    try {  
	      ResultSet resultSet = dbSource.getConnection().createStatement().executeQuery(queryStr);  
	      JRDataSource jrDataSource = new JRResultSetDataSource(resultSet);  
	      modelMap.put(DATASOURCE, jrDataSource);  
	      modelMap.put(FILE_FORMAT, format);  
	      modelAndView = new ModelAndView(reportName, modelMap);  
	    } catch (SQLException e) {  
	      e.printStackTrace();  
	    }  
	    return modelAndView;  
	  }  
}
