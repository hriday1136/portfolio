export const site = {
  name: "Hriday Adani",
  shortName: "Hriday",
  title: "Hriday Adani — Software Engineer",
  description:
    "Portfolio of Hriday Adani, a Rutgers Computer Science and Economics student building AI systems, developer tools, and scientific software.",
  role: "Software Engineer · AI Systems · Research",
  statement:
    "I build intelligent systems from research prototypes to production software.",
  location: "New Brunswick, NJ",
  opportunity: "Open to 2027 opportunities",
  email: "hriday1136@gmail.com",
  phone: "803-357-9673",
  linkedin: "https://www.linkedin.com/in/hridayadani",
  github: "https://github.com/hriday1136",
  resumeHref: "/hriday-adani-resume.pdf",
} as const;

export const navItems = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#about", id: "about", label: "About" },
  { href: "#systems", id: "systems", label: "Systems" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
