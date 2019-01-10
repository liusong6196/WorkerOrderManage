package com.ewaytek.edf.orm.dialect;

import com.ewaytek.edf.orm.helper.MySql5PageHepler;

/**
 * MySQL数据库方言
 * 
 * @author 张静普
 *
 */
public class MySql5Dialect extends Dialect {

	protected static final String SQL_END_DELIMITER = ";";

	/**
	 * limit sql String
	 */
    @Override
    public String getLimitString(String sql, int offset, int limit) {
        return MySql5PageHepler.getLimitString(sql, offset, limit);
    }

    /**
     * count sql String
     */
    @Override
    public String getCountString(String sql) {
        return MySql5PageHepler.getCountString(sql);
    }

}
