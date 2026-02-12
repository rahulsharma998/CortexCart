import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Users, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminUser = () => {
  const { users, fetchUsers, isLoading, error } = useAuthStore();
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = activeFilter === "All"
    ? users
    : users.filter(u => u.role === activeFilter);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-slate-900 border-t-orange-600 rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Scanning Protocol Database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-500/5 rounded-3xl border border-red-500/20 max-w-lg mx-auto">
        <Shield className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
        <p className="font-black text-white uppercase tracking-tight mb-2">Access Error</p>
        <p className="text-sm text-red-400 mb-6 px-10">{error}</p>
        <Button onClick={() => fetchUsers()} className="bg-red-500 hover:bg-red-600 text-white font-black uppercase text-[10px] tracking-widest px-8 rounded-xl h-12">Retry Authentication</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
            <Shield className="w-3 h-3" />
            Access Management Console
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            User <span className="text-slate-500">Directory.</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Managing <span className="text-white font-black">{users.length}</span> verified entity protocols within the system.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
          {["All", "Admin", "User"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeFilter === filter
                  ? "bg-slate-800 text-white shadow-lg"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {filter}s
            </button>
          ))}
        </div>
      </div>

      <Card className="border-slate-900 bg-slate-900/40 rounded-[2rem] overflow-hidden ring-1 ring-white/5">
        <CardHeader className="border-b border-slate-800/50 pb-8 pt-10 px-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black text-white tracking-tight">Active Registries</CardTitle>
              <CardDescription className="text-slate-500 mt-1 font-medium">Detailed breakdown of institutional access levels.</CardDescription>
            </div>
            <div className="flex -space-x-3">
              {users.slice(0, 5).map((u) => (
                <div key={u._id} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-orange-500 shadow-xl">
                  {u.name?.charAt(0).toUpperCase()}
                </div>
              ))}
              {users.length > 5 && (
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-xl">
                  +{users.length - 5}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800/50 hover:bg-transparent">
                  <TableHead className="w-[100px] pl-10 h-16 text-[10px] font-black uppercase tracking-widest text-slate-500">Avatar</TableHead>
                  <TableHead className="h-16 text-[10px] font-black uppercase tracking-widest text-slate-500">Identity Details</TableHead>
                  <TableHead className="h-16 text-[10px] font-black uppercase tracking-widest text-slate-500">Protocol Role</TableHead>
                  <TableHead className="text-right pr-10 h-16 text-[10px] font-black uppercase tracking-widest text-slate-500">Command</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-40 text-center text-slate-600 font-bold uppercase tracking-widest text-xs py-10">
                      Zero Entity Records Located
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id} className="border-slate-800/50 hover:bg-slate-800/20 group transition-colors">
                      <TableCell className="pl-10 py-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-orange-500 shadow-inner group-hover:scale-110 transition-transform">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-white tracking-tight text-lg">{user.name}</span>
                          <span className="text-[11px] font-bold text-slate-500 mt-1">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          {user.role === 'Admin' ? (
                            <Badge className="bg-orange-600/10 text-orange-600 border border-orange-600/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/5">
                              Root Admin
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-600/10 text-blue-500 border border-blue-600/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                              Standard Entity
                            </Badge>
                          )}
                          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Activity className="w-2.5 h-2.5 text-emerald-500" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-10 py-6">
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                          <MoreHorizontal className="w-5 h-5" />
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

      <div className="flex items-center justify-between px-10 py-8 bg-slate-900/20 border border-slate-900 rounded-[2rem]">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Admin Control</span>
            <span className="text-xl font-black text-white tracking-tighter mt-1">{users.filter(u => u.role === 'Admin').length} Nodes</span>
          </div>
          <div className="h-10 w-px bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">User Entities</span>
            <span className="text-xl font-black text-white tracking-tighter mt-1">{users.filter(u => u.role === 'User').length} Nodes</span>
          </div>
        </div>

        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-[10px] tracking-widest px-8 h-14 rounded-2xl shadow-2xl shadow-orange-500/20 flex items-center gap-3 active:scale-95 transition-all">
          Initialize New Protocol
          <Users className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminUser;
