package com.smart_tour.smart_tour_management_system.repository;

//import com.smart_tourmanagement.tour.management.model.User;
import com.smart_tour.smart_tour_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Inatafuta mtumiaji kwenye database kwa kutumia Email aliyoingiza kwenye fomu
    Optional<User> findByEmail(String email);

    // Inaangalia kama Email ipo tayari kwenye database (kwa ajili ya Register/Sign Up)
    boolean existsByEmail(String email);
}