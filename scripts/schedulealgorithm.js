document.addEventListener('DOMContentLoaded', function() {
    var computeBtn = document.getElementById('computeBtn');
    // onClick's logic below:
    computeBtn.addEventListener('click', function() {
        computeSchedule();
    });
});

const computeSchedule = () => {
    console.log("this is working");
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

    let tasks = [task1, task2, task3, task4];
    let tasks_sct = [task1_sct, task2_sct, task3_sct, task4_sct];
    let tasks_priority = [task1_priority, task2_priority, task3_priority, task4_priority];
    let tasks_time = [task1_time, task2_time, task3_time, task4_time];

    console.log(tasks);
    console.log(tasks_sct);
    console.log(tasks_priority);

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
            console.log(i);
            if ((sortedTasksSct[i] != sortedTasksSct[i - 1]) && (schedule.indexOf(sortedTasks[i]) == -1)) {
                schedule.push(sortedTasks[i]);
            } else {
                item.push(sortedTasks[i]);
                for (let j = 1; i + j < sortedTasksSct.length; j++) {
                    console.log(i + j, sortedTasksSct.length);
                    console.log(sortedTasksSct[i + j], sortedTasksSct.length);
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
    console.log(schedule);

    const sortScheduleTime = () => {

    }

    // till when can you do work?
    // define the set breaks
    // is there enough time to do it?

    console.log(schedule);

}