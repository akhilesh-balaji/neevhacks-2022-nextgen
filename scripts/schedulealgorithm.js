document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("schedule-task-output").style.visibility = "hidden";
    document.getElementById("schedule-task-output").style.display = "none";
    var computeBtn = document.getElementById('computeBtn');
    // onClick's logic below:
    computeBtn.addEventListener('click', function() {
        computeSchedule();
        document.getElementById('computeBtn').disabled = true;
        document.getElementById("form-task-input").style.display = "none";
        document.getElementById("schedule-task-output").style.visibility = "visible";
        document.getElementById("schedule-task-output").style.display = "block";
    });
});

// const removeDuplicates = (array) => {
//     return array.filter((item, index) => array.indexOf(item) === index);
// }


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "on") {
            chrome.notifications.create(
                "on", {
                    "type": "basic",
                    "iconUrl": "images/icon.png",
                    "title": "Productivity mode activated",
                    "message": "You can now browse the web without being blocked by the extension"
                }
            );
        } else if (request.message === "off") {
            chrome.notifications.create(
                "off", {
                    "type": "basic",
                    "iconUrl": "images/icon.png",
                    "title": "Productivity mode deactivated",
                    "message": "You can now browse the web with the extension"
                }
            );
        }
    }
);

const computeSchedule = () => {
    const task1 = document.getElementById("text-input-item-1").value;
    const task2 = document.getElementById("text-input-item-2").value;
    const task3 = document.getElementById("text-input-item-3").value;
    const task4 = document.getElementById("text-input-item-4").value;

    const task1_sct = document.getElementById("smalltoggle1").checked;
    const task2_sct = document.getElementById("smalltoggle2").checked;
    const task3_sct = document.getElementById("smalltoggle3").checked;
    const task4_sct = document.getElementById("smalltoggle4").checked;

    const task1_priority = parseInt(document.getElementById("select-id0").value.replace("priority", ""));
    const task2_priority = parseInt(document.getElementById("select-id1").value.replace("priority", ""));
    const task3_priority = parseInt(document.getElementById("select-id2").value.replace("priority", ""));
    const task4_priority = parseInt(document.getElementById("select-id3").value.replace("priority", ""));

    const task1_time = parseInt(document.getElementById("time-input-hrs0").value);
    const task2_time = parseInt(document.getElementById("time-input-hrs1").value);
    const task3_time = parseInt(document.getElementById("time-input-hrs3").value);
    const task4_time = parseInt(document.getElementById("time-input-hrs4").value);

    const break1_time_range = document.getElementById("break1-time-range-input-item").value;
    const break2_time_range = document.getElementById("break2-time-range-input-item").value;
    const working_time_range = document.getElementById("time-range-input-item").value;

    // values of time ranges are returned as strings, of the regex format [0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}
    // so we need to split the string into two parts, and then convert the strings to numbers, and assign them to variables
    const break1_time_range_start = ((parseInt(break1_time_range.split("-")[0].split(":")[1])) / 60) + parseInt(break1_time_range.split("-")[0].split(":")[0]);
    const break1_time_range_end = ((parseInt(break1_time_range.split("-")[1].split(":")[1])) / 60) + parseInt(break1_time_range.split("-")[1].split(":")[0]);
    const break2_time_range_start = ((parseInt(break2_time_range.split("-")[0].split(":")[1])) / 60) + parseInt(break2_time_range.split("-")[0].split(":")[0]);
    const break2_time_range_end = ((parseInt(break2_time_range.split("-")[1].split(":")[1])) / 60) + parseInt(break2_time_range.split("-")[1].split(":")[0]);
    const working_time_range_start = ((parseInt(working_time_range.split("-")[0].split(":")[1])) / 60) + parseInt(working_time_range.split("-")[0].split(":")[0]);
    const working_time_range_end = ((parseInt(working_time_range.split("-")[1].split(":")[1])) / 60) + parseInt(working_time_range.split("-")[1].split(":")[0]);

    console.log(break1_time_range_start);
    console.log(break1_time_range_end);
    console.log(break2_time_range_start);
    console.log(break2_time_range_end);
    console.log(working_time_range_start);
    console.log(working_time_range_end);

    const work1_s = working_time_range_start;
    const work1_e = break1_time_range_start;
    const work2_s = break1_time_range_end;
    const work2_e = break2_time_range_start;
    const work3_s = break2_time_range_end;
    const work3_e = working_time_range_end

    let tasks = [task1, task2, task3, task4];
    let tasks_sct = [task1_sct, task2_sct, task3_sct, task4_sct];
    let tasks_priority = [task1_priority, task2_priority, task3_priority, task4_priority];
    let tasks_time = [task1_time, task2_time, task3_time, task4_time];

    let sortedTasks = tasks.sort((a, b) => {
        return tasks_priority.indexOf(a) - tasks_priority.indexOf(b);
    });

    let sortedTasksSct = tasks_sct.sort((a, b) => {
        return tasks_priority.indexOf(a) - tasks_priority.indexOf(b);
    });

    let sortedTasksTime = tasks_time.sort((a, b) => {
        return tasks_priority.indexOf(a) - tasks_priority.indexOf(b);
    });

    let schedule = [];
    let item = [];

    schedule.push(sortedTasks[0]);

    const sortScheduleSct = () => {
        for (let i = 1; i < sortedTasksSct.length; i++) {
            if ((sortedTasksSct[i] != sortedTasksSct[i - 1]) && (schedule.indexOf(sortedTasks[i]) == -1)) {
                schedule.push(sortedTasks[i]);
            } else {
                item.push(sortedTasks[i]);
                for (let j = 1; i + j < sortedTasksSct.length; j++) {
                    if (sortedTasksSct[i + j] != sortedTasksSct[i - 1]) {
                        if (schedule.indexOf(sortedTasks[i + j]) == -1) {
                            schedule.push(sortedTasks[i + j]);
                            if (schedule.indexOf(item[0]) == -1)
                                schedule.push(item[0]);
                            break;
                        }
                    }
                }
            }
        }
    }

    sortScheduleSct();

    let sortedTasksTimeSchedule = [];

    for (let q = 0; q < schedule.length; q++) {
        sortedTasksTimeSchedule.push(tasks_time[tasks.indexOf(schedule[q])]);
    }

    let sortedTasksSctSchedule = [];

    for (let q = 0; q < schedule.length; q++) {
        sortedTasksSctSchedule.push(tasks_sct[tasks.indexOf(schedule[q])]);
    }

    console.log(sortedTasksSctSchedule);

    let session11 = 0;
    let session1ll = 0;
    let break_e = 0;
    let break_m = 0

    const insertBreaks = () => {
        let schedBreaks = [];
        let unit_t = (work3_e - work1_s) / 96;
        for (let x = 0; x < schedule.length; x++) {
            if (!(sortedTasksTimeSchedule[x] > (1.75))) {
                // include schedule[x] in the schedule for sortedTasksTimeSchedule[x] / unit_t times
                for (let y = 0; y < (sortedTasksTimeSchedule[x] / unit_t); y++) {
                    schedBreaks.push(schedule[x]);
                }
                schedBreaks.push("mbreak");
                schedBreaks.push("mbreak");
            } else {
                for (let y = 0; y < ((sortedTasksTimeSchedule[x] / unit_t)); y++) {
                    schedBreaks.push(schedule[x]);
                    if (y == Math.ceil((sortedTasksTimeSchedule[x] / unit_t) / 2)) {
                        schedBreaks.push("mbreak");
                        schedBreaks.push("mbreak");
                    }
                }
            }
            // schedBreaks.push(schedule[x]);
        }
        for (let x = 0; x < schedBreaks.length; x++) {
            if (x % 6 == 0 && tasks_sct[tasks.indexOf(schedBreaks[x])]) {
                schedBreaks[x] = "ebreak";
            }
        }
        // for (let x = 0; x < schedBreaks.length; x++) {
        //     if (schedBreaks[x] == "mbreak" && schedBreaks[x + 1] == "ebreak") {
        //         if (schedBreaks[x] == "ebreak" && schedBreaks[x + 1] == "mbreak") {
        //             schedBreaks.splice(x, 1);
        //         }
        //         schedBreaks.splice(x + 1, 1);
        //     }
        // }
        return schedBreaks;
    }

    const occurrences = insertBreaks().reduce(function(acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    const ebreak_num = occurrences["ebreak"];
    const mbreak_num = occurrences["mbreak"];

    if (ebreak_num > 11) {
        chrome.notifications.create(null, {
            type: "basic",
            iconUrl: "images/icon.png",
            title: "Too much screen time!",
            message: "Please change your time table, this much screen time is harmful."
        }, function(notificationId) {
            setTimeout(function() {
                chrome.notifications.clear(notificationId, function() {});
            }, 5000);
        });
    }

    let sum = 0;
    for (let i = 0; i < sortedTasksTime.length; i++) {
        sum += sortedTasksTime.length[i];
    }

    if (((work3_e - work1_s) - (work2_s - work1_e) - (work3_s - work2_e)) < sum) {
        chrome.notifications.create(null, {
            type: "basic",
            iconUrl: "images/icon.png",
            title: "Does not match your working time",
            message: "Please change the values for your working time or time per task. Note that you must write down how much time you will spend TODAY, not for the ENTIRE TASK."
        }, function(notificationId) {
            setTimeout(function() {
                chrome.notifications.clear(notificationId, function() {});
            }, 5000);
        });
    }


    console.log(occurrences);

    // sortScheduleTime();
    // console.log(session11);
    // console.log(session1ll);

    console.log(insertBreaks());

    // 30 mins -> eye break
    // task finished -> mindfullness break and eye break
    // relative break durations

    console.log(schedule);

    const embedInTable = () => {
        // let table = document.getElementById("datatable-item");
        // add a row to table for each task
        let tableRef = document.getElementById("datatable-item");

        const occurrences = insertBreaks().reduce(function(acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        // turn the values in occurrences into an array
        const values = Object.keys(occurrences);
        const tot_vals = (insertBreaks());
        console.log(tot_vals);

        // for (let i = 0; i < tot_vals.length; i++) {
        //     console.log("this is a test message, " + i);
        //     let newRow = tableRef.insertRow(-1);
        //     let newCell0 = newRow.insertCell(0);
        //     let newCell1 = newRow.insertCell(1);
        //     let newCell2 = newRow.insertCell(2);
        //     newCell0.appendChild(document.createTextNode(tot_vals[i] == "mbreak" ? "Mindfulness Break" : tot_vals[i] == "ebreak" ? "Eye Break" : tot_vals[i]));
        //     newCell1.appendChild(document.createTextNode(Math.ceil(((occurrences[(tot_vals[i])]) / 96) * 60)));
        //     newCell2.appendChild(document.createTextNode(tasks_sct[tot_vals[i]]));
        // }
        for (let i = 0; i < values.length; i++) {
            console.log("this is a test message, " + i);
            let newRow = tableRef.insertRow(-1);
            let newCell0 = newRow.insertCell(0);
            let newCell1 = newRow.insertCell(1);
            let newCell2 = newRow.insertCell(2);
            newCell0.appendChild(document.createTextNode(values[i] == "mbreak" ? "Mindfulness Break" : values[i] == "ebreak" ? "Eye Break" : values[i]));
            newCell1.appendChild(document.createTextNode(Math.ceil(((occurrences[(values[i])]) / 96) * 60)));
            newCell2.appendChild(document.createTextNode(tasks_sct[values[i]]));
        }
    }

    embedInTable();
}