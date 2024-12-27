---
title: Java Annotations
weight: 2
type: docs
---

Java Annotations are special labels added to classes. They provide metadata about the class, and can be processed at compile time or run-time for special processing.

We use annotations to minimize the `XML` configuration.

Spring scans the classes to find `Beans` and configure them internally (as we have done with the `XML` configuration).

In order to use this approach we need to:

1. Enable component scanning in our Spring configuration file and
2. Add the `@Component` annotation to our class

## Inversion of Control

### Enable Component Scanning

We remove all of the beans we defined, and enable component scanning:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

	<!-- add entry to enable component scanning -->

	<context:component-scan base-package="com.springdemo" />

</beans>
```

Now Spring will scan recursively all of the files in this package.

### Add `@Component` Annotation to Classes

We add the `@Component` annotation to our classes (note we do not add it to the interfaces like `Coach`).

```java
package com.springdemo;

import org.springframework.stereotype.Component;

@Component
// We can also set the explicit name like
// @Component("myTennisCoach")
public class TennisCoach implements Coach {

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}
}
```

Note that we can name the component explicitly or by default.

### Main Method

In our application we do not really need to change anything. We create our bean the same way we did before.
The only thing to note is that if we set the name of the `Component` explicitly, then when we instantiate the bean, we should refer to it by said name.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		// If we set the name explicitly
		Coach theCoach = context.getBean("myTennisCoach", Coach.class);
    // Else
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// close the context
		context.close();

	}
}
```

## Dependency Injection

### Which dependency to use

Choose a style and stay consistent in your project. You get the same functionality regardless of the type of dependency injection you use.

### Constructor Injection

#### Define Dependency as Component

```java
package com.springdemo;

import org.springframework.stereotype.Component;

// We tell spring this is a bean
@Component
public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Specify Dependency

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TennisCoach implements Coach {

	private FortuneService fortuneService;

  // We tell spring to search for beans (classes with @Component annotation)
  // that implement the FortuneService interface
	@Autowired
	public TennisCoach(FortuneService theFortuneService) {
		fortuneService = theFortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

The main method and the configuration files remain unchanged.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}
}
```

### Setter Injection

#### Define Dependency as Component

```java
package com.springdemo;

import org.springframework.stereotype.Component;

// We tell spring this is a bean
@Component
public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Specify Dependency

We now create a setter method in our class for the injection:

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TennisCoach implements Coach {

	private FortuneService fortuneService;

	public TennisCoach() {}

  // We tell spring to search for beans (classes with @Component annotation)
  // that implement the FortuneService interface
	@Autowired
  public setFortuneService(FortuneService fortuneService){
    this.fortuneService = fortuneService;
  }

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

The main method and the configuration files remain unchanged. And when we execute this piece of code, spring will automatically inject the dependency because of the `Autowired` annotation.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}
}
```

### Field Injection

#### Define Dependency as Component

```java
package com.springdemo;

import org.springframework.stereotype.Component;

// We tell spring this is a bean
@Component
public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Specify Dependency

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TennisCoach implements Coach {

  // We tell spring to search for beans (classes with @Component annotation)
  // that implement the FortuneService interface
  @Autowired
	private FortuneService fortuneService;

	public TennisCoach() {}

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

The main method and the configuration files remain unchanged. And when we execute this piece of code, spring will automatically inject the dependency because of the `Autowired` annotation.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}
}
```

### Method Injection

#### Define Dependency as Component

```java
package com.springdemo;

import org.springframework.stereotype.Component;

// We tell spring this is a bean
@Component
public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Specify Dependency

We now create a setter method in our class for the injection:

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TennisCoach implements Coach {

	private FortuneService fortuneService;

	public TennisCoach() {}

  // We tell spring to search for beans (classes with @Component annotation)
  // that implement the FortuneService interface
	@Autowired
  public anyMethod(FortuneService fortuneService){
    this.fortuneService = fortuneService;
  }

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

The main method and the configuration files remain unchanged. And when we execute this piece of code, spring will automatically inject the dependency because of the `Autowired` annotation.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}
}
```

### Inject properties file using Java annotations

#### Create a properties file

We create new text file: `src/sport.properties`

```json
foo.email=myeasycoach@luv2code.com
foo.team=Silly Java Coders
```

#### Load the properties

We load the properties in the configuration `XML` file. For that we add the line:

```XML
<context:property-placeholder location="classpath:sport.properties"/>
```

#### Inject Values

Lastly we inject the properties values into our bean like so:

```java
@Value("${foo.email}")
private String email;

@Value("${foo.team}")
private String team;
```

### Qualifier Annotation

#### Define Dependency as Component

```java
package com.springdemo;

import org.springframework.stereotype.Component;

// We tell spring this is a bean
@Component
public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Specify Dependency

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TennisCoach implements Coach {

	// We tell spring to search for beans (classes with @Component annotation)
	// that implement the FortuneService interface whose name is "happyFortuneService"
	// (note this is the default name of the component if you set one explicitly you
	// will have to specify that one in the Qualifier annotation)
	@Autowired
	@Qualifier("happyFortuneService")
	private FortuneService fortuneService;

	public TennisCoach() {}

	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}
}
```

The main method and the configuration files remain unchanged. And when we execute this piece of code, spring will automatically inject the dependency because of the `Autowired` annotation.

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {
	public static void main(String[] args) {

		// read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// get the bean from spring container
		Coach theCoach = context.getBean("tennisCoach", Coach.class);

		// call a method on the bean
		System.out.println(theCoach.getDailyWorkout());

		// call method to get daily fortune
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}
}
```

#### Qualifier in Constructor

```java
package com.springdemo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class TennisCoach implements Coach {

    private FortuneService fortuneService;

    // define a default constructor
    public TennisCoach() {
        System.out.println(">> TennisCoach: inside default constructor");
    }

    @Autowired
    public TennisCoach(@Qualifier("happyFortuneService") FortuneService theFortuneService) {

        System.out.println(">> TennisCoach: inside constructor using @autowired and @qualifier");

        fortuneService = theFortuneService;
    }
}
```

## Scopes

To explicitly specify scopes with `Java Annotations` you do as follows:

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Scope;

@Component
@Scope("singleton")
public class TennisCoach implements Coach {
...
```

or

```java
package com.springdemo;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Scope;

@Component
@Scope("prototype")
public class TennisCoach implements Coach {
...
```

Refer to more information about scopes are in [Bean Scopes](../01_xml_config#bean-scopes):

## Life Cycle

### Notes

- Access modifier: The method can have any access modifier (public, protected, private)

- Return type: The method can have any return type. However, "void' is most commonly used. If you give a return type just note that you will not be able to capture the return value. As a result, "void" is commonly used.

- Method name: The method can have any method name.

- Arguments: The method can not accept any arguments. The method should be no-arg.
