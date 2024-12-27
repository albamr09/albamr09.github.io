---
title: Container Orchestration
weight: 3
type: docs
---

## Container Orchestration

When in production, it is often needed that several instances of containers are run (because of a heavy load on the application for example). So in these cases you need to monitor the instances as well as the host itself in case any of them crash.

For that we use container orchestration that offers a set of tools and scripts that allow us to manage the hosts and containers.

The typical approach is to create several instances of containers in different hosts, so if one fails the application can still offer the service. For example:

```console
$ docker service create --replicas=100 nodejs
```

Some solutions let us automatically scale the number of containers depending on the demand. Others can help in automatically adding new hosts to support the user load.

They also provide complex networking between the containers as well as load balancing user requests across different hosts or sharing storage between the hosts, configuration management or security.

There are several solutions:

- `Docker Swarm` from `Docker`
- `Kubernetes` from `Google`
- `MESOS` from `Apache`.

## Docker Swarm

### Docker Service

`Docker Services` are one or more instances of application or services that run along the nodes in the Swarm cluster.

```console
$ docker services create --replicas=3 <image-name>
```

This creates three instances of my image and runs them in the nodes of the cluster.

This command must be run on the manager node, not on the worker nodes.

It is similar to the `docker run` command in terms of the options to pass (networks, ports, interactive mode, etc.)

## Kubernetes

### Architecture

A `kubernetes` cluster consists of several nodes, the worker nodes are where containers will be launched, so even if one node fails the application is still available.

`Kubernetes` clusters are managed by the master, which is a node that watches over worker nodes and is responsible of the orchestration of containers in the worker nodes.

### Components

When you install `Kubernetes` in your system you are actually installing:

- `API Server`: acts as the front-end for `Kubernetes`, so all of the programs talk to this server to interact with the `kubernetes` server.
- `etcd`: it is the distributed reliable key value store to store all data to manage the cluster.
- `Scheduler`: responsible for distributing work.
- `Controller`: responsible for noticing/responding to nodes/containers going down.
- `Container Runtime`: underline software used to run containers (e.g. `Docker`).
- `kubelet`: is the agent that runs in each node in the cluster, and is responsible of making sure the containers are running on the nodes as expected.

One of the command line utilities used by `Kubernetes` is `kubectl`, that is the `Kubernetes CLI` and is used to deploy and manage applications on a `kubernetes` cluster.
