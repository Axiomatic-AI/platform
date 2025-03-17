import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { SVGProps, ReactElement } from 'react'
import AuthNav from './AuthNav'
import HomeIcon from './icons/HomeIcon'
import CircuitIcon from './icons/CircuitIcon'

interface NavigationItem {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'PIC Designer', href: '/pic-designer', icon: CircuitIcon },
]

interface SidebarNavigationProps {
  items: NavigationItem[];
  pathname: string;
  className?: string;
}

function SidebarNavigation({ items, pathname, className = '' }: SidebarNavigationProps): ReactElement {
  return (
    <nav className={`mt-5 px-2 space-y-1 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            pathname === item.href
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <item.icon
            className={`mr-4 flex-shrink-0 h-6 w-6 ${
              pathname === item.href
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
            }`}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

interface MobileSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pathname: string;
}

function MobileSidebar({ open, setOpen, pathname }: MobileSidebarProps): ReactElement {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
      
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Platform</span>
          <button
            className="rounded-md p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pb-4">
          <SidebarNavigation items={navigationItems} pathname={pathname} />
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <AuthNav />
        </div>
      </div>
    </>
  )
}

interface DesktopSidebarProps {
  pathname: string;
}

function DesktopSidebar({ pathname }: DesktopSidebarProps): ReactElement {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-transparent dark:border-gray-700/0 bg-white dark:bg-dark-900">
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <SidebarNavigation 
              items={navigationItems} 
              pathname={pathname} 
              className="mt-2 flex-1"
            />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <AuthNav />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps): ReactElement {
  const pathname = usePathname()
  
  return (
    <>
      <MobileSidebar open={open} setOpen={setOpen} pathname={pathname} />
      <DesktopSidebar pathname={pathname} />
    </>
  )
}
