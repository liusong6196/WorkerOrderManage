package com.ewaytek.edf.orm.dialect;

import com.ewaytek.edf.orm.helper.MSPageHepler;

/**
 * MSSQL 数据库方言
 * 
 * @author 张静普
 */
public class MSDialect extends Dialect {

	protected static final String SQL_END_DELIMITER = ";";

	/**
	 * 获取limit的SQL语句
	 */
    @Override
    public String getLimitString(String sql, int offset, int limit) {
        return MSPageHepler.getLimitString(sql, offset, limit);
    }

    /**
	 * 获取count的SQL语句
	 */
    @Override
    public String getCountString(String sql) {
        return MSPageHepler.getCountString(sql);
    }

}
