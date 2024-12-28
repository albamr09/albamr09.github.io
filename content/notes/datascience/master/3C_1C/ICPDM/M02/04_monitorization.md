# Configuración, monitorización y optimización de Spark

## Monitoring Spark Applications

This document explains how to monitor Spark applications using logs and the Spark UI. It covers the different components involved in a Spark application and what to monitor to ensure its smooth execution.

### What to monitor

When monitoring a Spark application, it's essential to monitor the following:

- Processes: Monitor processes running your application at the level of CPU usage, memory usage etc.
- Query Execution: Keep track of jobs, tasks and other aspects of query execution.

### Monitoring the Driver and Executors

- Importance: The driver holds the application's state and executors run individual jobs. It's crucial to monitor both to ensure their stability.
- Metrics System: Spark provides a configurable metrics system based on the Dropwizard Metrics Library to monitor driver and executor states.
- Configuration: The metrics system can be configured using a configuration file located at $SPARK_HOME/conf/metrics.properties.
- Output Sinks: The metrics can be output to various sinks, including cluster monitoring solutions like Ganglia.

### Monitoring Queries and Tasks

- Granular Monitoring: Spark allows you to monitor individual queries, jobs, stages, and tasks.
- Performance Tuning: This granular information helps you with performance tuning and debugging.

### Spark Logs

- Detailed Monitoring: Spark logs offer a detailed way to monitor applications, highlighting strange events or errors that might cause job failures.
- Integrated Logging: If you use the application template provided in this book, your application logs will appear alongside Spark's logs. This makes it easy to correlate the two.
- Changing Log Level: You can change Spark's log level to adjust the detail of the logs.
- Log Location: Logs are either printed to standard error in local mode or saved to files by your cluster manager when running Spark on a cluster.
- Benefits of Log Collection: Collecting logs helps you debug issues and can be referenced in the future if an application crashes.

### Spark UI

- Visual Monitoring: The Spark UI provides a visual interface for monitoring running applications and viewing metrics about your Spark workload.
- Accessibility: Each Spark Context launches a web UI, by default on port 4040, accessible via your web browser. Multiple applications will launch web UIs on increasing port numbers (4041, 4042...).
- UI Tabs: The UI includes tabs for Jobs, Stages, Storage, Environment, SQL, and Executors, providing information on the corresponding aspects of your Spark application.

Example: This document walks through an example using the SQL tab to trace a query execution, providing a visual representation of the job, stages and tasks. The example shows how to:

- Navigate to the SQL tab in the Spark UI after running a SQL query.
- Interpret aggregate statistics about the query, such as submission time, duration, and number of jobs.
- Understand the Directed Acyclic Graph (DAG) of Spark stages, where each blue box represents a stage of Spark tasks, forming a job.
- Examine each stage to understand its function.
- Analyse the job's execution in the Jobs tab, breaking down stages and tasks.
- Click individual stages to view detailed information about their execution.
- Review the Summary Metrics section, which provides statistics about various metrics.
- Examine per-executor details to identify any struggling executors.
- Access and understand the more detailed metrics by clicking "Show Additional Metrics."

Other Tabs:

- Storage: Shows information about cached RDDs/DataFrames on the cluster, helpful for seeing if data has been evicted from the cache.
- Environment: Shows information about the runtime environment, including Scala, Java, and configured Spark properties.
- Configuration: You can configure the Spark UI using network configurations and behaviour settings. Refer to the relevant table on Spark UI Configurations in the Spark documentation.

### Spark REST API

- Programmatic Access: The Spark REST API offers programmatic access to Spark's status and metrics.
- Location: The REST API is available at http://localhost:4040/api/v1.
- Purpose: The REST API enables the building of visualisations and monitoring tools on top of Spark.
- Data: It exposes similar information to the web UI, except for SQL-related information.
- Use: The API is valuable for building custom reporting solutions. For a list of API endpoints, consult the relevant table on REST API Endpoints in the Spark documentation.

### Spark UI History Server

- Post-Execution Access: The Spark UI History Server provides access to the Spark UI and REST API even after an application ends or crashes.
- Requirement: The application must be configured to save an event log using spark.eventLog.enabled and spark.eventLog.dir settings.
- Usage: Once events are logged, you can run the history server as a standalone application to reconstruct the web UI. Some cluster managers and cloud services configure logging automatically and run a history server by default.
- Additional Configurations: You can further configure the history server, details of which can be found in the Spark History Server Configurations table in the Spark documentation.

### Debugging and Spark First Aid

The source outlines various issues and their possible solutions that you might encounter when working with Spark, such as:

- Spark Jobs Not Starting: This section explains potential reasons why your Spark jobs may not be starting and offers possible solutions. These include verifying network configurations, resource allocation, and cluster setup.
- Errors Before Execution: This part focuses on debugging errors that occur even before your Spark job starts execution. The source suggests scrutinising your code for errors, checking network connectivity, and troubleshooting library or classpath issues.
- Errors During Execution: The document addresses issues arising during the execution of a Spark job. It recommends checking for data consistency, schema correctness, and logic errors in your code.
- Slow Tasks or Stragglers: This section focuses on identifying and addressing slow tasks, often termed "stragglers." The source attributes these to uneven data distribution, skewed keys, or hardware problems. It suggests solutions like repartitioning data, increasing memory allocation, and identifying problematic executors.
- Slow Aggregations: This section focuses on slow aggregations, recommending solutions such as increasing partitions, executor memory, and optimising data handling, specifically related to null values.
- Slow Joins: Similar to slow aggregations, this section deals with slow join operations. It suggests exploring different join types, optimising join order, and using broadcast joins when possible.
- Slow Reads and Writes: This part addresses slow input/output (I/O) operations, particularly with network file systems. It suggests enabling speculation to mitigate transient issues, ensuring adequate network bandwidth, and utilising locality-aware scheduling.
- Driver OutOfMemoryError or Driver Unresponsive: This section explains the critical issue of driver failure due to insufficient memory. It suggests avoiding collecting large datasets to the driver, controlling broadcast join sizes, and optimising memory usage.
- Executor OutOfMemoryError or Executor Unresponsive: This section deals with executor failures due to memory issues. It recommends increasing executor memory, optimising data partitioning and null value handling, and using Java monitoring tools to identify problematic objects.
- Unexpected Nulls in Results: This part focuses on unexpected null values, recommending validating data formats, using accumulators to count parsing errors, and ensuring that transformations result in valid query plans.
- No Space Left on Disk Errors: This section addresses disk space issues, suggesting increasing storage capacity, repartitioning data to avoid skew, and managing log and shuffle files.
- Serialization Errors: This part explains serialization errors, typically encountered with custom logic using UDFs or RDDs. It suggests ensuring that all required data and code can be serialized and properly registering classes when using Kryo serialization.

### Code Examples

The source provides one code example to demonstrate how to use the Spark UI for monitoring and debugging. Here is the code snippet and an explanation:

```python
# in Python
spark.read\
  .option("header", "true")\
  .csv("/data/retail-data/all/online-retail-dataset.csv")\
  .repartition(2)\
  .selectExpr("instr(Description, 'GLASS') >= 1 as is_glass")\
  .groupBy("is_glass")\
  .count()\
  .collect()
```

This code snippet performs a series of operations on a CSV file using PySpark, Spark's Python API:

- `spark.read.option("header", "true").csv(...)`: This line reads a CSV file located at `/data/retail-data/all/online-retail-dataset.csv`, specifying that the file has a header row.
- `.repartition(2)`: The data is repartitioned into two partitions. This action is explicitly taken to demonstrate how the number of partitions affects task distribution in the Spark UI.
- `.selectExpr("instr(Description, 'GLASS') >= 1 as is_glass")`: This line adds a new column named `is_glass`. It uses the `instr` function to check if the `Description` column contains the word "GLASS". If the word is found, the `is_glass` column is set to `True`; otherwise, it's set to `False`.
- `.groupBy("is_glass").count()`: The data is grouped by the `is_glass` column, and the count for each group is calculated.
- `.collect()`: This action collects the results of the count operation to the driver node.

## Optimising Spark Application Performance

This note summarises ways to improve the performance of Spark applications based on the source document. It covers both indirect enhancements and direct performance enhancements.

### Indirect Performance Enhancements

These are enhancements you can apply to improve Spark jobs generally, rather than focusing on specific jobs or stages.

#### Design Choices

The choices you make when designing your applications can significantly impact performance. Here are a few things to consider:

- Choice of language: Spark's Structured APIs perform similarly across languages like Scala, Java, Python, and R. However, if custom transformations are needed, using Scala or Java is recommended for UDFs as they offer better performance and type safety compared to Python or R.
- Using DataFrames/SQL/Datasets: These offer better performance compared to RDDs due to Spark's SQL engine optimisations. If you have to use UDFs, Scala or Java will perform better than Python or R.
- Object Serialisation in RDDs: Kryo serialisation is recommended over Java serialisation as it's more compact and efficient. Register the classes you want to serialise with Kryo

#### Cluster Configurations

Optimising cluster configurations can yield significant performance gains. Monitoring machine performance is crucial, especially in shared cluster environments. Consider the following:

- Resource Allocation: Dynamic allocation allows applications to adjust resources based on workload, enabling efficient resource sharing in a cluster.
- Scheduling: Using scheduler pools for parallel job execution and dynamic allocation or setting max-executor-cores can optimise resource usage.

#### Data at Rest

Efficient data storage is key to fast data reads. Opting for structured binary formats and utilising features like data partitioning can optimise read performance. Here are some points to consider:

- File Format: Use structured, binary formats like Apache Parquet as they are faster to parse than formats like CSV.
- Splittable File Types: Use splittable file types like gzip, bzip2, or lz4 (especially when compressed) for parallel data reads. Avoid non-splittable formats like ZIP or TAR.
- Table Partitioning: Partition data based on frequently used filter keys like date or customer ID to improve query performance by reducing data reads.
- Bucketing: Bucketing "pre-partitions" data based on potential joins or aggregations, enhancing performance and stability by ensuring consistent data distribution.
- Number of Files: Aim for a balance between the number and size of files. Too many small files increase overhead while fewer large files limit parallelism. An ideal size for files is a few tens of megabytes.
- Data Locality: Spark can schedule tasks close to data blocks if the storage system supports locality hints (like HDFS), reducing network overhead.
- Statistics Collection: Collecting statistics on tables (both table-level and column-level) allows the cost-based optimizer to make informed decisions for operations like joins and aggregations.

#### Shuffle Configurations

The external shuffle service can improve performance by allowing nodes to read shuffle data from remote machines even when those machines are busy. Consider tuning shuffle configurations like the number of concurrent connections per executor. Using Kryo serialisation for RDD-based jobs and optimising the number of shuffle partitions can also enhance performance.

#### Memory Pressure and Garbage Collection

Excessive garbage collection can hinder performance. Strategies for mitigating this include:

- Using Structured APIs: Structured APIs reduce memory pressure by avoiding the creation of JVM objects.
- Monitoring Garbage Collection: Track garbage collection frequency and duration by adding JVM options like -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCTimeStamps to the spark.executor.extraJavaOptions configuration.
- Garbage Collection Tuning: Tune garbage collection based on insights from the gathered statistics. The Spark documentation provides detailed guidance on tuning parameters.

### Direct Performance Enhancements

These enhancements focus on specific Spark jobs or stages and may require individual inspection and optimisation.

#### Parallelism

Increasing parallelism is a key strategy for speeding up stages that process substantial amounts of data. Aim for at least 2-3 tasks per CPU core. Adjust the spark.default.parallelism and spark.sql.shuffle.partitions properties accordingly.

#### Improved Filtering

Filtering data as early as possible in the data processing pipeline significantly reduces the amount of data processed, improving performance. Utilise push-down predicates to filter data at the source level. Leveraging partitioning and bucketing also facilitates efficient filtering.

#### Repartitioning and Coalescing

Repartitioning, which incurs a shuffle, can improve data balancing across the cluster. However, coalescing, which merges partitions on the same node, is a more efficient option when reducing the number of partitions as it avoids a shuffle. Repartitioning can be beneficial before joins or caching.

#### Custom Partitioning

While rarely necessary, custom partitioning at the RDD level provides granular control over data organisation across the cluster, potentially optimising performance and stability.

##### User-Defined Functions (UDFs)

Minimising the use of UDFs is recommended as they introduce overhead by requiring data representation as JVM objects. Prioritise the use of Structured APIs for efficient transformations. Explore options like Vectorized UDFs for Python, which process data in batches using Pandas data frames.

##### Temporary Data Storage (Caching)

Caching stores frequently accessed datasets in memory or on disk, reducing the need to recompute them. However, consider the cost of serialisation, deserialization, and storage when deciding whether to cache. Caching is particularly beneficial for iterative operations or when reusing datasets multiple times.

Spark offers various storage levels for caching, each with different performance characteristics. Refer to Table 19-1 in the source for details on the available storage levels.

#### Joins

Understanding the different types of joins and their execution mechanisms is crucial for optimisation. Prefer equi-joins as they are easily optimised by Spark. Strategically filtering data and ordering joins can also improve performance. Use broadcast join hints to guide Spark's query planning. Minimise the use of Cartesian joins or full outer joins as they can often be replaced with more efficient filtering-style joins.

#### Aggregations

Optimise aggregations by filtering data beforehand and ensuring sufficient parallelism. When using RDDs, choose aggregation methods like reduceByKey over groupByKey for improved speed and stability.

#### Broadcast Variables

Broadcast variables can improve performance by distributing read-only copies of large datasets used across multiple UDF calls to all nodes, reducing data transfer overhead. This technique is beneficial for datasets like lookup tables or machine learning models.

### Code Examples

The provided source document offers two code examples that focus on:

- Registering classes for Kryo serialisation: This snippet demonstrates how to configure Spark to use Kryo for object serialisation in RDD transformations, which can be more efficient than the default Java serialisation.
- Caching a DataFrame: This example illustrates how to use the `cache()` method to store a DataFrame in memory for faster access in subsequent operations, showcasing a simple performance optimisation technique.

#### Code Example 1: Registering Classes for Kryo Serialisation

```java
conf.registerKryoClasses(Array(classOf[MyClass1], classOf[MyClass2]))
```

This code snippet, presented in the context of optimising object serialisation in RDDs, demonstrates how to register specific classes (`MyClass1` and `MyClass2`) with the Kryo serialiser. Kryo is a more efficient serialisation library compared to Java's default serialisation mechanism, offering both compactness and speed advantages.

To enable Kryo serialisation, you need to set the `spark.serializer` configuration property to `org.apache.spark.serializer.KryoSerializer`. After enabling Kryo, you can register the classes you'll be working with using the `registerKryoClasses` method on the `SparkConf` object.

By registering these classes, you instruct Kryo to handle their serialisation and deserialization, potentially leading to improved performance in RDD transformations that involve these custom data types.

#### Code Example 2: Caching a DataFrame

```python
# in Python
# Original loading code that does **not** cache DataFrame
DF1 = spark.read.format("csv")\
  .option("inferSchema", "true")\
  .option("header", "true")\
  .load("/data/flight-data/csv/2015-summary.csv")
DF2 = DF1.groupBy("DEST_COUNTRY_NAME").count().collect()
DF3 = DF1.groupBy("ORIGIN_COUNTRY_NAME").count().collect()
DF4 = DF1.groupBy("count").count().collect()
DF1.cache()
DF1.count()
# in Python
DF2 = DF1.groupBy("DEST_COUNTRY_NAME").count().collect()
DF3 = DF1.groupBy("ORIGIN_COUNTRY_NAME").count().collect()
DF4 = DF1.groupBy("count").count().collect()
```

This code example demonstrates the use of caching to optimise the repeated use of a DataFrame.

- Initial DataFrame Loading: The first code block loads a DataFrame (`DF1`) from a CSV file. Three subsequent DataFrames (`DF2`, `DF3`, and `DF4`) are derived from `DF1`, each performing a `groupBy` and `count` operation. Without caching, these operations would repeatedly read and parse the original CSV file, leading to redundant work.
- Caching the DataFrame: The second code block introduces the `cache()` method applied to DF1. This instructs Spark to store the DataFrame in memory after its first computation. The `count()` action is used to trigger the caching process as caching is a lazy operation in Spark.
- Benefit of Caching: The final code block re-executes the groupBy and count operations for `DF2`, `DF3`, and `DF4`. Due to caching, these operations now access the DataFrame from memory, significantly reducing processing time by avoiding the repeated file reads and parsing.
 
This example highlights how caching can substantially improve performance in scenarios where a dataset is reused multiple times. The `persist()` method, which provides more control over storage levels (memory, disk, or both), is also mentioned as an alternative to `cache()`.
