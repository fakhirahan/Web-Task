document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from Local Storage when page loads
    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); // Memanggil fungsi untuk menambahkan tugas
            saveTasks(); // Memanggil fungsi untuk menyimpan tugas ke Local Storage
            taskInput.value = ""; // Mengosongkan input setelah menambahkan tugas
        }
    });

    // Fungsi untuk menambahkan tugas baru ke dalam daftar
    function addTask(taskText) {
        const li = document.createElement("li"); // Membuat elemen <li> baru
        // Buat checkbox untuk menandai tugas sebagai selesai
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Tambahkan event listener untuk menandai tugas sebagai selesai
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through"; // Menambahkan garis coret pada teks
            } else {
                li.style.textDecoration = "none"; // Menghapus garis coret pada teks
            }
            saveTasks(); // Simpan status tugas ke dalam Local Storage setelah perubahan
        });
        li.appendChild(checkbox);
        // Tambahkan teks tugas
        const span = document.createElement("span");
        span.textContent = taskText;
        li.appendChild(span);
        // Tambahkan tombol delete
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            li.remove(); // Hapus elemen <li> dari daftar tugas
            saveTasks(); // Simpan perubahan ke dalam Local Storage
        });
        li.appendChild(deleteButton);
        // Tambahkan elemen <li> ke dalam daftar tugas
        taskList.appendChild(li);
        // Simpan tugas ke dalam Local Storage setiap kali menambahkan tugas baru
        saveTasks();
    }

    // Fungsi untuk menyimpan tugas ke dalam Local Storage
    function saveTasks() {
        const tasks = [];
        // Loop melalui setiap elemen <li> dalam daftar tugas
        taskList.querySelectorAll("li").forEach(function(task) {
            // Buat objek untuk mewakili tugas
            const taskObj = {
                text: task.querySelector("span").textContent,
                completed: task.querySelector("input[type='checkbox']").checked
            };
            tasks.push(taskObj); // Tambahkan objek tugas ke dalam array tasks
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Simpan array tasks ke dalam Local Storage
    }

    // Fungsi untuk memuat tugas dari Local Storage saat halaman dimuat
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")); // Mengambil tugas dari Local Storage
        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text); // Tambahkan tugas ke dalam daftar
                const li = taskList.lastElementChild; // Ambil elemen <li> terakhir (tugas yang baru ditambahkan)
                li.querySelector("input[type='checkbox']").checked = task.completed; // Atur status checkbox sesuai dengan data dari Local Storage
                if (task.completed) {
                    li.style.textDecoration = "line-through"; // Tandai tugas sebagai selesai jika diperlukan
                }
            });
        }
    }
});
