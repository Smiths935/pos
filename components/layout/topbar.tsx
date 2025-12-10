// // src/components/layout/topbar.tsx
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { BellIcon, SearchIcon, MenuIcon } from "lucide-react";

// export default function Topbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="flex items-center justify-between p-4">
//       {/* Bouton menu mobile */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="md:hidden"
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         <MenuIcon className="h-5 w-5" />
//       </Button>

//       {/* Barre de recherche */}
//       <div className="hidden md:flex items-center gap-2 max-w-md">
//         <div className="relative">
//           <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Rechercher..."
//             className="pl-10 w-full"
//           />
//         </div>
//       </div>

//       {/* Notifications et utilisateur */}
//       <div className="flex items-center gap-4">
//         <Button variant="ghost" size="icon" className="relative">
//           <BellIcon className="h-5 w-5" />
//           <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
//             3
//           </Badge>
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="relative">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
//                 <AvatarFallback>AB</AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>Profil</DropdownMenuItem>
//             <DropdownMenuItem>Paramètres</DropdownMenuItem>
//             <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }

'use client'
interface TopBarProps {
  user: { role: string; name: string; email: string }
}

export default function TopBar({ user }: TopBarProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bonjour, {user?.name}! 👋</h1>
        <p className="text-sm text-gray-600">
          Rôle: <span className="font-semibold text-orange-600">{user?.role}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  )
}