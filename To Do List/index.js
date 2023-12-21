function tambahTugas() {
    var taskInput = document.getElementById("newTaskInput");
    var taskDuration = document.getElementById("taskDuration");
    var taskText = taskInput.value;
    var duration = parseInt(taskDuration.value);
    if (taskText.trim() !== "" && !isNaN(duration) && duration > 0) {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, duration: duration, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        tampilkanTugas();
        taskInput.value = "";
        taskDuration.value = "";
    }
}
function tampilkanTugas() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskList = document.getElementById("tasks");
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" onchange="tandaiSelesai(${index})" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <span> | Durasi: ${task.duration} menit</span>
            <button onclick="konfirmasiSelesai(${index})">Selesai</button>
            <button onclick="hapusTugas(${index})">Hapus</button>`;
        taskList.appendChild(listItem);
        periksaDurasi(task, index);
    });
}
function periksaDurasi(task, index) {
    if (!task.completed) {
        setTimeout(function () {
            notifikasi(`Tugas "${task.text}" telah melewati batas waktu!`);
        }, task.duration * 60 * 1000);
    }
}
function tandaiSelesai(index) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tampilkanTugas();
    if (tasks[index].completed) {
        notifikasi(`Tugas "${tasks[index].text}" selesai!`);
    }
}
function konfirmasiSelesai(index) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (confirm(`Apakah tugas "${tasks[index].text}" sudah selesai?`)) {
        tandaiSelesai(index);
    }
}
function hapusTugas(index) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tampilkanTugas();
}
function notifikasi(pesan) {
    console.log(pesan);
}
document.addEventListener("DOMContentLoaded", tampilkanTugas);