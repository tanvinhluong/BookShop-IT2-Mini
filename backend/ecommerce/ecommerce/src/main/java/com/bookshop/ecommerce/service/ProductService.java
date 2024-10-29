package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.model.CategoryDetail;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.repository.CategoryDetailRepository;
import com.bookshop.ecommerce.repository.CategoryRepository;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.repository.SupplierRepository;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryDetailRepository categoryDetailRepository;

    public ProductService(ProductRepository productRepository, IUserService userService, CategoryRepository categoryRepository, SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }
    @Override
    public Product createProduct(CreateProductRequest createProductRequest) {
        Product product = new Product();
        Supplier supplier = supplierRepository.findById(createProductRequest.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        product.setProductName(createProductRequest.getProductName());
        product.setProductDescription(createProductRequest.getProductDescription());
        product.setCreatedAt(new Date());
        product.setPrice(createProductRequest.getPrice());
        product.setSupplier(supplier);
        product.setActive(createProductRequest.getIsActive());
        product.setNumRatings(createProductRequest.getNumRate());
        product.setProductImageUrl(createProductRequest.getImageUrl());

        List<CategoryDetail> categoryDetails = new ArrayList<>();
        if (createProductRequest.getCategoryIds() != null) {
            for (Integer categoryId : createProductRequest.getCategoryIds()) {

                Category category = categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Category not found"));
                CategoryDetail categoryDetail = new CategoryDetail();
                categoryDetail.setProduct(product);
                categoryDetail.setCategory(category);
                categoryDetails.add(categoryDetail);

            }
        }
        product.setCategoryDetails(categoryDetails);
        return productRepository.save(product);
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
        product.setProductName(createProductRequest.getProductName());
        product.setProductDescription(createProductRequest.getProductDescription());
        product.setPrice(createProductRequest.getPrice());
        product.setActive(createProductRequest.getIsActive());
        product.setNumRatings(createProductRequest.getNumRate());
        product.setProductImageUrl(createProductRequest.getImageUrl());
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
    public List<Product> findProductByCategory(Integer categoryId) {

        System.out.println("category --- "+ categoryId);

        return productRepository.findProductsByCategoryId(categoryId);
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
