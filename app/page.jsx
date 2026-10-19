"use client"

import { useEffect } from "react"

export default function Portfolio() {
  useEffect(() => {
    const hamburg = document.querySelector(".hamburg")
    const cancel = document.querySelector(".cancel")
    const dropdown = document.querySelector(".dropdown")
    const anchors = document.querySelectorAll('a[href^="#"]')
    const anchorHandlers = []

    const hamburgHandler = () => {
      dropdown?.classList.add("active")
      hamburg?.setAttribute("aria-expanded", "true")
    }

    const cancelHandler = () => {
      dropdown?.classList.remove("active")
      hamburg?.setAttribute("aria-expanded", "false")
    }

    hamburg?.addEventListener("click", hamburgHandler)
    cancel?.addEventListener("click", cancelHandler)

    anchors.forEach((anchor) => {
      const handleAnchorClick = (event) => {
        const href = anchor.getAttribute("href")
        const target = href && href !== "#" ? document.getElementById(href.slice(1)) : null

        if (target) {
          event.preventDefault()
          target.scrollIntoView({ behavior: "smooth" })
          dropdown?.classList.remove("active")
          hamburg?.setAttribute("aria-expanded", "false")
        }
      }

      anchor.addEventListener("click", handleAnchorClick)
      anchorHandlers.push([anchor, handleAnchorClick])
    })

    const handleScroll = () => {
      const nav = document.querySelector("nav")
      if (window.scrollY > 50) {
        nav?.classList.add("scrolled")
      } else {
        nav?.classList.remove("scrolled")
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    const typewriterText = document.querySelector(".typewriter-text")
    const words = ["Developer", "Programmer", "Problem Solver", "Game Enthusiast"]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typewriterTimer

    function type() {
      const currentWord = words[wordIndex]

      if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
      } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true
        typewriterTimer = window.setTimeout(type, 2000)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        typewriterTimer = window.setTimeout(type, 500)
      } else {
        typewriterTimer = window.setTimeout(type, isDeleting ? 50 : 100)
      }
    }

    if (typewriterText) {
      typewriterTimer = window.setTimeout(type, 1000)
    }

    const contactForm = document.getElementById("contactForm")
    const formStatus = document.getElementById("form-status")
    const handleContactSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData(contactForm)
      const name = String(formData.get("name") || "")
      const email = String(formData.get("email") || "")
      const message = String(formData.get("message") || "")
      const subject = `Portfolio contact from ${name}`
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`

      if (formStatus) {
        formStatus.textContent =
          "Your email app should open with your message. If it doesn't, email lester.j.evangelista@gmail.com."
      }
      window.location.href = `mailto:lester.j.evangelista@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    contactForm?.addEventListener("submit", handleContactSubmit)

    return () => {
      hamburg?.removeEventListener("click", hamburgHandler)
      cancel?.removeEventListener("click", cancelHandler)
      anchorHandlers.forEach(([anchor, handler]) => anchor.removeEventListener("click", handler))
      window.removeEventListener("scroll", handleScroll)
      contactForm?.removeEventListener("submit", handleContactSubmit)
      window.clearTimeout(typewriterTimer)
    }
  }, [])

  return (
    <>
      <nav>
        <div className="nav-container">
          <a href="#home" className="logo">
            <span>Lester</span>
          </a>
          <div className="links">
            <div className="link">
              <a href="#home">Home</a>
            </div>
            <div className="link">
              <a href="#about">About</a>
            </div>
            <div className="link">
              <a href="#skills">Skills</a>
            </div>
            <div className="link">
              <a href="#projects">Projects</a>
            </div>
            <div className="link">
              <a href="#resume">Resume</a>
            </div>
            <div className="link">
              <a href="#contact">Contact</a>
            </div>
          </div>
          <button className="hamburg" type="button" aria-label="Open navigation menu" aria-expanded="false">
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <div className="dropdown">
          <div className="links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
            <button className="cancel" type="button" aria-label="Close navigation menu">
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </nav>

      <section id="home">
        <div className="main-container">
          <div className="image">
            <img src="/lester-profile.jpg" alt="Lester John Evangelista" className="profile-image" />
          </div>
          <div className="content">
            <h1>
              Hey I'm <span>Lester John</span>
            </h1>
            <div className="typewriter">
              I'm a <span className="typewriter-text">Developer</span>
            </div>
            <p>
              A passionate Computer Science student at Technological University of the Philippines (TUP) – Manila. I
              find creativity in solving problems through code and love building interactive experiences. My journey in
              programming started when I discovered how a few lines of code can bring ideas to life, especially in
              creating games where logic meets imagination.
            </p>
            <div className="social-links">
              <a
                href="https://github.com/Lester-4-Kaizen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.facebook.com/lesterjohn.evangelista.1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/__lezszz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://t.me/ljohn04" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
            <div className="btn">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Hire me
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="content">
          <div className="title">
            <span>About Me</span>
          </div>
          <div className="about-details">
            <div className="left">
              <img src="/lester-profile.jpg" alt="Lester John Evangelista" className="about-profile-image" />
            </div>
            <div className="right">
              <div className="topic">Building Ideas Into Code</div>
              <p>
                I'm currently a 3rd-year BS Computer Science student at the Technological University of the Philippines
                (TUP) – Manila, expected to graduate in 2026–2027. My passion for programming ignited when I realized
                how powerful code can be in transforming ideas into reality.
              </p>
              <p>
                What excites me most is game development, where logic meets imagination. I enjoy exploring different
                areas of computer science, continuously learning new technologies, and building projects that combine
                creativity with functionality. I'm a Dean's Lister, committed to excellence in both academics and
                practical application.
              </p>
              <div className="button">
                <button onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}>
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="content">
          <div className="title">
            <span>My Skills</span>
          </div>
          <div className="skills-details">
            <div className="text">
              <div className="topic">Skills Reflect My Knowledge</div>
              <p>
                I'm continuously expanding my technical expertise across multiple domains of computer science. From web
                development to cybersecurity, I'm building a strong foundation in various technologies that will help me
                specialize in web and software development while staying adaptable to new challenges.
              </p>
              <div className="experience">
                <div className="num">3+</div>
                <div className="exp">
                  Years Of <br />
                  Learning
                </div>
              </div>
            </div>
            <div className="boxes">
              <div className="box">
                <div className="topic">HTML & CSS</div>
                <div className="per">85%</div>
              </div>
              <div className="box">
                <div className="topic">JavaScript</div>
                <div className="per">80%</div>
              </div>
              <div className="box">
                <div className="topic">Python</div>
                <div className="per">75%</div>
              </div>
              <div className="box">
                <div className="topic">SQL</div>
                <div className="per">70%</div>
              </div>
              <div className="box">
                <div className="topic">C++ / C</div>
                <div className="per">65%</div>
              </div>
              <div className="box">
                <div className="topic">Cybersecurity</div>
                <div className="per">60%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="content">
          <div className="title">
            <span>My Projects</span>
          </div>
          <div className="boxes">
            <div className="box">
              <div className="icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="topic">E-commerce Website</div>
              <p>
                A full-featured online shopping platform with product catalog, cart functionality, and checkout system.
              </p>
              <div className="project-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-comments"></i>
              </div>
              <div className="topic">Chat Application</div>
              <p>Real-time messaging application with user authentication and message history features.</p>
              <div className="project-tags">
                <span>JavaScript</span>
                <span>Python</span>
                <span>SQL</span>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-university"></i>
              </div>
              <div className="topic">Banking System</div>
              <p>Secure banking application with account management, transactions, and security features.</p>
              <div className="project-tags">
                <span>Python</span>
                <span>SQL</span>
                <span>Security</span>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-gamepad"></i>
              </div>
              <div className="topic">Game Development</div>
              <p>Interactive games combining logic and creativity, showcasing problem-solving skills.</p>
              <div className="project-tags">
                <span>C++</span>
                <span>Python</span>
                <span>JavaScript</span>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="topic">Web Applications</div>
              <p>Various web-based projects demonstrating frontend and backend development skills.</p>
              <div className="project-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="topic">Security Projects</div>
              <p>Cybersecurity implementations focusing on secure coding practices and vulnerability assessment.</p>
              <div className="project-tags">
                <span>Python</span>
                <span>Security</span>
                <span>C++</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resume" id="resume">
        <div className="content">
          <div className="title">
            <span>Resume</span>
          </div>
          <div className="resume-details">
            <div className="resume-section">
              <h3>
                <i className="fas fa-graduation-cap"></i> Education
              </h3>
              <div className="resume-item">
                <h4>Bachelor of Science in Computer Science</h4>
                <p className="institution">Technological University of the Philippines (TUP), Ayala Blvd, Ermita, Manila</p>
                <p className="year">Expected Graduation: 2023–2026</p>
                <p className="description">3rd Year Student | Dean's Lister</p>
                <h4>Senior High School</h4>
                <p className="institution">Rosebelle Academy of Tarlac Inc., Victoria, Tarlac</p>
                <p className="year">Graduated: 2020–2022</p>
                <p className="description">Graduated Senior High School with honors consecutively</p>
                <h4>Junior High School</h4>
                <p className="institution">Exequiel R. Lina High School, Nueva Ecija, Licab</p>
                <p className="year">Graduated: 2016–2020</p>
                <p className="description">Graduated Junior High School with honors consecutively</p>
              </div>
            </div>

            <div className="resume-section">
              <h3>
                <i className="fas fa-trophy"></i> Achievements
              </h3>
              <div className="resume-item">
                <h4>Dean's Lister</h4>
                <p className="institution">Technological University of the Philippines – Manila</p>
                <p className="description">Recognized for academic excellence and outstanding performance</p>
              </div>
            </div>

            <div className="resume-section">
              <h3>
                <i className="fas fa-bullseye"></i> Career Goal
              </h3>
              <div className="resume-item">
                <p className="description">
                  To specialize in web and software development while continuously learning new technologies. Passionate
                  about game development and creating interactive experiences that combine logic with creativity.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="content">
          <div className="title">
            <span>Contact Me</span>
          </div>
          <div className="contact-container">
            <div className="contact-form-wrapper">
              <div className="topic">Have a Project in Mind?</div>
              <p>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out and let's create something amazing together!
              </p>
              <form id="contactForm">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input id="contact-email" type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    required
                  ></textarea>
                </div>
                <p id="form-status" className="form-status" role="status" aria-live="polite"></p>
                <div className="button">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <h4>Email</h4>
                <p>lester.j.evangelista@gmail.com</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <h4>Location</h4>
                <p>Parang Marikina, Philippines</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-university"></i>
                <h4>University</h4>
                <p>Technological University of the Philippines - Manila</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="text">
          <span>
            Created by <a href="#home">Lester John Evangelista</a> | ©2026 All Rights Reserved
          </span>
        </div>
      </footer>

    </>
  )
}
