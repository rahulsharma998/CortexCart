import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const AdminUsers = () => {
  const users: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          User Management
        </h1>
        <p className="text-muted-foreground mt-1">
          {users.length} registered users
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            No users found
          </h3>
        </div>
      ) : (
        <Card className="p-4">
          {/* Table will go here later */}
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
