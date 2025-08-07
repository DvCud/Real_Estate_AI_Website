'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { authService } from '@/lib/api/authService';
import { useUser } from '@/lib/context/UserContext';

type AuthMode = 'login' | 'signup' | 'forgotPassword';

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const { login, register, isAuthenticated, user, logout } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        setOpen(false); // Close dialog on successful login
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
        });
        setOpen(false); // Close dialog on successful signup
      } else if (mode === 'forgotPassword') {
        // We'll keep using authService directly for this since it's not in the context
        await authService.requestPasswordReset(formData.email);
        setError('Password reset link sent to your email');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
    setError(null);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="h-8 w-8 rounded-full bg-[#1A365D] text-white">
              <span className="sr-only">User profile</span>
              <span className="text-sm font-medium">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </span>
            </Button>
            <Button variant="ghost" size="sm" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logout();
            }}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="h-8 w-8 rounded-full bg-[#1A365D] text-white">
            <span className="sr-only">Sign in</span>
            <span className="text-sm font-medium">Sign In</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isAuthenticated && user ? (
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              You are signed in as {user.first_name} {user.last_name}.
            </DialogDescription>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>
              {mode === 'login' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgotPassword' && 'Reset Password'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'login' && 'Enter your credentials to access your account'}
              {mode === 'signup' && 'Fill in your information to create an account'}
              {mode === 'forgotPassword' && 'Enter your email to receive a password reset link'}
            </DialogDescription>
          </DialogHeader>
        )}

        {isAuthenticated && user ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-gray-500">{user.first_name} {user.last_name}</p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Sign Out
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {mode !== 'forgotPassword' && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                {mode === 'login' && (
                  <>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => switchMode('forgotPassword')}
                      className="px-0 sm:px-4"
                    >
                      Forgot password?
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => switchMode('signup')}
                      className="px-0 sm:px-4"
                    >
                      Create account
                    </Button>
                  </>
                )}
                {mode === 'signup' && (
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => switchMode('login')}
                    className="px-0 sm:px-4"
                  >
                    Already have an account?
                  </Button>
                )}
                {mode === 'forgotPassword' && (
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => switchMode('login')}
                    className="px-0 sm:px-4"
                  >
                    Back to login
                  </Button>
                )}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2">Loading...</span>
                  </>
                ) : (
                  <>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgotPassword' && 'Reset Password'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}