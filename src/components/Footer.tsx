import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">Little Lemon</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Authentic Mediterranean cuisine with a modern twist. Experience the flavors of the Mediterranean in a warm, welcoming atmosphere.
            </p>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span className="text-sm">123 Mediterranean Ave, Chicago, IL 60601</span>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">(312) 555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-sm">hello@littlelemon.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span className="text-sm">Mon-Sun: 11:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm hover:text-primary transition-colors">Menu</a>
              <a href="#" className="block text-sm hover:text-primary transition-colors">About Us</a>
              <a href="#" className="block text-sm hover:text-primary transition-colors">Private Events</a>
              <a href="#" className="block text-sm hover:text-primary transition-colors">Gift Cards</a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            &copy; 2024 Little Lemon Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;