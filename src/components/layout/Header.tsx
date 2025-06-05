import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-20">
          <Logo />
          <span className="font-semibold text-xl text-surface-900">Treqy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-surface-600 hover:text-primary-600 transition-colors">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-surface-600 hover:text-primary-600 transition-colors">
            How It Works
          </Link>
          <Link to="/#pricing" className="text-surface-600 hover:text-primary-600 transition-colors">
            Pricing
          </Link>
          <Link to="/#faq" className="text-surface-600 hover:text-primary-600 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard">
            <Button>Try Interactive Demo</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-20" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-10 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col gap-6 text-lg">
            <Link 
              to="/#features" 
              className="text-surface-600 py-2 border-b border-surface-100" 
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              to="/#how-it-works" 
              className="text-surface-600 py-2 border-b border-surface-100" 
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link 
              to="/#pricing" 
              className="text-surface-600 py-2 border-b border-surface-100" 
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link 
              to="/#faq" 
              className="text-surface-600 py-2 border-b border-surface-100" 
              onClick={toggleMenu}
            >
              FAQ
            </Link>
          </nav>
          <div className="mt-8">
            <Link to="/dashboard" onClick={toggleMenu}>
              <Button className="w-full justify-center">
                Try Interactive Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;