import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, MessageSquare } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  date: string;
  time: string;
  guests: number;
  seating: 'indoor' | 'outdoor';
  specialRequests: string;
}

interface FormErrors {
  date?: string;
  time?: string;
  guests?: string;
}

const BookingForm: React.FC = () => {
  const { addBooking } = useBooking();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    guests: 2,
    seating: 'indoor',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    // Guests validation
    if (!formData.guests || formData.guests < 1 || formData.guests > 12) {
      newErrors.guests = 'Please select between 1 and 12 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addBooking(formData);
      
      toast({
        title: "Reservation Confirmed! 🎉",
        description: `Your table for ${formData.guests} guests on ${new Date(formData.date).toLocaleDateString()} at ${formData.time} has been booked.`,
        className: "bg-success text-success-foreground",
      });

      // Reset form
      setFormData({
        date: '',
        time: '',
        guests: 2,
        seating: 'indoor',
        specialRequests: ''
      });

    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-center">Reserve Your Table</CardTitle>
        <p className="text-center text-muted-foreground">
          Book your perfect dining experience at Little Lemon
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-2">
              <Calendar size={16} />
              <span>Date *</span>
            </label>
            <input
              type="date"
              min={today}
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                errors.date ? 'border-destructive' : 'border-input'
              }`}
            />
            {errors.date && (
              <p className="text-destructive text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-2">
              <Clock size={16} />
              <span>Time *</span>
            </label>
            <select
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                errors.time ? 'border-destructive' : 'border-input'
              }`}
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && (
              <p className="text-destructive text-sm mt-1">{errors.time}</p>
            )}
          </div>

          {/* Number of Guests */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-2">
              <Users size={16} />
              <span>Number of Guests *</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                errors.guests ? 'border-destructive' : 'border-input'
              }`}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            {errors.guests && (
              <p className="text-destructive text-sm mt-1">{errors.guests}</p>
            )}
          </div>

          {/* Seating Preference */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <MapPin size={16} />
              <span>Seating Preference</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="seating"
                  value="indoor"
                  checked={formData.seating === 'indoor'}
                  onChange={(e) => handleInputChange('seating', e.target.value)}
                  className="w-4 h-4 text-primary border-input focus:ring-primary"
                />
                <span>Indoor</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="seating"
                  value="outdoor"
                  checked={formData.seating === 'outdoor'}
                  onChange={(e) => handleInputChange('seating', e.target.value)}
                  className="w-4 h-4 text-primary border-input focus:ring-primary"
                />
                <span>Outdoor</span>
              </label>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-2">
              <MessageSquare size={16} />
              <span>Special Requests (Optional)</span>
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any dietary restrictions, celebrations, or special accommodations..."
              rows={3}
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 text-lg transition-all duration-200 disabled:opacity-70"
          >
            {isSubmitting ? 'Confirming Reservation...' : 'Confirm Reservation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;