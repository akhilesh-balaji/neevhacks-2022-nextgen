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

    // if there are two or more recurring tasks using sct, then put one non-sct tasks in between

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
                        if (schedule.indexOf(sortedTasks[i + j]) == -1) { // Add this check to item array
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

    // const sortScheduleSct = () => {
    //     for (let i = 1; i < sortedTasksSct.length; i++) {
    //         console.log(i);
    //         if (sortedTasksSct[i] != sortedTasksSct[i - 1]) { // not equal to SCHEDULE
    //             if (schedule.indexOf(sortedTasks[i]) == -1) {
    //                 schedule.push(sortedTasks[i]);
    //             }
    //         } else {
    //             item.push(sortedTasks[i]);
    //             for (let j = 1; i + j < sortedTasksSct.length; j++) {
    //                 console.log(i + j, sortedTasksSct.length);
    //                 console.log(sortedTasks[i + j], sortedTasksSct.length);
    //                 if (sortedTasksSct[i + j] != sortedTasksSct[i - 1]) { // not equal to SCHEDULE
    //                     if (schedule.indexOf(sortedTasks[i + j]) == -1) {
    //                         schedule.push(sortedTasks[i + j]);
    //                         schedule.push(item[0]);
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // [a, b, c, d]

    sortScheduleSct();

    console.log(schedule);
}

// const sortScheduleSct = () => {
//     for (let i = 0; i < sortedTasksSct.length; i++) {
//         if (sortedTasksSct[i] != sortedTasksSct[i - 1]) {
//             return (sortedTasks[i]);
//         } else {
//             return (i + 1);
//         }
//     }
// }