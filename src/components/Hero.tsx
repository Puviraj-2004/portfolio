import React from 'react';
import { profile } from '@/lib/data';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-10 max-w-4xl mx-auto py-12 md:py-16 px-4 sm:px-6 min-h-[60vh]">
      {/* Glow graphics */}
      <div className="absolute top-10 left-10 -z-10 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 w-72 h-72 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Biography */}
      <div className="flex-1 order-2 md:order-1 flex flex-col items-start text-left w-full">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-primary-700 dark:text-primary-500 mb-6 transition-colors">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          {profile.availability.remote ? 'Available for Remote Roles' : 'Available for Work'}
        </div>

        {/* Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-secondary-500">{profile.displayName}</span>
        </h1>
        
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4 leading-snug">
          {profile.headline}
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
          {profile.shortBio}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="px-4 py-2 rounded-lg bg-neutral-700 text-white hover:opacity-95 font-medium text-xs sm:text-sm transition-opacity"
          >
            Explore Case Studies
          </a>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-card-border bg-card text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-100 font-medium text-xs sm:text-sm transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Right Column: Headshot */}
      <div className="order-1 md:order-2 flex justify-center items-center shrink-0">
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-2 border-card-border p-1.5 bg-linear-to-b from-primary-50 to-secondary-50/20 dark:from-primary-500/10 dark:to-transparent shadow-lg flex items-center justify-center overflow-hidden">
          <div className="absolute inset-2 rounded-full border border-dashed border-primary-500/30 animate-[spin_40s_linear_infinite]" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={profile.profileImage}
              alt={profile.fullName}
              fill
              priority
              sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
              className="object-cover object-center scale-105 transition-transform hover:scale-110 duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}