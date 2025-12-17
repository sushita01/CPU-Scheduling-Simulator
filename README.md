# CPU Scheduling Simulator

⚠️ Copyright Notice

© 2025 Sushita Roy Chowdhury. All rights reserved.

This repository and its source code are the intellectual property of **Sushita Roy Chowdhury**.  
The code is shared strictly for academic evaluation purposes. Unauthorized copying, reposting, or public redistribution is prohibited.


## Project Overview

CPU Scheduling Simulator is a university Operating Systems project designed to demonstrate and visualize how different CPU scheduling algorithms work.  
The simulator provides an interactive interface for entering process details and observing scheduling results in a tabular format.


## Author

- **Developer:** Sushita Roy Chowdhury

> Note: This project was fully designed, implemented, and tested by **Sushita Roy Chowdhury** for academic learning purposes.


## Algorithms Implemented

The simulator supports the following CPU scheduling algorithms:

- **FCFS** – First Come First Serve  
- **SJF** – Shortest Job First  
- **SRTF** – Shortest Remaining Time First  
- **Priority Scheduling** – Preemptive
- **RR** – Round Robin


## Features

- Algorithm selection via dropdown menu  
- Dynamic process input system  
- Supports both preemptive and non-preemptive scheduling  
- Automatic calculation of:
  - Completion Time (CT)  
  - Turnaround Time (TAT)  
  - Waiting Time (WT)
- Gantt Chart visualization of CPU execution
- Clean and simple user interface  


## User Interface Inputs

The frontend allows users to input the following:

- **Select Algorithm** – Choose CPU scheduling algorithm  
- **Process ID (PID)**  
- **Arrival Time (AT)**  
- **Burst Time (BT)**  
- **Priority**  
  - Higher number = higher priority  
- **Time Quantum**  
  - Required for Round Robin scheduling  


## Output 

### Table

After calculation, results are displayed in a table with the following columns:

| Process | AT | BT | Priority | CT | TAT | WT |
|--------|----|----|----------|----|-----|----|


### 📈 Gantt Chart

- Displays the *exact execution order* of processes  
- Shown in sequential format such as:
P0 → P1 → P2 → P3 → P1 → P4

- Clearly represents:
  - CPU allocation order  
  - Preemption behavior (SRTF, Priority)  
  - Time slicing (Round Robin)

## Technologies Used

- **HTML** – Structure of the simulator  
- **CSS** – Styling and layout  
- **JavaScript** – - Scheduling logic, calculations, and Gantt Chart rendering   


## How It Works

1. User selects a CPU scheduling algorithm from the dropdown.  
2. User enters process details:
   - Process ID  
   - Arrival Time  
   - Burst Time  
   - Priority (if applicable)  
   - Time Quantum (for Round Robin)  
3. User clicks **Add Process** to add processes.  
4. User clicks **Calculate** to execute the scheduling algorithm.  
5. Results are displayed in a structured table showing CT, TAT, and WT.
    - Process table  
    - Gantt Chart execution flow  


## Academic Integrity Notice

This project was developed as part of a **university Operating Systems course**.  
The source code is intended **only for learning, demonstration, and evaluation purposes**.  
Reuse, redistribution, or commercial use is **not permitted**.


## Notes

- This project was created strictly for **academic purposes**.  
- All logic, design, and implementation are authored by **Sushita Roy Chowdhury**.  
- Unauthorized public sharing, copying, or reposting is **strictly prohibited**.

