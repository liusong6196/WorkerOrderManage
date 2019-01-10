package com.ewaytek.edf.web.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.ewaytek.edf.common.entity.R;
import com.ewaytek.edf.web.modules.sys.entity.SysMenuEntity;

/**
 * 系统菜单
 *
 * @author 张静普
 */
public interface SysMenuService {
	
	R listUserMenu(Long userId);
	
	List<SysMenuEntity> listMenu(Map<String, Object> params);
	
	R listNotButton();
	
	R saveMenu(SysMenuEntity menu);

	R getMenuById(Long id);
	
	R updateMenu(SysMenuEntity menu);
	
	R batchRemove(Long[] id);

}
