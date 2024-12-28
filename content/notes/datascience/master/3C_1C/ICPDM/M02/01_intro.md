# Introduction To Apache Spark

## Key Features of Apache Spark

- **Unified Platform**: Spark offers a single platform for diverse data processing tasks, enabling developers to use the same engine and APIs for different types of data analysis, like processing data in batches, running SQL queries, handling real-time data streams, and even machine learning.
- **Rich Libraries**: Spark includes a collection of built-in and external libraries, such as Spark SQL for structured data processing, MLlib for machine learning, Spark Streaming and Structured Streaming for stream processing, and GraphX for graph analytics.
- **Designed for Big Data**: Spark addresses the challenges of processing massive datasets, driven by changes in hardware towards multi-core processors and the explosion in data volume and storage capabilities.

## History and Evolution

- **Origins**: Spark originated in 2009 at UC Berkeley's AMPlab as a research project aimed at overcoming the limitations of Hadoop MapReduce for iterative algorithms.
- **Early Focus**: Initial releases concentrated on batch applications and interactive data science using Scala and Shark (a SQL engine).
- **Expansion**: Spark adopted a "standard library" approach, expanding with libraries like MLlib, Spark Streaming, and GraphX.
- **Open Source Development**: In 2013, Spark became part of the Apache Software Foundation, leading to active development and widespread adoption.
- **Recent Developments**: Recent releases have focused on refining structured APIs such as DataFrames and Datasets for enhanced optimisation

## Architecture of Apache Spark

- **Cluster Management**: Spark uses a cluster manager, such as standalone, YARN, or Mesos, to manage cluster resources.
- **Application Structure**: A Spark application consists of a driver process and multiple executor processes.
  - **Driver Process**: The driver runs the `main()` function, maintains application information, interacts with the user, and schedules tasks across executors.
  - **Executor Processes**: Executors execute Spark code on data partitions distributed across the cluster.

![Spark Architecture](../assets/spark_architecture.png)

Spark supports multiple language APIs, including Python, Java, Scala, R, and SQL [5]. Developers can write applications in their preferred language.

## Core Concepts and APIs

### Core Concepts

- Unified Analytics Engine: Spark provides a consistent set of APIs for various data processing tasks, including batch processing, SQL queries, streaming computation, and machine learning.
- Computing Engine Focus: Spark primarily processes data loaded from diverse storage systems, rather than functioning as permanent storage itself.
- Parallel Processing: Spark leverages parallel processing to efficiently analyse massive datasets, addressing the challenges posed by the shift to multi-core processors and the explosion of data.
- Lazy Evaluation: Spark optimises execution plans before processing, delaying action until triggered.

### APIs

- **SparkSession**:  The entry point for interacting with Spark functionality, managing the Spark application and providing access to various APIs.
- **DataFrames**:  The primary structured API representing tabular data in rows and columns
  - **Partitions**:  Data is divided into partitions for parallel processing across executors
  - **Transformations**: Operations that define modifications to a DataFrame without altering the original data, including narrow transformations that operate within partitions and wide transformations that involve shuffling data across partitions.
  - **Actions**: Actions trigger the execution of transformations and return results
- **Datasets**: A type-safe version of the structured API in Java and Scala, enabling compile-time checks for data types
- **Resilient Distributed Datasets (RDDs)**: Spark's lower-level API, providing more control over data partitioning and manipulation but less commonly used in modern Spark applications
- **Structured Streaming**:  A high-level API that allows applying batch-like operations to streaming data
- **MLlib**: Spark's machine learning library, offering algorithms for classification, regression, clustering, and deep learning

## Running Spark Applications and Ecosystem

- **Spark-submit**:  A command-line tool for submitting Spark applications to a cluster, allowing for resource specification, execution parameters, and command-line arguments.
- **Spark Ecosystem and Packages**: A wide range of third-party packages expands Spark's functionality and integrates with various systems.

## Conclusion

Spark provides a powerful and versatile platform for tackling big data challenges across various domains. Its unified engine, rich libraries, and intuitive APIs empower developers to efficiently process, analyse, and extract insights from large datasets.
