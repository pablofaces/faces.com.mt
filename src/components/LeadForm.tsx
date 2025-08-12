import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import FormData from "@/interfaces/formData";

export const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    'given-name': "",
    'family-name': "",
    email: "",
    tel: "",
    organization: "",
    designation: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md bg-gradient-card shadow-glow border-accent/20">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-16 w-16 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Message sent!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your interest. We will contact you soon.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-gradient-card shadow-elegant border-accent/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Contact us
        </CardTitle>
        <p className="text-muted-foreground">
          We would love to know more about your project
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="given-name" className="text-foreground">
                First name
              </Label>
              <Input
                id="given-name"
                name="given-name"
                type="text"
                required
                maxLength={40}
                autoComplete="given-name"
                value={formData['given-name']}
                onChange={handleInputChange}
                className="border-accent/30 focus:border-accent focus:ring-accent/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family-name" className="text-foreground">
                Last name
              </Label>
              <Input
                id="family-name"
                name="family-name"
                type="text"
                required
                maxLength={80}
                autoComplete="family-name"
                value={formData['family-name']}
                onChange={handleInputChange}
                className="border-accent/30 focus:border-accent focus:ring-accent/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              maxLength={80}
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-accent/30 focus:border-accent focus:ring-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tel" className="text-foreground">
              Mobile Phone
            </Label>
            <Input
              id="tel"
              name="tel"
              type="tel"
              required
              maxLength={20}
              autoComplete="tel"
              value={formData.tel}
              onChange={handleInputChange}
              className="border-accent/30 focus:border-accent focus:ring-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="text-foreground">
              Company
            </Label>
            <Input
              id="organization"
              name="organization"
              type="text"
              required
              maxLength={100}
              autoComplete="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className="border-accent/30 focus:border-accent focus:ring-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-foreground">
              Designation
            </Label>
            <Input
              id="designation"
              name="designation"
              type="text"
              required
              maxLength={128}
              value={formData.designation}
              onChange={handleInputChange}
              className="border-accent/30 focus:border-accent focus:ring-accent/20"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-glow transition-all duration-300 hover:shadow-lg mt-8 h-12"
            >
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};