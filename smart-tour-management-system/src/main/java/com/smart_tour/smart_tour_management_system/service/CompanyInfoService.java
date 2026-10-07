package com.smart_tour.smart_tour_management_system.service;


import com.smart_tour.smart_tour_management_system.model.CompanyInfo;

public interface CompanyInfoService {
    CompanyInfo getCompanyInfo();
    CompanyInfo saveCompanyInfo(CompanyInfo contact);
}