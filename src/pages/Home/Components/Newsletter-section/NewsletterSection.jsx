import { Bell } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


function NewsletterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-[#4c67ea]/5 to-[#59cde2]/5 p-10 rounded-xl border border-gray-100">
          <div className="w-16 h-16 bg-[#4c67ea]/10 flex items-center justify-center rounded-full mx-auto mb-4">
            <Bell className="h-8 w-8 text-[#4c67ea]" />
          </div>
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get the latest courses, tips, and discount offers right to your
            inbox. Join over 500,000 subscribers!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow"
            />
            <Button className="bg-[#4c67ea] hover:bg-[#4c67ea]/90">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
