package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.repository.CategoryRepository;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {

    private ProductRepository productRepository;
    private IUserService userService;
    private CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, IUserService userService, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }
    @Override
    public Product createProduct(CreateProductRequest createProductRequest) {
        Product product = new Product();
//        product.setTitle(createProductRequest.getTitle());
//        product.setColor(createProductRequest.getColor());
//        product.setDescription(createProductRequest.getDescription());
//        product.setBrand(createProductRequest.getBrand());
//        product.setDiscountPrice(createProductRequest.getDiscountedPrice());
//        product.setDiscountPersent(createProductRequest.getDiscountPercent());
//        product.setPrice(createProductRequest.getPrice());
//        product.setQuantity(createProductRequest.getQuantity());
//        product.setImageUrl(createProductRequest.getImageUrl());
//        product.setCategory(thirdLevel);
//        product.setCreatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);
        return savedProduct;
    }

    @Override
    public String deleteProduct(Integer productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);
        return "Product deleted sucessfully";
    }

    @Override
    public Product updateProduct(CreateProductRequest createProductRequest, Integer productId) throws ProductException {
        Product product = findProductById(productId);
//        product.setTitle(createProductRequest.getTitle());
//        product.setBrand(createProductRequest.getBrand());
//        product.setPrice(createProductRequest.getPrice());
//        product.setImageUrl(createProductRequest.getImageUrl());
//        if(product.getQuantity() != 0){
//            product.setQuantity(createProductRequest.getQuantity());
//        }
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Integer id) throws ProductException {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return product.get();
        }
        throw new ProductException("Product not found");
    }

    @Override
    public List<Product> findProductByCategory(String category) {

        System.out.println("category --- "+category);

//        List<Product> products = productRepository.findByCategory(category);

        return null;
    }

    @Override
    public List<Product> searchProduct(String query) {
//        List<Product> products=productRepository.searchProduct(query);
        return null;
    }

    @Override
    public Page<Product> getAllProducts(String category, List<String> colors, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
//        List<Product> products = productRepository.filterProducts(category,minPrice,maxPrice,minDiscount,sort);
//        if(!colors.isEmpty()){
//            products = products.stream().filter(product -> colors.stream().anyMatch(color ->color.equalsIgnoreCase(product.getColor()))).collect(Collectors.toList());
//
//        }

//        if(stock != null){
//            if(stock.equalsIgnoreCase("in_stock")){
//                products = products.stream().filter(product -> product.getQuantity() > 0).collect(Collectors.toList());
//            }
//            else if(stock.equalsIgnoreCase("out_of_stock")){
//                products = products.stream().filter(product -> product.getQuantity() == 0).collect(Collectors.toList());
//            }
//        }

//        int startIndex = (int)pageable.getOffset();
//        int endIndex = Math.min(startIndex + pageable.getPageSize(),products.size());
//        List<Product> pageContent = products.subList(startIndex,endIndex);
//        Page<Product> filteredPproducts = new PageImpl<>(pageContent,pageable,products.size());
//        return filteredPproducts;
        return null;
    }
}
