package com.ewaytek.edf.web.modules.exAccount.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ewaytek.edf.common.annotation.SysLog;
import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.DateUtils;
import com.ewaytek.edf.common.utils.JSONUtils;
import com.ewaytek.edf.web.modules.exAccount.entity.ExpenseAccountEntity;
import com.ewaytek.edf.web.modules.exAccount.entity.ProUtilEntity;
import com.ewaytek.edf.web.modules.exAccount.service.ExpenseAccountService;
import com.ewaytek.edf.web.modules.expense.expenseRountine.entity.ExpenseRoutineEntity;
import com.ewaytek.edf.web.modules.expense.expenseRountine.service.ExpenseRoutineService;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.entity.ExpenseTrafficEntity;
import com.ewaytek.edf.web.modules.expense.expenseTraffic.service.ExpenseTrafficService;
import com.ewaytek.edf.web.modules.sys.dao.SysUserMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysDepartmentEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysDictEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.service.SysDepartmentService;
import com.ewaytek.edf.web.modules.sys.service.SysDictService;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.utils.ShiroUtils;

/**
 * 报销单表
 *
 * @author LF
 * @date 2017年12月14日 上午9:52:37
 */
@RestController
@RequestMapping("/api/exAccount")
public class ExpenseAccountController  {
	private Logger logger = LoggerFactory.getLogger(ExpenseAccountController.class);
	
	@Autowired
	private SysUserMapper sysUserMapper;
	
	@Autowired
	private ExpenseAccountService expenseAccountService;

	@Autowired
	private ExpenseTrafficService expenseTrafficService;
	@Autowired
	private ExpenseRoutineService expenseRoutineService;
	@Autowired
	private SysDepartmentService deptService;
	@Autowired
	private SysDictService sysDictService;
	/**
	 * 新增报销单表和明细表
	 * @param data
	 * @return
	 */
	@SysLog("新增报销单表以及明细表")
	@RequestMapping("/saveAccountAndDetailed")
	public R saveAccountAndDetailed(String data,int type){
		try {
			logger.info("saveAccountAndDetailed(保存报销单表及明细表)<begin> params:{}",data);
			JSONObject dataObject=new JSONObject(data);
			logger.info("analytical-Account(报销主表)<begin>");
			//报销单表
			JSONObject acountJson=new JSONObject(dataObject.getString("account"));
			ExpenseAccountEntity account=JSONUtils.jsonToBean(acountJson.toString(), ExpenseAccountEntity.class);
			if(null==account.getExpAccId()){
				//状态-新增默认1(未审批)
				account.setExpAccState("1");
				//申报人
				account.setExpAccUserid(ShiroUtils.getUserId());
				//申报时间
				account.setExpAccDatetime(new Date());
			}
			logger.info("analytical-Account(报销主表)<over> result:{}",account);

			logger.info("analytical-AccountRountine(日常报销明细-List)<begin>");
			//日常或其他报销明细
			List<ExpenseRoutineEntity> routineList=new ArrayList<ExpenseRoutineEntity>();
			JSONArray rountineArrayJson=new JSONArray("[]");
			if(dataObject.getString("rountine").indexOf("[")==0){
				rountineArrayJson=new JSONArray(dataObject.getString("rountine"));
			}
			Object routineO="表单无数据";
			if(!rountineArrayJson.isNull(0)){
				for(int i=0;i<rountineArrayJson.length();i++){
					JSONObject rountineJson=new JSONObject(rountineArrayJson.getString(i));
					ExpenseRoutineEntity routineEntity=JSONUtils.jsonToBean(rountineJson.toString(), ExpenseRoutineEntity.class);
					//创建用户
					routineEntity.setUserIdCreate(ShiroUtils.getUserId());
					if(null==routineEntity.getExpRouId()){
						//创建时间
						routineEntity.setGmtCreate(new Date());
					}else{
						routineEntity.setGmtModified(new Date());
					}
					routineList.add(i, routineEntity);
				}
				routineO=routineList;
			}
			logger.info("analytical-AccountRountine(日常报销明细-List)<over> result:{}",routineO);

			logger.info("analytical-AccountTraffic(交通报销明细-List)<begin>");
			//交通报销明细
			JSONArray trafficArrayJson=new JSONArray("[]");
			if(dataObject.getString("traffic").indexOf("[")==0){
				trafficArrayJson=new JSONArray(dataObject.getString("traffic"));
			}
			List<ExpenseTrafficEntity> trafficList=new ArrayList<ExpenseTrafficEntity>();
			Object trafficO="表单无数据";
			if(!trafficArrayJson.isNull(0)){
				for(int i=0;i<trafficArrayJson.length();i++){
					JSONObject trafficJson=new JSONObject(trafficArrayJson.getString(i));
					ExpenseTrafficEntity trafficEntity=JSONUtils.jsonToBean(trafficJson.toString(), ExpenseTrafficEntity.class);
					//创建用户
					trafficEntity.setUserIdCreate(ShiroUtils.getUserId());
					if(null==trafficEntity.getExpTraId()){
						//创建时间
						trafficEntity.setGmtCreate(new Date());
					}else{
						trafficEntity.setGmtModified(new Date());
					}
					trafficList.add(i, trafficEntity);
				}
				trafficO=trafficList;
			}
			logger.info("analytical-AccountRountine(日常报销明细-List)<over> result:{}",trafficO);
			
			int i=expenseAccountService.saveAccountAndDetailed(account, trafficList, routineList,type);
			logger.info("saveAccountAndDetailed(保存报销单表及明细表)<over> result:{}",i);
			return R.ok();
		} catch (Exception e) {
			e.printStackTrace();
			return R.error(500, e.getMessage());
		}
	}
	/**
	 * 修改前查询报销单以及明细信息
	 * @param id
	 * @return
	 */
	@RequestMapping("/listAccountAndDetailed")
	public R listAccountAndDetailed(Long id){
		try {
			JSONObject result=new JSONObject();
			logger.info("listAccountAndDetailed(编辑前获取展示信息)<begin> accountID:{}",id);
			R r=expenseAccountService.getExpenseAccountById(id);
			if(r.get("code").equals(0)){
				logger.info("analytical-Account(报销主表)<begin>");
				//报销主表
				ExpenseAccountEntity account=(ExpenseAccountEntity) r.get("rows");
				String expAccType=account.getExpAccType();
				JSONObject accountJsonObject=new JSONObject(JSONUtils.beanToJson(account));
				//申报时间 --  yyyy-MM-dd HH:mm:ss
				accountJsonObject.put("expAccDatetime", DateUtils.format(account.getExpAccDatetime(), DateUtils.DATE_TIME_PATTERN));
				//审批时间
				accountJsonObject.put("checkDatetime", DateUtils.format(account.getCheckDatetime(), DateUtils.DATE_TIME_PATTERN));
				//复核时间doubleCheckDatetime
				accountJsonObject.put("doubleCheckDatetime", DateUtils.format(account.getDoubleCheckDatetime(), DateUtils.DATE_TIME_PATTERN));
				result.put("account", accountJsonObject);
				logger.info("analytical-Account(报销主表)<over> result:{}",accountJsonObject);

				logger.info("analytical-AccountTraffic(交通报销明细-List)<begin> expAccNo:{}",account.getExpAccNo());
				//交通明细
				Object trafficO="表单无数据";
				List<ExpenseTrafficEntity> trafficList=expenseTrafficService.listByExpAccNo(account.getExpAccNo());
				if(trafficList.size()>0){
					JSONArray trafficArrayJson=new JSONArray();
					for(int i=0;i<trafficList.size();i++){
						JSONObject trafficJson=new JSONObject(JSONUtils.beanToJson(trafficList.get(i)));
						//出发时间-  yyyy-MM-dd
						trafficJson.put("expStartDatetime", 
								DateUtils.format(trafficList.get(i).getExpStartDatetime(), DateUtils.DATE_PATTERN));
						//到达时间
						trafficJson.put("expEndDatetime", 
								DateUtils.format(trafficList.get(i).getExpEndDatetime(), DateUtils.DATE_PATTERN));
						//创建时间
						trafficJson.put("gmtCreate", 
								DateUtils.format(trafficList.get(i).getGmtCreate(), DateUtils.DATE_TIME_PATTERN));
						//修改时间
						trafficJson.put("gmtModified", 
								DateUtils.format(trafficList.get(i).getGmtModified(), DateUtils.DATE_TIME_PATTERN));
						trafficArrayJson.put(i,trafficJson);
					}
					trafficO=trafficArrayJson;
					result.put("traffic", trafficArrayJson);
				}
				logger.info("analytical-AccountTraffic(交通报销明细-List)<over> result:{}",trafficO);

				logger.info("analytical-AccountRountine(日常报销明细-List)<begin> expAccNo:{}",account.getExpAccNo());
				//日常明细
				Object routineO="无数据";
				List<ExpenseRoutineEntity> routineList=expenseRoutineService.listByExpAccNo(account.getExpAccNo());
				if(routineList.size()>0){
					JSONArray routineArrayJson=new JSONArray();
					for(int i=0;i<routineList.size();i++){
						JSONObject routineJson=new JSONObject(JSONUtils.beanToJson(routineList.get(i)));
						//创建时间
						routineJson.put("gmtCreate", 
								DateUtils.format(routineList.get(i).getGmtCreate(), DateUtils.DATE_TIME_PATTERN));
						//修改时间
						routineJson.put("gmtModified", 
								DateUtils.format(routineList.get(i).getGmtModified(), DateUtils.DATE_TIME_PATTERN));
						routineArrayJson.put(i, routineJson);
					}
					routineO=routineArrayJson;
					result.put("routine", routineArrayJson);
				}
				logger.info("analytical-AccountRountine(日常报销明细-List)<over> result:{}",routineO);
			}
			R rd=R.ok().put("data", result.toString());
			logger.info("saveAccountAndDetailed(编辑前获取展示信息)<over> result:{}",rd);
			return rd;
		} catch (Exception e) {
			e.printStackTrace();
			return R.error(e.getMessage());
		}
	}
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<ExpenseAccountEntity> list(@RequestBody Map<String, Object> params) {
		//System.out.println("种类======"+params.get("reviewNum"));
		//只能查看自己的报销单
		params.put("userID", ShiroUtils.getUserId());
		return expenseAccountService.listExpenseAccount(params);
	}
	@RequestMapping("/getDeptName")
	public R getDeptName(){
		R r=deptService.getDepartmentById(ShiroUtils.getUserEntity().getDepId());
		return r;
//		if("0".equals(r.get("code"))){
//			return R.ok().put("deptName", ((SysDepartmentEntity)r.get("rows")).getDepName());
//		}else{
//			return R.error();
//		}
	}
	@SysLog("修改报销单复核状态以及复核金额")
	@RequestMapping("/updateStateCheck")
	public R updateCheckMoney(String expAccId,String fhMoney){
		try {
			logger.info("updateCheckMode begin params expAccId:{},fhMoney:{}",expAccId,fhMoney);
			R r=expenseAccountService.getExpenseAccountById(Long.valueOf(expAccId));
			if(r.get("code") .equals(0)){
				ExpenseAccountEntity accountEntity=(ExpenseAccountEntity) r.get("rows");
				accountEntity.setExpAccState("4");
				accountEntity.setDoubleCheckUserid(ShiroUtils.getUserId());
				if(!"".equals(fhMoney.trim()))
				accountEntity.setDoubleCheckMoney(Double.valueOf(fhMoney));
				accountEntity.setDoubleCheckDatetime(new Date());
				R result= expenseAccountService.updateExpenseAccount(accountEntity);
				logger.info("updateCheckMonde result:{}",result);
				return result;
			}else{
				return R.error("修改失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return R.error(e.getMessage());
		}
	}
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/allList")
	public Page<ExpenseAccountEntity> allList(@RequestBody Map<String, Object> params) {
		//System.out.println("种类======"+params.get("reviewNum"));
		Integer type=(Integer) params.get("type");
		if(null!=type){
			//查看报销审核人为当前登陆用户的报销单
			if(1==type){
				params.put("auditor", ShiroUtils.getUserId());
			}else if(2==type){
				//查看报销状态为审核通过的报销单
				params.put("expAccState", "2");
			}
		}
		logger.info("allList params:{}",params);
		return expenseAccountService.listExpenseAccount(params);
	}
	
	
	/**
	 *	获取下拉框options值(除项目外)
	 * @param type	类型 -交通工具、报销类型、....
	 * @return
	 */
	@RequestMapping("/getOptions")
	public Map<String,Object> getOptions(String type){
		Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
		try {
			Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("type", type);
			List<SysDictEntity> list=sysDictService.listSysDictAll(params);
			resultMap.put("code", "0");
			resultMap.put("data", list);
			resultMap.put("msg", "");
			return resultMap;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("code", "500");
			resultMap.put("msg", e.getMessage());
			return resultMap;
		}
	}
	/**
	 * 获取项目列表，去当前用户参与的项目
	 * @return
	 */
	@RequestMapping("/getPro")
	public Map<String,Object> getPro(){
		Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
		try {
			List<ProUtilEntity> list=expenseAccountService.listPro();
			resultMap.put("code", "0");
			resultMap.put("data", list);
			resultMap.put("msg", "");
			return resultMap;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("code", "500");
			resultMap.put("msg", e.getMessage());
			return resultMap;
		}
	}
	/**
	 * 新增
	 * @param expenseAccount
	 * @return
	 */
	@SysLog("新增报销单表")
	@RequestMapping("/save")
	public R save(@RequestBody ExpenseAccountEntity expenseAccount) {
		return expenseAccountService.saveExpenseAccount(expenseAccount);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return expenseAccountService.getExpenseAccountById(id);
	}
	
	/**
	 * 修改
	 * @param expenseAccount
	 * @return
	 */
	@SysLog("修改报销单表")
	@RequestMapping("/update")
	public R update(@RequestBody ExpenseAccountEntity expenseAccount) {
		return expenseAccountService.updateExpenseAccount(expenseAccount);
	}

	@SysLog("修改报销单审批状态")
	@RequestMapping("/updateState")
	public R updateState(Long id,String state){
		R r=expenseAccountService.getExpenseAccountById(id);
		if(r.get("rows") != null){
			//state =5 第一个人审核通过
			ExpenseAccountEntity accountEntity=(ExpenseAccountEntity) r.get("rows");
			
			
			// 申报人ID
			Long user_id = accountEntity.getExpAccUserid();
			SysUserEntity user = sysUserMapper.getObjectById(user_id);
			
			Long auditor_first = user.getAuditor();
			Long auditor_second = user.getAuditorTwo();
			
			if(auditor_first == null && auditor_second == null){
				// 审批人不存在
				return R.error("审批人不存在");
			}
			
			if(auditor_first != null && auditor_second != null && !auditor_first.equals(auditor_second)){
				if(state.equals("5")){
					accountEntity.setCheckUserid(ShiroUtils.getUserId());
					accountEntity.setCheckDatetime(new Date());
				}else if(state.equals("2")){
					if(ShiroUtils.getUserId().equals(accountEntity.getCheckUserid())){
						return R.error("您不能同时审批两次");
					}
					accountEntity.setCheckUseridTwo(ShiroUtils.getUserId());
					accountEntity.setCheckDatetimeTwo(new Date());
				}
			} else {
				state = "2";
				accountEntity.setCheckUserid(ShiroUtils.getUserId());
				accountEntity.setCheckDatetime(new Date());
				accountEntity.setCheckUseridTwo(ShiroUtils.getUserId());
				accountEntity.setCheckDatetimeTwo(new Date());
			}
			
			accountEntity.setExpAccState(state);
			
//			if(state.equals("5")){
//				accountEntity.setCheckUserid(ShiroUtils.getUserId());
//				accountEntity.setCheckDatetime(new Date());
//			}else if(state.equals("2")){
//				if(ShiroUtils.getUserId().equals(accountEntity.getCheckUserid())){
//					return R.error("您不能同时审批两次");
//				}
//				accountEntity.setCheckUseridTwo(ShiroUtils.getUserId());
//				accountEntity.setCheckDatetimeTwo(new Date());
//			}
			
			return expenseAccountService.updateExpenseAccount(accountEntity);
		}else{
			return R.error("修改失败");
		}
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除报销单表")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return expenseAccountService.batchRemove(id);
	}
	
	/**
	 * 判断复查人id是否为90（唯一审批人用户id）
	 */
	
	@RequestMapping("/checkPerson")
	public R checkPerson() {
		//System.out.println("chenckPerson");
		return expenseAccountService.checkPerson();
	}
}
