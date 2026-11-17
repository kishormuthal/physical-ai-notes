---
title: Physical AI Study Notes
description: Build, Simulate and Deploy With NVIDIA's Open Stack
hide:
  - navigation
  - toc
---

# Fast-Track Physical AI

## About This Notes

These are my theoretical study notes on **Physical AI**, built after attending the one day workshop **"Fast-Track Physical AI: Build, Simulate and Deploy With NVIDIA's Open Stack"**.

The workshop covered a lot of ground in a single day. These notes are where I slow down, take one topic at a time, and work through each concept.

## Workshop Details

| Detail | Info |
|--------|------|
| Name | **"Fast-Track Physical AI: Build, Simulate and Deploy With NVIDIA's Open Stack"**|
| Format | One day, fast track workshop |
| Organizer | NVIDIA |
| Date | 9-Oct-2026|
| Focus | NVIDIA's open physical AI stack |

**Physical AI** is AI that perceives, reasons about, and acts in the physical world, for example
by controlling robots and machines. 

The title has three verbs: **Build, Simulate and Deploy**. Together they describe the full life of a robot's intelligence.

1. **Build**: Develop robot behaviors and AI models
2. **Simulate**: Test and validate them in simulation using NVIDIA Isaac Sim and Omniverse
3. **Deploy**: Move the results from simulation toward real world systems

The phrase **Open Stack** matters too. Many of the tools in this workshop (Isaac Sim, Isaac Lab, Newton, GR00T, Cosmos, OSMO) are published openly on GitHub and Hugging Face, so developers can inspect, modify and extend them.

## How These Notes Were Made?

- Explanations were developed with the help of **Claude** Sonnet (Anthropic's AI assistant)
- Technical claims are grounded in **official NVIDIA documentation** and other NVIDIA resources
- Every topic lists its sources at the end so you can verify and read further

!!! warning "Disclaimer"
    These are personal learning notes, not official NVIDIA documentation. They may contain
    mistakes, and may become outdated as the tools evolve. Always check the linked sources and
    the official docs for authoritative information.

## What these notes are and what they are not?

| They are | They are not |
| --- | --- |
| My personal study notes from one workshop | Official NVIDIA documentation |
| A theory first introduction, one topic per page | A complete reference to the NVIDIA stack |
| A map of the concepts and how they connect | A hands on walkthrough of the labs |

## Where the edge of these notes is?

Physical AI is much larger than any single vendor's stack. Robot learning, control theory, perception, ROS 2 and the wider ecosystem, other simulators, other foundation models these notes touch one introductory slice of that.

Even inside NVIDIA's stack this is an entry point, not the depth. Distributed training at scale, sim-to-real calibration, safety certification and hardware design are named where they matter, but not covered. If a topic you need is missing, that is a limit of the notes, not a judgement that it doesn't matter.

## Why This notes Exists?

A fast track format introduces many topics but cannot go deep on any of them.
These notes are my attempt to fill that gap:

- **One topic per page**
- **Explained for understanding**: purpose first, then mechanism, then how it connects to other topics
- **Sourced**: each topic ends with a *References* section linking to the sources I used.

### Trying to fit in a society

This is the honest reason this notes is public.

I started these notes for myself a private folder where each topic got the time a workshop never could.
For a long time that studying was invisible. I was learning constantly and showing none of it.

So this is an attempt to be visible about the right things, at the right time. Eventually trying to fit in a society 😄!

## Maybe more than Physical AI

The notes here cover only the last month, which I spent building a clear theoretical understanding of NVIDIA's Physical AI stack.

I started learning Physical AI about a year ago, but I have been working on many other things for several years before that. It is not all I want to write about.

Some of those other topics may end up here too. It depends on whether I feel comfortable publishing them, and honestly I do not know yet. If that changes, this page will say so.

## Agenda of the Workshop

This workshop is divided into three parts: one theory session and two hands on labs.

### Part 1: Theory

1. **NVIDIA Intro:** What is the foundation we are building on?
2. **Market Context:** Why is everyone talking about physical AI now?
3. **Synthetic Data Generation Pipelines:** Where does the training data come from?
4. **Foundation Models:** What does the model that controls the robot look like?
5. **Robot Runtime:** How does that model run on a real machine, fast enough to act?
6. **Ecosystem:** Who else is already building with this?
7. **Learning Resources:** Where do I go next?

### Part 2: Hands On Lab 1: End-to-End Physical AI Pipeline on Brev Using COSMOS

Build the full pipeline, the same one used in the Thor showcase.

- Cosmos fine-tuning
- VLM/VLA development
- Sensor input via browser mic/camera
- Edge deployment walkthrough

### Part 3: Hands On Lab 2: Humanoid Robot Simulation With NVIDIA Isaac GR00T 

Hands on humanoid robot simulation, run on Brev.

- Isaac Lab-Arena setup
- Demo data conversion (HDF5 → LeRobot)
- GR00T 1.7 VLA post-training
- Closed-loop pick-and-place evaluation

## Feedback

Found an error or have a suggestion? Please open an issue or pull request on the GitHub repository.