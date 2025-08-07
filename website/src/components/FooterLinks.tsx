'use client';

import React from 'react';
import { FooterModal } from './FooterModals';

export function FooterLinks() {
  return (
    <>
      <FooterModal type="terms">
        <span className="text-[#1A365D] hover:underline cursor-pointer">
          Terms of Service
        </span>
      </FooterModal>{' '}
      •{' '}
      <FooterModal type="privacy">
        <span className="text-[#1A365D] hover:underline cursor-pointer">
          Privacy Policy
        </span>
      </FooterModal>{' '}
      •{' '}
      <FooterModal type="contact">
        <span className="text-[#1A365D] hover:underline cursor-pointer">
          Contact Us
        </span>
      </FooterModal>
    </>
  );
}