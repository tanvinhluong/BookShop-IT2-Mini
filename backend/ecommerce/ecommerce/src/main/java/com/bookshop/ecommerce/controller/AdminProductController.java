package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.response.ApiResponse;
import com.bookshop.ecommerce.service.impl.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {
    @Autowired
    private IProductService productService;


    @PostMapping("/create")
    public ResponseEntity<Product> createProductHandler(@RequestBody CreateProductRequest req) {

        Product createdProduct = productService.createProduct(req);

        return new ResponseEntity<>(createdProduct, HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/{productId}/delete")
    public ResponseEntity<ApiResponse> deleteProductHandler(@PathVariable Integer productId) throws ProductException{

        String msg=productService.deleteProduct(productId);
        ApiResponse res=new ApiResponse(msg,true);

        return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAllProduct(String category, List<String> colors, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize){

        List<Product> products = (List<Product>) productService.getAllProducts(category, colors, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);

        return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
    }

    @PutMapping("/{productId}/update")
    public ResponseEntity<Product> updateProductHandler(@RequestBody CreateProductRequest req,@PathVariable Integer productId) throws ProductException{

        Product updatedProduct=productService.updateProduct(req, productId);

        return new ResponseEntity<Product>(updatedProduct,HttpStatus.OK);
    }

    @PostMapping("/creates")
    public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] reqs) throws ProductException{

        for(CreateProductRequest product:reqs) {
            productService.createProduct(product);
        }

        ApiResponse res=new ApiResponse("products created successfully",true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
    }
}
