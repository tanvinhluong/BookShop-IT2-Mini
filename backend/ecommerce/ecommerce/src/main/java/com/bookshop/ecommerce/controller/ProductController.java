package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.service.impl.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(
            @RequestParam String category,
            @RequestParam List<String> color,
            @RequestParam Integer minPrice,
            @RequestParam Integer maxPrice,
            @RequestParam Integer minDiscount,
            @RequestParam String sort,
            @RequestParam String stock,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ){
        Page<Product> res = productService.getAllProducts(category, color, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }


    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Integer productId) throws ProductException {
        Product res = productService.findProductById(productId);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProductHandler(@RequestParam String q){

        List<Product> products=productService.searchProduct(q);

        return new ResponseEntity<>(products, HttpStatus.OK);

    }

    @GetMapping("/products/searchByParentCategory")
    public ResponseEntity<List<Product>> searchByParentCategoryHandler(@RequestParam String category, @RequestParam String parentCategory)
    {

//        List<Product> products=productService.findProductByParentCategory(category,parentCategory);

        return new ResponseEntity<>(null, HttpStatus.OK);

    }

    @GetMapping("/categories/{categoryId}/products")
    public ResponseEntity<List<Product>> getProductsByCategoryId(@PathVariable Integer categoryId) {
        List<Product> products = productService.findProductByCategory(categoryId);
        if (products.isEmpty()) {
            String message = "No products found for category id: " + categoryId;
            System.out.println(message);
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(products);
    }


}
