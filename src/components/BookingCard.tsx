import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, MessageSquare, Trash2, Edit } from 'lucide-react';
import { Booking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BookingCardProps {
  booking: Booking;
  onDelete: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSeatingIcon = (seating: string) => {
    return seating === 'outdoor' ? '🌿' : '🏠';
  };

  const isUpcoming = () => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    return bookingDateTime > new Date();
  };

  const handleDelete = () => {
    onDelete(booking.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className={`shadow-card transition-all duration-200 hover:shadow-warm ${
        isUpcoming() ? 'border-primary/20' : 'border-muted opacity-80'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isUpcoming() ? 'bg-success' : 'bg-muted-foreground'
              }`}></div>
              <span className="font-semibold text-sm text-muted-foreground">
                {isUpcoming() ? 'Upcoming' : 'Past'}
              </span>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date and Time */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-primary" />
              <span className="font-medium">{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-primary" />
              <span className="font-medium">{formatTime(booking.time)}</span>
            </div>
          </div>

          {/* Guests and Seating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-accent" />
              <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-secondary" />
              <span className="capitalize flex items-center space-x-1">
                <span>{booking.seating}</span>
                <span>{getSeatingIcon(booking.seating)}</span>
              </span>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="pt-2 border-t border-border">
              <div className="flex items-start space-x-2">
                <MessageSquare size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground italic">{booking.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Booking Details */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Booked on {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your reservation for {formatDate(booking.date)} at {formatTime(booking.time)}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingCard;