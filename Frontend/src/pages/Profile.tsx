import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, User, Mail, MapPin, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Profile = () => {
  const { user, updateProfile, isLoading, error } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if user loads late
  if (user && !name && !address && !isEditing) {
    setName(user.name);
    setAddress(user.address || "");
  }

  const handleUpdate = async () => {
    try {
      await updateProfile({ name, address });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-fit">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-4xl font-bold text-primary-600 dark:text-primary-400 shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || <User className="w-10 h-10" />}
            </div>
            <CardTitle className="text-lg font-bold">{user?.name}</CardTitle>
            <CardDescription className="capitalize">{user?.role || "User"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{user?.address || "No address set"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <span>Personal Information</span>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
              )}
            </CardTitle>
            <CardDescription>Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-9 bg-slate-50 dark:bg-slate-800/50"
                />
              </div>
              <p className="text-xs text-slate-400">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your shipping address"
                  className="pl-9"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-primary-600 hover:bg-primary-700 text-white flex-1"
                  onClick={handleUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user?.name || "");
                    setAddress(user?.address || "");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
