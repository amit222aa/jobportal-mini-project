// Seeds demo jobs with multiple locations each.
// Run: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./models/Job");

const demoJobs = [
  {
    title: "Junior Web Developer", company: "TechNest Solutions",
    locations: ["Mohali", "Chandigarh", "Remote"], workMode: "Hybrid", experience: "Fresher", category: "IT",
    jobType: "Full-time", salary: "₹3–5 LPA", openings: 3,
    description: "Work on modern MERN-stack products. Build responsive UIs, integrate REST APIs and learn Git-based workflows under senior mentors.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    title: "Frontend Developer Intern", company: "PixelForge Studio",
    locations: ["Delhi", "Remote"], workMode: "Remote", experience: "Fresher", category: "IT",
    jobType: "Internship", salary: "₹12,000/month", openings: 2,
    description: "6-month internship converting Figma designs into pixel-perfect components. Stipend + pre-placement offer for top performers.",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    title: "Backend Engineer (Node.js)", company: "CloudLeap",
    locations: ["Bengaluru", "Pune", "Hyderabad"], workMode: "On-site", experience: "1-3 years", category: "IT",
    jobType: "Full-time", salary: "₹8–14 LPA", openings: 4,
    description: "Design scalable microservices, own MongoDB schema design and REST APIs, and mentor interns on backend best practices.",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"]
  },
  {
    title: "Digital Marketing Executive", company: "BrandRise Media",
    locations: ["Mumbai", "Remote"], workMode: "Hybrid", experience: "Fresher", category: "Marketing",
    jobType: "Full-time", salary: "₹2.5–4 LPA", openings: 2,
    description: "Run social campaigns, SEO audits and Google Ads for retail clients. Weekly performance reporting to the strategy team.",
    skills: ["SEO", "Google Ads", "Content Writing"]
  },
  {
    title: "Data Analyst", company: "InsightWorks Analytics",
    locations: ["Gurugram", "Noida", "Remote"], workMode: "Hybrid", experience: "1-3 years", category: "Analytics",
    jobType: "Full-time", salary: "₹6–9 LPA", openings: 1,
    description: "Build dashboards in Power BI, write SQL queries against the data warehouse and present insights to business stakeholders.",
    skills: ["SQL", "Python", "Power BI", "Excel"]
  },
  {
    title: "Customer Support Associate (Night Shift)", company: "Helpline Plus",
    locations: ["Jaipur", "Indore"], workMode: "On-site", experience: "Fresher", category: "Support",
    jobType: "Part-time", salary: "₹18,000/month", openings: 10,
    description: "Resolve customer queries over chat and email for an e-commerce client. Shift allowance and cab facility provided.",
    skills: ["Communication", "Email Support", "CRM"]
  },
  {
    title: "UI/UX Designer", company: "Craftly Labs",
    locations: ["Remote", "Ahmedabad"], workMode: "Remote", experience: "3-5 years", category: "Design",
    jobType: "Contract", salary: "₹40,000/month (contract)", openings: 1,
    description: "Own end-to-end design for a fintech app: research, wireframes, prototypes in Figma and usability testing with real users.",
    skills: ["Figma", "Prototyping", "User Research"]
  },
  {
    title: "Accounts Executive", company: "LedgerPoint",
    locations: ["Lucknow", "Kanpur"], workMode: "On-site", experience: "1-3 years", category: "Finance",
    jobType: "Full-time", salary: "₹3–4.5 LPA", openings: 2,
    description: "Handle GST filings, TDS returns and vendor reconciliation in Tally. CA-inter candidates preferred.",
    skills: ["Tally", "GST", "Accounting"]
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobconnect");
    const existing = await Job.countDocuments();
    if (existing > 0) {
      console.log(`Skipped seeding — ${existing} jobs already exist.`);
    } else {
      await Job.insertMany(demoJobs.map(j => ({ ...j, createdBy: new mongoose.Types.ObjectId() })));
      console.log(`Seeded ${demoJobs.length} demo jobs.`);
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
})();
