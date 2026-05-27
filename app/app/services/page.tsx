'use client';

import { ShieldCheck, Stethoscope, MapPin, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Insurance',
      description: 'Buy health coverage plans',
      icon: ShieldCheck,
      color: 'bg-primary/10 text-primary',
      href: '#',
    },
    {
      id: 2,
      title: 'Consultation',
      description: 'Book a doctor visit',
      icon: Stethoscope,
      color: 'bg-primary/10 text-primary',
      href: '#',
    },
    {
      id: 3,
      title: 'Healthcare Locator',
      description: 'Find hospitals & pharmacies',
      icon: MapPin,
      color: 'bg-green-100 text-green-600',
      href: '#',
    },
    {
      id: 4,
      title: 'Linked Accounts',
      description: 'Manage family accounts',
      icon: Users,
      color: 'bg-amber-100 text-amber-600',
      href: '#',
    },
    {
      id: 5,
      title: 'Notifications',
      description: 'View alerts & updates',
      icon: Bell,
      color: 'bg-primary/10 text-primary',
      href: '#',
    },
  ];

  return (
    <main className="w-full min-h-[calc(100vh-80px)] px-6 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Services</h1>

      {/* Services Grid */}
      <div className="space-y-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Button
              key={service.id}
              variant="outline"
              className="h-auto w-full justify-start border-border px-6 py-4 hover:bg-secondary"
              asChild
            >
              <a href={service.href}>
                <div className={`rounded-lg ${service.color} p-3 mr-4 flex-shrink-0`}>
                  <Icon size={24} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </a>
            </Button>
          );
        })}
      </div>
    </main>
  );
}
