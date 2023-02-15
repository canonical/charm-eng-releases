// Get the latest release time for a give project in the table
const compareLastReleaseTime = (rowA, rowB, col) => {
  const parse = row => row.cells[col].children[0].getAttribute("aria-release-date")
  return parse(rowA) > parse(rowB)
}

const compareStatusBadgeContent = (rowA, rowB, col) => {
  const parse = row => parseInt(row.cells[col].getAttribute("aria-new-commits"))
  return parse(rowA) > parse(rowB)
}

const sortTable = (header, table) => {
  const SORTABLE_STATES = { ascending: -1, descending: 1, ORDER: ["ascending", "descending"] }
  // Get index of column based on position of header cell in <thead>
  // We assume there is only one row in the table head.
  const col = [...table.tHead.rows[0].cells].indexOf(header)
  // Based on the current aria-sort value, get the next state.
  const cur = SORTABLE_STATES.ORDER.indexOf(header.getAttribute("aria-sort"))
  const newOrder = cur === 0 ? SORTABLE_STATES.ORDER[1] : SORTABLE_STATES.ORDER[0]

  // Reset all header sorts.
  table.querySelectorAll("[aria-sort]").forEach(h => h.setAttribute("aria-sort", ""))
  // Set the new header sort.
  header.setAttribute("aria-sort", newOrder)

  // Get the direction of the sort and assume only one tbody.
  // For this example only assume one tbody.
  let direction = SORTABLE_STATES[newOrder]
  let body = table.tBodies[0]
  // Convert the HTML element list to an array.
  let newRows = [...body.rows]

  // Sort based on a cell contents
  newRows.sort((rowA, rowB) => {
    const colClasses = [...rowA.cells[col].classList]
    // Custom logic for sorting the "latest releases" column of the team table
    if (colClasses.includes("release")) {
      return compareLastReleaseTime(rowA, rowB, col) ? direction : -direction
    }
    // Custom logic for sorting the "status" column of the team table
    if (colClasses.includes("status")) {
      return compareStatusBadgeContent(rowA, rowB, col) ? direction : -direction
    }
    // Fallback to basic string comparison (used for the repo name sort)
    // Trim the cell contents.
    let contentA = rowA.cells[col].textContent.trim()
    let contentB = rowB.cells[col].textContent.trim()
    return contentA > contentB ? direction : -direction
  })
  // Append each row into the table, replacing the current elements.
  newRows.forEach(row => body.appendChild(row))
}

document.querySelectorAll("table").forEach(table => {
  // Setup all the tables to be sortable
  const rows = [...table.tBodies[0].rows]
  rows.forEach((r, i) => r.setAttribute("data-index", i))
  const headers = table.querySelectorAll("th[aria-sort]")
  headers.forEach(h => h.addEventListener("click", () => sortTable(h, table)))
  // Default sort by Latest Releases
  table.querySelectorAll("th.release[aria-sort]").forEach(rh => sortTable(rh, table))
})
