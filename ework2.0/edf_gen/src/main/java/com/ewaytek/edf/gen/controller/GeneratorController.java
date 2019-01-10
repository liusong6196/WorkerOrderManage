package com.ewaytek.edf.gen.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.gen.entity.GeneratorParamEntity;
import com.ewaytek.edf.gen.entity.TableEntity;
import com.ewaytek.edf.gen.service.GeneratorService;

/**
 * 代码生成器
 * @author 张静普
 */
@Controller
@RequestMapping("/api/gen")
public class GeneratorController {

	@Autowired
	private GeneratorService generatorService;
	
	/**
	 * 表格列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	@ResponseBody
	public Page<TableEntity> list(@RequestBody Map<String, Object> params) {
		return generatorService.listTable(params);
	}
	
	/**
	 * 生成代码nb .
m	 * @param  89uijhtables
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("/code")
	public void generator(GeneratorParamEntity params, HttpServletRequest request, HttpServletResponse response) throws IOException {
		byte[] code = generatorService.generator(params);
		String attachment = "attachment; filename=" + params.getTables()[0] + ".zip";
		response.reset();  
        response.setHeader("Content-Disposition", attachment);  
        response.addHeader("Content-Length", "" + code.length);  
        response.setContentType("application/octet-stream; charset=UTF-8");  
        IOUtils.write(code, response.getOutputStream());
	}

}
