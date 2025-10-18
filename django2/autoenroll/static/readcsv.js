let csvData = [];
let coursesTaken = [];  // an array of strings
let coursesTakenJSON = [];  // an array of JSON objects

// Load CSV from project folder
fetch('static/courses.csv')
    .then(response => response.text())
    .then(csvText => parseCSV(csvText))
    .catch(err => console.error('Error loading CSV:', err));

// Convert CSV text into csvData array
function parseCSV(csvText) {
    const results = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transform: (value) => {
            // Convert nulls or undefined to blank strings
            if (value === null || value === "null") return " ";
            return value;
        }
    });

    // PapaParse stores the parsed objects in results.data
    csvData = results.data;
    console.log(JSON.stringify(csvData));
}

// Search for courses and returns JSON array
function searchCourse(query) {
    const trimmedQuery = query.trim().toUpperCase();

    // Search by description (Programming I)
    const descriptionSearch = csvData.filter(row =>
        row.Description?.toUpperCase() === trimmedQuery
    );

    if (descriptionSearch.length > 0)
        return descriptionSearch;

    // If query looks like "SUBJECT NUMBER" (two parts), search by Subject + Course
    const parts = trimmedQuery.split(/\s+/);

    if (parts.length === 2) {
        const subject = parts[0];
        const number = parts[1];

        return csvData.filter(row =>
            row.Subject?.toUpperCase() === subject &&
            parseInt(row.Course) == number
        );
    }
    else {
        return [];
    }
}

function searchNextCoreCourses() {
    // returns data for all CIS classes EXCLUDING courses taken
    return csvData.filter(row =>
        !coursesTakenJSON.includes(row) &&
        row.Subject === "CIS"
    );
}

// Add class taken event listener
document.getElementById('add-class').addEventListener('click', () => {
    const course = document.getElementById('search-input').value;
    coursesTaken.push(course);

    console.log("courses taken: " + coursesTaken);

    // Show the added class
    const ul = document.getElementById('classes-taken');
    const li = document.createElement('li');
    li.textContent = course;
    // Append it to the <ul>
    ul.appendChild(li);
});

// Generate schedule event listener
document.getElementById('search-button').addEventListener('click', () => {
    // Fill coursesTakenJSON with classes the user WON'T take
    coursesTaken.forEach(query => {
        courseJSON = searchCourse(query)[0];
        coursesTakenJSON.push(courseJSON);
    });

    // Array of next core classes
    let nextCoreArray = searchNextCoreCourses();

    // Only 4 new core classes allowed
    if (nextCoreArray.length > 4) {
        nextCoreArray = nextCoreArray.slice(0, 4);
    }

    const schedule = document.getElementById("schedule");
    schedule.style.display = "block";

    const table = document.getElementById("course-table");

    // Delete all existing rows except the first one (the header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Clear the 'classes taken' list
    const ul = document.getElementById('classes-taken');
    ul.innerHTML = '';

    // Fill the table
    nextCoreArray.forEach(courseJSON => {
        console.log("course JSON: " + JSON.stringify(courseJSON));

        const row = document.createElement("tr");

        const headers = ["CRN", "Subject", "Course", "Description", "Days", "Begin", "End", "Building", "Room"];

        // Loop through each value in the JSON object
        headers.forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = courseJSON[key];
            row.appendChild(cell);
        });

        // Add the new row to the table
        table.appendChild(row);
    });

    // reset variables
    coursesTaken = [];
    coursesTakenJSON = [];
});