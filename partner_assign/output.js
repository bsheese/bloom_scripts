function generateTable(weeks, startDate, students) {
    const outputDiv = document.getElementById("output");
    let tableHTML = `<table><tr><th>Week Date</th><th>Week #</th><th>Group</th><th>Student Names</th></tr>`;
    let csvContent = "data:text/csv;charset=utf-8,Week Date,Week,Group,Student Names\n";
    let prevGroups = [];

    for (let week = 0; week < weeks; week++) {
        let groups;
        do {
            groups = createGroups([...students]);
        } while (hasRepeatGroups(groups, prevGroups));

        prevGroups = groups;

        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(weekStartDate.getDate() + 7 * week);
        const weekOf = `Week of ${weekStartDate.toISOString().split('T')[0]}`;

        groups.forEach((group, groupIndex) => {
            const studentNames = group.join(', ');
            tableHTML += `<tr><td>${weekOf}</td><td>${week + 1}</td><td>${groupIndex + 1}</td><td>${studentNames}</td></tr>`;
            csvContent += `${weekOf},${week + 1},${groupIndex + 1},${studentNames}\n`;
        });

        prevGroups.push(...groups);
    }
    tableHTML += "</table>";
    outputDiv.innerHTML = tableHTML;
    createDownloadLink(csvContent);
}

function createDownloadLink(csvContent) {
    const downloadLink = document.getElementById("download");
    downloadLink.setAttribute("href", encodeURI(csvContent));
    downloadLink.setAttribute("download", "groups.csv");
    downloadLink.innerHTML = "Download CSV";
    downloadLink.style.display = "block";
}