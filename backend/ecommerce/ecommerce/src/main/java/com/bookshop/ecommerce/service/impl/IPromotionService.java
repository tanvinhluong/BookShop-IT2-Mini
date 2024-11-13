package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.Promotion;
import com.bookshop.ecommerce.request.CreatePromotionRequest;

import java.util.List;

public interface IPromotionService {
    Promotion createPromotion(CreatePromotionRequest req);
    List<Promotion> getAllPromotions();
}
