---
title: Robot Runtime
tags: [Robot Runtime, Isaac ROS, Jetson Thor]
---

- The earlier sections covered how a robot gets data, practices in simulation and gets a trained brain.
- All of that happens in the lab, mostly in data centers and on workstations, where speed and power are not tight limits.
- Then the robot has to actually **work**. A trained model has to run on the robot's own computer, in the real world, in real time. - That is a very different environment.

| Where it runs ?| Training time | Runtime |
|---------------|---------------|---------|
| Location | Data center or workstation | Inside the robot |
| Power | Kilowatts available | A battery, so tens of watts |
| Speed need | Hours or days are fine | Decisions in milliseconds |
| Network | Fast and always there | May be slow or absent |
| Cost of a mistake | A failed experiment | A dropped object, a collision or a safety incident |
| Inputs | Datasets and simulation | Live cameras, lidar and touch sensors |

- This section ahead is about solving the runtime problem.

## What Robot Runtime Means?

- **Runtime** means everything that runs on the robot while it operates: the models, the perception code, the planning and control software, and the computer they run on.
- In the three computer solution introduced at the start of the workshop, this is the **third computer**: **Jetson AGX Thor**, the compact AI computer inside the robot. 
- The first computer trains, the second simulates, and the third **acts**.

```
   COMPUTER 1                COMPUTER 2                COMPUTER 3
   DGX                       Omniverse and Cosmos      Jetson AGX Thor
   TRAIN                     SIMULATE                  RUN  <-- this section
```

## Why Runtime Is Its Own Challenge?

Five demands make runtime hard.

| Demand | What it means? |
|--------|---------------|
| **Low latency** | The delay between seeing something and reacting must be tiny. A walking robot cannot wait a second to decide where to step |
| **Efficiency** | Models must run within a limited power and heat budget |
| **Many sensors at once** | Cameras, depth sensors, lidar and touch sensors all stream data that must be combined |
| **Many tasks at once** | Perception, planning, control and reasoning all run together, at different speeds |
| **Reliability** | The software has to keep working for hours, in unpredictable conditions |

## Layered Picture of Runtime

- A humanoid robot's runtime is organized in layers, and each layer runs at a different speed. 
- The next topic shows this in detail. Here is a preview.

```
   HIGH-LEVEL REASONING        slow       about 1 to 5 times per second
   understand instructions, plan tasks

   PERCEPTION AND PLANNING     medium     about 30 times per second
   see the scene, plan grasps and motion

   REAL-TIME CONTROL           fast       about 100 to 1000 times per second
   drive the joints, keep balance

   HARDWARE LAYER              sensors and motors
```

- This matches the dual-system idea from the Foundation Models topics: slow reasoning on top, fast action underneath.

## What This Section Covers?

```mermaid
flowchart LR
    A["What It Takes To Build<br/>A Humanoid Robot<br/>the layers"] --> B["Open CUDA-X Libraries<br/>and AI Models<br/>for Runtime"]
    B --> C["Isaac ROS<br/>accelerated ROS 2"]
    C --> D["Jetson Thor<br/>the onboard computer"]
    D --> E["Jetson Is Now<br/>Agent Ready"]
```

| Topic to come | What to expect? |
|---------------|----------------|
| **What It Takes To Build A Humanoid Robot** | The layers of a humanoid's software: reasoning, perception and planning, control and hardware, with the update rate of each |
| **Open CUDA-X Libraries and AI Models for Runtime** | Building blocks for mapping, localization, navigation and object pose estimation: Nvblox, cuVSLAM, cuVGL, SWAGGER, X-Mobility, ReMEmbR, COMPASS and FoundationPose |
| **NVIDIA Isaac ROS** | Accelerated packages that plug into ROS 2, the standard robot software framework |
| **NVIDIA Jetson Thor** | The onboard computer for physical AI |
| **Jetson Is Now Agent Ready** | Agent skills and open model support so AI agents can work on Jetson |

## Key Terms for This Section

| Term | Meaning |
|------|---------|
| **Edge AI** | AI that runs on the device itself instead of in the cloud |
| **ROS 2** | Robot Operating System 2, the widely used open source framework for robot software, with nodes that exchange messages |
| **Isaac ROS** | NVIDIA's collection of GPU-accelerated ROS 2 packages for perception, mapping, navigation and manipulation |
| **NITROS** | NVIDIA's method for passing data between ROS 2 nodes efficiently by avoiding unnecessary copying and conversion |
| **TensorRT** | NVIDIA's tool for making neural networks run fast at inference time |
| **CUDA-X** | NVIDIA's family of GPU-accelerated libraries built on CUDA |
| **VSLAM** | Visual simultaneous localization and mapping: working out where the robot is and building a map at the same time, using cameras |
| **Latency** | The delay between an input and the matching output |

## Current Status of Isaac ROS

- Since Isaac ROS is the centerpiece of this section, here is where it stands according to NVIDIA's release information.

| Fact | Detail |
|------|--------|
| **Isaac ROS 4.0** | Generally available for Jetson AGX Thor, with support for JetPack 7.0 and Isaac Sim 5.1. It added a manipulation reference application and a multi-object pick and place workflow |
| **Isaac ROS 4.4.0** | Lists support for Jetson Thor (T5000 and T4000) with JetPack 7.1, and for DGX Spark |
| **ROS 2 version** | Packages are tested with ROS 2 Jazzy on Jetson or on x86 systems with an NVIDIA GPU |

- JetPack is NVIDIA's software package for Jetson devices, including the operating system and drivers.

## Summary

1. **Robot runtime** is everything that runs **on the robot**, in real time, after training is done.
2. It is the **third computer** in the three-computer solution: **Jetson AGX Thor**.
3. Runtime is hard because of **low latency, limited power, many sensors, many simultaneous tasks and the need for reliability**.
4. A humanoid's software is **layered by speed**: reasoning, then perception and planning, then real-time control.
5. This section covers the **layers of a humanoid**, **CUDA-X libraries and models**, **Isaac ROS**, **Jetson Thor** and **agent-ready Jetson**.

## References

1. [NVIDIA Isaac ROS](https://developer.nvidia.com/isaac/ros)
2. [Isaac ROS documentation](https://nvidia-isaac-ros.github.io/)
3. [NVIDIA Jetson AGX Thor](https://developer.nvidia.com/embedded/jetson-agx-thor)
4. [NVIDIA Blog, "What Is NVIDIA's Three-Computer Solution for Robotics?"](https://blogs.nvidia.com/blog/three-computers-robotics/)
5. [NVIDIA Developer Forums, "NVIDIA Isaac ROS 4.0 for Thor is HERE"](https://forums.developer.nvidia.com/t/nvidia-isaac-ros-4-0-for-thor-is-here/352008)
