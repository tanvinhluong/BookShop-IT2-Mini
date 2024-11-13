package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.Promotion;
import com.bookshop.ecommerce.request.CreatePromotionRequest;
import com.bookshop.ecommerce.service.impl.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/promotion")
public class PromotionController {
    @Autowired
    private IPromotionService promotionService;

    @GetMapping("/")
    public ResponseEntity<List<Promotion>> getAllUsersHandler(){
        List<Promotion> promotions= promotionService.getAllPromotions();

        return new ResponseEntity<>(promotions, HttpStatus.ACCEPTED);
    }

    @PostMapping("/create")
    public ResponseEntity<Promotion> createPromotionHandler(@RequestBody CreatePromotionRequest req) {

        Promotion createdPromotion = promotionService.createPromotion(req);

        return new ResponseEntity<>(createdPromotion, HttpStatus.OK);

    }
}
