---
title: MacOS VM
weight: 1
type: docs
---

[Source](https://github.com/kholia/OSX-KVM)

## Initial setup

Ubuntu/Debian:

```bash
$ sudo apt-get install qemu uml-utilities virt-manager git \
    wget libguestfs-tools p7zip-full make dmg2img -y
```

Fedora:

```bash
$ sudo dnf install @virutalization
```

Start libvirt service:

```bash
$ sudo systemctl start libvirt
$ sudo systemctl enable libvirt
```

Add user to the `kvm` and `libvirt` groups (might be needed).

```bash
$ sudo usermod -aG kvm $(whoami)
$ sudo usermod -aG libvirt $(whoami)
$ sudo usermod -aG input $(whoami)
```

**Note**: Re-login after executing this command. Now edit `/etc/libvirt/qemu.conf` and set `user` and `group` to your user.

Clone this repository on your QEMU system. Files from this repository are used in the following steps.

```bash
$ cd ~
$ git clone --depth 1 --recursive https://github.com/kholia/OSX-KVM.git
$ cd OSX-KVM
```

**Note**: with this you are installing your VM on `$HOME`.

Fetch macOS installer.

```bash
$ ./fetch-macOS-v2.py
```

On this step select Monterey.

Convert the downloaded `BaseSystem.dmg` file into the `BaseSystem.img` file.

```bash
$ dmg2img -i BaseSystem.dmg BaseSystem.img
```

Create a virtual HDD image where macOS will be installed. If you change the name of the disk image from `mac_hdd_ng.img` to something else, the boot scripts will need to be updated to point to the new image name.

```bash
$ qemu-img create -f qcow2 mac_hdd_ng.img 128G
```

Be aware that the machine can easily reach that amount of memory.

## Installation

CLI method (primary). Just run the `OpenCore-Boot.sh` script to start the installation process.

```bash
$ ./OpenCore-Boot.sh
```

Before installing go to `Disk Utility` inside the machine and erase the partition we are going to use for the virtual machine (the one that is roughly 128GB). For that click on `Erase` and select `Mac OS extended (Journaled)`.

Once the erasing procedure is done, you can start the installation normally.

Edit `macOS-libvirt-Catalina.xml` file and change the various file paths (search for `CHANGEME` strings in that file). The following command should do the trick usually.

```bash
$ sed "s/CHANGEME/$USER/g" macOS-libvirt-Catalina.xml > macOS.xml
$ virt-xml-validate macOS.xml
```

Create a VM on `virt-manager` by running the following command.

```bash
$ virsh --connect qemu:///system define macOS.xml
```

Launch `virt-manager` and start the `macOS` virtual machine.

## Post-installation

Open `virt-manager`, select `macOs` and edit CPUs and memory so the virtual machine does not lag incredibly.

### Permissions bug

(Might only happen in Fedora) If you get an error when starting the machine related to permissions, they are solved with:

```bash
$ sudo setenforce Permissive
```

If they are related with `SELinux`. If that is the case, [refer to](https://github.com/foxlet/macOS-Simple-KVM/issues/173).

Undo the previous command with:

```bash
$ sudo setenforce Enforcing
```

On your `$HOME` directory try to fix with:

```bash
$ sudo chcon -R -u system_u -r object_r -t svirt_image_t OSX-KVM/
```

### Screen resolution

Execute the virtual machine and press ESC inmmediately. Select Device Management option and change OVMF to 1920x1080p resolution.

Enter the virtual machine, once it has been booted open a terminal and write:

```bash
$ diskutil list
```

Select the disk where the EFI partition is location

```bash
$ sudo diskutil mount disk1s1
```

```bash
$ vi /Volumes/EFI/EFI/OC/config.plist
```

And edit the entry under `Resolution` to be 1920x1080@32. Reboot the machine.

Once rebooted go to System preferences > Displays and check Show all resolutions and select 1920x1080.

### Connect to physical iphone

Open virtual manager, and enter the configuration of the machine. Click on Add hardware and select `USB host`, now edit the xml entry just created and substitue the content with:

```xml
<hostdev mode="subsystem" type="usb" managed="yes">
  <source>
    <vendor id="0x05ac"/>
    <product id="0x12a8"/>
  </source>
  <address type="usb" bus="0" port="1"/>
</hostdev>
```

Where vendor id and product id is obtained through `lsusb` on the host machine:

```bash
$ lsusb
...
Bus 001 Device 004: ID 05ac:12a8 Apple, Inc. iPhone 5/5C/5S/6/SE
...
```

### Keyboard is locked

If the keyboard seems to be captured when the machine starts, remove the entry on the machine hardware configuration that has this content or similar (This is my keyboard's smart card, may not apply to your case.)

```xml
<hostdev mode="subsystem" type="usb" managed="yes">
  <source>
    <vendor id="0x04f2"/>
    <product id="0x1469"/>
  </source>
  <address type="usb" bus="0" port="2"/>
</hostdev>
```

### Optimization

[Source](<(https://github.com/sickcodes/osx-optimizer)>)

Only the following are actually important:

### Add more video memory

Open virtual manager, select `macOs` machine and open the configuration. Locate `VGA` and change the `xml` entry so that `vgamem` has the value `65536`.

### Skip the GUI login screen (at your own risk!)

```bash
$ defaults write com.apple.loginwindow autoLoginUser -bool true
```

### Disable spotlight indexing on macOS to heavily speed up Virtual Instances.

```bash
$ sudo mdutil -i off -a
```

### Enable performance mode

```bash
# check if enabled (should contain `serverperfmode=1`)
$ nvram boot-args
```

```bash
# turn on
$ sudo nvram boot-args="serverperfmode=1 $(nvram boot-args 2>/dev/null | cut -f 2-)"
```

### Disable heavy login screen wallpaper

```bash
$ sudo defaults write /Library/Preferences/com.apple.loginwindow DesktopPicture ""
```

### Reduce Motion & Transparency (could be faulty)

```bash
defaults write com.apple.Accessibility DifferentiateWithoutColor -int 1
defaults write com.apple.Accessibility ReduceMotionEnabled -int 1
defaults write com.apple.universalaccess reduceMotion -int 1
defaults write com.apple.universalaccess reduceTransparency -int 1
defaults write com.apple.Accessibility ReduceMotionEnabled -int 1
```

To undo any of this changes refer to the reference material.

### GPU passthrough

[To be continued](https://github.com/kholia/OSX-KVM/blob/master/notes.md#gpu-passthrough-notes)
