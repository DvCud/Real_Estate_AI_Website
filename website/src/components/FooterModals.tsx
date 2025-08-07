'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

type ModalType = 'terms' | 'privacy' | 'contact';

interface FooterModalProps {
  type: ModalType;
  children: React.ReactNode;
}

export function FooterModal({ type, children }: FooterModalProps) {
  const titles = {
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
  };

  const descriptions = {
    terms: 'Please read our terms of service carefully.',
    privacy: 'Information about how we collect and use your data.',
    contact: 'Get in touch with our team.',
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{titles[type]}</DialogTitle>
          <DialogDescription>{descriptions[type]}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {type === 'terms' && <TermsContent />}
          {type === 'privacy' && <PrivacyContent />}
          {type === 'contact' && <ContactContent />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TermsContent() {
  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-lg font-medium">1. Acceptance of Terms</h3>
      <p>
        By accessing or using the Real Estate AI Investment Platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
      </p>
      
      <h3 className="text-lg font-medium">2. Use of Services</h3>
      <p>
        Our platform provides AI-powered real estate investment analysis and recommendations. You may use our services for personal or business purposes in accordance with these terms.
      </p>
      
      <h3 className="text-lg font-medium">3. User Accounts</h3>
      <p>
        To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
      </p>
      
      <h3 className="text-lg font-medium">4. Limitation of Liability</h3>
      <p>
        The platform is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our platform.
      </p>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-lg font-medium">1. Information We Collect</h3>
      <p>
        We collect personal information such as your name, email address, and usage data to provide and improve our services.
      </p>
      
      <h3 className="text-lg font-medium">2. How We Use Your Information</h3>
      <p>
        We use your information to provide our services, communicate with you, and improve our platform. We may also use anonymized data for research and analytics.
      </p>
      
      <h3 className="text-lg font-medium">3. Information Sharing</h3>
      <p>
        We do not sell your personal information. We may share your information with third-party service providers who help us operate our platform.
      </p>
      
      <h3 className="text-lg font-medium">4. Data Security</h3>
      <p>
        We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
      </p>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Customer Support</h3>
        <p className="text-sm">Email: support@realestate-ai.com</p>
        <p className="text-sm">Phone: (555) 123-4567</p>
        <p className="text-sm">Hours: Monday-Friday, 9am-5pm EST</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Business Inquiries</h3>
        <p className="text-sm">Email: business@realestate-ai.com</p>
        <p className="text-sm">Phone: (555) 987-6543</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Office Location</h3>
        <p className="text-sm">123 Tech Plaza</p>
        <p className="text-sm">Suite 400</p>
        <p className="text-sm">San Francisco, CA 94105</p>
      </div>
    </div>
  );
}