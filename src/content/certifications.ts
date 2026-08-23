import type { Certification, Testimonial } from "@/types/content";

/**
 * 26 certificates. `image` keys into src/content/generated/certificate-images.json,
 * which the sharp pipeline writes with real intrinsic dimensions.
 *
 * Dates are absent for most of these — the old site never recorded them. Only
 * add an `issued` value when it can be confirmed from the certificate itself.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: "ceh-v12",
    name: "Certified Ethical Hacker (Practical)",
    issuer: "EC-Council",
    category: "eccouncil",
    issued: "Oct 2024",
    expires: "Nov 2025",
    expiresOn: "2025-11-01",
    credentialId: "ECC9806532714",
    image: "CEHv12",
    featured: true,
  },
  {
    id: "cap",
    name: "Certified AppSec Practitioner (CAP)",
    issuer: "The SecOps Group",
    category: "secops",
    issued: "Sep 2024",
    distinction: "with Merit",
    credentialId: "9098878",
    image: "CAP",
    featured: true,
  },
  {
    id: "cnsp",
    name: "Certified Network Security Practitioner (CNSP)",
    issuer: "The SecOps Group",
    category: "secops",
    issued: "Jan 2025",
    distinction: "with Merit",
    credentialId: "9590544",
    image: "CAP2",
    featured: true,
  },
  {
    id: "star-cyber-secure-user",
    name: "STAR Cyber Secure User — R11",
    issuer: "STAR Certification",
    category: "star",
    issued: "Sep 2022",
    expires: "Sep 2025",
    expiresOn: "2025-09-17",
    credentialId: "STR22SCU00212493",
    image: "Star-Cyber-Secure-User",
  },
  {
    id: "mastercard",
    name: "Cybersecurity Job Simulation",
    issuer: "Mastercard / Forage",
    category: "forage",
    issued: "Feb 2025",
    image: "Mastercard",
    featured: true,
  },
  {
    id: "tata",
    name: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata / Forage",
    category: "forage",
    issued: "Apr 2025",
    image: "Tata",
    featured: true,
  },
  {
    id: "csp",
    name: "Certified Software Programmer",
    issuer: "IANT",
    category: "other",
    issued: "Sep 2023",
    image: "CSP",
  },

  // STAR Certification
  { id: "star-c", name: "C Programming", issuer: "STAR Certification", category: "star", image: "C-Programming" },
  { id: "star-cpp", name: "C++ Programming", issuer: "STAR Certification", category: "star", image: "Cplus-Programming" },
  { id: "star-html", name: "STAR HTML", issuer: "STAR Certification", category: "star", image: "Star-html" },
  { id: "star-it-essential", name: "IT Essentials", issuer: "STAR Certification", category: "star", image: "IT-Essential" },
  { id: "star-php", name: "STAR PHP Developer", issuer: "STAR Certification", category: "star", image: "Star-php-Developer" },
  { id: "star-python", name: "STAR Python", issuer: "STAR Certification", category: "star", image: "Star-Python" },
  {
    id: "star-secure-php",
    name: "STAR Secure Programmer Expert — PHP — R11",
    issuer: "STAR Certification",
    category: "star",
    image: "Star-Secure-Programming-Expert-PHP",
  },

  // Udemy
  { id: "udemy-web-dev", name: "Practical Web Development", issuer: "Udemy", category: "udemy", image: "image" },
  { id: "udemy-python-adv", name: "Python Programming — From Basic to Advanced", issuer: "Udemy", category: "udemy", image: "image2" },
  { id: "udemy-network-hacking", name: "Network Ethical Hacking for Beginners (Kali — Hands-on)", issuer: "Udemy", category: "udemy", image: "image3" },
  { id: "udemy-sql", name: "The Complete SQL Course", issuer: "Udemy", category: "udemy", image: "image4" },
  { id: "udemy-android-hacking", name: "The Complete Android Ethical Hacking Practical Course (C|AEHP)", issuer: "Udemy", category: "udemy", image: "image5" },
  { id: "udemy-python-beginners", name: "Python Complete Course for Python Beginners", issuer: "Udemy", category: "udemy", image: "image6" },
  { id: "udemy-quantum", name: "Introduction to Quantum Computing", issuer: "Udemy", category: "udemy", image: "image7" },
  { id: "udemy-python3", name: "Python 3 Ultimate Guide", issuer: "Udemy", category: "udemy", image: "image8" },
  { id: "udemy-hardware", name: "Computer Hardware, Operating Systems and Networking", issuer: "Udemy", category: "udemy", image: "image9" },
  { id: "udemy-git", name: "Git & GitHub for Beginners — From Start to Star", issuer: "Udemy", category: "udemy", image: "image10" },

  // Other
  { id: "grasshopper", name: "Coding Fundamentals", issuer: "Grasshopper", category: "other", image: "coding-fundamentals" },
  { id: "hackers-meetup", name: "Certificate of Participation", issuer: "The Hackers Meetup", category: "other", image: "image11" },
];

export const CERT_CATEGORIES: { id: Certification["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "eccouncil", label: "EC-Council" },
  { id: "secops", label: "SecOps" },
  { id: "star", label: "STAR" },
  { id: "forage", label: "Forage" },
  { id: "udemy", label: "Udemy" },
  { id: "other", label: "Other" },
];

export const featuredCertifications = CERTIFICATIONS.filter((c) => c.featured);

/**
 * Deliberately empty.
 *
 * The previous repo shipped 13 headshots from the original template's author —
 * other people's faces, attached to no quotes. Nothing goes here until Jayesh
 * supplies real names, roles and words. The 0x09 chapter unmounts on an empty
 * array, so the section simply does not exist until then.
 */
export const TESTIMONIALS: Testimonial[] = [];
