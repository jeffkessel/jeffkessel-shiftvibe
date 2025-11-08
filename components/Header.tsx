"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth';
import { Employee } from '@/lib/mockData';

interface HeaderProps {
  isAuthenticated: boolean;
}

const NavLinkItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = "bg-slate-700 text-white";
  const inactiveClass = "text-slate-300 hover:bg-slate-700 hover:text-white";
  
  return (
    <Link
      href={href}
      className={`${isActive ? activeClass : inactiveClass} rounded-md px-3 py-2 text-sm font-medium transition-colors`}
    >
      {children}
    </Link>
  );
};

const ScrollLinkItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    return (
        <a href={href} className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-colors">
            {children}
        </a>
    )
}

const UserMenu: React.FC<{ currentUser: Employee | null }> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!currentUser) return null;

    return (
        <div className="relative ml-3" ref={menuRef}>
            <div>
                <button
                    type="button"
                    className="flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={currentUser.avatar} alt="" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-white border-b border-slate-600">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-slate-400 truncate">{currentUser.permissionRole}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600" onClick={() => setIsOpen(false)}>Your Profile</Link>
                    <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600" onClick={() => console.log('Log out')}>Log Out</a>
                </div>
            )}
        </div>
    );
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      authService.getCurrentUser().then(setCurrentUser);
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated]);

  const canManageCompany = currentUser?.permissionRole === 'Owner' || currentUser?.permissionRole === 'Manager';

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold tracking-wider text-white">ShiftVibe</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAuthenticated ? (
                  <>
                    <NavLinkItem href="/dashboard">Dashboard</NavLinkItem>
                    {canManageCompany && <NavLinkItem href="/company">Company</NavLinkItem>}
                  </>
                ) : (
                  <>
                    <NavLinkItem href="/">Home</NavLinkItem>
                    <ScrollLinkItem href="/#features">Features</ScrollLinkItem>
                    <ScrollLinkItem href="/#pricing">Pricing</ScrollLinkItem>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <UserMenu currentUser={currentUser} />
              ) : (
                <div className="flex items-center space-x-2">
                    <Link href="/auth/login" className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white">
                        Log In
                    </Link>
                    <Link href="/auth/signup" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                        Sign Up
                    </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;