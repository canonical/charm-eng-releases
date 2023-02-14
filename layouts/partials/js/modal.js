document.querySelectorAll("[role=modal-open]").forEach(btn => {
  btn.addEventListener("click", event => {
    const modalId = event.target.getAttribute("aria-controls")
    const modal = document.getElementById(modalId)
    modal.style.display = "flex"
  })
})
document.querySelectorAll("[role=modal-close]").forEach(btn => {
  btn.addEventListener("click", event => {
    const modalId = event.target.getAttribute("aria-controls")
    const modal = document.getElementById(modalId)
    modal.style.display = "none"
  })
})
