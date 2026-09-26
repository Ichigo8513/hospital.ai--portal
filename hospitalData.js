// hospitalData.js - Context Dataset for MedAssist AI / CareBot

const HOSPITAL_DATA = {
  hospitalName: "CarePlus Super Specialty Hospital",
  emergencyContact: "+91-9876543210",
  address: "Sector 4, Main Road, City Center",
  opdTimings: "Monday to Saturday: 8:00 AM - 8:00 PM | Sunday: Emergency Only",

  departments: [
    {
      id: "cardiology",
      name: "Cardiology (Heart Care)",
      description: "Diagnosis and treatment of heart conditions, chest pain, and hypertension.",
      symptomsHandled: ["chest pain", "high blood pressure", "heart palpitations", "shortness of breath"]
    },
    {
      id: "pediatrics",
      name: "Pediatrics (Child Health)",
      description: "Comprehensive medical care for infants, children, and adolescents.",
      symptomsHandled: ["fever in child", "vaccination", "growth issues", "pediatric flu"]
    },
    {
      id: "orthopedics",
      name: "Orthopedics (Bones & Joints)",
      description: "Treatment for joint pain, fractures, arthritis, and sports injuries.",
      symptomsHandled: ["joint pain", "knee pain", "fracture", "back pain", "arthritis"]
    },
    {
      id: "dermatology",
      name: "Dermatology (Skin & Hair)",
      description: "Specialized care for skin infections, allergies, acne, and hair issues.",
      symptomsHandled: ["skin rash", "acne", "hair fall", "allergy", "eczema"]
    },
    {
      id: "neurology",
      name: "Neurology (Brain & Nerves)",
      description: "Care for severe headaches, migraines, nerve disorders, and seizures.",
      symptomsHandled: ["migraine", "severe headache", "dizziness", "numbness"]
    },
    {
      id: "neurosurgery",
      name: "Neurosurgery (Brain & Spine Surgery)",
      description: "Surgical care for complex brain, spine, and nerve disorders.",
      symptomsHandled: ["brain surgery", "spine injury", "nerve surgery"]
    }
  ],

  doctors: [
    {
      id: "doc101",
      name: "Dr. Rajesh Sharma",
      specialty: "Cardiology",
      qualification: "MD, DM (Cardiology)",
      experience: "15+ Years",
      fee: 800,
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "10:00 AM - 2:00 PM",
      rating: 4.9
    },
    {
      id: "doc102",
      name: "Dr. Priya Verma",
      specialty: "Pediatrics",
      qualification: "MD (Pediatrics)",
      experience: "10+ Years",
      fee: 600,
      availableDays: ["Monday", "Tuesday", "Thursday", "Saturday"],
      timings: "09:00 AM - 1:00 PM",
      rating: 4.8
    },
    {
      id: "doc103",
      name: "Dr. Ankit Malhotra",
      specialty: "Orthopedics",
      qualification: "MS (Orthopedics)",
      experience: "12+ Years",
      fee: 750,
      availableDays: ["Tuesday", "Thursday", "Friday"],
      timings: "02:00 PM - 6:00 PM",
      rating: 4.7
    },
    {
      id: "doc104",
      name: "Dr. Sneha Gupta",
      specialty: "Dermatology",
      qualification: "MD (Dermatology)",
      experience: "8+ Years",
      fee: 1000,
      availableDays: ["Monday", "Wednesday", "Saturday"],
      timings: "04:00 PM - 7:00 PM",
      rating: 4.9
    },
    {
      id: "doc105",
      name: "Dr. Vikram Joshi",
      specialty: "Neurology",
      qualification: "DM (Neurology)",
      experience: "18+ Years",
      fee: 900,
      availableDays: ["Tuesday", "Wednesday", "Friday"],
      timings: "11:00 AM - 3:00 PM",
      rating: 4.9
    },
    {
      id: "doc106",
      name: "Dr. Stephen Strange",
      specialty: "Neurosurgeon",
      qualification: "MCh (Neurosurgery), MS",
      experience: "16+ Years",
      fee: 1500,
      availableDays: ["Monday", "Thursday", "Saturday"],
      timings: "11:00 AM - 3:00 PM",
      rating: 5.0
    }
  ],

  healthPackages: [
    { name: "Full Body Checkup", price: 1999, testsIncluded: "60+ Tests including CBC, Lipid Profile, Liver Test" },
    { name: "Cardiac Care Package", price: 2999, testsIncluded: "ECG, Echo, Lipid Profile, Doctor Consultation" },
    { name: "Diabetes Management Screen", price: 999, testsIncluded: "HbA1c, Fasting Blood Sugar, Kidney Test" }
  ],

  faqResponses: {
    emergency: "For emergencies, please immediately call our 24/7 hotline at +91-9876543210 or visit Emergency Room Sector 4.",
    timings: "OPD operates Monday to Saturday from 8:00 AM to 8:00 PM.",
    discount: "Use promo code STUDENT10 during appointment confirmation to get a 10% discount on initial consultation fees.",
    cancellation: "You can reschedule or cancel appointments up to 2 hours before the scheduled time free of cost."
  }
};