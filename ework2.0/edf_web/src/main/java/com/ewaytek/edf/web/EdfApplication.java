/**
 * EDF Web启动类
 */
package com.ewaytek.edf.web;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * @author 张静普
 * @email  zhangjp@bjewaytek.com	
 * EDF Web启动类
// */
@SpringBootApplication
public class EdfApplication extends SpringBootServletInitializer{
	
	/**
	 *  EDF系统启动入口
	 *  @param args
	 */
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(EdfApplication.class);
        application.setBannerMode(Banner.Mode.OFF);
        application.run(args);
	}
	/**
	 * 重载配置类
	 */
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        application.bannerMode(Banner.Mode.OFF);
        return application.sources(EdfApplication.class);
    }
}
