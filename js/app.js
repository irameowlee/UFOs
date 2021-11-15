// Import the data from data.js
const tableData = data;

// Reference the HTML table using D3
var tbody = d3.select("tbody");

function buildTable(data) {
    // Clean out the table
    tbody.html("");
    // Loop through each object in the data array
    data.forEach((dataRow) => {
        // Append a row to the HTML table
        let row = tbody.append("tr");
        // Add each value from the object into a cell
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);    
        });
    });
}

// create an empty filters variable to keep track of all the elements that change when a search is entered
var filters = {};

//write code for two functions whose names we’ve provided in the starter code, updateFilters() and filterTable()
//1. update filter that will replace handle click
function updateFilters() {
    let element = d3.select(this);
    let elementValue = element.property("value");
    let elementId = element.attr("id");
    if (elementValue) {
        filters[elementId] = elementValue;
      }
      else {
        delete filters[elementId];
      }
    console.log(filters);
    filterTable();
  
}
//2. filter table 
function filterTable() {
    let filteredData = tableData;
    Object.entries(filters).forEach(([key,value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
      });
    buildTable(filteredData);
}

// Use D3 to listen for a click event
d3.selectAll("#filter-btn").on("click", handleClick);

// Build original table when the page loads
buildTable(tableData);