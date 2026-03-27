const ICON_COLOR = "00f5d4"
export const stats = {
  header: {
    version: "4.0.26_p1x0s",
    nodeCount: "12_GLOBAL",
    accessLevel: "ROOT_ADMIN",
  },
  metrics: {
    avgLatency: 14.2,
    uptime: "99.98%",
    trafficIn: "1.2GB/s",
    packetLoss: "0.0%",
  },
  languages: [
    { name: "TypeScript", percent: 30, color: "bg-cyan-500/60" },
    { name: "C#", percent: 25, color: "bg-blue-500/60" },
    { name: "Go", percent: 15, color: "bg-emerald-500/60" },
    { name: "Java", percent: 20, color: "bg-orange-500/60" },
    { name: "Dart", percent: 10, color: "bg-red-500/60" },
  ],

  tools: [
    {
      src: `https://cdn.simpleicons.org/react/${ICON_COLOR}`,
      alt: "React",
      level: 95,
    },
    {
      src: `https://cdn.simpleicons.org/typescript/${ICON_COLOR}`,
      alt: "Typescript",
      level: 95,
    },
    {
      src: `https://cdn.simpleicons.org/postgresql/${ICON_COLOR}`,
      alt: "PostgreSQL",
      level: 90,
    },
    {
      src: `https://cdn.simpleicons.org/dotnet/${ICON_COLOR}`,
      alt: ".Net",
      level: 85,
    },
    {
      src: `https://cdn.simpleicons.org/go/${ICON_COLOR}`,
      alt: "Golang",
      level: 80,
    },
    {
      src: `https://cdn.simpleicons.org/python/${ICON_COLOR}`,
      alt: "Python",
      level: 80,
    },
    {
      src: `https://cdn.simpleicons.org/flutter/${ICON_COLOR}`,
      alt: "Flutter",
      level: 85,
    },
    {
      src: `https://cdn.simpleicons.org/godotengine/${ICON_COLOR}`,
      alt: "Godot",
      level: 75,
    },
    {
      src: `https://cdn.simpleicons.org/linux/${ICON_COLOR}`,
      alt: "Linux",
      level: 80,
    },
  ],
  initialLogs: [
    "SECURE_SHELL_ESTABLISHED",
    "NODE_KUOPIO_STABLE",
    "UPLINK_ENCRYPTED_AES256",
  ],
}
const UI_DATA = {
  profile: {
    name: "PIXLIZED",
    location: "62.89° N",
    image: "/api/placeholder/400/400", // Replace with your image path
    tagline: "CORE_IDENTITY_VERIFIED",
    about:
      "Full-stack architect specializing in high-performance systems and reactive interfaces. Currently bridging the gap between neural aesthetics and functional code.",
  },
  socials: [
    { id: "git", icon: <GithubLogo size={18} />, link: "#" },
    { id: "link", icon: <LinkedinLogo size={18} />, link: "#" },
    { id: "mail", icon: <Envelope size={18} />, link: "#" },
  ],
  education: [
    {
      org: "MIT_LABS",
      degree: "B.Sc Computer Science",
      progress: 100,
      status: "COMPLETE",
    },
    {
      org: "NEURAL_INST",
      degree: "M.Sc System Arch",
      progress: 65,
      status: "ACTIVE",
    },
  ],
  stats: {
    records: 14,
    encryption: "AES_256",
    uplink: "00.26.4",
  },
}
