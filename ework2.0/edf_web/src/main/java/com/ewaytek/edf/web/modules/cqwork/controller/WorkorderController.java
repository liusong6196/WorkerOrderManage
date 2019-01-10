package com.ewaytek.edf.web.modules.cqwork.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.DateUtils;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.web.modules.cqwork.entity.WorkorderEntity;
import com.ewaytek.edf.web.modules.cqwork.service.WorkorderService;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;

/**
 * 
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2018年12月19日 上午11:30:56
 */
@RestController
@RequestMapping("/api/cqwork")
public class WorkorderController{
	
	@Autowired
	private WorkorderService workorderService;
	
	@Autowired
	private SysDictService sysDictService;
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<WorkorderEntity> list(@RequestBody Map<String, Object> params) {
		return workorderService.listWorkorder(params);
	}
		
	/**
	 * 新增
	 * @param workorder
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody WorkorderEntity workorder) {
		return workorderService.saveWorkorder(workorder);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return workorderService.getWorkorderById(id);
	}
	
	/**
	 * 修改
	 * @param workorder
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody WorkorderEntity workorder) {
		return workorderService.updateWorkorder(workorder);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return workorderService.batchRemove(id);
	}
	
	@RequestMapping("/gettokenstr")
	public Map<String,Object> getUserToken(HttpServletRequest httpRequest){
		Map<String,Object> result = new HashMap<String,Object>();
		String token = httpRequest.getHeader("token");
		//System.out.println("token:"+token);
		result.put("tokenstr", token);
		return result;
	}
	
	@RequestMapping(value="/expworkorder",method=RequestMethod.GET)
	public void exportWorkorderExcel(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String proname = request.getParameter("proname");
		String processuser = request.getParameter("processuser");
		String tdstart = request.getParameter("tdstart");
		String tdend = request.getParameter("tdend");
		Map<String,Object> param = new HashMap<String,Object>();
		if(proname != null && !"".equals(proname)){
			param.put("proname", proname);
		}
		if(processuser != null && !"".equals(processuser)){
			param.put("processuser", processuser);
		}
		if(tdstart != null && !"".equals(tdstart)){
			param.put("tdstart", tdstart);
		}
		if(tdend != null && !"".equals(tdend)){
			param.put("tdend", tdend);
		}
		List<WorkorderEntity> list = workorderService.queryWorkorderEntityList(param);
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet("Sheet1");
		String filename = "workorder" + System.currentTimeMillis() + ".xls";
		String[] headers = { "地址", "所属项目", "问题类型", "问题日期","问题描述","处理方法","处理方式","问题来源","处理时长","状态","处理人"};
		HSSFRow row0 = sheet.createRow(0);
		HSSFCellStyle style = workbook.createCellStyle();
		HSSFFont font = workbook.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		font.setFontName("宋体");
		style.setFont(font);
		for(int i=0;i<headers.length;i++){
            HSSFCell cell = row0.createCell(i);
            HSSFRichTextString text = new HSSFRichTextString(headers[i]);
            cell.setCellValue(text);
            cell.setCellStyle(style);
        }
		for(int i=0;i<list.size();i++){
			HSSFRow row = sheet.createRow(i+1);
            row.createCell(0).setCellValue(list.get(i).getArea()+list.get(i).getTown()+list.get(i).getVillage());
            row.createCell(1).setCellValue(list.get(i).getProject());
            row.createCell(2).setCellValue(list.get(i).getType());
            row.createCell(3).setCellValue(DateUtils.format(list.get(i).getOccurDate()));
            row.createCell(4).setCellValue(list.get(i).getDescription());
            row.createCell(5).setCellValue(list.get(i).getMethod());
            row.createCell(6).setCellValue(list.get(i).getManner());
            row.createCell(7).setCellValue(list.get(i).getSource());
            row.createCell(8).setCellValue(list.get(i).getProcessTime()+"分钟");
            row.createCell(9).setCellValue(list.get(i).getStatus().equals("1")?"已解决":"未解决");
            row.createCell(10).setCellValue(list.get(i).getProcessUser());
		}
		response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachment;filename=" + filename);
        response.flushBuffer();
        workbook.write(response.getOutputStream());
	}
	
	@RequestMapping("/gettype")
	@ResponseBody
	public Map<String,Object> getDataType(@RequestParam String type){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("type",type);
		List<SysDictEntity> bussiness=sysDictService.listSysDictAll(params);
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("typedata", bussiness);
		return map;
	}
	
}
