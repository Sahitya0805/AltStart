const routes = {
  '/': { id: 'home', theme: 'green-theme' },
  '/our-services': { id: 'services', theme: 'yellow-theme' },
  '/about-us': { id: 'about', theme: 'yellow-theme' },
  '/contact-us': { id: 'contact', theme: 'yellow-theme' }
};

function navigateTo(path) {
  // Update History
  window.history.pushState({}, '', path);
  
  // Render
  renderPage(path);
}

function renderPage(path) {
  const route = routes[path] || routes['/'];
  
  // Update Body Theme
  if (route.theme === 'yellow-theme') {
    document.body.classList.add('yellow-theme');
  } else {
    document.body.classList.remove('yellow-theme');
  }
  
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show active section
  const activeSection = document.getElementById(route.id);
  if (activeSection) {
    activeSection.classList.add('active');
  }
  
  // Update Nav Links
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
}

// Intercept clicks on links
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.getAttribute('href'));
    }
  });

  // Handle back/forward buttons
  window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
  });

  // Initial render based on URL, defaulting to '/' for local dev if path is index.html
  let initialPath = window.location.pathname;
  if (initialPath.endsWith('index.html')) {
      initialPath = '/';
  }
  
  renderPage(initialPath);
});

// Chatbot UI Toggle
function toggleChat() {
  const chatBubble = document.getElementById('chat-popup');
  if (chatBubble.style.display === 'none' || chatBubble.style.display === '') {
    chatBubble.style.display = 'flex';
  } else {
    chatBubble.style.display = 'none';
  }
}

// Chatbot Interactive Logic
function appendChatMessage(text, isUser = false) {
  const chatBody = document.getElementById('chat-body');
  if (!chatBody) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
  msgDiv.innerHTML = `<div class="msg-text">${text}</div>`;

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendQuickReply(optionText) {
  appendChatMessage(optionText, true);

  setTimeout(() => {
    let reply = "Thank you for reaching out! How else can I assist you?";
    const textLower = optionText.toLowerCase();

    if (textLower.includes('about altstart')) {
      reply = "AltStart helps universities, organizations, and individuals integrate hands-on AI training into their curriculum & operations to spark innovation.";
    } else if (textLower.includes('consultation')) {
      reply = "You can schedule a free 30-minute strategy call with our team! Call us at +91 91825 67700 or email altstart.contact@gmail.com.";
    } else if (textLower.includes('services')) {
      reply = "We offer Professor Development & Student Empowerment for Universities, Customized AI Training for Organizations, and Idea Incubators for Individuals & Teams!";
    } else if (textLower.includes('contact')) {
      reply = "📍 Phone: +91 91825 67700\n✉️ Email: altstart.contact@gmail.com";
    }

    appendChatMessage(reply, false);
  }, 600);
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-user-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  appendChatMessage(text, true);
  input.value = '';

  setTimeout(() => {
    let reply = "Thanks for your message! Our team will get back to you shortly. You can also reach us directly at +91 91825 67700 or altstart.contact@gmail.com.";
    const textLower = text.toLowerCase();

    if (textLower.includes('hello') || textLower.includes('hi') || textLower.includes('hey')) {
      reply = "Hello! 👋 How can I help you today?";
    } else if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('fee')) {
      reply = "Our pricing is customized based on your organization's needs. Please book a consultation call or contact us at altstart.contact@gmail.com for a quote!";
    } else if (textLower.includes('location') || textLower.includes('where')) {
      reply = "We operate across India with live interactive workshops for universities & corporate teams everywhere!";
    }

    appendChatMessage(reply, false);
  }, 700);
}

// Services Tab Switch
function switchTab(clickedBtn, tabId) {
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  // Add active to clicked
  clickedBtn.classList.add('active');
  
  // Hide all content panels
  document.querySelectorAll('.tabs-content').forEach(panel => {
    panel.style.display = 'none';
  });
  // Show selected panel
  const panel = document.getElementById('tab-' + tabId);
  if (panel) panel.style.display = 'block';
}

// Calendly Scheduling Modal Functions
let selectedTime = '10:00 AM';

function openCalendlyModal() {
  const modal = document.getElementById('calendly-modal');
  if (!modal) return;
  openCalendlyStep1();
  modal.style.display = 'flex';
}

function closeCalendlyModal() {
  const modal = document.getElementById('calendly-modal');
  if (modal) modal.style.display = 'none';
}

function openCalendlyStep1() {
  document.getElementById('calendly-step-1').style.display = 'block';
  document.getElementById('calendly-step-2').style.display = 'none';
  document.getElementById('calendly-step-3').style.display = 'none';
}

function openCalendlyStep2() {
  document.getElementById('calendly-step-1').style.display = 'none';
  document.getElementById('calendly-step-2').style.display = 'block';
  document.getElementById('calendly-step-3').style.display = 'none';
}

function selectTimeSlot(btn, timeStr) {
  document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedTime = timeStr;
}

function confirmBooking(e) {
  e.preventDefault();
  const name = document.getElementById('book-name').value.trim();
  const email = document.getElementById('book-email').value.trim();
  const date = document.getElementById('booking-date').value;

  const msg = `Thank you <strong>${name}</strong>! Your 30 Minute Meeting is scheduled for <strong>${date} at ${selectedTime}</strong>. Confirmation sent to <em>${email}</em>.`;
  document.getElementById('booking-confirmation-msg').innerHTML = msg;

  document.getElementById('calendly-step-1').style.display = 'none';
  document.getElementById('calendly-step-2').style.display = 'none';
  document.getElementById('calendly-step-3').style.display = 'block';
}

function closeChatTooltip(e) {
  if (e) e.stopPropagation();
  const tooltip = document.getElementById('chat-tooltip');
  if (tooltip) tooltip.style.display = 'none';
}

