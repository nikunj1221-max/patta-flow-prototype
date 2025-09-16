import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge-enhanced';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Building, User, Shield } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp) {
      login(email, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">FRA Atlas</h1>
          <p className="text-muted-foreground">Patta Claims Management System</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={selectedRole === 'citizen' ? 'default' : 'ghost'}
            className="flex-1"
            onClick={() => setSelectedRole('citizen')}
          >
            <User className="mr-2 h-4 w-4" />
            Citizen
          </Button>
          <Button
            variant={selectedRole === 'officer' ? 'default' : 'ghost'}
            className="flex-1"
            onClick={() => setSelectedRole('officer')}
          >
            <Shield className="mr-2 h-4 w-4" />
            Officer
          </Button>
        </div>

        {/* Login Form */}
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              Login as {selectedRole === 'officer' ? 'Officer' : 'Citizen'}
              <Badge variant={selectedRole === 'officer' ? 'secondary' : 'default'}>
                {selectedRole}
              </Badge>
            </CardTitle>
            <CardDescription>
              {step === 'email' 
                ? 'Enter your registered email address' 
                : 'Enter the OTP sent to your email'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    OTP sent to {email}
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setStep('email')}
                >
                  Back to Email
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Demo credentials: Any email + any 6-digit OTP</p>
        </div>
      </div>
    </div>
  );
}