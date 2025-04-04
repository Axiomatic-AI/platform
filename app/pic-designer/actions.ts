'use server';

import { auth0 } from '@lib/auth0';
import { prisma } from '@lib/prisma';
import { ThreadQuery, ThreadWithQueries } from './types';
import { ThreadType } from '@prisma/client';

export async function createThread(title: string, type: ThreadType = ThreadType.PIC): Promise<ThreadWithQueries> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }
  

  return prisma.thread.create({
    data: {
      userId: session.user.sub,
      title,
      type: 'PIC',
      queries: [],
    },
  }) as Promise<ThreadWithQueries>;
}

export async function getThreads(): Promise<ThreadWithQueries[]> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }

  return prisma.thread.findMany({
    where: {
      userId: session.user.sub,
    },
    orderBy: {
      createdAt: 'desc',
    },
  }) as Promise<ThreadWithQueries[]>;
}

export async function getThread(threadId: string): Promise<ThreadWithQueries | null> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }

  return prisma.thread.findUnique({
    where: {
      id: threadId,
      userId: session.user.sub,
    },
  }) as Promise<ThreadWithQueries | null>;
}

export async function postQueryToThread(threadId: string, query: ThreadQuery): Promise<ThreadWithQueries> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }

  const thread = await prisma.thread.findUnique({
    where: {
      id: threadId,
      userId: session.user.sub,
    },
  });

  if (!thread) {
    throw new Error('Thread not found');
  }

  const existingQueries = thread.queries as any; // TODO: fix this

  return prisma.thread.update({
    where: { id: threadId },
    data: {
      queries: [
        ...existingQueries,
        query,
      ],
    },
  }) as Promise<ThreadWithQueries>;
}

export async function deleteThread(threadId: string) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }

  await prisma.thread.delete({
    where: {
      id: threadId,
      userId: session.user.sub,
    },
  });
}

export async function deleteAllThreads() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    throw new Error('Unauthorized');
  }

  await prisma.thread.deleteMany({
    where: {
      userId: session.user.sub,
    },
  });
}