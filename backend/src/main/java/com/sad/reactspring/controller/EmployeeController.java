package com.sad.reactspring.controller;

import com.sad.reactspring.enitity.EmployeeModel;
import com.sad.reactspring.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/employee")
    public EmployeeModel employee(@RequestBody EmployeeModel employeeModel) {
        return employeeService.postEmployee(employeeModel);
    }

    @GetMapping("/employee")
    public List<EmployeeModel> employeeModels() {
        return employeeService.getALlEmployee();
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee with id " + id + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }

    @GetMapping("employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        EmployeeModel employeeModel = employeeService.getEmployeeById(id);
        if (employeeModel == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employeeModel);
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,@RequestBody EmployeeModel employeeModel){
        EmployeeModel updateEmployeeModel = employeeService.updateEmployee(id,employeeModel);

        if (updateEmployeeModel == null) return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updateEmployeeModel);
    }
}
