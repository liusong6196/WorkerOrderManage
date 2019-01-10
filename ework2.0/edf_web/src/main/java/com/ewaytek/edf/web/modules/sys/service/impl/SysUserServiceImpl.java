package com.ewaytek.edf.web.modules.sys.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ewaytek.edf.common.entity.Page;
import com.ewaytek.edf.common.entity.Query;
import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.common.utils.CommonUtils;
import com.ewaytek.edf.common.utils.MD5Utils;
import com.ewaytek.edf.web.modules.sys.dao.SysMenuMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysRoleMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysUserMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysUserRoleMapper;
import com.ewaytek.edf.web.modules.sys.dao.SysUserTokenMapper;
import com.ewaytek.edf.web.modules.sys.entity.SysUserEntity;
import com.ewaytek.edf.web.modules.sys.entity.SysUserTokenEntity;
import com.ewaytek.edf.web.modules.sys.entity.UserLevelEntity;
import com.ewaytek.edf.web.modules.sys.service.SysUserService;
import com.ewaytek.edf.web.oauth.TokenGenerator;

/**
 * 系统用户
 *
 * @author 张静普
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {

	/**
	 * token过期时间，1小时
	 */
	private final static int TOKEN_EXPIRE = 1000 * 60 * 60 * 1;
	
	/**
	 * 用户管理
	 */
	@Autowired
	private SysUserMapper sysUserMapper;
	
	/**
	 * 用户Token管理
	 */
	@Autowired
	private SysUserTokenMapper sysUserTokenMapper;
	
	/**
	 * 用户菜单管理
	 */
	@Autowired
	private SysMenuMapper sysMenuMapper;
	
	/**
	 * 用户角色管理
	 */
	@Autowired
	private SysUserRoleMapper sysUserRoleMapper;
	
	/**
	 * 用户角色
	 */
	@Autowired
	private SysRoleMapper sysRoleMapper;
	
	/**
	 * 获取用户列表
	 */
	@Override
	public Page<SysUserEntity> listUser(Map<String, Object> params) {
		Query form = new Query(params);
		Page<SysUserEntity> page = new Page<>(form);
		sysUserMapper.listForPage(page, form);
		return page;
	}
	
	@Override
	public Page<SysUserEntity> listRessbook(Map<String, Object> params) {
		Query form = new Query(params);
		Page<SysUserEntity> page = new Page<>(form);
		sysUserMapper.listForPageRessbook(page, form);
		return page;
	}
	/**
	 * 保存用户
	 */
	@Override
	public R saveUser(SysUserEntity user) {
		user.setPassword(MD5Utils.encrypt(user.getPassword()));
		int count = sysUserMapper.save(user);
		//得到刚才增加的用户
		if(!CommonUtils.isIntThanZero(count)) {
			return R.error("用户更新失败");
		}
		SysUserEntity userNow = sysUserMapper.getByUserName(user.getUsername());	
		if(user.getRoleIdList().size() > 0){
			Long userId = userNow.getUserId();
			Query query = new Query();
			query.put("userId", userId);
			query.put("roleIdList", user.getRoleIdList());
			sysUserRoleMapper.save(query);
		}
		return CommonUtils.msg(count);
	}

	/**
	 * 根据用户ID获取用户信息
	 */
	@Override
	public R getUserById(Long userId) {
		SysUserEntity user = sysUserMapper.getObjectById(userId);
		user.setRoleIdList(sysUserRoleMapper.listUserRoleId(userId));
		return CommonUtils.msg(user);
	}

	/**
	 * 更新用户
	 */
	@Override
	public R updateUser(SysUserEntity user) {
		int count = sysUserMapper.update(user);
		
		if(user.getRoleIdList().size() > 0){
		Long userId = user.getUserId();
		sysUserRoleMapper.remove(userId);
		Query query = new Query();
		query.put("userId", userId);
		query.put("roleIdList", user.getRoleIdList());
		sysUserRoleMapper.save(query);
		}
		
		return CommonUtils.msg(count);
	}

	/**
	 * 批量删除
	 */
	@Override
	public R batchRemove(Long[] id) {
		int count = sysUserMapper.batchRemove(id);
		return CommonUtils.msg(count);
	}
	
	@Override
	public Set<String> listUserPermSet(Long userId) {
		List<String> perms = sysMenuMapper.listUserPerms(userId);
		Set<String> permsSet = new HashSet<>();
		for(String perm : perms) {
			if(StringUtils.isNotBlank(perm)) {
				permsSet.addAll(Arrays.asList(perm.trim().split(",")));
			}
		}
		
		return permsSet;
	}
	
	@Override
	public Set<String> listUserRoleSet(Long userId) {
		List<String> roles = sysRoleMapper.listUserRoles(userId);
		Set<String> rolesSet = new HashSet<>();
		for(String role : roles) {
			if(StringUtils.isNotBlank(role)) {
				rolesSet.addAll(Arrays.asList(role.trim().split(",")));
			}
		}
		
		return rolesSet;
	}

	/**
	 * 获取用户权限
	 */
	@Override
	public R listUserPerms(Long userId) {
		
		Set<String> permsSet = this.listUserPermSet(userId);
		
		return CommonUtils.msgNotCheckNull(permsSet);
	}
	
	/**
	 * 获取角色权限
	 */
	@Override
	public R listUserRoles(Long userId){
		
		Set<String> roleSet = this.listUserRoleSet(userId);
		
		return CommonUtils.msgNotCheckNull(roleSet);
	}

	/**
	 * 修改用户密码
	 */
	@Override
	public R updatePswdByUser(SysUserEntity user) {
		String pswd = user.getPassword();
		pswd = MD5Utils.encrypt(pswd);
		user.setPassword(pswd);
		/*Query query = new Query();
		query.put("userId", user.getUserId());
		query.put("pswd", pswd);
		query.put("newPswd", newPswd);*/
		int count = sysUserMapper.update(user);
		if(!CommonUtils.isIntThanZero(count)) {
			return R.error("密码修改失败");
		}
		return CommonUtils.msg(count);
	}

	/**
	 * 更新用户状态
	 */
	@Override
	public R updateUserEnable(Long[] id) {
		Query query = new Query();
		query.put("status", 1);
		query.put("id", id);
		int count = sysUserMapper.updateUserStatus(query);
		
		return CommonUtils.msg(id, count);
	}

	/**
	 * 更新用户状态
	 */
	@Override
	public R updateUserDisable(Long[] id) {
		
		Query query = new Query();
		query.put("status", 0);
		query.put("id", id);
		int count = sysUserMapper.updateUserStatus(query);
		
		return CommonUtils.msg(id, count);
	}

	/**
	 * 修改密码
	 */
	@Override
	public R updatePswd(SysUserEntity user) {
		
		SysUserEntity currUser = sysUserMapper.getObjectById(user.getUserId());
		user.setPassword(MD5Utils.encrypt(user.getPassword()));
		int count = sysUserMapper.updatePswd(user);
		
		return CommonUtils.msg(count);
	}

	/**
	 * 保存用户登陆的Token
	 */
	@Override
	public R saveUserToken(Long userId,String isSame) {
		
		//生成token
		String token = TokenGenerator.generateValue();
		//当前时间
		Date now = new Date();
		Date gmtExpire = new Date(now.getTime() + TOKEN_EXPIRE);
		SysUserTokenEntity userToken = sysUserTokenMapper.getByUserId(userId);
		
		//统一时间格式
		if(isSame.equals("0") && userToken != null) {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//得到上次用户登陆的登陆时间的
			Date gmtModified = userToken.getGmtModified();
			String dateNow = df.format(now);
		    String dateGmtModified = df.format(gmtModified);
		    try {
		    	//两次登陆的时间差为：
				long sub = df.parse(dateNow).getTime()-df.parse(dateGmtModified).getTime();
				if(sub < TOKEN_EXPIRE) {
					return  R.ok().put("tip", "true");	
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		//
	    if(isSame.equals("1") || isSame == null || isSame.equals("0")) {
			if(userToken == null) {
				userToken = new SysUserTokenEntity();
				userToken.setUserId(userId);
				userToken.setToken(token);
				userToken.setGmtExpire(gmtExpire);
				userToken.setGmtModified(now);
				sysUserTokenMapper.save(userToken);
			} else {
				userToken.setToken(token);
				userToken.setGmtExpire(gmtExpire);
				userToken.setGmtModified(now);
				sysUserTokenMapper.update(userToken);
			}
			
	    }
	    // 返回值
	    return R.ok().put("token", userToken.getToken()).put("expire", userToken.getGmtExpire());
	}

	/**
	 * 更新Token
	 */
	@Override
	public R updateUserToken(Long userId) {
		
		String token = TokenGenerator.generateValue();
		SysUserTokenEntity userToken = new SysUserTokenEntity();
		userToken.setUserId(userId);
		userToken.setToken(token);
		
		int count = sysUserTokenMapper.update(userToken);
		
		return CommonUtils.msg(count);
	}

	/**
	 * 根据用户名获取用户
	 */
	@Override
	public SysUserEntity getByUserName(String username) {
		return sysUserMapper.getByUserName(username);
	}

	@Override
	public List<SysUserEntity> listAllUser() {
		// TODO 自动生成的方法存根
		return sysUserMapper.listAllUser();
	}

	@Override
	public String getUserNameByUserId(Long id) {
		SysUserEntity user=sysUserMapper.getObjectById(id);
		String result=null;
		if(null!=user){
			result=user.getUsername();
		}
		return result;
	}

	@Override
	public List<SysUserEntity> depUser(Map<String, Object> params) {
		return sysUserMapper.depUser(new Query(params));
	}

	@Override
	public SysUserEntity getByUserLogno(String userLogno) {
		return sysUserMapper.getByUserLogno(userLogno);
	}

	@Override
	public List<UserLevelEntity> getAllTerritorial() {
		// TODO Auto-generated method stub
		return sysUserMapper.getAllTerritorial();
	}

	@Override
	public  SysUserEntity getUserByDepId(String depId) {
		return sysUserMapper.getUserByDepId(depId);	
	}

}
