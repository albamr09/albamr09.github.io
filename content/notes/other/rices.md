---
title: Arch Linux Installation
weight: 2
type: docs
---

## Set up

Set the keyboard layout:

```bash
$ loadkeys es
```

Augment the size of the iso image:

```bash
$ mount -o remount,size=1G /run/archiso/cowspace
```

Download git:

```bash
$ pacman -Syy && pacman -S git
```

Configure git to store the credentials:

```bash
$ git config --global credential.helper store
```

Clone the [repository](https://github.com/albamr09/ArchInstaller):

```bash
git clone https://github.com/albamr09/ArchInstaller.git
```

Now, you are good to go to start the installation process.

## Install

Place yourself inside the root of the repository:

```bash
cd ArchInstaller
```

Check out the configuration file, in case some values do not make sense to you:

```bash
cat install_scripts/config.sh
```

If you are satisfied with the configuration, simply execute:

```bash
cd install_scripts && ./install.sh
```

This will cause the installation to begin. It is mostly automatic, but sometimes you will have to enter a password here and there. So do not just let it execute by itself, because there are timeouts that will cause the installation to hault with an error.

Once this finished, reboot your computer. When the computer is up and running again, you will be met with a very minimal login interface. Log in with you user, and execute the following:

```bash
cd /install_scripts && ./post_install
```

This script prompts you to connect to a wifi access point. It also sets up some needed services (like lightdm!) and removes all the installation files used from you system so it is nice an clean. Well, now your arch linux is ready to go!
