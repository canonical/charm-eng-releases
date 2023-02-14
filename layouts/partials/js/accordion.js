const toggleExpandedAccordion = (element, show) => {
  const target = document.getElementById(element.getAttribute("aria-controls"))
  if (target) {
    element.setAttribute("aria-expanded", show)
    target.setAttribute("aria-hidden", !show)
  }
}

// Setup all accordions on the page.
const accordions = document.querySelectorAll(".p-accordion")
accordions.forEach(accordionContainer => {
  // Set up an event listener on the container so that panels can be added
  // and removed and events do not need to be managed separately.
  accordionContainer.addEventListener("click", event => {
    let target = event.target

    if (target) {
      if (target.closest) {
        target = target.closest('[class*="p-accordion__tab"]')
      }
      const isTargetOpen = target.getAttribute("aria-expanded") === "true"
      // Toggle visibility of the target panel.
      toggleExpandedAccordion(target, !isTargetOpen)
    }
  })
})
