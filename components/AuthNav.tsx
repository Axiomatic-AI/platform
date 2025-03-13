'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import LogoutIcon from './icons/LogoutIcon';
import Image from 'next/image';

export default function AuthNav() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="flex items-center px-2 py-3 border-gray-200 dark:border-gray-700">
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
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>
      <a
        href="/auth/logout"
        className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      >
        <LogoutIcon
          className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
        />
        Logout
      </a>
    </div>
  );
}
