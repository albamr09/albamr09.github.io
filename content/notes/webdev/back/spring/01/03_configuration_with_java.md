---
title: Spring Configuration with Java Code
weight: 3
type: docs
---

We are now going to use `Java` to configure our application instead of using `XML`, to do that we follow the next steps:

- Create a Java class and annotate as `@Configuration`
- Add Component scanning support with `@ComponentScan` (optional), which is `XML` we did as:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    ....>
	<!-- add entry to enable component scanning -->
	<context:component-scan base-package="com.springdemo" />

</beans>
```

## Configuration With Java

### Create Configuration Class

```java
package com.springdemo;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

// 1. Define configuration class
@Configuration
// 2. Add component scanning support
@ComponentScan("com.springdemo")
public class SportConfig {

}
```

### Load the Configuration Class

```java
package com.springdemo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class JavaConfigDemoApp {

	public static void main(String[] args) {

		// read spring config java class
		AnnotationConfigApplicationContext context =
				new AnnotationConfigApplicationContext(SportConfig.class);

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get the daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();

	}

}
```

## Load Properties from File

### Create the File

First, we create the file `sport.properties`

```json
foo.email=myeasycoach@luv2code.com
foo.team=Awesome Java Coders
```

### Load the File

Now, we load the file from our `Configuration` class:

```java
package com.springdemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:sport.properties")
public class SportConfig {

	// define bean for our sad fortune service
	@Bean
	public FortuneService sadFortuneService() {
		return new SadFortuneService();
	}

	// define bean for our swim coach AND inject dependency
	@Bean
	public Coach swimCoach() {
		SwimCoach mySwimCoach = new SwimCoach(sadFortuneService());

		return mySwimCoach;
	}

}
```

### Inject Values

We inject the values at field level in our Bean:

```java
package com.springdemo;

import org.springframework.beans.factory.annotation.Value;

public class SwimCoach implements Coach {

	private FortuneService fortuneService;

	@Value("${foo.email}")
	private String email;

	@Value("${foo.team}")
	private String team;
  ...
```

## Inversion of Control

### Create the Bean

```java
package com.springdemo;

// Note there are no special annotations
public class SwimCoach implements Coach {

	private FortuneService fortuneService;

	public SwimCoach(FortuneService theFortuneService) {
		fortuneService = theFortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Swim 1000 meters as a warm up.";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

We also create the `SadFortuneService` Bean:

```java
package com.springdemo;

import org.springframework.stereotype.Component;

@Component
public class SadFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is a sad day :(";
	}

}
```

### Define the Bean in the Configuration Class

```java
package com.springdemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SportConfig {

	// define bean for our sad fortune service
	@Bean
	public FortuneService sadFortuneService() {
		return new SadFortuneService();
	}

	// define bean for our swim coach AND inject dependency
  // without springs dependency injection
	@Bean
	public Coach swimCoach() {
		SwimCoach mySwimCoach = new SwimCoach(sadFortuneService());

		return mySwimCoach;
	}

}
```

- The `@Bean` annotation tells Spring that we are creating a bean component manually. We didn't specify a scope so the default scope is singleton.
- `public Coach swimCoach(){` specifies that the bean will bean id of "swimCoach".
- The @Bean annotation will intercept any requests for "swimCoach" bean. Since we didn't specify a scope, the bean scope is singleton.

So now in our main method:

### Main Method

```java
package com.luv2code.springdemo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class JavaConfigDemoApp {

	public static void main(String[] args) {

		// read spring config java class
		AnnotationConfigApplicationContext context =
				new AnnotationConfigApplicationContext(SportConfig.class);

		// get the bean from spring container by its id
		Coach theCoach = context.getBean("swimCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get the daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();

	}

}
```
