import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="font-display">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
          </div>

          <div>
            <Label>Email</Label>
            <Input disabled value="john@example.com" />
          </div>

          <div>
            <Label>Phone</Label>
            <Input placeholder="+91 9876543210" />
          </div>

          <Button className="gradient-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
