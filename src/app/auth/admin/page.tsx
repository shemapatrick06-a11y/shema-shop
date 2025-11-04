'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AdminAuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const ADMIN_SECRET_CODE = 'tontotrix';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isRegister) {
      // Handle Registration
      if (secretCode !== ADMIN_SECRET_CODE) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: 'The secret code is incorrect.',
        });
        setIsLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Add user to the admin roles collection
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        // Using setDocumentNonBlocking to avoid waiting and let the UI proceed
        setDocumentNonBlocking(adminRoleRef, { isAdmin: true }, {});

        toast({
          title: 'Admin Account Created!',
          description: "You're now being redirected to the admin dashboard.",
        });
        router.push('/admin');
      } catch (error: any) {
        console.error('Admin sign up error:', error);
        toast({
          variant: 'destructive',
          title: 'Sign Up Failed',
          description: error.message || 'An unexpected error occurred.',
        });
        setIsLoading(false);
      }
    } else {
      // Handle Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Signing in...',
          description:
            'You will be redirected to the admin panel shortly.',
        });
        router.push('/admin');
      } catch (error: any) {
        console.error('Admin sign in error:', error);
        toast({
          variant: 'destructive',
          title: 'Sign In Failed',
          description:
            'Invalid credentials. Please check your email and password.',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isRegister ? 'Create Admin Account' : 'Admin Login'}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? 'Enter your details and the secret code.'
              : 'Enter your credentials to access the dashboard.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {isRegister && (
              <div className="grid gap-2">
                <Label htmlFor="secretCode">Secret Code</Label>
                <Input
                  id="secretCode"
                  type="password"
                  placeholder="Enter the secret code"
                  required
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isRegister
                  ? 'Creating Account...'
                  : 'Signing In...'
                : isRegister
                ? 'Create Account'
                : 'Sign In'}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full text-sm"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : "Don't have an admin account? Register"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
