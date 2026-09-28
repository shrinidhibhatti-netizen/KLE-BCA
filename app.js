/**
 * KLE BCA (College of Computer Applications) - Interactive Engine
 * Powering Admissions, Scholarship Calculator, Student ERP, Notice Board, and Modals
 */

// ==========================================
// 1. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type === 'success' ? 'toast-success' : 'toast-info'}`;

  const iconSvg = type === 'success' 
    ? `<svg class="w-6 h-6 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : `<svg class="w-6 h-6 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">
      <h4 class="text-sm font-bold text-slate-900">${title}</h4>
      <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 p-1 -mr-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// ==========================================
// 2. MODAL CONTROLLERS (Generic Modal Helper)
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
  }
}

// Close modals on Escape key or backdrop click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-visible').forEach(m => closeModal(m.id));
  }
});

// ==========================================
// 3. INTERACTIVE HERO CODE TERMINAL PREVIEW
// ==========================================
const codeSnippets = {
  ai: {
    title: 'ai_model_training.py',
    code: `# KLE BCA AI & Deep Learning Lab
import torch
import torch.nn as nn
from kle_bca_data import load_vision_dataset

# Initialize Neural Network on KLE GPU Cluster
model = nn.Sequential(
    nn.Conv2d(3, 64, kernel_size=3, padding=1),
    nn.BatchNorm2d(64),
    nn.ReLU(),
    nn.MaxPool2d(2, 2),
    nn.Linear(64 * 16 * 16, 10)
).to("cuda:0")

print("[KLE-AI-LAB] Training initialized on NVIDIA RTX GPU...")`,
    output: `[KLE-AI-LAB] Epoch [1/10] -> Loss: 0.2412 | Accuracy: 94.2%
[KLE-AI-LAB] Epoch [10/10] -> Loss: 0.0481 | Accuracy: 99.4%
[KLE-AI-LAB] Model successfully exported for Autonomous Robotics.`
  },
  web: {
    title: 'ModernWebApp.tsx',
    code: `// KLE BCA Full-Stack Web Architecture
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from 'next/server';

export default function StudentDashboard() {
  const [data, setData] = useState({ gpa: 9.2, attendance: 96 });

  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
      <h2 className="text-xl font-bold text-sky-900">KLE BCA Portal</h2>
      <p className="text-sky-600">Current CGPA: {data.gpa} / 10.0</p>
      <span className="badge bg-green-500 text-white">Dean's Honor List</span>
    </div>
  );
}`,
    output: `[WEBPACK] Compiled client and server in 412ms
[FAST-REFRESH] 0 errors, 0 warnings.
[PREVIEW] App running at http://localhost:3000 (KLE Cloud Server)`
  },
  cloud: {
    title: 'cloud_infra_aws.tf',
    code: `# KLE BCA DevOps & Cloud Architecture
resource "aws_vpc" "kle_bca_network" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "KLE-BCA-Cloud-Sandbox" }
}

resource "aws_eks_cluster" "kle_kubernetes" {
  name     = "kle-production-cluster"
  role_arn = aws_iam_role.cluster_role.arn
  version  = "1.29"
}`,
    output: `Plan: 4 to add, 0 to change, 0 to destroy.
aws_vpc.kle_bca_network: Creating...
aws_eks_cluster.kle_kubernetes: Creation complete after 3m 12s
Apply complete! Resources: 4 added, 0 destroyed.`
  }
};

function switchCodeTab(tech) {
  const data = codeSnippets[tech];
  if (!data) return;

  // Update tabs style
  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.remove('bg-slate-800', 'text-sky-400', 'border-b-2', 'border-sky-400');
    btn.classList.add('text-slate-400');
  });

  const activeBtn = document.getElementById(`tab-btn-${tech}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-400');
    activeBtn.classList.add('bg-slate-800', 'text-sky-400', 'border-b-2', 'border-sky-400');
  }

  const fileName = document.getElementById('code-terminal-filename');
  const codeBlock = document.getElementById('code-terminal-content');
  const outputBlock = document.getElementById('code-terminal-output');

  if (fileName) fileName.innerText = data.title;
  if (codeBlock) codeBlock.innerText = data.code;
  if (outputBlock) {
    outputBlock.innerText = '// Click "Execute Script" to test build output';
    outputBlock.classList.add('text-slate-500');
    outputBlock.classList.remove('text-emerald-400');
  }
}

function runCodeTerminal() {
  const outputBlock = document.getElementById('code-terminal-output');
  if (!outputBlock) return;

  outputBlock.innerText = 'Compiling and executing in KLE Cloud Sandbox...';
  outputBlock.classList.remove('text-slate-500');
  outputBlock.classList.add('text-sky-400');

  setTimeout(() => {
    // Find active tab
    const activeBtn = document.querySelector('.code-tab-btn.text-sky-400');
    let tech = 'ai';
    if (activeBtn && activeBtn.id) {
      tech = activeBtn.id.replace('tab-btn-', '');
    }
    const data = codeSnippets[tech] || codeSnippets.ai;
    outputBlock.innerText = data.output;
    outputBlock.classList.remove('text-sky-400');
    outputBlock.classList.add('text-emerald-400');
    showToast('Code Executed', 'Compiled successfully in the KLE High-Performance Cloud Lab.', 'success');
  }, 600);
}

// ==========================================
// 4. INTERACTIVE FEE & MERIT SCHOLARSHIP CALCULATOR
// ==========================================
function calculateScholarship() {
  const percentageInput = document.getElementById('calc-percentage');
  const streamInput = document.getElementById('calc-stream');
  const categoryInput = document.getElementById('calc-category');

  if (!percentageInput) return;

  const score = parseFloat(percentageInput.value) || 0;
  const percentageDisplay = document.getElementById('calc-percentage-val');
  if (percentageDisplay) percentageDisplay.innerText = score.toFixed(1) + '%';

  // Base Fees
  const tuitionBase = 75000;
  const labCloudFee = 15000;
  const libraryExamFee = 5000;
  const standardTotal = tuitionBase + labCloudFee + libraryExamFee;

  let scholarshipPercent = 0;
  let scholarshipTitle = 'Standard Merit Admission';
  let badgeColor = 'bg-sky-100 text-sky-800 border-sky-300';

  if (score >= 95) {
    scholarshipPercent = 50;
    scholarshipTitle = "Saptarshi Chairman's Platinum Scholarship (50% Tuition Waiver)";
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (score >= 88) {
    scholarshipPercent = 35;
    scholarshipTitle = 'KLE Tech Innovator Gold Scholarship (35% Tuition Waiver)';
    badgeColor = 'bg-sky-100 text-sky-800 border-sky-300';
  } else if (score >= 80) {
    scholarshipPercent = 20;
    scholarshipTitle = 'KLE Academic Silver Scholarship (20% Tuition Waiver)';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
  } else if (score >= 70) {
    scholarshipPercent = 10;
    scholarshipTitle = 'Early Bird Merit Grant (10% Tuition Waiver)';
    badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
  }

  // Extra category/sports bonus if applicable
  if (categoryInput && (categoryInput.value === 'sports' || categoryInput.value === 'scst')) {
    scholarshipPercent = Math.min(60, scholarshipPercent + 10);
    scholarshipTitle += ' + Special Category/Sports Grant (10% Bonus)';
  }

  const discountAmount = Math.round((tuitionBase * scholarshipPercent) / 100);
  const netPayable = standardTotal - discountAmount;

  // Update UI Elements
  const elTitle = document.getElementById('calc-scholarship-title');
  const elDiscount = document.getElementById('calc-discount-val');
  const elNet = document.getElementById('calc-net-val');
  const elBase = document.getElementById('calc-base-val');
  const elEligibility = document.getElementById('calc-eligibility-badge');

  if (elTitle) elTitle.innerText = scholarshipTitle;
  if (elDiscount) elDiscount.innerText = `₹${discountAmount.toLocaleString('en-IN')}`;
  if (elNet) elNet.innerText = `₹${netPayable.toLocaleString('en-IN')} / year`;
  if (elBase) elBase.innerText = `₹${standardTotal.toLocaleString('en-IN')} / year`;

  if (elEligibility) {
    if (score >= 50) {
      elEligibility.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          Direct Admission Eligible (NEP 2020 Batch)
        </span>
      `;
    } else {
      elEligibility.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <svg class="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          Conditional / Counseling Required (<50% Score)
        </span>
      `;
    }
  }
}

// Pre-fill scholarship into admission modal
function claimCalculatedScholarship() {
  const percentageInput = document.getElementById('calc-percentage');
  const score = percentageInput ? percentageInput.value : '85';
  
  openModal('admission-modal');
  goToAdmissionStep(2);
  
  const admMarks = document.getElementById('adm-percentage');
  if (admMarks) admMarks.value = score;
  
  showToast('Scholarship Selected', `Your calculated merit tier has been pre-filled into the Application.`, 'info');
}

// ==========================================
// 5. MULTI-STEP ADMISSION APPLICATION WIZARD
// ==========================================
let currentAdmissionStep = 1;

function goToAdmissionStep(step) {
  // Validate current step before progressing forward
  if (step > currentAdmissionStep) {
    if (currentAdmissionStep === 1) {
      const name = document.getElementById('adm-fullname')?.value.trim();
      const email = document.getElementById('adm-email')?.value.trim();
      const phone = document.getElementById('adm-phone')?.value.trim();
      if (!name || !email || !phone) {
        showToast('Required Fields Missing', 'Please enter your Full Name, Email, and 10-digit Phone Number.', 'info');
        return;
      }
    }
  }

  currentAdmissionStep = step;

  // Show/Hide Steps
  document.querySelectorAll('.admission-step-pane').forEach((pane, idx) => {
    if (idx + 1 === step) {
      pane.classList.remove('hidden');
    } else {
      pane.classList.add('hidden');
    }
  });

  // Update step progress indicator pills
  document.querySelectorAll('.step-indicator-pill').forEach((pill, idx) => {
    if (idx + 1 === step) {
      pill.classList.add('bg-sky-600', 'text-white', 'border-sky-600');
      pill.classList.remove('bg-white', 'text-slate-500', 'border-slate-300');
    } else if (idx + 1 < step) {
      pill.classList.add('bg-sky-100', 'text-sky-700', 'border-sky-300');
      pill.classList.remove('bg-white', 'text-slate-500', 'border-slate-300');
    } else {
      pill.classList.remove('bg-sky-600', 'text-white', 'border-sky-600', 'bg-sky-100', 'text-sky-700');
      pill.classList.add('bg-white', 'text-slate-500', 'border-slate-300');
    }
  });
}

function submitAdmissionApplication(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('adm-fullname')?.value.trim() || 'Aarav Sharma';
  const email = document.getElementById('adm-email')?.value.trim() || 'aarav@example.com';
  const phone = document.getElementById('adm-phone')?.value.trim() || '+91 9876543210';
  const parentName = document.getElementById('adm-parent')?.value.trim() || 'Rajesh Sharma';
  const city = document.getElementById('adm-city')?.value.trim() || 'Hubballi / Belagavi';
  const stream = document.getElementById('adm-stream')?.value || 'PUC Science (PCMC)';
  const percentage = document.getElementById('adm-percentage')?.value || '88';
  const specialization = document.getElementById('adm-specialization')?.value || 'BCA (Artificial Intelligence & Machine Learning)';
  const quota = document.getElementById('adm-quota')?.value || 'Merit Quota (State/Institutional)';
  const hostel = document.getElementById('adm-hostel')?.value || 'Day Scholar';

  // Generate unique registration ID
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const applicationId = `KLE-BCA-2026-${randomNum}`;
  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Scholarship calculation
  let scholarshipText = 'Standard Tuition Structure';
  const numPerc = parseFloat(percentage) || 0;
  if (numPerc >= 95) scholarshipText = '50% Platinum Merit Scholarship Approved';
  else if (numPerc >= 85) scholarshipText = '35% Gold Merit Scholarship Approved';
  else if (numPerc >= 75) scholarshipText = '20% Silver Merit Scholarship Approved';

  // Populate printable slip
  document.getElementById('slip-app-id').innerText = applicationId;
  document.getElementById('slip-date').innerText = currentDate;
  document.getElementById('slip-name').innerText = name;
  document.getElementById('slip-email').innerText = email;
  document.getElementById('slip-phone').innerText = phone;
  document.getElementById('slip-parent').innerText = parentName;
  document.getElementById('slip-city').innerText = city;
  document.getElementById('slip-stream').innerText = `${stream} (${percentage}%)`;
  document.getElementById('slip-specialization').innerText = specialization;
  document.getElementById('slip-quota').innerText = quota;
  document.getElementById('slip-hostel').innerText = hostel;
  document.getElementById('slip-scholarship').innerText = scholarshipText;

  // Show Success Section in modal
  document.getElementById('adm-form-container').classList.add('hidden');
  document.getElementById('adm-success-container').classList.remove('hidden');

  showToast('Application Submitted!', `Provisional Application generated: ${applicationId}. Check your email.`, 'success');
}

function resetAdmissionForm() {
  document.getElementById('admission-form')?.reset();
  currentAdmissionStep = 1;
  goToAdmissionStep(1);
  document.getElementById('adm-form-container').classList.remove('hidden');
  document.getElementById('adm-success-container').classList.add('hidden');
  closeModal('admission-modal');
}

function printAdmissionSlip() {
  window.print();
}

// ==========================================
// 6. STUDENT ERP PORTAL SIMULATION
// ==========================================
function handleStudentLogin(e) {
  if (e) e.preventDefault();

  const usn = document.getElementById('erp-usn')?.value.trim();
  const pass = document.getElementById('erp-password')?.value.trim();

  // Simple simulated authentication
  if (!usn || !pass) {
    showToast('Missing Credentials', 'Please enter your USN / Email and Password or use 1-Click Demo.', 'info');
    return;
  }

  // Switch to authenticated dashboard view
  document.getElementById('erp-login-view').classList.add('hidden');
  document.getElementById('erp-dashboard-view').classList.remove('hidden');

  showToast('Welcome, Aarav Sharma!', 'KLE Student ERP Portal session started. Semester 4 Dashboard loaded.', 'success');
}

function fillDemoLogin() {
  const usnField = document.getElementById('erp-usn');
  const passField = document.getElementById('erp-password');
  if (usnField) usnField.value = '2KL23BCA042';
  if (passField) passField.value = 'DemoPass@2026';
  showToast('Demo Credentials Filled', 'USN: 2KL23BCA042 | Ready to log in.', 'info');
}

function handleStudentLogout() {
  document.getElementById('erp-login-view').classList.remove('hidden');
  document.getElementById('erp-dashboard-view').classList.add('hidden');
  showToast('Logged Out', 'You have been safely signed out of the KLE ERP Portal.', 'info');
}

function downloadSimulatedHallTicket() {
  showToast('Hall Ticket Downloaded', 'Official Semester 4 NEP Hall Ticket (USN: 2KL23BCA042) downloaded as PDF.', 'success');
}

function downloadSimulatedFeeReceipt() {
  showToast('Fee Receipt Downloaded', 'Academic Year 2025-26 Paid Fee Receipt #KLE-REC-9014 downloaded.', 'success');
}

// ==========================================
// 7. NOTICE BOARD & CIRCULARS SEARCH & FILTER
// ==========================================
function filterNotices(category) {
  // Update active pill button
  document.querySelectorAll('.notice-filter-btn').forEach(btn => {
    btn.classList.remove('bg-sky-600', 'text-white');
    btn.classList.add('bg-white', 'text-slate-600', 'hover:bg-sky-50');
  });

  const activeBtn = document.getElementById(`notice-filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-sky-50');
    activeBtn.classList.add('bg-sky-600', 'text-white');
  }

  // Filter cards
  const cards = document.querySelectorAll('.notice-item-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function searchNotices() {
  const query = document.getElementById('notice-search-input')?.value.toLowerCase() || '';
  const cards = document.querySelectorAll('.notice-item-card');

  cards.forEach(card => {
    const title = card.querySelector('.notice-title')?.innerText.toLowerCase() || '';
    const desc = card.querySelector('.notice-desc')?.innerText.toLowerCase() || '';

    if (title.includes(query) || desc.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ==========================================
// 8. SYLLABUS & CURRICULUM MODAL DETAILS
// ==========================================
const syllabusData = {
  ai: {
    title: 'BCA (Artificial Intelligence & Machine Learning)',
    badge: 'NEP 2020 4-Year Honours / 3-Year Degree',
    desc: 'Deep integration of Neural Networks, Natural Language Processing, Computer Vision, and Autonomous Systems with NVIDIA Jetson hardware.',
    semesters: [
      { sem: 'Semester I', courses: ['Problem Solving using C & Python', 'Discrete Mathematical Structures', 'Computer Architecture & Digital Electronics', 'Python Programming & Data Structures Lab'] },
      { sem: 'Semester II', courses: ['Object Oriented Programming with Java', 'Linear Algebra & Statistics for AI', 'Database Management Systems (SQL & NoSQL)', 'DBMS & Advanced Java Lab'] },
      { sem: 'Semester III', courses: ['Data Structures & Algorithms', 'Machine Learning Foundations (Scikit-Learn)', 'Operating Systems & Linux Shell Scripting', 'ML Foundations Lab & Project-I'] },
      { sem: 'Semester IV', courses: ['Deep Learning & Neural Architectures (PyTorch)', 'Natural Language Processing & LLMs', 'Web Development with React & Node', 'Deep Learning & Cloud GPU Lab'] },
      { sem: 'Semester V', courses: ['Computer Vision & OpenCV', 'Reinforcement Learning & Robotics', 'Big Data Engineering & Spark', 'Capstone AI Industrial Project'] },
      { sem: 'Semester VI', courses: ['Generative AI & MLOps', 'Ethics, Security & Governance in AI', 'Full Semester Industry Internship', 'Major Viva & Thesis Defense'] }
    ]
  },
  cloud: {
    title: 'BCA (Cloud Computing & DevOps Architecture)',
    badge: 'AWS & Azure Industry Academy Aligned',
    desc: 'Master containerization, CI/CD automation pipelines, infrastructure as code, and cloud microservices with hands-on labs.',
    semesters: [
      { sem: 'Semester I', courses: ['Programming in C & Linux Fundamentals', 'Foundations of Computer Hardware & Networks', 'Mathematics for Computing', 'Linux System Administration Lab'] },
      { sem: 'Semester II', courses: ['Object Oriented Programming (Java/Python)', 'Networking Protocols & Cisco CCNA Essentials', 'Relational Databases & PostgreSQL', 'Networking & Cloud Sandbox Lab'] },
      { sem: 'Semester III', courses: ['Cloud Fundamentals & AWS Architecture', 'Virtualization & Hypervisors (VMware/KVM)', 'Data Structures in C++', 'AWS Cloud Practitioner Lab'] },
      { sem: 'Semester IV', courses: ['Containerization with Docker & Podman', 'Kubernetes Orchestration & Helm', 'Web Technologies & REST APIs', 'Microservices & Container Lab'] },
      { sem: 'Semester V', courses: ['Infrastructure as Code (Terraform & Ansible)', 'DevOps CI/CD Pipelines (Jenkins & GitHub Actions)', 'Cloud Security & Compliance', 'DevOps Real-Time Pipeline Project'] },
      { sem: 'Semester VI', courses: ['Multi-Cloud Management (GCP/Azure/AWS)', 'Site Reliability Engineering (SRE)', '6-Month Paid Corporate Internship', 'Cloud Architecture Capstone Project'] }
    ]
  },
  fullstack: {
    title: 'BCA (Full-Stack Web & Mobile Engineering)',
    badge: 'MERN, Next.js & Flutter Ecosystem',
    desc: 'Build enterprise-grade SaaS platforms, modern responsive mobile apps, GraphQL microservices, and reactive web applications.',
    semesters: [
      { sem: 'Semester I', courses: ['Web Technologies (HTML5, Modern CSS, ES6+)', 'Algorithm Design & Logic Building', 'Database Essentials', 'Modern Responsive UI Lab'] },
      { sem: 'Semester II', courses: ['TypeScript & Advanced JavaScript', 'UI/UX Design Systems (Figma to Code)', 'Relational & Document Databases (Mongo/Postgres)', 'Frontend Component Architecture Lab'] },
      { sem: 'Semester III', courses: ['React.js & Next.js Framework', 'State Management (Redux Toolkit, Zustand)', 'Node.js & Express RESTful APIs', 'Full-Stack Web Engineering Lab I'] },
      { sem: 'Semester IV', courses: ['Mobile Development with Flutter & Dart', 'GraphQL & Microservices Architecture', 'Testing & CI/CD for Frontend (Jest, Cypress)', 'Mobile & Cross-Platform Lab'] },
      { sem: 'Semester V', courses: ['Cloud-Native Deployment & Serverless', 'Real-Time WebSockets & WebRTC', 'System Design & High-Scalability Apps', 'Enterprise SaaS Capstone Project'] },
      { sem: 'Semester VI', courses: ['Progressive Web Apps & WebAssembly', 'Open Source Contribution & Mentorship', '6-Month Tech Internship', 'Portfolio Defense & Product Launch'] }
    ]
  },
  cyber: {
    title: 'BCA (Cyber Security & Ethical Hacking)',
    badge: 'Certified Ethical Hacker (CEH) Aligned',
    desc: 'Protect digital assets, master penetration testing, network defense, digital forensics, and secure coding practices.',
    semesters: [
      { sem: 'Semester I', courses: ['Computer Organization & Architecture', 'Fundamentals of Cyber Law & IT Act', 'Python for Security Automation', 'Security Scripting Lab'] },
      { sem: 'Semester II', courses: ['Computer Networks & TCP/IP Security', 'Operating System Security (Linux/Windows)', 'Cryptography & PKI Infrastructure', 'Network Packet Analysis Lab (Wireshark)'] },
      { sem: 'Semester III', courses: ['Ethical Hacking & Vulnerability Assessment', 'Web Application Security (OWASP Top 10)', 'Database Security & Auditing', 'Penetration Testing Lab (Kali Linux)'] },
      { sem: 'Semester IV', courses: ['Digital Forensics & Incident Response', 'Malware Analysis & Reverse Engineering', 'Cloud Security & Identity Governance', 'Forensic Investigation Lab'] },
      { sem: 'Semester V', courses: ['Security Operations Center (SOC) & SIEM', 'Mobile & IoT Device Security', 'Red Team vs Blue Team Exercises', 'Defensive Cyber Range Capstone Project'] },
      { sem: 'Semester VI', courses: ['Zero Trust Security Architecture', 'Cyber Threat Intelligence', 'Corporate InfoSec Internship', 'Comprehensive Cyber Defense Thesis'] }
    ]
  }
};

function openSyllabusModal(key) {
  const data = syllabusData[key] || syllabusData.ai;
  const modal = document.getElementById('syllabus-modal');
  if (!modal) return;

  document.getElementById('syllabus-modal-title').innerText = data.title;
  document.getElementById('syllabus-modal-badge').innerText = data.badge;
  document.getElementById('syllabus-modal-desc').innerText = data.desc;

  const container = document.getElementById('syllabus-modal-semesters');
  if (container) {
    container.innerHTML = data.semesters.map(s => `
      <div class="bg-white border border-sky-100 rounded-xl p-4 shadow-sm hover:border-sky-300 transition">
        <h4 class="text-sm font-bold text-sky-900 flex items-center gap-2 mb-2">
          <span class="w-2 h-2 rounded-full bg-sky-500"></span>
          ${s.sem}
        </h4>
        <ul class="space-y-1.5 text-xs text-slate-600">
          ${s.courses.map(c => `<li class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>${c}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  openModal('syllabus-modal');
}

function downloadSyllabusPdf() {
  showToast('Syllabus Downloaded', 'Complete 4-Year NEP Syllabus Brochure has been saved to your downloads.', 'success');
}

// ==========================================
// 9. CAMPUS TOUR & CONTACT FORM HANDLERS
// ==========================================
function handleTourBooking(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('tour-name')?.value.trim();
  const date = document.getElementById('tour-date')?.value;
  const time = document.getElementById('tour-time')?.value;

  if (!name || !date || !time) {
    showToast('Missing Details', 'Please select a preferred date and time slot for your campus tour.', 'info');
    return;
  }

  closeModal('tour-modal');
  showToast('Campus Tour Confirmed!', `Thank you, ${name}! Your guided KLE BCA campus tour is scheduled for ${date} at ${time}. Our counselor will call you.`, 'success');
}

function handleContactSubmit(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('contact-name')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();

  if (!name || !message) {
    showToast('Incomplete Form', 'Please provide your name and query message.', 'info');
    return;
  }

  document.getElementById('contact-form')?.reset();
  showToast('Query Sent Successfully', `Thank you, ${name}! The KLE BCA Admissions & Counseling Office will contact you within 24 hours.`, 'success');
}

// ==========================================
// 10. IMAGE GALLERY LIGHTBOX
// ==========================================
function openGalleryModal(imgSrc, title, desc) {
  const modal = document.getElementById('gallery-modal');
  if (!modal) return;

  const imgEl = document.getElementById('gallery-modal-img');
  const titleEl = document.getElementById('gallery-modal-title');
  const descEl = document.getElementById('gallery-modal-desc');

  if (imgEl) imgEl.src = imgSrc;
  if (titleEl) titleEl.innerText = title;
  if (descEl) descEl.innerText = desc;

  openModal('gallery-modal');
}

function filterGallery(category) {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.classList.remove('bg-sky-600', 'text-white');
    btn.classList.add('bg-white', 'text-slate-600', 'hover:bg-sky-50');
  });

  const activeBtn = document.getElementById(`gal-filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-sky-50');
    activeBtn.classList.add('bg-sky-600', 'text-white');
  }

  const items = document.querySelectorAll('.gallery-item-card');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ==========================================
// 11. FAQ ACCORDION HANDLER
// ==========================================
function toggleFaq(index) {
  const answer = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer) return;

  const isHidden = answer.classList.contains('hidden');

  // Close all FAQs for clean accordion feel
  document.querySelectorAll('[id^="faq-ans-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('[id^="faq-icon-"]').forEach(el => el.classList.remove('rotate-180'));

  if (isHidden) {
    answer.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  }
}

// ==========================================
// 12. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Calculator
  calculateScholarship();

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        if (mobileDrawer) mobileDrawer.classList.add('hidden');
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Welcome Toast
  setTimeout(() => {
    showToast('Welcome to KLE BCA', 'Admissions for Academic Session 2026-27 are now open. Explore our NEP 2020 curriculum & scholarships.', 'info');
  }, 1200);
});
