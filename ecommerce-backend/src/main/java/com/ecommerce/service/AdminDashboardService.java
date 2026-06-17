package com.ecommerce.service;

import com.ecommerce.dto.AdminStatsResponse;
import com.ecommerce.dto.MonthlyRevenueResponse;
import com.ecommerce.dto.OrderStatusCountResponse;
import com.ecommerce.model.OrderStatus;
import com.ecommerce.model.Role;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.UserRepository;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class AdminDashboardService {

    private static final String[] MONTH_LABELS = {
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };

    private final ProductService productService;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    public AdminDashboardService(
            ProductService productService,
            OrderRepository orderRepository,
            UserRepository userRepository,
            MongoTemplate mongoTemplate) {
        this.productService = productService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public AdminStatsResponse getStats() {
        long totalProducts = productService.countProducts();
        long totalOrders = orderRepository.count();
        long customers = userRepository.countByRole(Role.CUSTOMER);

        Aggregation aggregation = newAggregation(
                match(Criteria.where("status").ne(OrderStatus.CANCELLED.name())),
                group().sum("totalAmount").as("revenue")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(
                aggregation, "orders", Document.class);

        double revenue = 0;
        Document result = results.getUniqueMappedResult();
        if (result != null && result.get("revenue") != null) {
            revenue = result.getDouble("revenue");
        }

        return new AdminStatsResponse(totalProducts, totalOrders, revenue, customers);
    }

    public List<MonthlyRevenueResponse> getMonthlyRevenue() {
        Aggregation aggregation = newAggregation(
                match(Criteria.where("status").ne(OrderStatus.CANCELLED.name())),
                project()
                        .and("totalAmount").as("totalAmount")
                        .andExpression("month(createdAt)").as("month")
                        .andExpression("year(createdAt)").as("year"),
                group("month", "year").sum("totalAmount").as("revenue"),
                sort(org.springframework.data.domain.Sort.Direction.ASC, "year", "month")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(
                aggregation, "orders", Document.class);

        Map<String, Double> revenueByMonth = new LinkedHashMap<>();
        for (Document doc : results.getMappedResults()) {
            Document id = (Document) doc.get("_id");
            int month = id.getInteger("month");
            int year = id.getInteger("year");
            String label = MONTH_LABELS[month - 1] + " " + year;
            revenueByMonth.put(label, doc.getDouble("revenue"));
        }

        List<MonthlyRevenueResponse> response = new ArrayList<>();
        for (Map.Entry<String, Double> entry : revenueByMonth.entrySet()) {
            response.add(new MonthlyRevenueResponse(entry.getKey(), entry.getValue()));
        }

        if (response.isEmpty()) {
            String currentMonth = MONTH_LABELS[LocalDate.now().getMonthValue() - 1];
            response.add(new MonthlyRevenueResponse(currentMonth, 0));
        }

        return response;
    }

    public List<OrderStatusCountResponse> getOrderStatusCounts() {
        Aggregation aggregation = newAggregation(
                group("status").count().as("count")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(
                aggregation, "orders", Document.class);

        List<OrderStatusCountResponse> response = new ArrayList<>();
        for (Document doc : results.getMappedResults()) {
            String statusStr = doc.getString("_id");
            if (statusStr == null && doc.get("_id") instanceof Document idDoc) {
                statusStr = idDoc.getString("status");
            }
            if (statusStr != null) {
                OrderStatus status = OrderStatus.valueOf(statusStr);
                long count = doc.getInteger("count");
                response.add(new OrderStatusCountResponse(status, count));
            }
        }

        for (OrderStatus status : OrderStatus.values()) {
            boolean exists = response.stream().anyMatch(r -> r.getStatus() == status);
            if (!exists) {
                response.add(new OrderStatusCountResponse(status, 0));
            }
        }

        return response;
    }
}
