package com.ewaytek.edf.web.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtils {
	
	public static String dateToDatetime(String date) {
		return date + " 00:00:00";
	}
	
	public static long getTimeStamp10(){
		return new Date().getTime() / 1000;
	}
	
	public static Date DateParse(String date) {
		Date d = null;
		try {
			d = new SimpleDateFormat("yyyy-MM-dd").parse(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return d;
	}
	
	
	public static Date DateFormatfromDate(Date date) {
		Date backdate = new Date();
		try {
			SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			backdate = dft.parse(dft.format(date));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return backdate;
	}
	
	/**
	 * 获取默认格式（yyyy-MM-dd HH:mm:ss）的系统时间
	 * @return
	 */
	public static String getDefaultTime(){
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
	}
	
	/**
	 * 获取指定格式的当前系统时间
	 * @param format
	 * @return
	 */
	public static String getDefaultTime(String format){
		return new SimpleDateFormat(format).format(new Date());
	}
	
	/**
	 * 当前月份向前（-）、向后（+）移动指定月份
	 * @param month
	 * @return
	 */
	public static String addMonth(int month){
		Calendar now = Calendar.getInstance();
		now.setTime(new Date());
		now.add(Calendar.MONTH, month);
		
		return new SimpleDateFormat("yyyy-MM").format(now.getTime());
	}
	
	/**
	 * 获取当前月的上一个月份
	 * @return
	 */
	public static String getPreviousMonth(){
		return addMonth(-1);
	}
	
	/**
	 * 获取当前月份的下一个月
	 * @return
	 */
	public static String getNextMonth(){
		return addMonth(1);
	}
	
	public static Calendar addDate(int day){
		 Calendar now = Calendar.getInstance();
		 return addDate(now,day);
		  
	}
	
	public static Calendar addDate(Calendar c,int day){
	    c.add(Calendar.DATE, day);
	    return c;
	}
	
	public Calendar addDate(String date,String fromat,int day){
		try {
			Date d = new SimpleDateFormat(fromat).parse(date);
			Calendar c = Calendar.getInstance();
			c.setTime(d);
			return addDate(c,day);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Calendar addDate(String date,int day){
		return addDate(date,"yyyy-MM-dd HH:mm:ss",day);
	}
	
	public String getDateStr(String format){
		return getDateStr(format,new Date());
	}
	
	public String getDateStr(String format,Date d){
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(d);
	}
	
	public String getTimeDfifference(Date bengin,Date end){
		long benginTime = bengin.getTime();
		long endTIme = end.getTime();
		
		long dfifference = Math.abs(benginTime - endTIme);
		
		String result = dfifference / (24 * 60 * 60 * 1000) + "天";
		
		dfifference = dfifference % (24 * 60 * 60 * 1000);
		
		result += (dfifference / (1000 * 60 * 60)) + "时";//计算小时数;
		
		dfifference = dfifference % (1000 * 60 * 60);
		
		result += (dfifference / (1000 * 60)) + "分";
		
		return result;
		
		/*String result = (dfifference / (1000 * 60 *60)) + "时";//计算小时数;
		
		if(dfifference % (1000 * 60 *60) == 0){
			result += "时00分";
		}else{
			result += ((dfifference % (1000 * 60 *60)) / (1000 * 60)) + "分";
		}
		return result;*/
	}
	/**
     * 获取开始月—结束月区间的所有月份（包括开始月和结束月）
     * @param begin "2014-03"
     * @param end "2015-03"
     * @return
     */
    public static List<String> getMonthRange(String begin, String end){
    	try {
	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	    	
	    	Calendar beginTime = Calendar.getInstance();
			beginTime.setTime(sdf.parse(begin));
			
			Calendar endTime = Calendar.getInstance();
			endTime.setTime(sdf.parse(end));
			
			List<String> resultList = new ArrayList<String>();
			
			while(beginTime.before(endTime) || beginTime.compareTo(endTime) == 0){
				resultList.add(sdf.format(beginTime.getTime()));
				beginTime.add(Calendar.MONTH, 1);
			}
			
			return resultList;
		} catch (ParseException e) {
			e.printStackTrace();
			
			return null;
		}
    }
    
    public static List<String> getYearRange(String begin, String end){
    	try {
	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
	    	
	    	Calendar beginTime = Calendar.getInstance();
			beginTime.setTime(sdf.parse(begin));
			
			Calendar endTime = Calendar.getInstance();
			endTime.setTime(sdf.parse(end));
			
			List<String> resultList = new ArrayList<String>();
			
			while(beginTime.before(endTime) || beginTime.compareTo(endTime) == 0){
				resultList.add(sdf.format(beginTime.getTime()));
				beginTime.add(Calendar.YEAR, 1);
			}
			
			return resultList;
		} catch (ParseException e) {
			e.printStackTrace();
			
			return null;
		}
    }
	public String getTimeDfifference(String begin,String end,String format){
		if(begin == null || begin.trim().equals("") || end == null || end.trim().equals("")){
			return "";
		}
		try{
			Date b = new SimpleDateFormat(format).parse(begin);
			
			Date e = new SimpleDateFormat(format).parse(end);
			return getTimeDfifference(b,e);
		}catch(Exception e){
			e.printStackTrace();
			return "";
		}
		
	}
	
    public static long getDaySub(String beginDateStr,String endDateStr){
        long day=0;
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");    
        java.util.Date beginDate;
        java.util.Date endDate;
        try{
            beginDate = format.parse(beginDateStr);
            endDate= format.parse(endDateStr);    
            day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);    
            //System.out.println("相隔的天数="+day);   
        } catch (ParseException e){
            e.printStackTrace();
        }   
        return day;
    }
    
    /**
     * endDateStr - beginDateStr
     * @param beginDateStr
     * @param endDateStr
     * @return
     */
    public static long getMonthSub(String beginDateStr,String endDateStr){
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM");    
        
        try{
        	 Calendar beginDate = Calendar.getInstance();
             beginDate.setTime(format.parse(beginDateStr));
             
             //int beginDate_year = beginDate.get(Calendar.YEAR);
             //int beginDate_Month = beginDate.get(Calendar.MONTH);
             
             Calendar endDate = Calendar.getInstance();
             endDate.setTime(format.parse(endDateStr));
             
             return getMonthSub(beginDate, endDate);
             /*int endDate_year = endDate.get(Calendar.YEAR);
             int endDate_Month = endDate.get(Calendar.MONTH);
            
             int month = (endDate_year - beginDate_year ) * 12 + ( endDate_Month - beginDate_Month );
            
             return Math.abs(month);*/
        } catch (ParseException e){
            e.printStackTrace();
            
            return 0;
        }   
    }
    
    /**
     * endDateStr - beginDateStr
     * @param beginDate
     * @param endDateStr
     * @return
     */
    public static long getMonthSub( Calendar beginDate, Calendar endDateStr  ){
    	
    	  int iDay=( endDateStr.get(java.util.Calendar.YEAR)-beginDate.get(java.util.Calendar.YEAR))*12 + (endDateStr.get(java.util.Calendar.MONTH) - beginDate.get(java.util.Calendar.MONTH));
          //int mod = endDateStr.get(java.util.Calendar.DATE)-beginDate.get(java.util.Calendar.DATE);
          //iDay+=(mod>=0?0:-1);
          return iDay;

    }
    
    /**
     * 获取指定时间与当前系统时间的差
     * @param timeStr
     * @return
     */
    public static long getMilliSub(String timeStr){
    	try {
			Date target = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timeStr);
			
			return Math.abs(new Date().getTime() - target.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			
			return 0;
		} 
    	
    }
    
    /**
     * true:未过期；false：过期
     */
    public static boolean checkExpired(String targetDateStr, String formatStr){
    	  if(targetDateStr == null || targetDateStr.trim().equals("")){
    		  return true;
    	  }
    	
    	  java.text.SimpleDateFormat format = new java.text.SimpleDateFormat(formatStr);    
          Date targetDate;
          Date currentDate;
          try{
        	  targetDate = format.parse(targetDateStr);
              currentDate = new Date();;    
              
              if(targetDate.getTime() > currentDate.getTime()){
            	  return true;
              }
              
              return false;
          } catch (ParseException e){
              e.printStackTrace();
              return false;
          }   
    }
    
    /**
     * 检测当前时间是否在某个时间段内
     * 0：进行中；1：未开始；2：已结束
     */
    public static int checkExpired(String beginDateStr, String endDateStr, String formatStr){
    	
    	  SimpleDateFormat format = new SimpleDateFormat(formatStr);    
          Date beginDate;
          Date endDate;
          Date currentDate;
          try{
        	  beginDate = format.parse(beginDateStr);
        	  endDate = format.parse(endDateStr);
              currentDate = new Date();;    
              
              if(beginDate.getTime() > currentDate.getTime()){//未开始
            	  return 1;
              }
              
              if(currentDate.getTime() > endDate.getTime()){
            	  return 2;
              }
              
              return 0;
          } catch (ParseException e){
              e.printStackTrace();
              return 1;
          }   
    }
    
    /**
     * 获取指定日期当前月最大多少天
     * @param c
     * @return
     */
    public static int getMaxDays(Calendar c){
    	Calendar temp = Calendar.getInstance();
    	temp.setTime(c.getTime());
    	temp.set(Calendar.DATE, 1);
    	temp.roll(Calendar.DATE, -1);
    	
    	int maxDate = temp.get(Calendar.DATE);
    	return maxDate;


    }
    
    /**
     * 功能：根据传进来的日期 和要增加的月份 返回增加结果
     */
    public static String addDateForMonth(String nowDate,String addMonth){
    	SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
    	Calendar temp = Calendar.getInstance();
    	try {
        	temp.setTime(sf.parse(nowDate));
        	temp.add(Calendar.MONTH, Integer.parseInt(addMonth));
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return sf.format(temp.getTime());
    }
    
    public static String getMoment(Calendar calendar){
    	int hours = calendar.get(Calendar.HOUR_OF_DAY);
    	int minute = calendar.get(Calendar.MINUTE);
    	String ret = "";
    	if(hours <= 9 && minute <= 30){
    		ret = "早上";
    	}else if(hours >= 9 && hours <= 11){
    		ret = "上午";
    	}else if(hours >= 12 && hours <= 13){
    		ret = "中午";
    	}else if(hours >= 14 && hours <= 18){
    		ret = "下午";
    	}else{
    		ret = "晚上";
    	}
    	
    	return ret;
    }
    
    public static String getMSGTime(String time){
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm:ss");
    	SimpleDateFormat sdf3 = new SimpleDateFormat("M月d日 HH:mm");
    	String ret = "";
    	Calendar calendar = Calendar.getInstance();
    	try {
			Date date = sdf.parse(time);
			calendar.setTime(date);
			if(getDaySub(time, getDefaultTime()) == 0){//今日
				ret = getMoment(calendar) + " " + sdf2.format(date);
			}else if(getDaySub(time, getDefaultTime()) == 1){//昨日
				ret = "昨日 " + sdf2.format(date);
			}else if(getDaySub(time, getDefaultTime()) == -1){//昨日
				ret = "明日 " + sdf2.format(date);
			}else{
				ret = sdf3.format(date);;
			}
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	
    	return ret;
    	
    }
    
    public static void main(String[] args) {
    	//System.out.println(DateUtils.addDateForMonth("2014-11-18", "6"));
    	
    	//System.out.println("123123");
    	//DateUtils d = new DateUtils();
		/*Calendar c = d.addDate(3);*/
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//System.out.println(new DateUtils().getTimeDfifference("2012-03-11 09:47:53","2012-03-09 09:45:42","yyyy-MM-dd HH:mm:ss"));
		//System.out.println(sdf.format(d.addDate("2012-03-09 09:45:42", 1).getTime()));
		/*System.out.println(DateUtils.getDaySub("2013-11-16","2013-11-13"));
		System.out.println(new DateUtils().getTimeDfifference("2013-10-10 09:19:10", "2013-10-12 23:18:17","yyyy-MM-dd HH:mm:ss"));
		System.out.println(DateUtils.checkExpired("2012-10-12 23:18:17", "yyyy-MM-dd HH:mm:ss"));*/
		
		//System.out.println(DateUtils.getDaySub("2013-11-28 23:59:59", "2013-11-28 17:59:44"));
		//System.out.println(DateUtils.getDaySub("2014-02-28 23:59:59", "2013-11-29 10:10:22"));
		//System.out.println(DateUtils.getDaySub("2014-05-28 23:59:59", "2013-11-29 14:34:26"));
		//System.out.println(DateUtils.getDaySub("2014-07-28 23:59:59", "2013-11-29 14:34:26"));
		
		
		//System.out.println("----------------------------------");
		//System.out.println("month sub:" + getMonthSub("2014-10-12","2014-11-16"));
	}
	
	
	
}
