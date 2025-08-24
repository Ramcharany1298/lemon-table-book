import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-restaurant.jpg';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award-Winning Cuisine",
      description: "Recognized for our authentic Mediterranean flavors and innovative dishes."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Easy Reservations",
      description: "Book your table in seconds with our streamlined reservation system."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Perfect Location",
      description: "Located in the heart of Chicago with indoor and outdoor seating options."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely incredible dining experience! The flavors transport you straight to the Mediterranean."
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Best restaurant in Chicago! The staff is wonderful and the food is consistently amazing."
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Perfect for special occasions. The atmosphere is warm and the dishes are works of art."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block text-primary drop-shadow-lg">Little Lemon</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Experience the authentic flavors of the Mediterranean in our warm, 
            welcoming atmosphere. Where every meal is a celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-4 text-lg shadow-warm"
            >
              <Link to="/booking">Book Your Table</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg"
            >
              <Link to="#menu">View Our Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Why Choose Little Lemon?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing an exceptional dining experience 
              with authentic Mediterranean cuisine and outstanding service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-warm transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Little Lemon was born from a passion for authentic Mediterranean cuisine 
                and a desire to create a warm, welcoming space where friends and family 
                can come together to share exceptional food and memorable experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our chefs bring generations of culinary tradition to every dish, 
                using only the finest ingredients sourced from local farmers and 
                Mediterranean suppliers to ensure authenticity and quality.
              </p>
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-dark text-secondary-foreground font-semibold"
              >
                <Link to="/booking">Reserve Your Experience</Link>
              </Button>
            </div>
            <div className="lg:pl-8">
              <div className="bg-gradient-warm p-8 rounded-2xl shadow-warm">
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Restaurant Hours
                </h3>
                <div className="space-y-2 text-white/90">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>11:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our valued guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold text-foreground">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-fresh text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready for an Unforgettable Dining Experience?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your table today and discover why Little Lemon is Chicago's 
            favorite Mediterranean restaurant.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-secondary hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-lg"
          >
            <Link to="/booking">Book Your Table Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;