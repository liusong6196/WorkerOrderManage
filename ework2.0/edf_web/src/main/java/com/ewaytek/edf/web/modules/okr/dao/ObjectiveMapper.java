package com.ewaytek.edf.web.modules.okr.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;




import com.ewaytek.edf.web.modules.okr.entity.ObjectiveEntity;
import com.ewaytek.edf.web.modules.sys.dao.BaseMapper;

/**
 * 目标表
 *
 * @author å¼ éæ®
 * @email zhangjp@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月22日 下午5:21:24
 */
@Mapper
public interface ObjectiveMapper extends BaseMapper<ObjectiveEntity> {
	    List<ObjectiveEntity> listDepartOKR(Long id);
	    
	    List<ObjectiveEntity> listUserOKR(Long id);
}
