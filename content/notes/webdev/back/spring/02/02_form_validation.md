---
title: Form Validation
weight: 2
type: docs
---

## Set up

Add `Hibernate's` library ([Hibernate Validator](https://sourceforge.net/projects/hibernate/files/hibernate-validator/7.0.4.Final/hibernate-validator-7.0.4.Final-dist.zip/download))for `Bean Validation` which is fully compliant with `Java's` `Bean Validation API`.

- [Required Validation](#required-validation)
- [Number Range Validation](#number-range-validation)
- [Validation with Regular Expressions](#validation-with-regular-expressions)
- [Handle String in Integer Field](#handle-string-input-in-integer-field)
- [Custom Validation](#custom-validation)

## Required Validation

### Add Validation Rule to Bean

We create a `Customer` class, whose `lastName` attribute must be non-null, that is, `lastName` is a required attribute:

```java
package com.springdemo.mvc;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Customer {

	private String firstName;

  // Validation annotation
	@NotNull(message="is required")
	@Size(min=1, message="is required")
	private String lastName;

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

Note that if we wanted to make an integer required, we must use the wrapper java classes (i.e. Integer), that will be able to handle empty strings as inputs and nulls. The primitive types will throw an exception.

### Perform Validation in the Controller

We also

```java
package com.springdemo.mvc;

import javax.validation.Valid;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	// add an initbinder ... to convert trim input strings
	// remove leading and trailing whitespace
	// resolve issue for our validation

	@InitBinder
	//@InitBinder annotation works as a pre-processor
	// It will pre-process each web request to our controller
	public void initBinder(WebDataBinder dataBinder) {

		// Trim strings (true: empty strings to null)
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);

		// For every string class apply the trim editor
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}


	@RequestMapping("/showForm")
	public String showForm(Model theModel) {

		theModel.addAttribute("customer", new Customer());

		return "customer-form";
	}

	@RequestMapping("/processForm")
	// @Valid: Tells spring to perform validation on the customer object
	// BindingResult: results of the validation will be placed in BindingResult
	public String processForm(
			@Valid @ModelAttribute("customer") Customer theCustomer,
			BindingResult theBindingResult) {

		System.out.println("Last name: |" + theCustomer.getLastName() + "|");

		// Check if validation was sucessfull
		if (theBindingResult.hasErrors()) {
			// If not sucessfull send back
			return "customer-form";
		}
		else {
			// If sucessfull
			return "customer-confirmation";
		}
	}
}
```

When performing Spring MVC validation, the location of the BindingResult parameter is very important. In the method signature, the BindingResult parameter must appear immediately after the model attribute.

### Display error on HTML

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>

<head>
	<title>Customer Registration Form</title>

	<style>
		.error {color:red}
	</style>
</head>
<body>
<i>Fill out the form. Asterisk (*) means required.</i>
<br><br>
	<form:form action="processForm" modelAttribute="customer">
		First name: <form:input path="firstName" />
		<br><br>
		Last name (*): <form:input path="lastName" />
    <!-- We use the error form tag to display an error when the input is not valid -->
    <!-- The message shown equals the messages from both of the validation annotations defined
    for the lastName attribute in the Customer class -->
		<form:errors path="lastName" cssClass="error" />
		<br><br>
		<input type="submit" value="Submit" />
	</form:form>

</body>

</html>
```

## Number Range Validation

### Add Validation Rule to Bean

We create a `Customer` class, whose `freePasses` variable must be a number between 0 and 10.

```java
public class Customer {

	private String firstName;

	@NotNull(message="is required")
	@Size(min=1, message="is required")
	private String lastName;

	// Minimum value we will expect
	@Min(value=0, message="must be greater than or equal to zero")
	// Maximum value we will expect
	@Max(value=10, message="must be less than or equal to 10")
	private int freePasses;

	...
```

### Perform Validation in the Controller

We also

```java
package com.springdemo.mvc;

import javax.validation.Valid;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	// add an initbinder ... to convert trim input strings
	// remove leading and trailing whitespace
	// resolve issue for our validation

	@InitBinder
	//@InitBinder annotation works as a pre-processor
	// It will pre-process each web request to our controller
	public void initBinder(WebDataBinder dataBinder) {

		// Trim strings (true: empty strings to null)
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);

		// For every string class apply the trim editor
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}


	@RequestMapping("/showForm")
	public String showForm(Model theModel) {

		theModel.addAttribute("customer", new Customer());

		return "customer-form";
	}

	@RequestMapping("/processForm")
	// @Valid: Tells spring to perform validation on the customer object
	// BindingResult: results of the validation will be placed in BindingResult
	public String processForm(
			@Valid @ModelAttribute("customer") Customer theCustomer,
			BindingResult theBindingResult) {

		System.out.println("Last name: |" + theCustomer.getLastName() + "|");

		// Check if validation was sucessfull
		if (theBindingResult.hasErrors()) {
			// If not sucessfull send back
			return "customer-form";
		}
		else {
			// If sucessfull
			return "customer-confirmation";
		}
	}
}
```

When performing Spring MVC validation, the location of the BindingResult parameter is very important. In the method signature, the BindingResult parameter must appear immediately after the model attribute.

### Display error on HTML

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>

<head>
	<title>Customer Registration Form</title>

	<style>
		.error {color:red}
	</style>
</head>
<body>
<i>Fill out the form. Asterisk (*) means required.</i>
<br><br>
	<form:form action="processForm" modelAttribute="customer">
		First name: <form:input path="firstName" />
		<br><br>
		Last name (*): <form:input path="lastName" />
    <!-- The message shown equals the messages from both of the validation annotations defined
    for the lastName attribute in the Customer class -->
		<form:errors path="lastName" cssClass="error" />
		<br><br>
		Free passes: <form:input path="freePasses" />
    <!-- The message shown equals the messages from both of the validation annotations defined
    for the freePasses attribute in the Customer class -->
		<form:errors path="freePasses" cssClass="error" />
		<br><br>
		<input type="submit" value="Submit" />
	</form:form>

</body>

</html>
```

## Validation with Regular Expressions

### Add Validation Rule to Bean

We create a `Customer` class, whose `freePasses` variable must be a number between 0 and 10.

```java
public class Customer {

	private String firstName;

	@NotNull(message="is required")
	@Size(min=1, message="is required")
	private String lastName;

	@Min(value=0, message="must be greater than or equal to zero")
	@Max(value=10, message="must be less than or equal to 10")
	private int freePasses;

  // Define the regular expression for the postalCode attribute
  @Pattern(regexp="^[a-zA-Z0-9]{5}", message="only 5 chars/digits")
	private String postalCode;

	...
```

### Perform Validation in the Controller

We also

```java
package com.springdemo.mvc;

import javax.validation.Valid;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	// add an initbinder ... to convert trim input strings
	// remove leading and trailing whitespace
	// resolve issue for our validation

	@InitBinder
	//@InitBinder annotation works as a pre-processor
	// It will pre-process each web request to our controller
	public void initBinder(WebDataBinder dataBinder) {

		// Trim strings (true: empty strings to null)
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);

		// For every string class apply the trim editor
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}


	@RequestMapping("/showForm")
	public String showForm(Model theModel) {

		theModel.addAttribute("customer", new Customer());

		return "customer-form";
	}

	@RequestMapping("/processForm")
	// @Valid: Tells spring to perform validation on the customer object
	// BindingResult: results of the validation will be placed in BindingResult
	public String processForm(
			@Valid @ModelAttribute("customer") Customer theCustomer,
			BindingResult theBindingResult) {

		System.out.println("Last name: |" + theCustomer.getLastName() + "|");

		// Check if validation was sucessfull
		if (theBindingResult.hasErrors()) {
			// If not sucessfull send back
			return "customer-form";
		}
		else {
			// If sucessfull
			return "customer-confirmation";
		}
	}
}
```

When performing Spring MVC validation, the location of the BindingResult parameter is very important. In the method signature, the BindingResult parameter must appear immediately after the model attribute.

### Display error on HTML

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>

<head>
	<title>Customer Registration Form</title>

	<style>
		.error {color:red}
	</style>
</head>
<body>
<i>Fill out the form. Asterisk (*) means required.</i>
<br><br>
	<form:form action="processForm" modelAttribute="customer">
		First name: <form:input path="firstName" />
		<br><br>
		Last name (*): <form:input path="lastName" />
		<form:errors path="lastName" cssClass="error" />
		<br><br>
		Free passes: <form:input path="freePasses" />
		<form:errors path="freePasses" cssClass="error" />
    <br><br>
		Postal Code: <form:input path="postalCode" />
    <!-- The message shown equals the messages from both of the validation annotations defined
    for the postalCode attribute in the Customer class -->
		<form:errors path="postalCode" cssClass="error" />
		<br><br>
		<input type="submit" value="Submit" />
	</form:form>

</body>

</html>
```

## Handle String Input in Integer Field

### Create a custom message

Create a properties file in `resources/messages.properties`

```properties
// ErrorType.SpringModelAttributeName.FieldName
typeMismatch.customer.freePasses=Invalid number
```

### Specify Properties file in Configuration

We add the following in our configuration file `spring-mvc-demo-servlet.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context.xsd
    	http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

	<context:component-scan base-package="com.luv2code.springdemo" />
	<mvc:annotation-driven/>
	<bean
		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/WEB-INF/view/" />
		<property name="suffix" value=".jsp" />
	</bean>

	  <!-- Load custom message resources -->
    <bean id="messageSource"
          class="org.springframework.context.support.ResourceBundleMessageSource">
				<!-- Path where the properties file is stored -->
        <property name="basenames" value="resources/messages" />
    </bean>
</beans>
```

## Custom Validation

### Create a Custom Java Annotation

#### Create Annotation Clas

```java
package com.springdemo.mvc.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

// Specify the class that holds the validation logic
@Constraint(validatedBy = CourseCodeConstraintValidator.class)
// Where you can use this annotation: on a method or on a field
@Target( { ElementType.METHOD, ElementType.FIELD } )
@Retention(RetentionPolicy.RUNTIME)
// Note the @interface (it is needed to create the annotation)
public @interface CourseCode {

	// define default course code
	public String value() default "LUV";

	// define default error message
	public String message() default "must start with LUV";

	// define default groups
	public Class<?>[] groups() default {};

	// define default payloads
	public Class<? extends Payload>[] payload() default {};
}
```

#### Create Validator Class

This class holds the validation logic

```java
package com.springdemo.mvc.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

// Implements the previous ConstraintValidator interface, with generics: <Annotation Interface, Data Type>
public class CourseCodeConstraintValidator
	implements ConstraintValidator<CourseCode, String> {

	private String coursePrefix;

	@Override
	public void initialize(CourseCode theCourseCode) {
		// Obtain prefix from the "value" attribute of our annotation
		coursePrefix = theCourseCode.value();
	}

	@Override
	// Called when we use the @Valid annotation
	public boolean isValid(String theCode, ConstraintValidatorContext theConstraintValidatorContext) {

		boolean result;

		// Validation logic
		if (theCode != null) {
			result = theCode.startsWith(coursePrefix);
		}
		else {
			result = true;
		}

		return result;
	}
}

```

### Add Custom Validation

```java
public class Customer {

	private String firstName;

	@NotNull(message="is required")
	@Size(min=1, message="is required")
	private String lastName;

	@NotNull(message="is required")
	@Min(value=0, message="must be greater than or equal to zero")
	@Max(value=10, message="must be less than or equal to 10")
	private Integer freePasses;

	@Pattern(regexp="^[a-zA-Z0-9]{5}", message="only 5 chars/digits")
	private String postalCode;

  // Use our custom validation tag
	@CourseCode(value="TOPS", message="must start with TOPS")
	private String courseCode;
```

### Perform Validation on Controller

```java
package com.springdemo.mvc;

import javax.validation.Valid;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	// add an initbinder ... to convert trim input strings
	// remove leading and trailing whitespace
	// resolve issue for our validation

	@InitBinder
	//@InitBinder annotation works as a pre-processor
	// It will pre-process each web request to our controller
	public void initBinder(WebDataBinder dataBinder) {

		// Trim strings (true: empty strings to null)
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);

		// For every string class apply the trim editor
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}


	@RequestMapping("/showForm")
	public String showForm(Model theModel) {

		theModel.addAttribute("customer", new Customer());

		return "customer-form";
	}

	@RequestMapping("/processForm")
	// @Valid: Tells spring to perform validation on the customer object
	// BindingResult: results of the validation will be placed in BindingResult
	public String processForm(
			@Valid @ModelAttribute("customer") Customer theCustomer,
			BindingResult theBindingResult) {

		System.out.println("Last name: |" + theCustomer.getLastName() + "|");

		// Check if validation was sucessfull
		if (theBindingResult.hasErrors()) {
			// If not sucessfull send back
			return "customer-form";
		}
		else {
			// If sucessfull
			return "customer-confirmation";
		}
	}
}
```

When performing Spring MVC validation, the location of the BindingResult parameter is very important. In the method signature, the BindingResult parameter must appear immediately after the model attribute.

### Display error on HTML

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>

<head>
	<title>Customer Registration Form</title>

	<style>
		.error {color:red}
	</style>
</head>
<body>
<i>Fill out the form. Asterisk (*) means required.</i>
<br><br>
	<form:form action="processForm" modelAttribute="customer">
		First name: <form:input path="firstName" />
		<br><br>
		Last name (*): <form:input path="lastName" />
		<form:errors path="lastName" cssClass="error" />
		<br><br>
		Free passes: <form:input path="freePasses" />
		<form:errors path="freePasses" cssClass="error" />
    <br><br>
		Postal Code: <form:input path="postalCode" />
		<form:errors path="postalCode" cssClass="error" />
		<br><br>
    <!-- The message shown equals the messages from both of the validation annotations defined
    for the courseCode attribute in the Customer class -->
			Course Code: <form:input path="courseCode" />
			<form:errors path="courseCode" cssClass="error" />
		<br><br>
		<input type="submit" value="Submit" />
	</form:form>

</body>

</html>
```
