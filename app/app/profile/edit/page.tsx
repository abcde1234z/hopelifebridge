'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bloodGroup: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to Supabase to update profile
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to profile
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/app/profile">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold">Edit Profile</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Form */}
      <div className="px-6 py-6 pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4 rounded-lg border border-border p-4">
            <h2 className="font-semibold">Personal Information</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                placeholder="+234 800 0000 000"
              />
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-4 rounded-lg border border-border p-4">
            <h2 className="font-semibold">Medical Information</h2>

            <div>
              <label className="text-sm font-medium">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                <option value="">Select blood group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                placeholder="List any allergies (e.g., Penicillin, Nuts)"
                rows={3}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4 rounded-lg border border-border p-4">
            <h2 className="font-semibold">Emergency Contact</h2>

            <div>
              <label className="text-sm font-medium">Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                placeholder="Mother&apos;s name or closest contact"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact Phone</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                placeholder="+234 800 0000 000"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link href="/app/profile" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
