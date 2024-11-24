package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(User user, String token) throws MessagingException {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(user.getEmail());
//        message.setSubject("Xác nhận đăng ký tài khoản");
//        message.setText("Để kích hoạt tài khoản, vui lòng click vào link sau: "
//                + "http://localhost:5454/auth/verify?token=" + token);
//
//        mailSender.send(message);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String htmlMsg = createEmailTemplate(user.getFirstName(), token);

        helper.setText(htmlMsg, true); // true = isHtml
        helper.setTo(user.getEmail());
        helper.setSubject("Book Store - Xác nhận đăng ký tài khoản");
        try {
            helper.setFrom("noreply@bookstore.com", "Book Store"); // Tên hiển thị thay vì email
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(mimeMessage);
    }

    private String createEmailTemplate(String firstName, String token) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "    .email-container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }"
                + "    .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }"
                + "    .content { padding: 20px; background-color: #f8f9fa; }"
                + "    .button { display: inline-block; padding: 10px 20px; background-color: #3498db; "
                + "              color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }"
                + "    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='email-container'>"
                + "    <div class='header'>"
                + "        <h1>Book Store</h1>"
                + "    </div>"
                + "    <div class='content'>"
                + "        <h2>Xin chào " + firstName + ",</h2>"
                + "        <p>Cảm ơn bạn đã đăng ký tài khoản tại Book Store.</p>"
                + "        <p>Để hoàn tất quá trình đăng ký, vui lòng click vào nút bên dưới để kích hoạt tài khoản của bạn:</p>"
                + "        <div style='text-align: center;'>"
                + "            <a href='http://localhost:5454/auth/verify?token=" + token + "' class='button'"
                + "               style='color: white;'>Kích hoạt tài khoản</a>"
                + "        </div>"
                + "        <p>Hoặc bạn có thể copy đường link sau và dán vào trình duyệt:</p>"
                + "        <p style='word-break: break-all;'>"
                + "            <small>http://localhost:5454/auth/verify?token=" + token + "</small>"
                + "        </p>"
                + "        <p>Link kích hoạt này sẽ hết hạn sau 24 giờ.</p>"
                + "        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>"
                + "    </div>"
                + "    <div class='footer'>"
                + "        <p>Email này được gửi tự động, vui lòng không trả lời.</p>"
                + "        <p>© 2024 Book Store. All rights reserved.</p>"
                + "        <p>97 Man Thiện, phường Hiệp Phú, Thành phố Thủ Đức, TP. Hồ Chí Minh</p>"
                + "    </div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}
