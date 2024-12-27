---
title: Spring Thymeleaf
weight: 6
type: docs
---

## Overview

### Placement

In Spring Boot, your Thymeleaf template files go in `src/main/resources/templates`. And for web apps, Thymeleaf templates have an `.html` extension.

### Example

Given the following controller:

```java
@Controller
public class DemoController {

	// create a mapping for "/hello"
	@GetMapping("/hello")
	public String sayHello(Model theModel) {

		theModel.addAttribute("theDate", new java.util.Date());

		return "helloworld";
	}
}
```

We create the corresponding template `helloworld.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <title>Thymeleaf Demo</title>
  </head>
  <!-- We obtain the date from the model -->
  <body>
    <p th:text="'Time on the server is ' + ${theDate}" />
  </body>
</html>
```

To add styles, we create a `css` files in `src/main/resources/static/css`, and then we reference the styles:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <title>Thymeleaf Demo</title>
    <!-- reference CSS file -->
    <link rel="stylesheet" th:href="@{/css/demo.css}" />
  </head>
  <body>
    <p th:text="'Time on the server is ' + ${theDate}" class="funny" />
  </body>
</html>
```

## Tables in Thymeleaf

### Controller

We create a controller for `Employee`, to list and add employees.

```java
package com.springboot.thymeleafdemo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.thymeleafdemo.model.Employee;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

	// load employee data

	private List<Employee> theEmployees;

	@PostConstruct
	private void loadData() {

		// create employees
		Employee emp1 = new Employee(1, "Leslie", "Andrews", "leslie@luv2code.com");
		Employee emp2 = new Employee(2, "Emma", "Baumgarten", "emma@luv2code.com");
		Employee emp3 = new Employee(3, "Avani", "Gupta", "avani@luv2code.com");

		// create the list
		theEmployees = new ArrayList<>();

		// add to the list
		theEmployees.add(emp1);
		theEmployees.add(emp2);
		theEmployees.add(emp3);

	}

	// add mapping for "/list"

	@GetMapping("/list")
	public String listEmployees(Model theModel) {

		// add to the spring model
		theModel.addAttribute("employees", theEmployees);

		return "list-employees";
	}
}
```

### Entity

We create the entity `Employee`:

```java
package com.springboot.thymeleafdemo.model;

public class Employee {

	private int id;
	private String firstName;
	private String lastName;
	private String email;

	public Employee() {

	}

	public Employee(int id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + "]";
	}

}
```

### Template

Finally we create the template for `list-employees.html`:

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous"
    />
    <title>Employee Directory</title>
  </head>
  <body>
    <div class="container">
      <h3>Employee Directory</h3>
      <hr />
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <!-- for loop for all employees, stored in the model -->
          <tr th:each="tempEmployee : ${employees}">
            <td th:text="${tempEmployee.firstName}" />
            <td th:text="${tempEmployee.lastName}" />
            <td th:text="${tempEmployee.email}" />
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
```
