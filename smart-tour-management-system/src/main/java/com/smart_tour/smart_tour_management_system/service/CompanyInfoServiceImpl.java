package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.CompanyInfo;
import com.smart_tour.smart_tour_management_system.repository.CompanyInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyInfoServiceImpl implements CompanyInfoService {

    private final CompanyInfoRepository companyInfoRepository;

    public CompanyInfoServiceImpl(CompanyInfoRepository companyInfoRepository) {
        this.companyInfoRepository = companyInfoRepository;
    }

    @Override
    public CompanyInfo getCompanyInfo() {
        List<CompanyInfo> infoList = companyInfoRepository.findAll();
        return infoList.isEmpty() ? null : infoList.get(0);
    }

    @Override
    public CompanyInfo saveCompanyInfo(CompanyInfo contact) {
        return null;
    }
}