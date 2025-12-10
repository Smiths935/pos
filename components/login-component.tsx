/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { UtensilsCrossed } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "./ui/button";

interface LoginResult {
  success: boolean;
  user?: any;
  error?: string;
}

export const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e?: KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    
    const result: LoginResult = await api.login(email, password) as LoginResult;
    
    if (result.success) {
      onLogin(result.user);
    } else {
      setError(result.error || '');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
            <UtensilsCrossed size={48} className="text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">RestaurantPro</h2>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="••••••••"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 font-semibold mb-2">Comptes de démonstration :</p>
          <p className="text-xs text-blue-700">admin@resto.com</p>
          <p className="text-xs text-blue-700">manager@resto.com</p>
          <p className="text-xs text-blue-700">serveur@resto.com</p>
          <p className="text-xs text-blue-700">cuisinier@resto.com</p>
        </div>
      </div>
    </div>
  );
};