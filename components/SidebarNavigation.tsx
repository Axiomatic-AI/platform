import Link from 'next/link'
import React, { SVGProps, ReactElement } from 'react'

interface NavigationItem {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  external?: boolean;
}

interface SidebarNavigationProps {
  items: NavigationItem[];
  pathname: string;
  className?: string;
}

export function SidebarNavigation({ items, pathname, className = '' }: SidebarNavigationProps): ReactElement {
  return (
    <nav className={`mt-5 px-2 space-y-4 ${className}`}>
      {items.map((item) => {
        const isActive = !item.external && pathname === item.href;
        const linkProps = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex flex-col items-center ${
              isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            {...linkProps}
          >
            <div className={`px-2 py-2 rounded-md ${
              isActive
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
              <item.icon
                className={`flex-shrink-0 h-6 w-6 ${
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}
                aria-hidden="true"
              />
            </div>
            <span className="mt-1 text-xs text-center">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  )
} 