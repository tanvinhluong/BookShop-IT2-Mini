package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.model.VerificationToken;
import com.bookshop.ecommerce.repository.OrderRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.repository.gmail.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class VerificationService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepo;

    public String createVerificationToken(User user){
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(calculateExpiryDate(60*24));

        tokenRepository.save(verificationToken);
        return token;
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return cal.getTime();
    }

    public String validateVerificationToken(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            tokenRepository.delete(verificationToken);
            return "expired";
        }

        user.setActive(true);
        userRepository.save(user);
        return "valid";
    }

    public String createOrderConfirmationToken(User user, Order order) {
        // Kiểm tra xem có token nào tồn tại cho đơn hàng này không
        VerificationToken existingToken = tokenRepository.findByOrder(order);

        // Nếu đã có token cho đơn hàng này, trả về token cũ
        if (existingToken != null) {
            return existingToken.getToken(); // Trả về token cũ
        }

        // Nếu chưa có token cho đơn hàng này, tạo mới
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setOrder(order);
        verificationToken.setExpiryDate(calculateExpiryDate(60*24*4));

        // Lưu token mới vào cơ sở dữ liệu
        tokenRepository.save(verificationToken);

        return token;
    }


    public String validateOrderConfirmationToken(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            tokenRepository.delete(verificationToken);
            return "expired";
        }

        Order order = verificationToken.getOrder();
        order.setConfirmed(true);
        orderRepo.save(order);
        return "valid";
    }

    public String createOrderCancellationToken(User user, Order order) {
        // Kiểm tra xem có token nào tồn tại cho đơn hàng này không
        VerificationToken existingToken = tokenRepository.findByOrder(order);

        // Nếu đã có token cho đơn hàng này, trả về token cũ
        if (existingToken != null) {
            return existingToken.getToken();
        }

        // Nếu chưa có token cho đơn hàng này, tạo mới
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setOrder(order);
        verificationToken.setExpiryDate(calculateExpiryDate(60 * 24 * 4)); // Token hết hạn sau 4 ngày

        // Lưu token mới vào cơ sở dữ liệu
        tokenRepository.save(verificationToken);

        return token;
    }

    public String validateOrderCancellationToken(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        Calendar cal = Calendar.getInstance();

        // Kiểm tra xem token đã hết hạn hay chưa
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            tokenRepository.delete(verificationToken);
            return "expired";
        }

        // Lấy thông tin đơn hàng từ token
        Order order = verificationToken.getOrder();
        order.setOrderStatus(5);
        orderRepo.save(order);

        tokenRepository.delete(verificationToken); // Xóa token sau khi sử dụng
        return "valid";
    }

}
