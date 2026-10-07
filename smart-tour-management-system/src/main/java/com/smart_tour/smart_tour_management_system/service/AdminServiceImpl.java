package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Admin;
import com.smart_tour.smart_tour_management_system.repository.AdminRepository;
import com.smart_tour.smart_tour_management_system.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAdmins", adminRepository.count());
        return stats;
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}