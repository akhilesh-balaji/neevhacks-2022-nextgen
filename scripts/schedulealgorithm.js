document.addEventListener('DOMContentLoaded', function() {
    var computeBtn = document.getElementById('computeBtn');
    // onClick's logic below:
    computeBtn.addEventListener('click', function() {
        computeSchedule();
    });
});

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

    tasks = [task1, task2, task3, task4];
    tasks_sct = [task1_sct, task2_sct, task3_sct, task4_sct];
    tasks_priority = [task1_priority, task2_priority, task3_priority, task4_priority];

    console.log(tasks);
    console.log(tasks_sct);
    console.log(tasks_priority);
}