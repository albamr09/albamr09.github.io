---
title: Form Tags
weight: 1
type: docs
---

## Reference Spring MVC Form Tags

To use these tags in your web page you have to specify the spring namespace at the beginning of the `JSP` file:

```
<!-- Reference to the namespace -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head></head>
<body>
</body>
</html>
```

- [Text Fields](#text-fields)
- [Drop Down Lists](#drop-down-lists)
- [Radio Buttons](#radio-buttons)
- [CheckBox](#check-box)

## Text Fields

### Controller

- Add a `Model` to the controller method for the form and create the model attribute, that holds the data and perfoms data binding

```java
package com.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentController {

    // Request to show the view that contains the form
    @RequestMapping("/showForm")
    public String showForm(Model theModel) {

        // create a student object
        Student theStudent = new Student();

        // add student object to the model
        theModel.addAttribute("student", theStudent);

        return "student-form";
    }

    // Process the submit event on the form
    @RequestMapping("/processForm")
    // We obtain the model attribute with the following annotation
    public String processForm(@ModelAttribute("student") Student theStudent) {

        // Now we can retrieve the updated information from the form
        System.out.println("theStudent: " + theStudent.getFirstName()
                            + " " + theStudent.getLastName());

        return "student-confirmation";
    }
}
```

### View

- Setting the `HTML` for data binding:
  - For `student-form.jsp`:

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration Form</title>
</head>
<body>
    <!-- Note the modelAttribute equals the attribute we added to the model in the controller-->
    <form:form action="processForm" modelAttribute="student">
        <!-- To retrieve the data this maps to student.getFirstName() -->
        First name: <form:input path="firstName" />
        <br><br>
        Last name: <form:input path="lastName" />
        <br><br>
        <input type="submit" value="Submit" />
    </form:form>
</body>

</html>
```

When we submit `Spring` will call `student.setFirstName()` and `student.setLastName()` to save the data in the `Student` object, so we can retrieve it from our controller method.

    * For `student-confirmation.jsp`:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Confirmation</title>
</head>
<body>
    <!-- Obtain data from the model: note we use the attribute's name (i.e. student) to access the object -->
    The student is confirmed: ${student.firstName} ${student.lastName}
</body>
</html>
```

### Model

The model attribute "student" is populated with an instance of the following `Student` class:

```java
package com.springdemo.mvc;

import java.util.LinkedHashMap;

public class Student {

    private String firstName;
    private String lastName;

    public Student() {}

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
}
```

## Drop Down Lists

### Controller

- Add a `Model` to the controller method for the form and create the model attribute, that holds the data and performs data binding

```java
package com.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentController {

    // Request to show the view that contains the form
    @RequestMapping("/showForm")
    public String showForm(Model theModel) {

        // create a student object
        Student theStudent = new Student();

        // add student object to the model
        theModel.addAttribute("student", theStudent);

        return "student-form";
    }

    // Process the submit event on the form
    @RequestMapping("/processForm")
    // We obtain the model attribute with the following annotation
    public String processForm(@ModelAttribute("student") Student theStudent) {

        // Now we can retrieve the updated information from the form
        System.out.println("theStudent: " + theStudent.getFirstName()
                            + " " + theStudent.getLastName());

        return "student-confirmation";
    }
}
```

### View

- Setting the `HTML` for data binding:
  - For `student-form.jsp`:

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration Form</title>
</head>

<body>
    <form:form action="processForm" modelAttribute="student">
        First name: <form:input path="firstName" />
        <br><br>
        Last name: <form:input path="lastName" />
        <br><br>
        Country:
        <!-- Drop down list of country options -->
        <!-- We specify the variable where we store the selected value in the student object: which is country -->
        <form:select path="country">
            <!-- This is a list that was populated when we created the student object -->
            <!-- Remember Spring calls student.getCountryOptions() -->
            <form:options items="${student.countryOptions}" />
        </form:select>
        <br><br>
        <input type="submit" value="Submit" />
    </form:form>
</body>

</html>
```

    * For `student-confirmation.jsp`:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Confirmation</title>
</head>
<body>
    The student is confirmed: ${student.firstName} ${student.lastName}
    <!-- Obtain the value saved in the coutry variable inside the student's object (corresponds to the selected value) -->
    Selected coutry: ${student.country} ${student.lastName}
</body>
</html>
```

### Model

The model attribute "student" is populated with an instance of the following `Student` class:

```java
package com.springdemo.mvc;

import java.util.LinkedHashMap;

public class Student {

    private String firstName;
    private String lastName;

    private String country;

    private LinkedHashMap<String, String> countryOptions;

    public Student() {

        // populate country options: used ISO country code
        countryOptions = new LinkedHashMap<>();

        countryOptions.put("BR", "Brazil");
        countryOptions.put("FR", "France");
        countryOptions.put("DE", "Germany");
        countryOptions.put("IN", "India");
        countryOptions.put("US", "United States of America");

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

    public String getCountry() {
        return country;
    }

    // Setter and getter handlers for the new binded attribute
    public void setCountry(String country) {
        this.country = country;
    }

    public LinkedHashMap<String, String> getCountryOptions() {
        return countryOptions;
    }
}
```

### Country options from a properties file

- We create `WEB-INF/countries.properties`:

```properties
BR=Brazil
FR=France
CO=Colombia
IN=India
```

- Update configuration's file `spring-mvc-dmo-servlet.xml` header (to use a new set of Spring tags: utils):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xmlns:util="http://www.springframework.org/schema/util"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/mvc
            http://www.springframework.org/schema/mvc/spring-mvc.xsd
            http://www.springframework.org/schema/util
            http://www.springframework.org/schema/util/spring-util.xsd">
```

- Load the country options properties file in the Spring configuration file, with a bean id equal to "countryOptions":

```xml
<util:properties  id="countryOptions" location="classpath:../countries.properties" />
```

- Inject properties inside our controller:

```java
@Value("#{countryOptions}")
private Map<String, String> countryOptions;
```

- Add `countryOptions` as an attribute of the model inside the controller method:

```java
@RequestMapping("/showForm")
public String showForm(Model theModel) {

    // create a student object Student
    Student theStudent = new Student();

    // add student object to the model
    theModel.addAttribute("student", theStudent);

    // add the country options to the model
    theModel.addAttribute("theCountryOptions", countryOptions);

    return "student-form";
}
```

- Update the view as follows:

```java
<form:select path="country">
 <form:options items="${theCountryOptions}" />
</form:select>
```

## Radio Buttons

### Controller

- Add a `Model` to the controller method for the form and create the model attribute, that holds the data and performs data binding

```java
package com.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentController {

    // Request to show the view that contains the form
    @RequestMapping("/showForm")
    public String showForm(Model theModel) {

        // create a student object
        Student theStudent = new Student();

        // add student object to the model
        theModel.addAttribute("student", theStudent);

        return "student-form";
    }

    // Process the submit event on the form
    @RequestMapping("/processForm")
    // We obtain the model attribute with the following annotation
    public String processForm(@ModelAttribute("student") Student theStudent) {

        // Now we can retrieve the updated information from the form
        System.out.println("theStudent: " + theStudent.getFirstName()
                            + " " + theStudent.getLastName());

        return "student-confirmation";
    }
}
```

### View

- Setting the `HTML` for data binding:
  - For `student-form.jsp`:

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration Form</title>
</head>

<body>
    <form:form action="processForm" modelAttribute="student">
        First name: <form:input path="firstName" />
        <br><br>
        Last name: <form:input path="lastName" />
        <br><br>
        Country:
        <!-- Drop down list of country options -->
        <!-- We specify the variable where we store the selected value in the student object: which is country -->
        <form:select path="country">
            <!-- This is a list that was populated when we created the student object -->
            <!-- Remember Spring calls student.getCountryOptions() -->
            <form:options items="${student.countryOptions}" />
        </form:select>
        <br><br>
        <br><br>

        Favorite Language:

        <!-- The "path" specifies the name of the property we are going to bind the radiobutton to, in this case "favoriteLanguage" -->
        <!-- Note these can also be populated from the Student class or using a properties file -->
        Java <form:radiobutton path="favoriteLanguage" value="Java" />
        C# <form:radiobutton path="favoriteLanguage" value="C#" />
        PHP <form:radiobutton path="favoriteLanguage" value="PHP" />
        Ruby <form:radiobutton path="favoriteLanguage" value="Ruby" />

        <br><br>
        <input type="submit" value="Submit" />
    </form:form>
</body>

</html>
```

    * For `student-confirmation.jsp`:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Confirmation</title>
</head>
<body>
    The student is confirmed: ${student.firstName} ${student.lastName}
    <br><br>
    Selected coutry: ${student.country} ${student.lastName}
    <br><br>
    <!-- Obtain the value using the binded variable inside the student object -->
    Favorite language: ${student.favoriteLanguage}
</body>
</html>
```

### Model

The model attribute "student" is populated with an instance of the following `Student` class:

```java
package com.springdemo.mvc;

import java.util.LinkedHashMap;

public class Student {

    private String firstName;
    private String lastName;

    private String country;

    private LinkedHashMap<String, String> countryOptions;

    // Property we are going to bind to the radio buttons
    private String favoriteLanguage;

    public Student() {

        // populate country options: used ISO country code
        countryOptions = new LinkedHashMap<>();

        countryOptions.put("BR", "Brazil");
        countryOptions.put("FR", "France");
        countryOptions.put("DE", "Germany");
        countryOptions.put("IN", "India");
        countryOptions.put("US", "United States of America");

        // We can also populate the favoriteLanguage options from here
        // in the same manner we did with the country options

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LinkedHashMap<String, String> getCountryOptions() {
        return countryOptions;
    }

    // Setter and getter handlers for the new binded attribute
    public String getFavoriteLanguage() {
        return favoriteLanguage;
    }

    public void setFavoriteLanguage(String favoriteLanguage) {
        this.favoriteLanguage = favoriteLanguage;
    }
}
```

## Check Box

### Controller

- Add a `Model` to the controller method for the form and create the model attribute, that holds the data and performs data binding

```java
package com.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentController {

    // Request to show the view that contains the form
    @RequestMapping("/showForm")
    public String showForm(Model theModel) {

        // create a student object
        Student theStudent = new Student();

        // add student object to the model
        theModel.addAttribute("student", theStudent);

        return "student-form";
    }

    // Process the submit event on the form
    @RequestMapping("/processForm")
    // We obtain the model attribute with the following annotation
    public String processForm(@ModelAttribute("student") Student theStudent) {

        // Now we can retrieve the updated information from the form
        System.out.println("theStudent: " + theStudent.getFirstName()
                            + " " + theStudent.getLastName());

        return "student-confirmation";
    }
}
```

### View

- Setting the `HTML` for data binding:
  - For `student-form.jsp`:

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration Form</title>
</head>

<body>
    <form:form action="processForm" modelAttribute="student">
        First name: <form:input path="firstName" />
        <br><br>
        Last name: <form:input path="lastName" />
        <br><br>
        Country:
        <!-- Drop down list of country options -->
        <!-- We specify the variable where we store the selected value in the student object: which is country -->
        <form:select path="country">
            <!-- This is a list that was populated when we created the student object -->
            <!-- Remember Spring calls student.getCountryOptions() -->
            <form:options items="${student.countryOptions}" />
        </form:select>
        <br><br>
        <br><br>
        Favorite Language:

        Java <form:radiobutton path="favoriteLanguage" value="Java" />
        C# <form:radiobutton path="favoriteLanguage" value="C#" />
        PHP <form:radiobutton path="favoriteLanguage" value="PHP" />
        Ruby <form:radiobutton path="favoriteLanguage" value="Ruby" />
        <br><br>
        Operating Systems:

        <!-- The "path" specifies the name of the property we are going to bind the radiobutton to, in this case "operatingSystems" -->
        <!-- Note these can also be populated from the Student class or using a properties file -->
        Linux <form:checkbox path="operatingSystems" value="Linux" />
        Mac OS <form:checkbox path="operatingSystems" value="Mac OS" />
        MS Windows <form:checkbox path="operatingSystems" value="MS Window" />
        <br><br>
        <input type="submit" value="Submit" />
    </form:form>
</body>

</html>
```

    * For `student-confirmation.jsp`:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student Confirmation</title>
</head>
<body>
    The student is confirmed: ${student.firstName} ${student.lastName}
    <br><br>
    Selected coutry: ${student.country} ${student.lastName}
    <br><br>
    <!-- Obtain the value using the binded variable inside the student object -->
    Favorite language: ${student.favoriteLanguage}
    <br><br>
    Operating Systems:
    <!-- Create an unordered list of the selected values in the checkbox -->
        <ul>
            <c:forEach var="temp" items="${student.operatingSystems}">
                <li> ${temp} </li>
            </c:forEach>
        </ul>
</body>
</html>
```

### Model

The model attribute "student" is populated with an instance of the following `Student` class:

```java
package com.springdemo.mvc;

import java.util.LinkedHashMap;

public class Student {

    private String firstName;
    private String lastName;

    private String country;

    private LinkedHashMap<String, String> countryOptions;

    private String favoriteLanguage;

  // Attribute bound to the checkbox (multiple options so it is an array)
  private String[] operatingSystems;

    public Student() {

        // populate country options: used ISO country code
        countryOptions = new LinkedHashMap<>();

        countryOptions.put("BR", "Brazil");
        countryOptions.put("FR", "France");
        countryOptions.put("DE", "Germany");
        countryOptions.put("IN", "India");
        countryOptions.put("US", "United States of America");

        // We can also populate the favoriteLanguage options from here
        // in the same manner we did with the country options

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LinkedHashMap<String, String> getCountryOptions() {
        return countryOptions;
    }

    public String getFavoriteLanguage() {
        return favoriteLanguage;
    }

    public void setFavoriteLanguage(String favoriteLanguage) {
        this.favoriteLanguage = favoriteLanguage;
    }

    // Setter and getter handlers for the new bound attribute
  public String[] getOperatingSystems() {
        return operatingSystems;
    }

    public void setOperatingSystems(String[] operatingSystems) {
        this.operatingSystems = operatingSystems;
    }
}
```
