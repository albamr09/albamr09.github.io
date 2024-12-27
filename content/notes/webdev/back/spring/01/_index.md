---
title: Intro and Core Framework
weight: 1
type: docs
next: notes/webdev/back/spring/02
---

[Spring Docs](https://www.spring.io/guides)

## Spring Framework

### Spring Projects

Spring modules built on top of the core Spring Framework:

- Spring Boot
- Spring Cloud
- Spring Batch
- etc

[Spring Projects](https://www.spring.io/projects)

## Set Up

Requirements:

- JDK
- Java Application Server (i.e. Tomcat)
- Java Integrated Development Environment (IDE)
- Spring 5 JAR files (download manually or use Maven)

## XML Configuration File

### Configure Spring Container with an XML file

- First we create the config file

```xml
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
<!--  Define your beans here  -->
<bean id="myCoach" class="com.luv2code.springdemo.TrackCoach"> </bean>
</beans>
```

- Then we create the Spring container in our application:

```java
package com.springdemo;

/** Class to create a spring container using xml files **/
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MyApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// retrieve bean from spring container by its id
		Coach theCoach = context.getBean("myCoach", Coach.class);

		// call methods on the bean
		System.out.println(theCoach.getDailyWorkout());

		// close the context
		context.close();
	}

}
```

## Core Framework

{{< cards >}}
{{< card link="01_xml_config" title="Spring With XML Configuration" >}}
{{< card link="02_java_annotations" title="Java Annotations" >}}
{{< card link="03_configuration_with_java" title="Spring Configuration with Java Code" >}}
{{< /cards >}}
