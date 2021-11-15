// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// write code for two functions whose names we’ve provided in the starter code, updateFilters() and filterTable().
//1. The updateFilters() function will replace your handleClick()
var filters = {};
function updateFilters() {

  // create a variable that saves the element that was changed using d3.select(this)
  let changedElement = d3.select(this);
  // create a variable that saves the value of the changed element’s property.
  let elementValue = changedElement.property("value");
  // create a variable that saves the attribute of the changed element’s id.
  let filterId = changedElement.attr("id");

  //write an if-else statement that checks if a value was changed by the user
  if (elementValue) {
    filters[filterId] = elementValue;
  //If a value was changed, add the element’s id
  //If a value was not entered, then clear the element id from the filters variable.
  } else {
    delete filters[filterId];
  }

  // Call function to apply all filters and rebuild the table
  filterTable();


}

function filterTable() {
//2. The filterTable() function will filter the table data by the value that is entered for the "id" that has changed.
  let filteredData = tableData;

  // create a variable for the filtered data that is equal to the data that builds the table.
  // loop through the filters object and store the data that matches the filter values in the variable 
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // rebuild the table with the filtered data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);


// Build the table when the page loads
buildTable(tableData);