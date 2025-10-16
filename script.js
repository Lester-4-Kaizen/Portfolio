// Import EmailJS library
const emailjs = require("emailjs-com")

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("YOUR_PUBLIC_KEY")
  // Navigation Toggle
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const nav = document.getElementById("nav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section")

  function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.textContent
    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    // Send email using EmailJS
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "lester.j.evangelista@gmail.com",
      })
      .then(() => {
        // Success
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`)

    contactForm.reset()
    })
      .catch((error) => {
        // Error
        console.error("EmailJS Error:", error)
        alert(
          "Sorry, there was an error sending your message. Please try again or email me directly at lester.j.evangelista@gmail.com",
        )
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalButtonText
        submitButton.disabled = false
      })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Add fade-in animation to elements
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .about-content")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Dynamic year in footer
  const currentYear = new Date().getFullYear()
  const footerText = document.querySelector(".footer p")
  if (footerText) {
    footerText.textContent = footerText.textContent.replace("2025", currentYear)
  }
})

