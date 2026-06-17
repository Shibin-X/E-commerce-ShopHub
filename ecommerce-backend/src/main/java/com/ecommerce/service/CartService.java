package com.ecommerce.service;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, ProductService productService, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.userRepository = userRepository;
    }

    public Cart getCart(String email) {
        User user = getUserByEmail(email);
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(new Cart(user.getId())));
    }

    public Cart addOrUpdateItem(String email, CartItemRequest request) {
        User user = getUserByEmail(email);
        Product product = productService.getProductById(request.getProductId());

        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock for product: " + product.getName());
        }

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> new Cart(user.getId()));

        boolean found = false;
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(product.getId())) {
                item.setQuantity(request.getQuantity());
                item.setPrice(product.getPrice());
                item.setName(product.getName());
                item.setImageUrl(product.getImageUrl());
                found = true;
                break;
            }
        }

        if (!found) {
            cart.getItems().add(new CartItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    request.getQuantity(),
                    product.getImageUrl()
            ));
        }

        return cartRepository.save(cart);
    }

    public Cart removeItem(String email, String productId) {
        User user = getUserByEmail(email);
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        Iterator<CartItem> iterator = cart.getItems().iterator();
        boolean removed = false;
        while (iterator.hasNext()) {
            if (iterator.next().getProductId().equals(productId)) {
                iterator.remove();
                removed = true;
                break;
            }
        }

        if (!removed) {
            throw new ResourceNotFoundException("Item not found in cart");
        }

        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
