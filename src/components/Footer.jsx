import React from "react";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
const legalData = {
    privacy: {
        title: "Privacy Policy",
        lastUpdated: "February 2, 2026",
        content: [
            {
                heading: "1. Information Collection",
                text: "We collect only necessary personal information (such as name and email address) that you voluntarily provide when using the contact form or reaching out via email."
            },
            {
                heading: "2. Use of Information",
                text: "Your data is used solely for the purpose of professional communication, responding to inquiries, and potential collaboration. We do not sell or share your data with third parties."
            },
            {
                heading: "3. Data Protection",
                text: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
            },
            {
                heading: "4. Cookies & Tracking",
                text: "This portfolio may use basic cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings at any time."
            },
            {
                heading: "5. Third-Party Links",
                text: "Our website contains links to external platforms (e.g., GitHub, LinkedIn). We are not responsible for the content or privacy practices of these third-party sites."
            },
            {
                heading: "6. Your Rights",
                text: "You retain the right to request access to, correction of, or deletion of your personal data stored in our records at any time by contacting us directly."
            }
        ]
    },
    terms: {
        title: "Terms of Service",
        lastUpdated: "February 2, 2026",
        content: [
            {
                heading: "General Terms",
                text: "By accessing this portfolio, you agree to use it for lawful purposes only. Content is provided 'as is' without warranties of any kind."
            },
            {
                heading: "Intellectual Property",
                text: "All code, designs, and content are the intellectual property of the owner unless otherwise stated."
            }
        ]
    }
};
// --- Configuration ---
const footerConfig = {
    brand: {
        name: "Rupesh",
        description: (
            <>
                Crafting digital <strong className="text-white opacity-25 transition-opacity duration-500 group-hover:opacity-100">ecstasies</strong> with code, creativity (& a bit of caffeine of course!).
            </>
        ),
    },
    quickLinks: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
        // { name: "Home", href: "/home" },
        // { name: "About", href: "/about" },
        // { name: "Projects", href: "/projects" },
        // { name: "Contact", href: "/contact" },
    ],
    contact: {
        email: "krishnaleean222@gmail.com",
        location: "Bachupally, Hyderabad , India",
    },
    socials: [
        { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/Rupesh-klr" },
        { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/rupeshb6/" },
        { name: "Twitter", icon: <Twitter size={20} />, href: "https://x.com/512Rupesh91061" },
    ],
};

const Footer = ({ onOpenModal }) => {
    return (
        <div className="relative w-full mt-20"> {/* Wrapper */}

            {/* 1. Glassmorphism Background Container */}
            <div className="relative bottom-0 w-full bg-gradient-to-t from-black-100 to-transparent">
                <div className="backdrop-blur-xl bg-black/30 border-t border-white/5 pt-16 pb-8">

                    <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">

                        {/* 2. Main Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-24 mb-12">

                            {/* Column 1: Brand Info */}
                            <div className="space-y-4 group">
                                <h3 className="text-white font-bold text-lg font-serif relative inline-block cursor-default">
                                    {footerConfig.brand.name} .
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed pr-0 md:pr-12 transition-colors duration-300 group-hover:text-gray-300">
                                    {footerConfig.brand.description}
                                    <br /><br />
                                    Thanks for stopping by!
                                </p>
                            </div>

                            {/* Column 2: Quick Links */}
                            <div className="space-y-4">
                                <h4 className="text-white font-semibold">Quick Links</h4>
                                <ul className="space-y-3">
                                    {footerConfig.quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-gray-400 hover:text-white text-sm relative inline-block group transition-colors duration-300"
                                            >
                                                {link.name}
                                                {/* Underline Animation */}
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3: Contact */}
                            <div className="space-y-4">
                                <h4 className="text-white font-semibold">Get in Touch</h4>
                                <div className="space-y-3">

                                    {/* Email */}
                                    <a href={`mailto:${footerConfig.contact.email}`} className="text-gray-400 hover:text-white text-sm flex items-center group transition-colors duration-300">
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                            <Mail size={16} className="group-hover:text-white transition-colors" />
                                        </span>
                                        <span className="ml-2 relative">
                                            {footerConfig.contact.email}
                                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                                        </span>
                                    </a>

                                    {/* Location */}
                                    <div className="text-gray-400 text-sm flex items-center group cursor-default">
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                            <MapPin size={16} className="group-hover:text-white transition-colors" />
                                        </span>
                                        <span className="ml-2">{footerConfig.contact.location}</span>
                                    </div>

                                </div>
                            </div>

                            {/* Column 4: Socials */}
                            <div className="space-y-4">
                                <h4 className="text-white font-semibold">Connect</h4>
                                <div className="flex space-x-6">
                                    {footerConfig.socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative"
                                        >
                                            <div className="text-gray-400 transform transition-all duration-300 hover:text-white hover:scale-110">
                                                {social.icon}
                                            </div>

                                            {/* Tooltip Label */}
                                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                                                {social.name}
                                            </span>

                                            {/* Icon Underline */}
                                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* 3. Bottom Bar (Copyright) */}
                        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} {footerConfig.brand.name} | Portfolio. All rights reserved.
                            </p>


                            <div className="mt-4 md:mt-0 space-x-6">
                                {/* Privacy Policy Link */}
                                <a
                                    href="#privacy"
                                    className="text-gray-400 hover:text-white text-sm relative group transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Sending: Type='legal', Key='privacy', Data=The object above
                                        onOpenModal("legal", "privacy-policy", legalData.privacy);
                                    }}
                                >
                                    Privacy Policy
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                                </a>

                                {/* Terms of Service Link */}
                                <a
                                    href="#terms"
                                    className="text-gray-400 hover:text-white text-sm relative group transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Sending: Type='legal', Key='terms', Data=The object above
                                        onOpenModal("legal", "terms-of-service", legalData.terms);
                                    }}
                                >
                                    Terms of Service
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;