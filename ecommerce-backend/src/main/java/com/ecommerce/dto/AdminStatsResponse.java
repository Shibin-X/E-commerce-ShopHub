package com.ecommerce.dto;

public class AdminStatsResponse {

    private long totalProducts;
    private long totalOrders;
    private double revenue;
    private long customers;

    public AdminStatsResponse() {
    }

    public AdminStatsResponse(long totalProducts, long totalOrders, double revenue, long customers) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.revenue = revenue;
        this.customers = customers;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public long getCustomers() {
        return customers;
    }

    public void setCustomers(long customers) {
        this.customers = customers;
    }
}
