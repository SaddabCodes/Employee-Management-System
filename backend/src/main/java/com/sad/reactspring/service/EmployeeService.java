package com.sad.reactspring.service;

import com.sad.reactspring.enitity.EmployeeModel;
import com.sad.reactspring.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Data
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeModel postEmployee(EmployeeModel employeeModel) {
        return employeeRepository.save(employeeModel);
    }

    public List<EmployeeModel> getALlEmployee() {
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee with " + id + " not found");
        }
        employeeRepository.deleteById(id);
    }

    public EmployeeModel getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public EmployeeModel updateEmployee(Long id, EmployeeModel employeeModel) {
        Optional<EmployeeModel> optionalEmployeeModel = employeeRepository.findById(id);
        if (optionalEmployeeModel.isPresent()) {
            EmployeeModel existingEmployeeModel = optionalEmployeeModel.get();

            existingEmployeeModel.setEmail(employeeModel.getEmail());
            existingEmployeeModel.setName(employeeModel.getName());
            existingEmployeeModel.setPhone(employeeModel.getPhone());
            existingEmployeeModel.setDepartment(employeeModel.getDepartment());

            return employeeRepository.save(existingEmployeeModel);

        }
        return  null;
    }

}
