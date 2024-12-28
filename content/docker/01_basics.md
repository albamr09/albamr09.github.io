---
title: Docker Basics
weight: 1
type: docs
---

## Intro

### What are containers

They are completely isolated environments, they have their own processes, network interfaces, etc. However they share the same `os kernel`.

`Docker` uses `LXC` containers, which are very low lever, so `Docker` provides a high level tool that allows us to manage our containers easily.

### Sharing the `Kernel`

As we have said, `Docker` uses the system's kernel, so it is capable of running any distributions whose underlying `kernel` is `Linux` (e.g. `Docker` running on `Ubuntu` can run a container based on `Debian`, `Fedora`, etc.)

### Containers vs Virtual Machines

- Containers:

| Application 1       | Application 2       |
| ------------------- | ------------------- |
| Libs/Dependencies 1 | Libs/Dependencies 2 |
| Container 1         | Container 2         |
| Docker              |                     |
| OS                  |                     |
| Hardware            |                     |

- Virtual Machines:

| Application 1       | Application 2       |
| ------------------- | ------------------- |
| Libs/Dependencies 1 | Libs/Dependencies 2 |
| OS 1                | OS 2                |
| Virtual Machine 1   | Virtual Machine 2   |
| `Hypervisor`        |                     |
| Hardware            |                     |

The main differences are the use of `Hypervisors` in Virtual Machines and how on these, each instance has its own OS. Which results in needing more hardware resources. Also Virtual Machines have total isolation, as they use their own OS, which does not happen with containers, because these do share the same kernel.

However the key is combining both technologies, so each virtual machine runs several applications hosted in different containers.

### Container vs Image

An image can be thought as a package or a template that is used to create one or more containers. That is to say, containers are running instances of images that are isolated and have their own environment.

## Set Up

### Install Docker

In the current section we will lay out the steps to carry out in order to get docker up and running on an Arch Linux machine.

#### Docker Engine

Before installing anything we will update the system as follows

```console
$ sudo pacman -Syu
```

When it is done updating we will proceed rebooting the system, and then we enable the loop module:

```console
$ sudo tee /etc/modules-load.d/loop.conf <<< "loop"
$ sudo modprobe loop
```

#### Install using static binaries

For reference go to the official [documentation](https://docs.docker.com/engine/install/binaries/) on Docker's website.

1. Firstly we will download the static binary archive on https://download.docker.com/linux/static/stable/.
2. Once the file is downloaded extract it executing the following command, and substituting our `docker-20.10.8` for your package's version.

```console
$ tar xzvf docker-20.10.8.tgz
```

3. Copy the binaries to your executable path (`/usr/bin or /bin`). This is optional.

```console
$ sudo cp docker/* /usr/bin/
```

4. Start docker's daemon:

```console
$ sudo dockerd
```

5. Finally run to check that the installation was correct (it will download an example image that outputs a message informing the user that the installation was successful, among other things).

```console
$ sudo docker run hello-world
```

#### Official Repo

This other approach will allows to have a docker service so we do not have to always run `sudo dockerd &` to start docker's daemon.

1. We install Docker using `pacman`:

```console
$ sudo pacman -S docker
```

2. Afterwards, we enable the docker service executing:

```console
$ sudo systemctl start docker.service
$ sudo systemctl enable docker.service
```

3. Finally run to check that the installation was correct (it will download an example image that outputs a message informing the user that the installation was successful, among other things).

```console
$ sudo docker run hello-world
```

### Configure Docker

#### Running as normal user

In order to use Docker as a normal user we need to add said user to the docker group.

1. Add the Docker group

```console
$ sudo groupadd docker
```

2. Add your user to the Docker group

```console
$ sudo usermod -aG docker $USER
```

3. Log out, log in and verify that it runs properly

```console
$ docker run hello-world
```

### Install Docker Compose

1. Download the current stable release of Docker Compose. Mind you, this command downloads the `1.29.2` version, check the [official page](https://docs.docker.com/compose/install/) for new releases.

{{{console

$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

}}}

2. Make the binary executable

```console
$ sudo chmod +x /usr/local/bin/docker-compose
```

3. Test the installation

```console
$ docker-compose --version
docker-compose version 1.29.2, build 5becea4c
```

## Container

### RUN

#### Basics

- **Run a container** from an image, the attached way, (i.e. it is not run on the background).

```console
$ docker run nginx
```

If the image is not present on the host it will be downloaded from `Docker Hub`.

When it is downloaded it runs and exits right away, because there is not application running in the container.

To run the container in the `detach mode`, so it run on the background:

```console
$ docker run -d nginx
```

To bring the container to the foreground:

```console
$ docker attach ( container_id | container_name )
```

- Run a container with a specific `tag`:

```console
$ docker run redis:4.0
```

This way we run the `redis` image where `redis`'s version is `4.0`.

- **Run** a container listening to the **standard input** (because by default `Docker` does not listen for input):

```console
$ docker run -i <image_name>
```

This way we are running our container in interactive mode.

In order to attach a terminal:

```console
$ docker run -it <image_name>
```

#### Port Mapping

Each container is assigned a port (e.g. `5000`) and an internal IP by default (e.g. `127.17.0.2`) but this IP is only accessible from the host. So to access it from outside, we would use our host's IP (e.g. `192.168.1.5`), however we still need to map our container's port to a free port in our host.

So to map, for example, the port `5000` of our `Docker` container to the port `80` of our host:

```console
$ docker run -p 80:5000 <image_name>
```

And now, we can access the service running in our `Docker` container by heading to `192.168.1.5:80`. This way all traffic in this specific URL will be routed to the port `5000` in our `Docker` container.

#### Volume Mapping

Our container has its own file system, so the changes made to data stored in it are only made in the container.

If you want certain data to persist (because when removing the `Docker` container the files stored within are also removed) you use the flag `-v` to map a certain file/folder in the container to a certain file/folder in our host:

```console
$ docker run -v /opt/datadir:/var/lib/mysql mysql
```

In this particular example we store the data we saved in our `MySQL` database in a directory in our container (`/var/lib/mysql`), and we map this directory to a directory in our host (`/opt/datadir`) This way `Docker` mounts implicitly the folder in our host to the folder in the container.

### Linking

If we have a web application that connects to a `redis` instance, we need to tell the web app's container which `redis` instance to wait for (because there may be multiple). So, first we start the `redis` container:

```console
$ docker run -d --name=redis redis
```

And now we start our web app's container and we link it with the `redis` container:

```console
$ docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
```

The `redis` before the colon is the name of our `redis` container, and the `redis` after the name is the name used in the web app container.

This option is soon to be deprecated because new concepts are technologies are being introduced.

### Information of a Container

In order to get more detailed information about a certain container:

```console
$ docker inspect ( container_name | container_id )
```

### Logs

To see the logs of a container (usually printed to the `stdout`):

```console
$ docker log ( container_name | container_id )
```

### LIST

- **Lists** all running containers and some information about it.

```console
$ docker ps
```

To see all containers, even if they are not currently running:

```console
$ docker ps -a
```

### STOP

- **Stop running a container** who matches the `id` or the name provided:

```console
docker stop ( container_id | container_name )
```

### REMOVE

- **Removes** a container permanently

```console
docker rm ( container_id | container_name )
```

### Execute commands

- To **execute a command** after creating a new container:

```console
$ docker run ubuntu sleep 5
```

This commands starts the container and run the command `sleep 5` and then exits.

- To **execute a command** in a currently **running container**:

```console
$ docker exec ( container_id | container_name ) cat /etc/hosts
```

## Image Commands

### LIST

- **Lists** downloaded images:

```console
$ docker images
```

Or alternatively:

```console
$ docker image ls
```

### REMOVE

- **Remove** an image

```console
$ docker rmi nginx
```

You must stop and remove all the containers that are instances of the image before removing said image.

### DOWNLOAD

- To only **download** an image and not also run a container:

```console
$ docker pull nginx
```

### Create your own image

First create a `Dockerfile` specifying all of the steps required to set up your application:

```Dockerfile
FROM ubuntu

RUN apt-get update
RUN apt-get install python

RUN pip install flask
RUN pip install flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```

Then build your image, to store locally:

```console
$ docker build Dockerfile -t mycustomapp
```

Here we specify our `Dockerfile` as input for building the image and the tag of the image with the flag `-t`.

To make it available on the `DockerHub`:

```console
$ docker push mycustomapp
```

#### `Dockerfile`

This is configuration file that follows a certain syntax and tells `Docker` how to build the image. The syntax is the following:

```console
INSTRUCTION ARGUMENT
```

In the previous example we have:

- `FROM`: defines the base image, which can be an OS or another image (every image have to be based off another image).
- `RUN`: run a particular command on the base image.
- `COPY`: copies files from the host system onto the `Docker` image.
- `ENTRYPOINT`: specifies the command that will be run when the container is started.

#### Layered architecture

`Docker` follows a layered architecture so each `INSTRUCTION` represents a different layer, which contains only the changes from the layer before, and may serve as a snapshot from which to start the build from a particular layer.

Also, `Docker` caches the layers, so if there is an error, the build would start from the last layer that did not produce a failure. Also, if you were to add additional steps, `Docker` would not start the build from scratch.

## `CMD` vs `ENTRYPOINT`

### `CMD`

A command allows us to append to the command executed when the container start of the base image. For example, `Ubuntu`'s `CMD` is `bash`, so if we append `sleep 5` our container will sleep for 5 seconds when started and then exit.

```Dockerfile
FROM Ubuntu

CMD sleep 5
```

The command can also be specified as `CMD ["sleep", "5"].`

### `ENTRYPOINT`

This other instruction also adds to the base image starting command, but this lets us add arguments from the command line, for example, if we define the following `Dockerfile`:

```Dockerfile
FROM Ubuntu

ENTRYPOINT ["sleep"]
```

We build the image

```console
$ docker build Dockerfile -t ubuntu-sleeper
```

And then we running with `10` as and argument:

```console
$ docker run ubuntu-sleeper 10
```

Our container will sleep for 10 seconds and then exit.

To define a default value for sleep, when no argument is passed from the command line, we use both `ENTRYPOINT` and `CMD`

```Dockerfile
FROM Ubuntu

ENTRYPOINT ["sleep"]

CMD ["5"]
```

To override the `ENTRYPOINT` command specified in the `Dockerfile` we use the flag `--entrypoint`:

```console
$ docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

### Difference

When using `CMD` when running:

```console
$ docker run ubuntu-sleeper sleep 10
```

The argument `sleep 10` replaces entirely the starting command. However with `ENTRYPOINT` if we run:

```console
$ docker run ubuntu-sleeper 10
```

The argument `10` is passed and appended to the `ENTRYPOINT` command.

## Environment Variables

In order to pass an environment variables to our container we run:

```console
$ docker run -e ENV_VAR=value <image_name>
```

This way we set up and environment variable within the container.

If you inspect a running container, you will be able to see the environment variables defined, inside the `"Env"` object:

```console
$ docker inspect <image_name>

{
  .
  .
  "Config": {
            "Hostname": "51049352a8ee",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3456/tcp": {},
                "80/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.19.10",
                "NJS_VERSION=0.5.3",
                "PKG_RELEASE=1"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ]
  .
  .
  .
}
```
