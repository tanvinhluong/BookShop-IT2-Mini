package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.config.JwtProvider;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.request.LoginRequest;
import com.bookshop.ecommerce.response.AuthResponse;
import com.bookshop.ecommerce.service.CustomUserService;
import com.bookshop.ecommerce.service.EmailService;
import com.bookshop.ecommerce.service.VerificationService;
import com.bookshop.ecommerce.service.impl.ICartService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserService customUserService;
    @Autowired
    private ICartService cartService;

    @Autowired
    private VerificationService verifyService;

    @Autowired
    private EmailService emailService;



    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException, MessagingException {
            String email = user.getEmail();
            String password = user.getPassword();
            String firstName = user.getFirstName();
            String lastName = user.getLastName();
            String mobile = user.getMobile();

        User isEmailExists = userRepo.findByEmail(email);
        if(isEmailExists != null){
            throw new UserException("Email already exists");
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setCreatedAt(new Date());
        newUser.setDefault_address_id(0);
        newUser.setMobile("0");
        newUser.setActive(false);
        User savedUser = userRepo.save(newUser);

        String verifyMailToken = verifyService.createVerificationToken(savedUser);
        emailService.sendVerificationEmail(savedUser, verifyMailToken);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("User created successfully");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Authentication authentication = authenticate(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Sign in successfully");
        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }

    private Authentication authenticate(String email, String password){
        UserDetails userDetails = customUserService.loadUserByUsername(email);
        if(userDetails == null){
            throw new BadCredentialsException("incorrect email");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("incorrect password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

    @PostMapping("/genToken")
    public ResponseEntity<String> generateToken() {
        // Authenticate user
        Authentication authencation = new UsernamePasswordAuthenticationToken(" ", " ");
        String token = jwtProvider.generateToken(authencation);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        String result = verifyService.validateVerificationToken(token);
        String template;
        HttpStatus status = HttpStatus.OK;

        switch (result) {
            case "valid":
                template = "verification/success";
                break;
            case "invalid":
                template = "verification/invalid";
                status = HttpStatus.BAD_REQUEST;
                break;
            default:
                template = "verification/expired";
                status = HttpStatus.BAD_REQUEST;
                break;
        }
        String htmlContent;
        try {
            Resource resource = new ClassPathResource("templates/" + template + ".html");
            htmlContent = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_HTML)
                    .body("<h1>Internal Server Error</h1>");
        }

        return ResponseEntity.status(status)
                .contentType(MediaType.TEXT_HTML)
                .body(htmlContent);

    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationToken(@RequestParam("email") String email) throws UserException, MessagingException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UserException("Email không tồn tại trong hệ thống");
        }

        if (user.getActive()) {
            throw new UserException("Tài khoản đã được kích hoạt");
        }

        // Tạo token mới và gửi lại email
        String newToken = verifyService.createVerificationToken(user);
        emailService.sendVerificationEmail(user, newToken);

        return new ResponseEntity<>("Email kích hoạt đã được gửi lại", HttpStatus.OK);
    }

}
