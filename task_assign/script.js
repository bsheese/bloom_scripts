function updateNumber() {
    const num = document.getElementById("num").value;
    const studentsColumn = document.getElementById("studentsColumn");
    const tasksColumn = document.getElementById("tasksColumn");

    studentsColumn.innerHTML = "<label>Students</label><br>";
    tasksColumn.innerHTML = "<label>Tasks</label><br>";

    for (let i = 0; i < num; i++) {
        studentsColumn.innerHTML += `<label for="student${i}">Student ${i + 1}:</label><input type="text" id="student${i}"><br>`;
        tasksColumn.innerHTML += `<label for="task${i}">Task ${i + 1}:</label><input type="text" id="task${i}"><br>`;
    }
}

function assignTasks() {
    const num = document.getElementById("num").value;
    const weeks = document.getElementById("weeks").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const students = Array.from({ length: num }, (_, i) => document.getElementById(`student${i}`).value);
    const tasks = Array.from({ length: num }, (_, i) => document.getElementById(`task${i}`).value);

    let tasksCopy = [...tasks];
    let csvContent = "Week Date,Week,Student Name,Assigned Task\n";
    let tableHtml = "<table border=\"1\"><tr><th>Week Date</th><th>Week</th><th>Student Name</th><th>Assigned Task</th></tr>";

    for (let week = 0; week < weeks; week++) {
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(weekStartDate.getDate() + 7 * week);
        const weekOf = `Week of ${weekStartDate.toISOString().split('T')[0]}`;

        for (let i = 0; i < num; i++) {
            const rowStyle = (week * num + i) % 2 === 0 ? ' style="background-color: #add8e6;"' : '';
            tableHtml += `<tr${rowStyle}><td>${weekOf}</td><td>${week + 1}</td><td>${students[i]}</td><td>${tasksCopy[i]}</td></tr>`;

            // Add to CSV content
            csvContent += `${weekOf},${week + 1},${students[i]},${tasksCopy[i]}\n`;
        }

        // Insert an empty row between weeks
        tableHtml += '<tr style="height: 1em;"><td colspan="4"></td></tr>';

        tasksCopy.push(tasksCopy.shift());
    }

    tableHtml += "</table>";

    // Save the HTML and CSV content to localStorage
    localStorage.setItem("tableHtml", tableHtml);
    localStorage.setItem("csvContent", csvContent);

    // Redirect to the output page
    window.location.href = 'output.html';
}
