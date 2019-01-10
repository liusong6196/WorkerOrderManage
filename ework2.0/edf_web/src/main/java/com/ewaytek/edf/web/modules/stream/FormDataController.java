package com.ewaytek.edf.web.modules.stream;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.twinkling.stream.util.IoUtil;

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
public class FormDataController extends HttpServlet {

	    private static final long serialVersionUID = -1905516389350395696L;
	    static final String FILE_FIELD = "file";
	    /**
	     * when the has read to 10M, then flush it to the hard-disk.
	     */
	    public static final int BUFFER_LENGTH = 1024 * 1024 * 10;
	    static final int MAX_FILE_SIZE = 1024 * 1024 * 100;

	    static final String START_FIELD = "start";
	    static final String FILE_NAME_FIELD = "name";
		static final String FILE_SIZE_FIELD = "size";
		static final String TOKEN_FIELD = "token";
		static final String SERVER_FIELD = "server";
		static final String SUCCESS = "success";
		static final String MESSAGE = "message";
		
		
	    public void init() throws ServletException {
	    }

	    @RequestMapping("/fd")
		@ResponseBody
	    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	            throws ServletException, IOException {
	        doOptions(req, resp);

	        /** flash @ windows bug */
	        req.setCharacterEncoding("utf8");

	        final PrintWriter writer = resp.getWriter();
	        // Check that we have a file upload request
	        boolean isMultipart = ServletFileUpload.isMultipartContent(req);
	        if (!isMultipart) {
	            writer.println("ERROR: It's not Multipart form.");
	            return;
	        }
	        JSONObject json = new JSONObject();
	        long start = 0;
	        boolean success = true;
	        String message = "";

	        ServletFileUpload upload = new ServletFileUpload();
	        InputStream in = null;
	        String token = null;
	        try {
	            String filename = null;
	            FileItemIterator iter = upload.getItemIterator(req);
	            while (iter.hasNext()) {
	                FileItemStream item = iter.next();
	                String name = item.getFieldName();
	                in = item.openStream();
	                if (item.isFormField()) {
	                    String value = Streams.asString(in);
	                    if (TOKEN_FIELD.equals(name)) {
	                        token = value;
	                        /** TODO: validate your token. */
	                    }
	                    System.out.println(name + ":" + value);
	                } else {
	                    if (token == null || token.trim().length() < 1)
	                        token = req.getParameter(TOKEN_FIELD);
	                    /** TODO: validate your token. */

	                    // 这里不能保证token能有值
	                    filename = item.getName();
	                    if (token == null || token.trim().length() < 1)
	                        token = filename;

	                    start = IoUtil.streaming(in, token, filename);
	                }
	            }

	            System.out.println("Form Saved : " + filename);
	        } catch (FileUploadException fne) {
	            success = false;
	            message = "Error: " + fne.getLocalizedMessage();
	        } finally {
	            try {
	                if (success)
	                    json.put(START_FIELD, start);
	                json.put(SUCCESS, success);
	                json.put(MESSAGE, message);
	            } catch (JSONException e) {
	            }

	            writer.write(json.toString());
	            IoUtil.close(in);
	            IoUtil.close(writer);
	        }
	    }

	    @Override
	    public void destroy() {
	        super.destroy();
	    }
	}
