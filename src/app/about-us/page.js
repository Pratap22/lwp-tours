'use client';

import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, StarIcon, HeartIcon, LinkIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

const LinkedInIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>;
LinkedInIcon.displayName = 'LinkedInIcon';
const GitHubIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /></svg>;
GitHubIcon.displayName = 'GitHubIcon';
const XIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
XIcon.displayName = 'XIcon';
const EmailIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
EmailIcon.displayName = 'EmailIcon';

const SocialLink = ({ url }) => {
  if (!url) return null;

  let Icon, text, displayUrl;

  if (url.includes('linkedin.com')) {
    Icon = LinkedInIcon;
    text = 'LinkedIn';
  } else if (url.includes('github.com')) {
    Icon = GitHubIcon;
    text = 'GitHub';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    Icon = XIcon;
    text = 'X';
  } else if (url.startsWith('mailto:')) {
    Icon = EmailIcon;
    text = 'Email';
    displayUrl = url;
  } else {
    Icon = LinkIcon;
    text = 'Website';
  }

  return (
    <a href={displayUrl || url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white flex items-center space-x-2">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </a>
  );
};
SocialLink.displayName = 'SocialLink';

export default function AboutUs() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        const aboutUsSection = data.sections?.find(section => section.sectionId === 'about-us');
        setPageData(aboutUsSection);
      } catch (error) {
        console.error('Error fetching page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Page content not found.</p>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    const iconMap = {
      'CheckCircleIcon': CheckCircleIcon,
      'StarIcon': StarIcon,
      'HeartIcon': HeartIcon,
    };
    return iconMap[iconName] || CheckCircleIcon;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={pageData.hero?.image || "/hero-cultural.jpg"}
          alt="About Us Hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow-md">{pageData.hero?.title || 'About LWP Travel & Tours'}</h1>
            <p className="text-xl max-w-2xl text-shadow-md">
              {pageData.hero?.subtitle || 'Your trusted local experts for unforgettable journeys in the Land of the Thunder Dragon.'}
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{pageData.title || 'Welcome to Your Bhutan Adventure'}</h2>
          <div className="text-lg text-gray-700 mb-4 whitespace-pre-line">
            {pageData.content || 'At LWP Travel & Tours, we don\'t just sell tours; we craft lifelong memories. As a premier, locally-owned tour operator based in the heart of Bhutan, we are passionate about sharing the magic of our kingdom with you.\n\nOur team of dedicated local experts leverages deep-rooted knowledge and a love for our heritage to design authentic, immersive, and personalized journeys. Whether you seek cultural discovery, spiritual enrichment, or thrilling adventure, we are your trusted guides to the wonders of Bhutan.'}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      {pageData.values && pageData.values.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">The principles that guide every journey we create.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {pageData.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <div key={index} className="flex flex-col items-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {pageData.teamMembers && pageData.teamMembers.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Passionate Team</h2>
              <p className="text-lg text-gray-600">The local experts dedicated to making your journey perfect.</p>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {pageData.teamMembers.map((member, idx) => {
                const layouts = [
                  'col-span-12 sm:col-span-6 md:col-span-4 row-span-2 min-h-[32rem]', // Tall
                  'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                  'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                  'col-span-12 sm:col-span-6 md:col-span-8 min-h-[24rem]',       // Wide
                  'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                  'col-span-12 sm:col-span-6 md:col-span-6 min-h-[24rem]',       // Medium
                  'col-span-12 sm:col-span-6 md:col-span-6 min-h-[24rem]',       // Medium
                ];
                const layoutClass = layouts[idx % layouts.length];

                return (
                  <div key={member.name} className={`group relative rounded-xl overflow-hidden shadow-lg ${layoutClass}`}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                        <p className="text-blue-300 font-semibold mb-2">{member.position}</p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
                          <p className="text-sm text-gray-200 mb-4">{member.bio}</p>
                          <div className="flex justify-start space-x-4">
                            {(member.links || []).map((link, index) => (
                              <SocialLink key={index} url={link} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
