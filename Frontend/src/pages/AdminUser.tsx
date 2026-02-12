import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminUser = () => {
  const { users, fetchUsers, toggleUserStatus, isLoading, error } = useAuthStore();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (userId: string) => {
    setTogglingId(userId);
    try {
      await toggleUserStatus(userId);
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    } finally {
      setTogglingId(null);
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => fetchUsers()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          User Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage {users.length} registered users
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of all users including their name, email, role, and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 dark:border-slate-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableHead className="w-[100px]">Avatar</TableHead>
                  <TableHead>User Information</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id} className={!user.isActive ? "opacity-60" : ""}>
                      <TableCell>
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} className="uppercase">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.isActive
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                          }
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={togglingId === user._id}
                          onClick={() => handleToggleStatus(user._id)}
                          className={
                            user.isActive
                              ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              : "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                          }
                        >
                          {togglingId === user._id ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                          ) : (
                            <Power className="w-4 h-4 mr-1.5" />
                          )}
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUser;
