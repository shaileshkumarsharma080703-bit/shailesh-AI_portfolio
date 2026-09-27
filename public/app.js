const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function addMessage(text, role, extraClass = "") {
  const el = document.createElement("div");
  el.className = `message ${role} ${extraClass}`.trim();
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}

async function askAI(question) {
  if (!question.trim()) return;

  addMessage(question, "user");
  chatInput.value = "";
  const typing = addMessage("Thinking…", "assistant", "typing");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    typing.remove();

    if (!response.ok) {
      addMessage(data.error || "The AI assistant is unavailable right now.", "assistant");
      return;
    }

    addMessage(data.answer, "assistant");
  } catch (error) {
    typing.remove();
    addMessage(
      "I can’t reach the Gemini backend. Start the Node server and make sure GEMINI_API_KEY is set in your .env file.",
      "assistant"
    );
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askAI(chatInput.value);
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => askAI(button.dataset.question));
});
