'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function AuthNav() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-sm">{user.email}</span>
          <a
            href="/auth/logout"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Logout
          </a>
        </>
      ) : (
        <a
          href="/auth/login"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Login
        </a>
      )}
    </div>
  );
} 