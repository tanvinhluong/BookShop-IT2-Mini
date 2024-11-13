package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.Promotion;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.repository.CategoryRepository;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.repository.PromotionRepository;
import com.bookshop.ecommerce.repository.SupplierRepository;
import com.bookshop.ecommerce.request.CreatePromotionRequest;
import com.bookshop.ecommerce.service.impl.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionService implements IPromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Promotion createPromotion(CreatePromotionRequest req) {

        Promotion promotion = new Promotion();
        promotion.setPromotionName(req.getPromotionName());
        promotion.setPromotionType(req.getPromotionType());
        promotion.setPromotionCode(String.valueOf(req.getPromotionCode()));
        promotion.setPercentage(req.getPercentage());
        promotion.setStartDate(req.getStartDate());
        promotion.setEndDate(req.getEndDate());

        if (req.getProductId() != null) {
            Product product = productRepository.findById(req.getProductId()).orElseThrow(()
                    -> new IllegalArgumentException("Product not found with id: " + req.getProductId()));
            promotion.setProduct(product);
        }

        if (req.getCategoryId() != null) {
            Category category = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
            promotion.setCategory(category);
        }

        if (req.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(req.getSupplierId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid supplier ID"));
            promotion.setSupplier(supplier);
        }

        return promotionRepository.save(promotion);
    }

    @Override
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

}
