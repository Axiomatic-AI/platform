import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { SVGProps, ReactElement } from 'react'
import AuthNav from './AuthNav'
import HomeIcon from './icons/HomeIcon'
import CircuitIcon from './icons/CircuitIcon'
import DocumentIcon from './icons/DocumentIcon'
import { PlaygroundIcon} from './icons/PlaygroundIcon'
import { SidebarNavigation } from './SidebarNavigation'
interface NavigationItem {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  external?: boolean;
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'PIC Designer', href: '/pic-designer', icon: CircuitIcon },
  { name: 'Document Analyzer', href: '/document-analyzer', icon: DocumentIcon },
  { name: 'Playground', href: 'https://playground.axiomatic-ai.com', icon: PlaygroundIcon, external: true },
]

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
        className={`fixed inset-y-0 left-0 flex flex-col z-40 w-16 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      > 
        <div className="flex-1 overflow-y-auto">
          <SidebarNavigation items={navigationItems} pathname={pathname} />
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700">
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
      <div className="flex flex-col w-[5rem]">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-dark-900 shadow-[2px_0_8px_-1px_rgba(0,0,0,0.15)] dark:shadow-none">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <SidebarNavigation 
              items={navigationItems} 
              pathname={pathname} 
              className="mt-2"
            />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700">
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
