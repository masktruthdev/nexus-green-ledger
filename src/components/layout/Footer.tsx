import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle, Globe } from "lucide-react";
import logoNexus from "@/assets/logo-nexus.jpeg";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Telegram" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Globe, href: "#", label: "Website" },
];

const footerLinks = [
  { name: "Whitepaper", href: "#" },
  { name: "Documentation", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/30">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoNexus}
                alt="Nexus Protocol"
                className="w-12 h-12 rounded-xl object-cover glow-green-sm"
              />
              <span className="font-display font-bold text-2xl tracking-wider text-glow">
                NEXUS PROTOCOL
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Building a sustainable future through blockchain technology. 
              One token, one tree — transforming green RWA and carbon credits 
              into a transparent global economy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 glass-panel rounded-xl text-muted-foreground hover:text-primary hover:glow-green-sm transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg tracking-wider uppercase">
              Ecosystem
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/buy-nft" className="text-muted-foreground hover:text-primary transition-colors">
                  Buy NFT
                </Link>
              </li>
              <li>
                <Link to="/staking" className="text-muted-foreground hover:text-primary transition-colors">
                  Staking
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Nexus Protocol. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built for a <span className="text-primary">sustainable</span> future
          </p>
        </div>
      </div>
    </footer>
  );
};
