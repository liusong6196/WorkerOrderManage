package com.ewaytek.edf.web.config;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebappConfig extends WebMvcConfigurerAdapter  {

	/**
	 * addResourceHandlers
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String filepath = new File("").getAbsolutePath();
		registry.addResourceHandler("/upload/**").addResourceLocations("file:" + filepath + "/upload/");
		super.addResourceHandlers(registry);
	}
}
