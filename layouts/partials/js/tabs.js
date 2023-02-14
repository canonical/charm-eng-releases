const getQueryParams = key => {
  const usp = new URLSearchParams(window.location.search)
  return key ? usp.get(key) : usp
}

const setActiveTab = (tab, tabs) => {
  tabs.forEach(tabElement => {
    const tabContent = document.getElementById(tabElement.getAttribute("aria-controls"))

    if (tabElement === tab) {
      tabElement.setAttribute("aria-selected", true)
      tabContent.removeAttribute("hidden")
      // Update the query parameters in the URL
      const newParams = getQueryParams()
      newParams.set("team", tab.id)
      // Build a new URL with updated query parameters
      const { protocol, host, pathname } = window.location
      const newURL = `${protocol}//${host}${pathname}?${newParams}`
      // Update the URL in the address bar
      window.history.pushState({ path: newURL }, "", newURL)
    } else {
      tabElement.setAttribute("aria-selected", false)
      tabContent.setAttribute("hidden", true)
    }
  })
}

// Get the tab containers from the page
const tabContainers = document.querySelectorAll('[role="tablist"]')
tabContainers.forEach(tabContainer => {
  // Assign click / focus handlers for each of the tab buttons
  let tabs = tabContainer.querySelectorAll("[aria-controls]")
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", e => {
      e.preventDefault()
      setActiveTab(tab, tabs)
    })
    tab.addEventListener("focus", () => setActiveTab(tab, tabs))
    tab.index = index
  })
})

// Grab a list of the tab buttons
let tabs = document.querySelectorAll(".p-tabs__link")
// If we have a team attribute use it to set the active tab, else default to first tab
let tab = document.getElementById(getQueryParams("team"))
if (!tab) {
  tab = document.querySelector(".p-tabs__link")
}
setActiveTab(tab, tabs)
