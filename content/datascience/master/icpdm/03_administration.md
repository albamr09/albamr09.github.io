---
title: Gestión de la información en tiempo real
weight: 3
type: docs
math: true
---

## Introducción a las arquitecturas de procesamiento de streams: Lambda y Kappa

### What are Data Streams?

A data stream is a series of data that comes into a system over time. It's like a river of information that never stops flowing. Here are some important things to remember about data streams:

- Order is Important: The order the data comes in matters because it can show how the data is related. Think about the temperature recorded every hour. The order helps us see how the temperature changes over the day.
- It Never Ends: Data streams can go on forever, so we can't store all the information. Imagine trying to keep all the tweets ever sent!
- We Only See a Part: At any given time, we can only see a small part of the data stream. It's like looking at a small section of a river.
- Speed Changes: The speed at which data arrives can change. Sometimes it's a trickle, and other times it's a flood!

### Challenges with Data Streams

Because data streams are different from traditional data, they pose unique challenges:

- Traditional data mining techniques assume we have all the data at once. With data streams, we only have a part of the data at any time.
- The way data is spread out (its distribution) can change over time. This is called concept drift and means that a model we built yesterday might not work well today.
- We may not get feedback on our models right away. This makes it harder to know if our models are working correctly.

### Key Elements for Analysing Data Streams

To work with data streams, we need special tools:

- Memory: This acts like a temporary storage space to hold incoming data until it can be processed.
- Algorithms: Special algorithms are needed to learn from the data and make decisions. These algorithms need to be fast and able to adapt to changing data.
- Change Monitoring: We need ways to watch for concept drift, which is when the patterns in the data change over time.
- Performance Evaluation: Traditional methods for evaluating models don't work well with data streams. New methods are needed to see how well our models are performing.

### Working with Data Streams: Data Windows

One important technique for handling data streams is called windowing. Since we can't store all the data, windows allow us to focus on the most recent data:

- Landmarks: We can define windows based on specific events. Think about analysing data between each time a sensor is reset.
- Sliding Windows: These windows keep a fixed amount of the most recent data. As new data arrives, old data is dropped.

Example: Imagine you are analysing tweets about a football match. A sliding window might keep only the last 10 minutes of tweets, allowing you to see what people are saying right now.

### Architectures for Handling Data Streams

There are two main ways to build systems for processing data streams:

- Lambda Architecture: This approach uses two paths: one for real-time processing (online) and one for batch processing (offline). It's like having a team that gives quick updates and another team that does a more detailed analysis later.
- Kappa Architecture: This approach uses only real-time processing. It's like having one team that can handle everything quickly.

## Componentes tecnológicos de adquisición y transmisión/distribución de eventos: Kafka

### Introduction

In large-scale data processing, data needs to be transmitted efficiently from its source to the processing system. Traditional methods rely on direct connections between devices, which is not scalable. Message queues and pub/sub systems offer improved scalability.

Message queues involve a single consumer receiving and processing each message. This approach is common in microservices and suitable for bulk task processing. If one consumer fails, another can take over the message.

Pub/sub systems use a central node called a broker to manage message queues, called topics. All consumers subscribed to a topic receive copies of the messages. This is useful for distributing data to multiple systems and is fault-tolerant, allowing consumers to recover missed messages after a failure.

However, traditional pub/sub systems can face performance issues and limited storage capacity in massive data environments. This is where Apache Kafka comes in.

### Apache Kafka

**Apache Kafka is a streaming platform that uses the pub/sub model for sending messages and monitoring events**. It is designed to handle large data streams with high performance and low latency. Kafka offers persistent data storage for a user-defined duration and even includes a processing engine (Kafka Streams) for data transformation before it reaches the consumers.

#### Architecture of Kafka

Kafka's architecture is **distributed and fault-tolerant**, thanks to its high data replication. A Kafka cluster consists of multiple brokers, each typically located on a different server. These brokers store data and can manage multiple topics. Each topic can be distributed across multiple brokers, further enhancing fault tolerance.

**Topics are divided into partitions to improve fault tolerance and throughput**. A partition is essentially a data stream, acting as the fundamental data structure within Kafka. It can be viewed as a log file where data is appended. Sequential writing and reading of data in partitions improve performance. Each data entry in a partition has a unique identifier called an offset, which is helpful for resuming reading from a specific point.

Partitions offer scalability, allowing the size of a topic to exceed the capacity of a single machine. They increase throughput by enabling parallel data serving to multiple consumers. Additionally, partitions provide redundancy because multiple copies of the same partition (called replicas) are stored on different brokers. If one broker fails, the partition can be recovered from another broker.

**It's crucial to note that while the order of data arrival is guaranteed within a partition, it is not guaranteed between different partitions.**

**Replication is a core feature of Kafka's architecture.** A replica is a copy of a partition and plays a vital role in fault tolerance. The replication factor determines the number of copies made for each partition. A designated replica acts as the leader, responsible for receiving and sending data to consumers. The remaining replicas, called followers, synchronise with the leader asynchronously using Zookeeper.

**Zookeeper is another key component in the architecture, managing service discovery and leader election for Kafka brokers**. It informs Kafka about changes in the cluster's topology, ensuring each node knows about new brokers, broker failures, topic additions or removals, and other events. This provides a synchronised view of the Kafka cluster's configuration.

#### Reading and Writing in Kafka

Producers send events or data to Kafka, which are distributed among the different partitions. Each piece of data goes to a single partition, ensuring that the order of arrival is maintained only within those partitions. Write operations are append-only, meaning data is sequentially added to the end of the partition on disk.

Consumers can choose the offset from which they want to read data. Kafka doesn't keep track of which messages have been read, which simplifies the system but makes complex delivery logic more challenging. Consumers are typically organised into groups, ensuring each consumer reads from a different partition and enhancing scalability.

#### Kafka Command Line Interface (CLI)

The Kafka CLI provides a way to interact with Kafka from the command line. It is used for tasks such as initialising Zookeeper and brokers, creating and managing topics, publishing data to topics, and consuming data from them.

### Conclusion

Kafka is a powerful platform designed to handle high-volume data streams in a distributed and fault-tolerant manner. Understanding its architecture, features, and command-line interface is crucial for effectively utilising Kafka in data processing pipelines.

## Procesamiento de streams: Apache Spark Streaming

### What is Spark Streaming?

Spark Streaming is a component of Apache Spark designed for real-time data processing. It takes continuous data streams and processes them in small batches called micro-batches. This approach is based on defining data windows that collect data from the stream and are then processed.

One of the key benefits of Spark Streaming is that it extends the familiar Spark API, meaning the syntax is almost identical. This allows developers to work with streaming data using the same tools and concepts they use for batch processing.

Spark Streaming is versatile in terms of data sources and outputs. It can ingest data from various sources like Kafka, Flume, Twitter, and network sockets. Similarly, it can write processed data to various destinations like HDFS, databases, and dashboards.

### How Spark Streaming Works

The basic workflow of Spark Streaming involves:

1. Creating Micro-Batches: The incoming data stream is divided into micro-batches. The default is timestamp-based windows without overlap, and you specify the window size in seconds.
2. Processing as RDDs: Each micro-batch is treated as an RDD (Resilient Distributed Dataset), the fundamental data structure in Spark. You can apply the same actions and transformations used in regular Spark operations.
3. Managing with DStreams: The sequence of micro-batches is stored in a DStream (Discretized Stream), which provides additional functionality specific to stream processing. Essentially, a DStream represents a continuous stream of RDDs.

### Key Features

- High-level Abstraction: Spark Streaming hides the complexities of stream processing from the user, simplifying development.
- Code Reusability: Since micro-batches are processed as RDDs, you can reuse existing Spark code, including SparkSQL and MLlib libraries.
- Micro-batch Approach: This offers advantages like high throughput (processing more instances per unit of time) but comes with increased latency as the minimum processing time is limited by the batch window size.
- Architecture Fit: Spark Streaming is highly suited for Lambda architectures where Spark handles offline processing, and Spark Streaming manages online processing. However, it might not be ideal for Kappa architectures that aim for purely stream-based processing.

### Using Spark Streaming

1. Create a Streaming Context: This is done using the Spark Context and specifies the duration of each micro-batch.
2. Define Data Input: Spark Streaming supports basic inputs like files, sockets, and RDD queues. It also has advanced input options using libraries for sources like Kafka, Flume, and Kinesis. Custom inputs can also be created using ad-hoc connectors.
3. Apply Transformations: DStreams support various transformations similar to RDDs like `map`, `flatMap`, `filter`, `reduce`, and `count`. These allow you to manipulate and process data within each micro-batch.
4. Define Data Output: Output can be directed to the standard output using `dstream.pprint()`, saved to external storage with `dstream.saveAsTextFiles()`, or processed using custom functions applied to each RDD via `dstream.foreachRDD()`.
5. Start and Manage Processing: The `ssc.start()` command initiates data processing without blocking the program. To keep the script running until the stream processing is finished, use `ssc.awaitTermination()`.

### Additional Features

- Sliding Windows: Spark Streaming provides the `window()` function to create sliding windows across multiple RDDs. This allows you to analyse data over a larger time frame while still processing in micro-batches.
- Stateful Operations: For operations that need to keep track of previous states, Spark Streaming offers the `updateStateByKey()` function. This is useful for tasks like accumulating counts or maintaining averages.
- Checkpointing: When using stateful operations, it's essential to activate checkpointing. This periodically backs up the state and metadata to fault-tolerant storage (like HDFS) to ensure recovery in case of failures.
