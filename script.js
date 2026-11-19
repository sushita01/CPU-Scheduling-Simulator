function Process(id, at, bt, priority = 0) {
    this.id = id;
    this.at = at;
    this.bt = bt;
    this.priority = priority;
    this.ct = 0;
    this.tat = 0;
    this.wt = 0;
    this.rt = 0;
    this.rbt = bt; 
}
let processes = [];
document.getElementById("inputs").addEventListener("submit", function(e) {
    e.preventDefault();
    let id = document.getElementById("pid").value;
    let at = parseInt(document.getElementById("AT").value);
    let bt = parseInt(document.getElementById("BT").value);
    let priority = parseInt(document.getElementById("priority").value) || 0;
    let p = new Process(id, at, bt, priority);
    processes.push(p);
    document.getElementById("inputs").reset();
});

// FCFS
function fcfs(p) {
    p.sort((a, b) => a.at - b.at);
    let time = 0;
    let gantt = "";
    for (let i = 0; i < p.length; i++) {
        if (time < p[i].at) time = p[i].at;
        time += p[i].bt;
        p[i].ct = time;
        p[i].tat = p[i].ct - p[i].at;
        p[i].wt = p[i].tat - p[i].bt;
        gantt += "P" + p[i].id + " -> ";
    }
    return gantt;
}

// SJF
function sjf(p) {
    let n = p.length;
    let time = 0, completed = 0;
    let is_completed = new Array(n).fill(0);
    let gantt = "";
    while (completed !== n) {
        let idx = -1; 
        let min_bt = Infinity;
        for (let i = 0; i < n; i++) {
            if (p[i].at <= time && is_completed[i] === 0) {
                if (p[i].bt < min_bt) {
                    min_bt = p[i].bt;
                    idx = i;
                } else if (p[i].bt === min_bt) {
                    if (p[i].at < p[idx].at) {
                        idx = i;
                    }
                }
            }
        }
        if (idx !== -1) {
            if (time < p[idx].at) time = p[idx].at;
            time += p[idx].bt;
            p[idx].ct = time;
            p[idx].tat = p[idx].ct - p[idx].at;
            p[idx].wt = p[idx].tat - p[idx].bt;
            is_completed[idx] = 1;
            completed++;
            gantt += "P" + p[idx].id + " -> ";
        } 
        else {
            time++;
        }
    }
    return gantt;
}

// SRTF 
function srtf(p) {
    let n = p.length, completed = 0, time = 0;
    let gantt = "";
    let is_completed = new Array(n).fill(0);
    while (completed < n) {
        let idx = -1, minRBT = 1e9;
        for (let i = 0; i < n; i++) {
            if (!is_completed[i] && p[i].at <= time && p[i].rbt < minRBT){
                minRBT = p[i].rbt;
                idx = i;
            }
        }
        if (idx === -1) {
            time++;
        } 
        else {
            gantt += "P" + p[idx].id + " -> ";
            p[idx].rbt--;
            time++;
            if (p[idx].rbt === 0) {
                p[idx].ct = time;
                p[idx].tat = p[idx].ct - p[idx].at;
                p[idx].wt = p[idx].tat - p[idx].bt;
                is_completed[idx] = 1;
                completed++;
            }
        }
    }
    return gantt;
}

// Priority Preemptive
function priority_pre(p) {
    let n = p.length, completed = 0, time = 0;
    let gantt = "";
    let is_completed = new Array(n).fill(0);
    while (completed < n) {
        let idx = -1, maxPr = -1;
        for (let i = 0; i < n; i++) {
            if (!is_completed[i] && p[i].at <= time) {
                if (p[i].priority > maxPr || (p[i].priority === maxPr && idx !== -1 && p[i].at < p[idx].at)) {
                    maxPr = p[i].priority;
                    idx = i;
                }
            }
        }
        if (idx === -1) {
            time++;
        } else {
            gantt += "P" + p[idx].id + " -> ";
            p[idx].rbt--;
            time++;
            if (p[idx].rbt === 0) {
                p[idx].ct = time;
                p[idx].tat = p[idx].ct - p[idx].at;
                p[idx].wt = p[idx].tat - p[idx].bt;
                is_completed[idx] = 1;
                completed++;
            }
        }
    }
    return gantt;
}

// RR
function rr(p, tq) {
    const n = p.length;
    let time = 0;
    let completedCount = 0;

    const completed = new Array(n).fill(false);
    const inQueue = new Array(n).fill(false);
    const queue = [];
    let gantt = "";

    const order = Array.from({ length: n }, (_, i) => i)
        .sort((a, b) => p[a].at - p[b].at);

    let next = 0;

    while (completedCount < n) {

        if (queue.length === 0) {
            if (next < n && time < p[order[next]].at) {
                time = p[order[next]].at;
            }

            while (next < n && p[order[next]].at <= time) {
                const idx = order[next++];
                if (!completed[idx] && !inQueue[idx]) {
                    queue.push(idx);
                    inQueue[idx] = true;
                }
            }
        }

        const current = queue.shift();
        inQueue[current] = false;

        const runTime = Math.min(tq, p[current].rbt);
        gantt += "P" + p[current].id + " -> ";

        time += runTime;
        p[current].rbt -= runTime;

        while (next < n && p[order[next]].at <= time) {
            const idx = order[next++];
            if (!completed[idx] && !inQueue[idx]) {
                queue.push(idx);
                inQueue[idx] = true;
            }
        }

        if (p[current].rbt === 0) {
            completed[current] = true;
            completedCount++;

            p[current].ct = time;
            p[current].tat = p[current].ct - p[current].at;
            p[current].wt = p[current].tat - p[current].bt;
        } else {
            queue.push(current);
            inQueue[current] = true;
        }
    }

    return gantt;
}


document.getElementById("calculate").addEventListener("click", function() {
    let algo = document.getElementById("Algorithm").value;
    let pcopy = processes.map(pr => new Process(pr.id, pr.at, pr.bt, pr.priority));
    let gantt = "";
    if (algo === "FCFS") gantt = fcfs(pcopy);
    else if (algo === "SJF") gantt = sjf(pcopy);
    else if (algo === "SRTF") gantt = srtf(pcopy);
    else if (algo === "Priority") gantt = priority_pre(pcopy);
    else if (algo === "RR") {
        let tq = parseInt(document.getElementById("TQ").value) || 1;
        gantt = rr(pcopy, tq);
    }
    let table = document.getElementById("resultTable");
    table.innerHTML = `
        <tr>
            <th>Processes</th>
            <th>AT</th>
            <th>BT</th>
            <th>Priority</th>
            <th>CT</th>
            <th>TAT</th>
            <th>WT</th>
        </tr>
    `;
    pcopy.forEach(pr => {
        table.innerHTML += `<tr>
            <td>P${pr.id}</td>
            <td>${pr.at}</td>
            <td>${pr.bt}</td>
            <td>${pr.priority || ""}</td>
            <td>${pr.ct}</td>
            <td>${pr.tat}</td>
            <td>${pr.wt}</td>
        </tr>`;
    });
    document.getElementById("gantt").innerText = "Gantt Chart: " + gantt;
});
