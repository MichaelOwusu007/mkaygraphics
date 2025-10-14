'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface PayPalModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
}

export const PayPalModal = ({ open, onClose, onConfirm, amount }: PayPalModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    onConfirm();
    toast.success('Payment processed successfully!');
    setEmail('');
    setPassword('');
    setTimeout(() => onClose(), 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
        {/* ✅ Accessibility title (hidden) */}
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>PayPal Payment Modal</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        {/* ✅ PayPal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold">PayPal</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Lock className="h-3 w-3" aria-hidden="true" />
              <span>Secure</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-90">You&apos;re paying</p>
            <p className="text-3xl font-bold">${amount.toFixed(2)}</p>
          </div>
        </div>

        {/* ✅ Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paypal-email">Email or mobile number</Label>
              <Input
                id="paypal-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypal-password">Password</Label>
              <Input
                id="paypal-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            Log In and Pay
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => {
              setEmail('');
              setPassword('');
              onClose();
            }}
          >
            Cancel Payment
          </Button>

          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-1">Secure Payment</p>
              <p>Your payment information is encrypted and secure with PayPal&apos;s protection.</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              aria-label="Pay with Debit or Credit Card"
            >
              Pay with Debit or Credit Card
            </button>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have a PayPal account?{' '}
              <button type="button" className="text-blue-600 hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
