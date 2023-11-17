const toggleExpanded = (element, show) => {
  const target = document.getElementById(element.getAttribute("aria-controls"))
  if (target) {
    element.setAttribute("aria-expanded", show)
    // Adjust the text of the toggle button
    element.innerHTML = element.getAttribute(show ? "data-shown-text" : "data-hidden-text")

    target.setAttribute("aria-hidden", !show)
  }
}

// Adjust the text of the toggle button
const toggleButton = (element, active) => {
  element.setAttribute("active", active)
  element.innerHTML = element.getAttribute(active ? "active-text" : "inactive-text")
}

// Add control to expand or collapse all rows at once
const toggleAllButton = document.getElementById("toggle-all-rows")
toggleAllButton.addEventListener(
  "change",
  event => {
    const expandButtons = document.querySelectorAll(".store-toggle")
    const target = event.target
    const isTargetActive = target.getAttribute("active") === "true"
    toggleButton(target, !isTargetActive)

    expandButtons.forEach(b => {
      if (!b.disabled) {
        toggleExpanded(b, !isTargetActive)
      }
    })
  },
  false
)

// Add textbox to filter repositories
const tableFilterTextbox = document.getElementById("table-filter-textbox")
tableFilterTextbox.addEventListener(
  "input",
  event => {
    const text = event.target.value
    const repositoryRows = document.querySelectorAll(".repository-row")

    // Escape special regex symbols except '|' to specify ORs
    const regexp = new RegExp(text.toLowerCase().replace(/[.*+?^${}()[\]\\]/g, "\\$&"))

    repositoryRows.forEach(r => {
      const repoName = r.querySelector(".repository-link").textContent
      r.style.display = regexp.test(repoName) ? "" : "none"
    })
  },
  false
)

// Setup all expandable tables on the page.
const tables = document.querySelectorAll(".p-table--expanding")
tables.forEach(table => {
  // Set up an event listener on the container so that panels can be added
  // and removed and events do not need to be managed separately.
  table.addEventListener("click", event => {
    const target = event.target
    const isTargetOpen = target.getAttribute("aria-expanded") === "true"

    if (target.classList.contains("u-toggle")) {
      // Toggle visibility of the target panel.
      toggleExpanded(target, !isTargetOpen)
    }
  })
})
