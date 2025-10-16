import { Frame, Sparkles, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-serif font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Your premier destination for custom framing and professional photo editing services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a passion by <span className='font-bold'>MICHAEL NANA YAW OWUSU WIAFE</span> for preserving memories and creating beautiful displays, 
              we&apos;ve been serving our community for over 3 years. What started as a small 
              frame business has evolved into a comprehensive creative service offering custom 
              framing and photobook, professional photo editing, graphic design and photography services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of skilled craftsmen and digital artists work tirelessly to ensure 
              every project exceeds expectations. Whether you&apos;re looking to frame a cherished 
              photograph or need professional retouching services, we&apos;re here to bring your 
              vision to life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-subtle p-6 rounded-lg border border-border hover-scale">
              <Frame className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Custom Framing & Photobook</h3>
              <p className="text-sm text-muted-foreground">Handcrafted frames and photobook tailored to your style</p>
            </div>
            <div className="bg-gradient-subtle p-6 rounded-lg border border-border hover-scale">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Photo Editing and Design</h3>
              <p className="text-sm text-muted-foreground">Professional retouching & design services</p>
            </div>
            <div className="bg-gradient-subtle p-6 rounded-lg border border-border hover-scale">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Expert Team</h3>
              <p className="text-sm text-muted-foreground">Skilled craftsmen and artists</p>
            </div>
            <div className="bg-gradient-subtle p-6 rounded-lg border border-border hover-scale">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">100% satisfaction promise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
