# Programming Spark Applications

## Chapter 3: Building and Running a Spark Application

Spark applications can be built and run in different ways:

- **Interactive Mode with Spark Shell**: This method is suitable for quick prototyping and interactive data exploration. Spark provides a shell interface for Scala, Python, and R, allowing users to execute commands and get immediate feedback. This interactive mode is excellent for learning Spark APIs, testing code snippets, and performing ad-hoc data analysis.
- **IDE for Application Development**: For developing more complex applications, Integrated Development Environments (IDEs) like Eclipse and IntelliJ are popular choices. These IDEs provide features like code completion, debugging, and project management, making it easier to develop, test, and deploy Spark applications.

### Building Spark Jobs with Maven

Building Spark jobs is slightly more intricate than building standard applications. This complexity arises because Spark applications often need to be executed on a cluster of machines, requiring Spark dependencies to be available on all nodes. There are two primary methods for building Spark jobs:

- **Building with Maven**: Maven is a widely used build tool in the Java ecosystem, and it is officially recommended for packaging Spark applications. Maven simplifies the build process by managing dependencies, compiling code, and packaging it into a JAR file. Developers can include Spark dependencies through Maven Central, a public repository for Java libraries. Maven can also package Spark and its dependencies into a single executable JAR file, making it easier to deploy and run on a cluster.
- **Building with Other Build Systems**: While Maven is the recommended build tool, Spark supports building a "fat JAR" file that contains all its dependencies. This fat JAR can be used with other build systems like Sbt, Gradle, or even custom build scripts. The process usually involves building the Spark assembly JAR using Sbt and then including it in the build path of the other build system. This approach allows developers to use their preferred build tools while still ensuring that all necessary dependencies are included.

Steps to build a Spark Job with **Maven**:
- Create a new directory and generate the Maven template. The example shows building a Java Spark job:
```bash
mkdir example-java-build/; cd example-java-build
mvn archetype:generate \
    -DarchetypeGroupId=org.apache.maven.archetypes \
    -DgroupId=spark.examples \
    -DartifactId=JavaWordCount \
    -Dfilter=org.apache.maven.archetypes:maven-archetype-quickstart
cp ../examples/src/main/java/spark/examples/JavaWordCount.java \
JavaWordCount/src/main/java/spark/examples/JavaWordCount.java
```
- Update Maven `pom.xml` to include Spark version and JDK version information. Add the following code between the <project> tags:
```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.11</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.spark-project</groupId>
        <artifactId>spark-core_2.11</artifactId>
        <version>2.0.0</version>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>1.7</source>
                <target>1.7</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```
- Build the JAR file:
```bash
mvn package
```
- Run the Spark job:
```bash
SPARK_HOME="../"
SPARK_EXAMPLES_JAR="./target/JavaWordCount-1.0-SNAPSHOT.jar"
java -cp ./target/JavaWordCount-1.0-SNAPSHOT.jar:../../core/target/spark-core-assembly-1.5.2.jar spark.examples.JavaWordCount local[1] ../../README
```
 
## Chapter 4: Creating a SparkSession Object

### Understanding the SparkSession Object

The SparkSession object acts as the primary entry point for interacting with Spark functionalities. Introduced in Spark 2.0.0, it represents a connection to a Spark cluster, which can be either local for development and testing or remote for distributed processing on a cluster of machines. The SparkSession provides a unified interface for various Spark components and operations:

- **Unified Entry Point**: Before SparkSession, developers had to interact with multiple context objects like SparkContext, SQLContext, and HiveContext for different functionalities. SparkSession encapsulates these contexts, providing a single entry point for all Spark operations, simplifying the development process.
- **Dataset and DataFrame Creation**: SparkSession enables the creation of Datasets and DataFrames, which are high-level abstractions for representing structured data in Spark. Datasets are type-safe, providing compile-time type checking, while DataFrames offer a schema-based view of the data.
- **SQL Execution**: SparkSession facilitates the execution of SQL queries against data in Spark. It allows users to register DataFrames as temporary views and then run SQL queries against those views, providing a familiar way to interact with data.
- **RDD Access**: While Datasets and DataFrames are the preferred abstractions in Spark 2.0.0 and later, SparkSession still provides access to the underlying RDDs (Resilient Distributed Datasets). Developers can obtain the SparkContext from the SparkSession to work with RDDs when necessary.

### Working with Datasets, DataFrames, and RDDs

Spark provides different abstractions for representing and manipulating data:

- **Datasets and DataFrames**: These are high-level, schema-based abstractions introduced in Spark 2.0.0. Datasets provide type safety and compile-time checking, while DataFrames are untyped but offer a schema-based view of the data. Both Datasets and DataFrames offer a rich API for data manipulation, including filtering, sorting, grouping, aggregation, and joining operations. They are built on top of RDDs and leverage Catalyst, Spark's query optimizer, to optimize execution plans for better performance.
- **RDDs**: RDDs are the fundamental data structure in Spark, representing an immutable, partitioned collection of data distributed across the cluster. RDDs provide low-level control over data and operations, allowing developers to implement custom data processing logic. They are useful for complex computations that cannot be efficiently expressed using Dataset or DataFrame APIs. RDDs follow lazy evaluation, meaning that transformations on RDDs are not executed immediately but are computed only when an action requiring the results is called.

The choice of abstraction depends on the specific use case and the level of control required. Datasets and DataFrames are generally preferred for most data manipulation tasks due to their higher-level API, performance optimizations, and ease of use. RDDs are suitable for situations demanding low-level control or when dealing with unstructured data.

### Building a SparkSession Object

Scala and Python:

```java
val sparkSession = new SparkSession.builder.master(master_path).appName("application name").config("optional configuration parameters").getOrCreate()
```

- It's recommended to read values from the environment with reasonable defaults for flexibility in changing environments.
- `spark-shell/pyspark` automatically creates the SparkSession object and assigns it to the spark variable.
- Access the SparkContext object using spark.sparkContext.
 
## Chapter 5: Loading and Saving Data in Spark

Spark offers flexible mechanisms for loading and saving data from various sources and formats:

- **Loading Data into RDDs**: Data can be loaded into RDDs from various sources, including local collections, text files, CSV files, sequence files, and external databases like HBase. SparkContext provides functions like `parallelize()`, `textFile()`, `sequenceFile()`, and `newAPIHadoopRDD()` to load data into RDDs.
- **Saving Data from RDDs**: RDDs can be saved to different formats like text files, sequence files, and object files. Functions like `saveAsTextFile()`, `saveAsObjectFile()`, and `saveAsSequenceFile()` are used to save RDD data.
- **Loading and Saving Data with Datasets and DataFrames**: Datasets and DataFrames provide more streamlined and efficient methods for data loading and saving. SparkSession's read API supports reading data from various formats like CSV, JSON, Parquet, Avro, and JDBC. Similarly, the write API allows saving data to different formats.

## Chapter 6: Manipulating Your RDD

Spark offers a rich set of operations for manipulating data in RDDs, Datasets, and DataFrames:
- **Transformations**: Transformations are operations that create new RDDs, Datasets, or DataFrames from existing ones without changing the original data. Common transformations include `map()`, `filter()`, `flatMap()`, `reduceByKey()`, `groupByKey()`, and `sortByKey()`.
- **Actions**: Actions are operations that trigger computations on RDDs, Datasets, or DataFrames and return results to the driver program. Examples of actions include `count()`, `collect()`, `reduce()`, `take()`, and `saveAsTextFile()`.
- **Shared States and Accumulators**: While distributed computation in Spark generally discourages shared states, accumulators provide a safe mechanism for aggregating values from different partitions across the cluster. Accumulators are write-only variables that can be used to count events or sum values from different parts of the data.
- **Broadcast Variables**: Broadcast variables enable efficient sharing of read-only data across the cluster. Instead of sending the data to every task, Spark broadcasts the data once to each executor node, making it available to all tasks running on that node.

**Example: Parsing CSV Files with Error Handling (Scala)**

```java
import org.apache.spark.SparkConf
import org.apache.spark.SparkContext
import org.apache.spark.SparkFiles
import org.apache.spark.api.java.JavaSparkContext
import au.com.bytecode.opencsv.CSVReader
import java.io.StringReader

object LoadCsvWithCountersExample {

  def main(args: Array[String]) {

    val sc = new SparkContext("local", "Chapter 6")
    println(s"Running Spark Version ${sc.version}")

    val invalidLineCounter = sc.accumulator(0)
    val invalidNumericLineCounter = sc.accumulator(0)

    val inFile = sc.textFile("/Volumes/sdxc-01/fdps-vii/data/Line_of_numbers.csv")

    val splitLines = inFile.flatMap(line => {

      try {
        val reader = new CSVReader(new StringReader(line))
        Some(reader.readNext())
      } catch {
        case _ => {
          invalidLineCounter += 1
          None
        }
      }
    })

    val numericData = splitLines.flatMap(line => {

      try {
        Some(line.map(_.toDouble))
      } catch {
        case _ => {
          invalidNumericLineCounter += 1
          None
        }
      }
    })

    val summedData = numericData.map(row => row.sum)
    println(summedData.collect().mkString(","))
    println("Errors: " + invalidLineCounter + "," + invalidNumericLineCounter)
  }
}
```

This example demonstrates the use of accumulators to count invalid lines and lines with invalid numeric data. It also utilises `flatMap()` to handle parsing errors and filter out invalid lines.

**Example: Word Frequency Analysis (Python)**

```python
from pyspark.context import SparkContext
from pyspark.conf import SparkConf
from operator import add

print("Running Spark Version %s" % (sc.version))
conf = SparkConf()
print(conf.toDebugString())

# Read and process Barack Obama's speeches
lines = sc.textFile("sotu/2009-2014-BO.txt")
word_count_bo = lines.flatMap(lambda x: x.split(' ')). \
    map(lambda x: (x.lower().rstrip().lstrip().rstrip(',').rstrip('.'), 1)). \
    reduceByKey(add)

word_count_bo.count()  # 6658 without lower, 6299 with lower, rstrip, lstrip 4835

# Read and process Abraham Lincoln's speeches
lines = sc.textFile("sotu/1861-1864-AL.txt")
word_count_al = lines.flatMap(lambda x: x.split(' ')). \
    map(lambda x: (x.lower().rstrip().lstrip().rstrip(',').rstrip('.'), 1)). \
    reduceByKey(add)

word_count_al.count()

# Sort word counts for Barack Obama's speeches
word_count_bo_1 = word_count_bo.sortBy(lambda x: x[1], ascending=False)

# Print top 10 most frequent words
for x in word_count_bo_1.take(10):
    print(x)

# Filter out common words
common_words = [...]
word_count_bo_clean = word_count_bo_1.filter(lambda x: x not in common_words)
word_count_al_clean = word_count_al.filter(lambda x: x not in common_words)

# Find words spoken by Obama but not Lincoln
for x in word_count_bo_clean.subtractByKey(word_count_al_clean).sortBy(lambda x: x[1], ascending=False).take(15):
    print(x)
```

This example illustrates reading text files, splitting into words, calculating word frequencies, sorting, filtering, and comparing word usage between two sets of speeches.

## Chapter 9: Foundations of Datasets/DataFrames – The Proverbial Workhorse for Data Scientists

Spark supports multiple programming languages, including Scala, Java, Python, and R. This multilingual capability allows developers to use the language they are most comfortable with for different parts of a Spark application. This approach, known as polyglot programming, offers several advantages:

- **Leveraging Existing Skills**: Developers can use their existing language skills to work with Spark without having to learn a new language.
- **Using Specialized Libraries**: Different languages have different strengths and specialized libraries. Polyglot programming allows developers to use the most suitable language and libraries for specific tasks within a Spark application.
- **Code Reusability**: Code written in one language can often be reused or adapted for use in other languages, promoting code sharing and reducing development time.
- 
Spark encourages polyglot programming by providing consistent APIs across different languages, making it easy to switch between languages and integrate code written in different languages.
