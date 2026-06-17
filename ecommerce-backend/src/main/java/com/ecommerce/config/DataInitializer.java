package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User admin = new User(
                "Admin User",
                "admin@shop.com",
                passwordEncoder.encode("admin123"),
                Role.ADMIN
        );
        admin.setCreatedAt(Instant.now());
        userRepository.save(admin);

        List<Product> products = List.of(
                new Product(
                        "Wireless Bluetooth Headphones",
                        "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
                        2999.99,
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                        "Electronics",
                        50
                ),
                new Product(
                        "Smart Watch Pro",
                        "Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.",
                        8999.00,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                        "Electronics",
                        30
                ),
                new Product(
                        "USB-C Laptop Charger",
                        "65W fast charging adapter compatible with most USB-C laptops and devices.",
                        1499.50,
                        "https://images.unsplash.com/photo-1591290619762-d2b1a0a4d0a0?w=400",
                        "Electronics",
                        100
                ),
                new Product(
                        "Mechanical Keyboard",
                        "RGB backlit mechanical keyboard with Cherry MX switches for gaming and typing.",
                        5499.00,
                        "https://images.unsplash.com/photo-1511467687858-23d96c4e0a11?w=400",
                        "Electronics",
                        25
                ),
                new Product(
                        "Classic Cotton T-Shirt",
                        "Comfortable 100% cotton crew neck t-shirt available in multiple colors.",
                        799.00,
                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                        "Clothing",
                        200
                ),
                new Product(
                        "Denim Jeans",
                        "Slim-fit stretch denim jeans with classic five-pocket styling.",
                        1999.00,
                        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
                        "Clothing",
                        75
                ),
                new Product(
                        "Running Sneakers",
                        "Lightweight breathable running shoes with cushioned sole for all-day comfort.",
                        3499.00,
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                        "Clothing",
                        60
                ),
                new Product(
                        "Leather Wallet",
                        "Genuine leather bifold wallet with RFID blocking and multiple card slots.",
                        1299.00,
                        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
                        "Accessories",
                        40
                ),
                new Product(
                        "Stainless Steel Water Bottle",
                        "Insulated 1L water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
                        999.00,
                        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
                        "Accessories",
                        150
                ),
                new Product(
                        "Ceramic Coffee Mug Set",
                        "Set of 4 handcrafted ceramic mugs, microwave and dishwasher safe.",
                        1499.00,
                        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
                        "Home",
                        80
                ),
                new Product(
                        "Desk Lamp LED",
                        "Adjustable LED desk lamp with touch controls and three brightness levels.",
                        2199.00,
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
                        "Home",
                        45
                ),
                new Product(
                        "Yoga Mat",
                        "Non-slip eco-friendly yoga mat with carrying strap, 6mm thick cushioning.",
                        1799.00,
                        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
                        "Sports",
                        90
                )
        );

        productRepository.saveAll(products);
    }
}
