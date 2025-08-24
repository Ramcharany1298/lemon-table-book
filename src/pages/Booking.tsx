import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import { Button } from '@/components/ui/button';

const Booking: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Book Your Table
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reserve your spot at Little Lemon and get ready for an authentic 
              Mediterranean dining experience you'll never forget.
            </p>
          </div>
        </div>

        {/* Booking Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
            <div className="text-primary mb-3">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant Confirmation</h3>
            <p className="text-muted-foreground text-sm">
              Receive immediate confirmation of your reservation via email and SMS.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
            <div className="text-primary mb-3">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Flexible Options</h3>
            <p className="text-muted-foreground text-sm">
              Choose between indoor and outdoor seating with options for special requests.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
            <div className="text-primary mb-3">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Management</h3>
            <p className="text-muted-foreground text-sm">
              View and manage all your reservations in one convenient location.
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mb-8">
          <BookingForm />
        </div>

        {/* Additional Information */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Reservations can be made up to 30 days in advance</li>
              <li>• Large parties (8+ guests) may require a deposit</li>
              <li>• Please arrive within 15 minutes of your reservation time</li>
              <li>• Cancellations can be made up to 2 hours before your reservation</li>
              <li>• For parties larger than 12, please call us directly at (312) 555-0123</li>
            </ul>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help with your reservation?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="tel:+13125550123">Call (312) 555-0123</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:reservations@littlelemon.com">Email Us</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;