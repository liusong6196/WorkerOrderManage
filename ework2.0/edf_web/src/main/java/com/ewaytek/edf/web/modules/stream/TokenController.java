package com.ewaytek.edf.web.modules.stream;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.twinkling.stream.config.Configurations;
import cn.twinkling.stream.util.TokenUtil;

/**
 * 文件上传
 *
 * @author shiy
 * @email shiy@bjewaytek.com
 * @url www.bjewaytek.com
 * @date 2017年12月06日 下午5:38:13
 */
@Controller
@RequestMapping("/stream")
public class TokenController extends HttpServlet {

		private static final long serialVersionUID = 2650340991003623753L;
		static final String FILE_NAME_FIELD = "name";
		static final String FILE_SIZE_FIELD = "size";
		static final String TOKEN_FIELD = "token";
		static final String SERVER_FIELD = "server";
		static final String SUCCESS = "success";
		static final String MESSAGE = "message";
		
		
		public void init() throws ServletException {
		}

		@RequestMapping("/tk")
		@ResponseBody
		protected void doGet(HttpServletRequest req, HttpServletResponse resp)
				throws ServletException, IOException {
			String name = req.getParameter(FILE_NAME_FIELD);
			String size = req.getParameter(FILE_SIZE_FIELD);
			String token = TokenUtil.generateToken(name, size);
			
			PrintWriter writer = resp.getWriter();
			
			JSONObject json = new JSONObject();
			try {
				json.put(TOKEN_FIELD, token);
				if (Configurations.isCrossed())
					json.put(SERVER_FIELD, Configurations.getCrossServer());
				json.put(SUCCESS, true);
				json.put(MESSAGE, "");
			} catch (JSONException e) {
			}
			/** TODO: save the token. */
			
			writer.write(json.toString());
		}

		@Override
		protected void doHead(HttpServletRequest req, HttpServletResponse resp)
				throws ServletException, IOException {
			super.doHead(req, resp);
		}

		@Override
		public void destroy() {
			super.destroy();
		}
}
