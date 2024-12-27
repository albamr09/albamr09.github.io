---
title: Spring With XML Configuration
weight: 1
type: docs
---

## Inversion of Control

The Spring container (generally known as `ApplicationContext`) has two main functions:

- Create and manage objects (Inversion of control)
- Inject object's dependencies (Dependency Injection)

So Inversion Control is externalizing the construction and management of objects which will be handled by and object factory. This is illustrated in the following image:

![IoC](../../assets/IoC.png)

- MyApp has the main method
- MyApp asks Spring to retrieve the appropiate object based on a configuration file or an annotation, instead of having to code it manually like:

```java
package com.springdemo;

public class MyApp {

    public static void main(String[] args) {

        Coach theCoach = new TrackCoach();

        // call methods on the bean
        System.out.println(theCoach.getDailyWorkout());
    }

}
```

Where we have defined an interface `Coach` that is implemented by both `TrackCoach` and `BaseballCoach`

```java
package com.springdemo;

public interface Coach {

    public String getDailyWorkout();

}
```

```java
package com.springdemo;

public class TrackCoach implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Run a hard 5k";
    }

}
```

To avoid this approach we create a Spring container. To configure a Spring container we can use:

- [XML configuration file](..#xml-configuration-file) (legacy)
- Java Annotations
- Java Source Code

**However what is a Spring Bean?**

A "Spring Bean" is simply a Java object.

When Java objects are created by the Spring Container, then Spring refers to them as "Spring Beans". Spring Beans are created from normal Java classes just like Java objects.

**Why do we specify the Coach interface in getBean()?**

When we pass the interface to the method, behind the scenes Spring will cast the object for you.

```java
context.getBean("myCoach", Coach.class)
```

However, there are some slight differences than normal casting.

Behaves the same as `getBean(String)`, but provides a measure of type safety by throwing a `BeanNotOfRequiredTypeException` if the bean is not of the required type.

This means that `ClassCastException` can't be thrown on casting the result correctly, as can happen with `getBean(String)`.

## Dependency Injection

### Injection Types

There are several injection types in Spring. The more common are:

- [Constructor Injection](#constructor-injection)
- [Setter Injection](#setter-injection)
- [Injecting Literal Values](#injecting-literal-values)
- [Inject Values From a Properties File](#inject-values-from-the-properties-files)

### Constructor Injection

#### Create Dependency Object

```java
package com.springdemo;

public interface FortuneService {

	public String getFortune();

}
```

Next we create the dependency class than implements the interface:

```java
package com.springdemo;

public class HappyFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "Today is your lucky day!";
	}

}
```

#### Establish Dependency

Let's also update the `Coach` Interface to add a method `getDailyFortune` (note that all classes that implement this interface have to implement this new method):

```java
package com.springdemo;

public interface Coach {

	public String getDailyWorkout();

	public String getDailyFortune();

}
```

Now create a constructor for the dependency in the class that has the dependency

```java
package com.springdemo;

public class BaseballCoach implements Coach {

	// define a private field for the dependency
	private FortuneService fortuneService;

	// define a constructor for dependency injection
	public BaseballCoach(FortuneService theFortuneService) {
		fortuneService = theFortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Spend 30 minutes on batting practice";
	}

	@Override
	public String getDailyFortune() {
		// use my fortuneService to get a fortune
		return fortuneService.getFortune();
	}
}
```

#### Configuration File

Finally define the dependency in the configuration file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- Define your beans here -->
    <!-- define the dependency -->
    <bean id="myFortuneService"
      class="com.springdemo.HappyFortuneService">
    </bean>
    <!-- Bean with the dependency -->
    <bean id="myCoach"
      class="com.springdemo.TrackCoach">
      <!-- Set up constructor injection, note ref=id of bean -->
      <constructor-arg ref="myFortuneService" />
    </bean>
</beans>
```

Behind the scenes, Spring framework does:

```java
package com.springdemo;

public class MyApp {

	public static void main(String[] args) {

		// Create object
		// From the bean with id = myFortuneService in the config file
		HappyFortuneService myFortuneService = new HappyFortuneService();

		// Add dependency via constructor
		// From the bean with id = myCoach in the config file
		TrackCoach myCoach = new TrackCoach(fortuneService);
	}

}
```

#### Main Method

We do not need to make any modifications to the app, when we create the `Coach` bean using Spring, the framework deals with the dependency injection:

```java
package com.luv2code.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class HelloSpringApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// retrieve bean from spring container (with the dependency)
		Coach theCoach = context.getBean("myCoach", Coach.class);

		// call methods on the bean
		System.out.println(theCoach.getDailyWorkout());

		// let's call our new method for fortunes
		System.out.println(theCoach.getDailyFortune());

		// close the context
		context.close();
	}

}
```

### Setter Injection

#### Create Dependency Object

Refer to [Create Dependency Object](#constructor-injection)

#### Define dependency

We include a `setter` method that takes the dependency as an argument like:

```java
package com.springdemo;

public class CricketCoach implements Coach {

    private FortuneService fortuneService;

    // create a no-arg constructor
    public CricketCoach() {
        System.out.println("CricketCoach: inside no-arg constructor");
    }

    // our setter method
    public void setFortuneService(FortuneService fortuneService) {
        System.out.println("CricketCoach: inside setter method - setFortuneService");
        this.fortuneService = fortuneService;
    }

    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 minutes";
    }

    @Override
    public String getDailyFortune() {
        return fortuneService.getFortune();
    }

}
```

#### Configuration File

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- Define your beans here -->
    <!-- define the dependency -->
    <bean id="myFortuneService" class="com.springdemo.HappyFortuneService">
    </bean>

    <bean id="myCoach"
        class="com.springdemo.TrackCoach">
        <!-- set up constructor injection -->
        <constructor-arg ref="myFortuneService" />
    </bean>

    <bean id="myCricketCoach" class="com.springdemo.CricketCoach">
      <!-- set up setter injection -->
      <!-- ref: references the id of the bean we define previously -->
      <!-- name: name of the setter method set<name>, where the first
      letter of the name is capitalized -->
      <property name="fortuneService" ref="myFortuneService" />
    </bean>

</beans>
```

Behind the scenes, Spring framework does:

```java
package com.springdemo;

public class MyApp {

    public static void main(String[] args) {

        // Create object
        // From the bean with id = myFortuneService in the config file
        HappyFortuneService myFortuneService = new HappyFortuneService();

        // From the bean with id = myCricketCoach in the config file
        CricketCoach myCricketCoach = new CricketCoach(fortuneService);
        // Add dependency via setter
        myCricketCoach.setFortuneService(myFortuneService);
    }

}
```

#### Main Method

Now, on the main method of our Spring App, we create the object by reading the config file, and Spring automatically injects the dependency via the setter method:

```java
package com.springdemo;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDemoApp {

    public static void main(String[] args) {

        // load the spring configuration file
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        // retrieve bean from spring container
        CricketCoach theCoach = context.getBean("myCricketCoach", CricketCoach.class);

        // call methods on the bean
        System.out.println(theCoach.getDailyWorkout());

        System.out.println(theCoach.getDailyFortune());

        // close the context
        context.close();
    }
}
```

### Injecting Literal Values

#### Define the Attributes

First we define the attributes emailAddress and team in the object. Also we create the `set` and `get` methods for both of them:

```java
package com.luv2code.springdemo;

public class CricketCoach implements Coach {

	private FortuneService fortuneService;

	// add new fields for emailAddress and team
	private String emailAddress;
	private String team;


	public CricketCoach() {
		System.out.println("CricketCoach: inside no-arg constructor");
	}

  /** SETTERS AND GETTERS **/
	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		System.out.println("CricketCoach: inside setter method - setEmailAddress");
		this.emailAddress = emailAddress;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		System.out.println("CricketCoach: inside setter method - setTeam");
		this.team = team;
	}

  /** Setter Injection **/
	public void setFortuneService(FortuneService fortuneService) {
		System.out.println("CricketCoach: inside setter method - setFortuneService");
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Practice fast bowling for 15 minutes";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
```

#### Configuration File

Now we define the properties in the configuration file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

	<!-- Define your beans here -->
	<!-- define the dependency -->
	<bean id="myFortuneService" class="com.springdemo.HappyFortuneService">
	</bean>

	<bean id="myCoach"
		class="com.springdemo.TrackCoach">
		<!-- set up constructor injection -->
		<constructor-arg ref="myFortuneService" />
	</bean>

	<bean id="myCricketCoach" class="com.springdemo.CricketCoach">
	  <!-- set up setter injection -->
	  <!-- ref: references the id of the bean we define previously -->
	  <!-- name: name of the setter method set<name>, where the first
	  letter of the name is capitalized -->
	  <property name="fortuneService" ref="myFortuneService" />
		<!-- inject literal values, where name is the name of the attribute in the bean
		and value is the value to set the value to -->
	  <property name="emailAddress" value="email@email.com" />
	  <property name="team" value="Best Team" />
	</bean>

</beans>
```

#### Main Method

Now in the main method of our app we can call the `getters` and `setters` for these new attributes:

```java
package com.springdemo;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDemoApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// retrieve bean from spring container
		CricketCoach theCoach = context.getBean("myCricketCoach", CricketCoach.class);

		// retrieve attribute values
		System.out.println(theCoach.getTeam());
		System.out.println(theCoach.getEmailAddress());

		// close the context
		context.close();
	}
}
```

### Inject Values from the Properties Files

#### Create the properties file

Let's define our properties inside a properties file `sport.properties`:

```json
foo.email=myeasycoach@email.com
foo.team=Royal Challengers Bangalore
```

#### Load the properties file

Now we load the properties file using the `context` tag inside our config file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

  <!-- load the properties file: sport.properties -->
  <context:property-placeholder location="classpath:sport.properties"/>

  <!-- Define your beans here -->
  <!-- define the dependency -->
  <bean id="myFortuneService" class="com.springdemo.HappyFortuneService">
  </bean>

  <bean id="myCoach"
  	class="com.springdemo.TrackCoach">
  	<!-- set up constructor injection -->
  	<constructor-arg ref="myFortuneService" />
  </bean>

  <bean id="myCricketCoach" class="com.springdemo.CricketCoach">
    <!-- set up setter injection -->
    <!-- ref: references the id of the bean we define previously -->
    <!-- name: name of the setter method set<name>, where the first
    letter of the name is capitalized -->
    <property name="fortuneService" ref="myFortuneService" />
    <!-- inject literal values, where name is the name of the attribute in the bean
    and value is the value to set the value to -->
    <!-- Note that we are now referencing the values from the properties file -->
    <property name="emailAddress" value="${foo.email})" />
    <property name="team" value="${foo.team}" />
  </bean>

</beans>
```

#### Main Method

In the main method, we create our object as usual, and if we invoke the `getter` methods, we retrieve the values passed in the property file:

```java
package com.springdemo;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDemoApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		// retrieve bean from spring container
		CricketCoach theCoach = context.getBean("myCricketCoach", CricketCoach.class);

		// retrieve attribute values from property file
		System.out.println(theCoach.getTeam());
		System.out.println(theCoach.getEmailAddress());

		// close the context
		context.close();
	}
}
```

## Bean Scopes

### Intro

The scope of a bean refers to the life cycle of the bean:

- How long does it live
- How many instances are created
- How is the bean shared

The default scope of the bean is a `Singleton`:

- The Spring container creates only one instance of the bean
- It is cached in memory
- All requests to the bean will return a shared reference to the same bean

Other scopes are:

![Bean Scopes](../../assets/bean_scopes.png)

- A singleton scope is good for stateless data
- A prototype scope is good for stateful data (the container returns a new bean for each request). Note that for this type of bean, Spring does not call the destroy method.

### Specify Scope in XML Config File

```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd">

  <!-- Define your beans here -->

  <!-- define the dependency -->
  <bean id="myFortuneService"
	class="com.springdemo.HappyFortuneService">
  </bean>

  <!-- Note the new tag "scope" -->
  <bean id="myCoach"
	class="com.springdemo.TrackCoach"
	scope="prototype">

	<!-- set up constructor injection -->
	<constructor-arg ref="myFortuneService" />
  </bean>

</beans>
```

### Main Method

Now, from our application we do:

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanScopeDemoApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("beanScope-applicationContext.xml");

		// retrieve bean from spring container
		Coach theCoach = context.getBean("myCoach", Coach.class);

		Coach alphaCoach = context.getBean("myCoach", Coach.class);

		// check if they are the same
		boolean result = (theCoach == alphaCoach);

		// print out the results
		System.out.println("\nPointing to the same object: " + result);

		System.out.println("\nMemory location for theCoach: " + theCoach);

		System.out.println("\nMemory location for alphaCoach: " + alphaCoach + "\n");

		// close the context
		context.close();
	}
}
```

Observe, the `result` variable should be set to false, because we are using the `prototype` scope. Also the values of the memory location for the two objects should be distinct for that same reason.

However if we were using `scope="singleton"`, then result should be true, and both objects should have the same memory location.

## Bean Life Cycle

### Define Methods

First of all we define the methods in our bean:

```java
package com.springdemo;

public class TrackCoach implements Coach {

	private FortuneService fortuneService;

	public TrackCoach() {

	}

	public TrackCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Run a hard 5k";
	}

	@Override
	public String getDailyFortune() {
		return "Just Do It: " + fortuneService.getFortune();
	}

	// add an init method
	public void doMyStartupStuff() {
		System.out.println("TrackCoach: inside method doMyStartupStuff");
	}

	// add a destroy method
	public void doMyCleanupStuffYoYo() {
		System.out.println("TrackCoach: inside method doMyCleanupStuffYoYo");
	}
}

```

### Configure Hooks in the Configuration File

Once the initialization and clean-up methods have been defined, we configure them in our configuration file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

	<!-- Define your beans here -->

	<!-- define the dependency -->
	<bean id="myFortuneService"
	  class="com.springdemo.HappyFortuneService">
	</bean>

	<!-- Note the new tag "scope" -->
	<bean id="myCoach"
	class="com.springdemo.TrackCoach"
		init-method="doMyStartupStuff"
		destroy-method="doMyCleanupStuffYoYo">

		<!-- set up constructor injection -->
		<constructor-arg ref="myFortuneService" />
	</bean>

</beans>
```

### Main Method

Now in our App, we create the bean to check that our methods are being called:

```java
package com.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanLifeCycleDemoApp {

	public static void main(String[] args) {

		// load the spring configuration file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("beanLifeCycle-applicationContext.xml");

		// retrieve bean from spring container
		Coach theCoach = context.getBean("myCoach", Coach.class);

		System.out.println(theCoach.getDailyWorkout());

		// close the context
		context.close();
	}

}
```

### Notes

When using XML configuration, I want to provide additional details regarding the method signatures of the init-method and destroy-method .

- Access modifier: The method can have any access modifier (public, protected, private)
- Return type: The method can have any return type. However, "void' is most commonly used. If you give a return type just note that you will not be able to capture the return value. As a result, "void" is commonly used.
- Method name: The method can have any method name.
- Arguments: The method can not accept any arguments. The method should be no-arg.
