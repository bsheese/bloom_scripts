window.onload = function() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = localStorage.getItem("tableHtml");

    // Set the download link's href attribute with URL encoding
    const downloadLink = document.getElementById("download");
    const csvContent = localStorage.getItem("csvContent");
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}