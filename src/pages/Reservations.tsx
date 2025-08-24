import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, ArrowLeft } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/hooks/use-toast';
import BookingCard from '@/components/BookingCard';
import { Button } from '@/components/ui/button';

const Reservations: React.FC = () => {
  const { state, deleteBooking } = useBooking();
  const { toast } = useToast();

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been successfully cancelled.",
      className: "bg-success text-success-foreground",
    });
  };

  // Separate upcoming and past reservations
  const now = new Date();
  const upcomingBookings = state.bookings.filter(booking => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    return bookingDateTime > now;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const pastBookings = state.bookings.filter(booking => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    return bookingDateTime <= now;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });

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
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                My Reservations
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your dining reservations at Little Lemon
              </p>
            </div>
            <Button
              asChild
              className="mt-4 sm:mt-0 bg-gradient-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Link to="/booking" className="flex items-center space-x-2">
                <Plus size={16} />
                <span>New Reservation</span>
              </Link>
            </Button>
          </div>
        </div>

        {state.bookings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-6">
              <Calendar size={64} className="mx-auto" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              No Reservations Yet
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Start your culinary journey with us by making your first reservation at Little Lemon.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Link to="/booking" className="flex items-center space-x-2">
                <Plus size={16} />
                <span>Book Your First Table</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Upcoming Reservations */}
            {upcomingBookings.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    Upcoming Reservations
                  </h2>
                  <div className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {upcomingBookings.length}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onDelete={handleDeleteBooking}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Past Reservations */}
            {pastBookings.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    Dining History
                  </h2>
                  <div className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {pastBookings.length}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onDelete={handleDeleteBooking}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {state.bookings.length > 0 && (
          <div className="mt-16 bg-gradient-warm p-8 rounded-2xl shadow-warm">
            <div className="text-center text-white">
              <h3 className="font-serif text-2xl font-semibold mb-4">
                Your Little Lemon Journey
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">{state.bookings.length}</div>
                  <div className="text-white/80">Total Reservations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{upcomingBookings.length}</div>
                  <div className="text-white/80">Upcoming Visits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{pastBookings.length}</div>
                  <div className="text-white/80">Memorable Meals</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;