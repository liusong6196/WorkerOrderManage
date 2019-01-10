package com.ewaytek.edf.gen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.boot.Banner;

/**
 * Spring Boot Gen 启动类
 * @author 张静普
 */
@SpringBootApplication
public class EdfApplication extends SpringBootServletInitializer {

	/**
	 * Spring Boot Application
	 * @param args
	 */
	public static void main(String[] args) {
        SpringApplication application = new SpringApplication(EdfApplication.class);
        application.setBannerMode(Banner.Mode.OFF);
        application.run(args);
    }

	/**
	 * 配置重载方法
	 */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        application.bannerMode(Banner.Mode.OFF);
        return application.sources(EdfApplication.class);
    }
}
