package com.ewaytek.edf.orm.dialect;

import com.ewaytek.edf.orm.helper.PostgrePageHepler;

/**
 * Postgre 数据库 方言
 * 
 * @author 张静普
 */
public class PostgreDialect extends Dialect {

	protected static final String SQL_END_DELIMITER = ";";

    @Override
    public String getLimitString(String sql, int offset, int limit) {
        return PostgrePageHepler.getLimitString(sql, offset, limit);
    }

    @Override
    public String getCountString(String sql) {
        return PostgrePageHepler.getCountString(sql);
    }
    
}
