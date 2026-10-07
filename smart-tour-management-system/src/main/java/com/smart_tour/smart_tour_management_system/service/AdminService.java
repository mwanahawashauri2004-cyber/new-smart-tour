package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Admin;
import java.util.List;
import java.util.Map;

public interface AdminService {
    Map<String, Object> getDashboardStats();
    List<Admin> getAllAdmins();
    Admin createAdmin(Admin admin);
}

