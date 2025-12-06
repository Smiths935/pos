// src/components/ui/form/password-generator.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PasswordGeneratorProps {
  isPasswordSet: boolean;
  onPasswordChange: (password: string) => void;
  onTogglePasswordSet: (checked: boolean) => void;
}



export default function PasswordGenerator({
  isPasswordSet,
  onPasswordChange,
  onTogglePasswordSet,
}: PasswordGeneratorProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generated);
    onPasswordChange(generated);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="setPassword"
          checked={isPasswordSet}
          onCheckedChange={onTogglePasswordSet}
        />
        <label htmlFor="setPassword" className="text-sm font-normal">
          Définissez un mot de passe temporaire
        </label>
      </div>

      {isPasswordSet ? (
        <>
          <div className="space-y-2">
            <label htmlFor="tempPassword" className="text-sm font-medium">
              Mot de passe temporaire
            </label>
            <Input
              id="tempPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                onPasswordChange(e.target.value);
              }}
              placeholder="Saisissez un mot de passe"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              L&apos;utilisateur sera invité à modifier ce mot de passe lors de
              sa première connexion.
            </p>
          </div>

          <div className="flex space-y-2 flex-col">
            <Button
              type="button"
              variant="outline"
              onClick={generatePassword}
              className="w-full bg-muted-foreground/10 text-muted-foreground cursor-pointer hover:bg-muted-foreground/20 hover:text-muted-foreground"
            >
              Générer un mot de passe
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleShowPassword}
              className="w-full cursor-pointer"
            >
              {showPassword
                ? "Cacher le mot de passe"
                : "Afficher le mot de passe"}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          Si aucun mot de passe n&apos;est défini, l&apos;utilisateur recevra un courriel
          contenant les instructions pour le définir lui-même.
        </p>
      )}
    </div>
  );
}
