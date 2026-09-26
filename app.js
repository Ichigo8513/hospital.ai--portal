// app.js - Application Logic & Gemini AI / Local Fallback Chatbot

// State Management
let selectedDoctor = null;

// Initialize Web Application Interface
document.addEventListener("DOMContentLoaded", () => {
  renderDoctors(HOSPITAL_DATA.doctors);
  renderPackages(HOSPITAL_DATA.healthPackages);
  setupEventListeners();
});

// 1. Render Doctors Cards
function renderDoctors(doctorsList) {
  const grid = document.getElementById("doctorsGrid");
  grid.innerHTML = "";

  if (doctorsList.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted);">No doctors found matching your criteria.</p>`;
    return;
  }

  doctorsList.forEach(doc => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-header">
          <h3 class="card-title">${doc.name}</h3>
          <span class="badge">⭐ ${doc.rating}</span>
        </div>
        <div class="card-body">
          <p><strong>Specialty:</strong> ${doc.specialty}</p>
          <p><strong>Qualification:</strong> ${doc.qualification}</p>
          <p><strong>Experience:</strong> ${doc.experience}</p>
          <p><strong>Available:</strong> ${doc.availableDays.join(", ")}</p>
          <p><strong>OPD Hours:</strong> ${doc.timings}</p>
          <div class="price">₹${doc.fee} <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">Consultation Fee</span></div>
        </div>
      </div>
      <button class="btn btn-primary" style="margin-top: 1rem;" onclick="selectDoctor('${doc.id}')">Select for Booking</button>
    `;
    grid.appendChild(card);
  });
}

// 2. Render Health Packages
function renderPackages(packagesList) {
  const grid = document.getElementById("packagesGrid");
  grid.innerHTML = "";

  packagesList.forEach(pkg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-header">
          <h3 class="card-title">${pkg.name}</h3>
        </div>
        <div class="card-body">
          <p>${pkg.testsIncluded}</p>
          <div class="price">₹${pkg.price}</div>
        </div>
      </div>
      <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="alert('Health package details requested! Visit hospital desk to enroll.')">Inquire Package</button>
    `;
    grid.appendChild(card);
  });
}

// 3. Search and Department Filter Handlers
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const deptFilter = document.getElementById("departmentFilter");

  function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDept = deptFilter.value;

    const filtered = HOSPITAL_DATA.doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm) || 
                            doc.specialty.toLowerCase().includes(searchTerm);
      const matchesDept = selectedDept === "all" || doc.specialty === selectedDept;
      return matchesSearch && matchesDept;
    });

    renderDoctors(filtered);
  }

  searchInput.addEventListener("input", filterData);
  deptFilter.addEventListener("change", filterData);
}

// 4. Select Doctor for Booking Form
function selectDoctor(docId) {
  selectedDoctor = HOSPITAL_DATA.doctors.find(d => d.id === docId);
  const container = document.getElementById("selectedDoctorCard");

  container.innerHTML = `
    <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; border: 1px solid var(--border);">
      <h4 style="color: var(--primary);">${selectedDoctor.name}</h4>
      <p style="font-size: 0.9rem;"><strong>Specialty:</strong> ${selectedDoctor.specialty}</p>
      <p style="font-size: 0.9rem;"><strong>Consultation Fee:</strong> ₹${selectedDoctor.fee}</p>
      <p style="font-size: 0.9rem;"><strong>Available:</strong> ${selectedDoctor.availableDays.join(", ")} (${selectedDoctor.timings})</p>
    </div>
  `;

  // Smooth scroll to booking section
  document.getElementById("booking").scrollIntoView({ behavior: 'smooth' });
}

// 5. Handle Booking Submission
function handleBooking(event) {
  event.preventDefault();

  if (!selectedDoctor) {
    alert("Please select a doctor before confirming an appointment!");
    return;
  }

  const patientName = document.getElementById("patientName").value;
  const date = document.getElementById("appointmentDate").value;
  const promo = document.getElementById("promoCode").value.trim().toUpperCase();

  let finalFee = selectedDoctor.fee;
  let discountMsg = "";

  if (promo === "STUDENT10") {
    finalFee = finalFee * 0.9;
    discountMsg = " (10% Student Discount Applied!)";
  }

  alert(`Appointment Confirmed!\n\nPatient: ${patientName}\nDoctor: ${selectedDoctor.name}\nDate: ${date}\nFinal Payable Fee: ₹${finalFee}${discountMsg}\n\nStatus: Confirmed - Please arrive 15 minutes before slot.`);
  
  // Reset Form
  document.getElementById("bookingForm").reset();
}

// 6. Chatbot Interface Logic
function toggleChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const query = input.value.trim();
  if (!query) return;

  // Display user message
  appendMessage(query, "user");
  input.value = "";

  // Generate Response using Gemini or Local Fallback
  const botReply = await getAIResponse(query);
  appendMessage(botReply, "bot");
}

function appendMessage(text, sender) {
  const container = document.getElementById("chatMessages");
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg msg-${sender}`;
  msgDiv.innerText = text;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// 7. Context-Aware AI Engine (Gemini API with Local Fallback)
async function getAIResponse(userText) {
  const GEMINI_API_KEY = ""; // Paste your Google Gemini API key here if available

  // Prepare Hospital Dataset Context
  const systemContext = `
    You are CareBot, an AI receptionist for ${HOSPITAL_DATA.hospitalName}.
    Use ONLY the following hospital data to answer user questions:
    - Emergency Line: ${HOSPITAL_DATA.emergencyContact}
    - OPD Timings: ${HOSPITAL_DATA.opdTimings}
    - Available Doctors: ${JSON.stringify(HOSPITAL_DATA.doctors)}
    - Departments: ${JSON.stringify(HOSPITAL_DATA.departments)}
    
    Guidelines:
    - Keep answers concise, helpful, and polite.
    - If asked about medical diagnoses, give general department guidance and advise seeing a doctor.
  `;

  // Attempt Gemini API call if key is set
  if (GEMINI_API_KEY && GEMINI_API_KEY !== "") {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemContext}\nUser Query: ${userText}` }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.warn("Gemini API call failed, switching to local fallback assistant.", error);
    }
  }

  // Local Rule-Based Fallback Assistant
  const text = userText.toLowerCase();

  if (text.includes("emergency") || text.includes("urgent") || text.includes("ambulance")) {
    return HOSPITAL_DATA.faqResponses.emergency;
  }
  if (text.includes("time") || text.includes("timing") || text.includes("open") || text.includes("opd")) {
    return HOSPITAL_DATA.faqResponses.timings;
  }
  if (text.includes("discount") || text.includes("promo") || text.includes("code") || text.includes("coupon")) {
    return HOSPITAL_DATA.faqResponses.discount;
  }
  if (text.includes("heart") || text.includes("chest") || text.includes("cardiology")) {
    return "For heart or chest issues, you can consult Dr. Rajesh Sharma in the Cardiology department. OPD timings are Mon, Wed, Fri (10 AM - 2 PM).";
  }
  if (text.includes("child") || text.includes("baby") || text.includes("fever") || text.includes("pediatric")) {
    return "For pediatric care, Dr. Priya Verma is available in Pediatrics on Mon, Tue, Thu, and Sat (9 AM - 1 PM).";
  }
  if (text.includes("skin") || text.includes("rash") || text.includes("hair") || text.includes("dermatology")) {
    return "Our Dermatology specialist is Dr. Sneha Gupta, available Mon, Wed, Sat (4 PM - 7 PM).";
  }
  if (text.includes("bone") || text.includes("joint") || text.includes("knee") || text.includes("orthopedic")) {
    return "For bone and joint concerns, consult Dr. Ankit Malhotra in Orthopedics on Tue, Thu, Fri (2 PM - 6 PM).";
  }

  return "I am CareBot! You can ask me about doctor timings, hospital departments, emergency contact numbers, or promo codes like STUDENT10.";
}