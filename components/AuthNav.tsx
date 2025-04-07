'use client';

import { useUser } from '@auth0/nextjs-auth0';
import LogoutIcon from './icons/LogoutIcon';
import Image from 'next/image';

export default function AuthNav() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center px-2 py-3 border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name || 'User profile'}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </div>
      </div>
      <a
        href="/auth/logout"
        className="group flex flex-col items-center w-full px-2 py-2 text-xs font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      >
        <LogoutIcon
          className="mb-1 flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
        />
        <span>Logout</span>
      </a>
    </div>
  );
}
