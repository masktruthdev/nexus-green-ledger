import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoNexus from "@/assets/logo-nexus.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Buy NFT", path: "/buy-nft" },
  { name: "Staking", path: "/staking" },
  { name: "Dashboard", path: "/dashboard" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smart Contract Function: connectWallet()
  const handleConnectWallet = () => {
    // TODO: Bind to Web3 wallet connection (MetaMask, WalletConnect, etc.)
    console.log("connectWallet() - Ready to bind ABI");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-panel py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <img
                src={logoNexus}
                alt="Nexus Protocol"
                className="w-10 h-10 rounded-lg object-cover glow-green-sm"
              />
              <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-wider text-glow hidden sm:block">
              NEXUS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 font-display text-sm tracking-wider uppercase transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary text-glow"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full glow-green-sm"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden lg:block">
            <Button
              variant="hero"
              size="lg"
              onClick={handleConnectWallet}
              className="gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative container mx-auto px-4 py-8">
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 font-display text-lg tracking-wider uppercase rounded-lg transition-all ${
                        location.pathname === link.path
                          ? "text-primary bg-primary/10 glow-green-sm"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={handleConnectWallet}
                    className="w-full gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
