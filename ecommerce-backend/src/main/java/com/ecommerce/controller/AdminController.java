package com.ecommerce.controller;

import com.ecommerce.dto.AdminStatsResponse;
import com.ecommerce.dto.MonthlyRevenueResponse;
import com.ecommerce.dto.OrderStatusCountResponse;
import com.ecommerce.dto.OrderStatusUpdate;
import com.ecommerce.model.Order;
import com.ecommerce.service.AdminDashboardService;
import com.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminDashboardService adminDashboardService;
    private final OrderService orderService;

    public AdminController(AdminDashboardService adminDashboardService, OrderService orderService) {
        this.adminDashboardService = adminDashboardService;
        this.orderService = orderService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        return ResponseEntity.ok(adminDashboardService.getStats());
    }

    @GetMapping("/charts/revenue")
    public ResponseEntity<List<MonthlyRevenueResponse>> getRevenueChart() {
        return ResponseEntity.ok(adminDashboardService.getMonthlyRevenue());
    }

    @GetMapping("/charts/order-status")
    public ResponseEntity<List<OrderStatusCountResponse>> getOrderStatusChart() {
        return ResponseEntity.ok(adminDashboardService.getOrderStatusCounts());
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @Valid @RequestBody OrderStatusUpdate request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request));
    }
}
