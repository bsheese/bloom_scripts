function updateStudents() {
    const numStudents = parseInt(document.getElementById("numStudents").value, 10);
    const studentsSection = document.getElementById("studentsSection");
    studentsSection.innerHTML = "";
    for (let i = 0; i < numStudents; i++) {
        studentsSection.innerHTML += `<label for="student${i}">Student ${i + 1}:</label><input type="text" id="student${i}" required><br>`;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGroups(students) {
    shuffleArray(students);
    const groups = [];
    for (let i = 0; i < students.length - 1; i += 2) {
        groups.push([students[i], students[i + 1]]);
    }
    if (students.length % 2 !== 0) {
        groups[groups.length - 1].push(students[students.length - 1]);
    }

    // Sort the students within each group
    groups.forEach(group => group.sort());

    // Sort the groups by their first student
    groups.sort((a, b) => a[0].localeCompare(b[0]));

    return groups;
}



function hasRepeatGroups(groups, prevGroups) {
    for (let group of groups) {
        for (let prevGroup of prevGroups) {
            if (group.length === prevGroup.length && group.every(student => prevGroup.includes(student))) {
                return true; // Repeat group found
            }
        }
    }
    return false; // No repeat groups found
}



function generateGroups() {
    const weeks = parseInt(document.getElementById("weeks").value, 10);
    const startDate = new Date(document.getElementById("startDate").value);
    const numStudents = parseInt(document.getElementById("numStudents").value, 10);
    const students = Array.from({ length: numStudents }, (_, i) => document.getElementById(`student${i}`).value);

    generateTable(weeks, startDate, students);
}

function generateTable(weeks, startDate, students) {
    // Code moved to output.js
}
