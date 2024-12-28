---
title: Servicios en la nube para el almacenamiento y procesamiento de datos
weight: 4
type: docs
math: true
---

## Proveedores de soluciones: AWS

### Casos de Uso

#### Casos de Uso I: Consultas en un Data Lake de Amazon S3

En este caso en concreto, tenemos que se alamcenan los datos "en crudo" en un Bucket dentro de Amazon S3. Podemos utilizar las herramientas de **AWS Glue** que nos permiten estructurar y catalogar estes datos (ver la figura inferior).

![Use Case 1](../assets/aws_use_case_1.png)

A partir del catálogo generado por AWS Glue podemos utilizar distintas herramientas como Amazon Athena, Amazon Redshift o Amazon EMR (basado en el esquema MapReduce) para analizar y hacer consultas sobre los datos.

Finalmente, Amazon posee otra herramienta: Amazon QuickSigth, que lleva a cabo reportes de manera automática sobre los datos.

#### Casos de Uso II: Análisis de Datos de Registros en su Almacén de Datos

Para este otro caso, tenemos como mayor diferencia que en lugar de utilizar como datos de entrada sólo un Bucket en AWS S3, podemos utilizar distintas fuentes de datos como Amazon Redshift, Amazon RDS o una base de datos relacional cualquiera ejecutándose dentro de Amazon EC2 (servicio de máquinas virtuales).

![Use Case 2](../assets/aws_use_case_2.png)

A partir de estas fuentes de datos utilizamos AWS Glue para catalogar los datos y para aplicar transformaciones si es necesario (AWS Glue ETL).

Los pasos siguientes son los mismos que para el caso anterior.

#### Casos de Uso III: Canalizaciones de ETL Determinadas por Eventos

Para este caso, lo que se ilustra es que podemos definir funciones/script AWS Lambda que son accionados por eventos (p.ej. inserción de nuevos datos). Estas funciones lambda pueden hacer que se cataloguen los nuevos datos, o pueden ejecutar un script ETL y almacenar el resultado en AWS S3 o Amazon Redshift.

![Use Case 3](../assets/aws_use_case_3.png)

### Amazon Web Services

En la siguiente imagen se ilustra la secuencia de fases por las que pasan, o pueden pasar, los datos en AWS indicando las herramientas que podemos utilizar en cada una de las fases.

![Amazon Web Services](../assets/amazon_web_services.png)

1. **Recolección y almacenamiento de datos**: Los datos pueden ser directamente almacenados mayormente en AWS S3. También tenemos el servicio Kinesis que se basa en streaming.
2. **Procesamiento de eventos**: El procesamiento de eventos puede conllevar el definir funciones lambda en Amazon AWS que accionen otras operaciones como vimos anteriormenete. También se puede aplicar EMR sobre los eventos, entre otros.
3. **Procesamiento de los datos**: como hemos visto en los casos de uso anteriores podemos utilizar AWS Glue para procesar (catalogar) los datos almacenados. También podemos utilizar EMR que se trata de un servicio basado en MapReduce y también tenemos la aplicabilidad de algoritmos de aprendizaje automático sobre los datos. Por otro lado podemos simplemente almacenar los datos en el Data Lake por defecto en AWS que es Amazon Redshift.
4. **Análisis de los datos**: fuera del alcance de esta asignatura.

En esta asignatura nos centraremos en el procesamiento de datos utilizando EMR.

#### Amazon EMR

Este servicio se ejecuta en un clúster Spark-Hadoop, por lo tanto podremos utilizar tanto Hadoop como Spark dentro del mismo. En la siguiente figura se ilustra cómo utilizar esta herramienta.

![Amazon EMR](../assets/amazon_emr.png)

1. Subimos nuestros datos a un bucket en AWS S3.
2. Creamos un clúster EMR, configurado de la manera que se crea precisa.
3. Una vez creado podemos utilizar herramientas de monitorización para supervisar el clúster.

#### Spot Instances

Amazon EMR al final es una instancia de Amazon EC2 preconfigurada que simplifica considerablemente el proceso de configuración/instalación del clúster para poder utilizar Hadoop o Spark.

Las **spot instances** lo que nos permiten es definir estas máquinas virtuales de tal manera que sólo se ejecuten cuando es preciso, en lugar de estar ejecutándose de forma continua (ver la [documentación](https://aws.amazon.com/es/ec2/spot/use-case/emr/) para más información)

#### Amazon Kinesis

Se trata de un servicio que trabaja con datos en streaming que ofrece alta eficiencia es escalable y autogestionado. Como es de esperar está integrado con Amazon ERM y con otras soluciones de almacenamiento como son Amazon S3, Redshift, DynamoDB, etc.

##### Tipos

**Amazon Kinesis Video Streams**: los datos de entrada son datos multimedia, como son los vídeos. Una vez procesados con Kinesis estes pueden ser consumidos por otras herramientas de IA como son Amazon Rekognition Video, Amazon SageMaker, entre otros.

![Amazon Kinesis Video Streams](../assets/amazon_kinesis_video_streams.png)

**Amazon Kinesis Data Streams**: trabaja sobre datos tanto estructurados como no estructurados, que, tras ser procesados pueden utilizarse como entrada para otras herramientas como **Amazon Kinesis Data Analytics**, **Spark on EMR**, **AWS Lambda**, entre otros.

![Amazon Kinesis Data Streams](../assets/amazon_kinesis_data_streams.png)

**Amazon Kinesis Data Firehose**: se trata de la evolución de la herramienta anterior que simplifica el procesamiento. Realmente se puede entender como un distribuidor de información que pude ser posteriormente almacenada en S3, Redshift o utilizada en herramientas como Elasticsearch Service.

![Amazon Kinesis Data Firehose](../assets/amazon_kinesis_data_firehose.png)

**Amazon Kinesis Data Analytics**: no se trata de otro tipo per se. Se trata de una herramienta que permite llevar a cabo análisis sobre los datos en tiempo real. Como podemos ver en la figura inferior, en la primera fase utilizamos los servicios de ingesta de datos en streaming de Kinesis (Amazon Kinesis Data Firehose, Amazon Kinesis Data Streams) que envían los datos a Amazon Kinesis Data Analytics para llevar a cabo el análisis.

![Amazon Kinesis Data Analytics](../assets/amazon_kinesis_data_analytics.png)
