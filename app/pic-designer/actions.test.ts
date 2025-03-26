import { auth0 } from '@lib/auth0';
import { prisma } from '@lib/prisma';
import {
  createThread,
  getThreads,
  getThread,
  postQueryToThread,
  deleteThread,
  deleteAllThreads,
} from './actions';

describe('Pic Designer Actions', () => {
  const mockUser = {
    sub: 'test-user-id',
  };

  const mockThread = {
    id: 'test-thread-id',
    userId: 'test-user-id',
    title: 'Test Thread',
    queries: [],
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth0.getSession as jest.Mock).mockResolvedValue({ user: mockUser });
  });

  describe('createThread', () => {
    it('should create a new thread', async () => {
      const title = 'New Thread';
      (prisma.thread.create as jest.Mock).mockResolvedValue(mockThread);

      const result = await createThread(title);

      expect(prisma.thread.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.sub,
          title,
          queries: [],
        },
      });
      expect(result).toEqual(mockThread);
    });

    it('should throw error if user is not authenticated', async () => {
      (auth0.getSession as jest.Mock).mockResolvedValue({ user: null });

      await expect(createThread('New Thread')).rejects.toThrow('Unauthorized');
    });
  });

  describe('getThreads', () => {
    it('should return all threads for the user', async () => {
      const mockThreads = [mockThread];
      (prisma.thread.findMany as jest.Mock).mockResolvedValue(mockThreads);

      const result = await getThreads();

      expect(prisma.thread.findMany).toHaveBeenCalledWith({
        where: { userId: mockUser.sub },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockThreads);
    });

    it('should throw error if user is not authenticated', async () => {
      (auth0.getSession as jest.Mock).mockResolvedValue({ user: null });

      await expect(getThreads()).rejects.toThrow('Unauthorized');
    });
  });

  describe('getThread', () => {
    it('should return a specific thread', async () => {
      (prisma.thread.findUnique as jest.Mock).mockResolvedValue(mockThread);

      const result = await getThread('test-thread-id');

      expect(prisma.thread.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'test-thread-id',
          userId: mockUser.sub,
        },
      });
      expect(result).toEqual(mockThread);
    });

    it('should return null if thread not found', async () => {
      (prisma.thread.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getThread('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('postQueryToThread', () => {
    it('should add a query to an existing thread', async () => {
      const query = {
        content: 'Test query',
        code: 'test code',
        error: undefined,
      };
      const updatedThread = {
        ...mockThread,
        queries: [query],
      };
      (prisma.thread.findUnique as jest.Mock).mockResolvedValue(mockThread);
      (prisma.thread.update as jest.Mock).mockResolvedValue(updatedThread);

      const result = await postQueryToThread({
        threadId: 'test-thread-id',
        content: query.content,
        code: query.code,
      });

      expect(prisma.thread.update).toHaveBeenCalledWith({
        where: { id: 'test-thread-id' },
        data: {
          queries: [query],
        },
      });
      expect(result).toEqual(updatedThread);
    });

    it('should throw error if thread not found', async () => {
      (prisma.thread.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        postQueryToThread({
          threadId: 'non-existent-id',
          content: 'Test query',
        })
      ).rejects.toThrow('Thread not found');
    });
  });

  describe('deleteThread', () => {
    it('should delete a thread', async () => {
      await deleteThread('test-thread-id');

      expect(prisma.thread.delete).toHaveBeenCalledWith({
        where: {
          id: 'test-thread-id',
          userId: mockUser.sub,
        },
      });
    });
  });

  describe('deleteAllThreads', () => {
    it('should delete all threads for the user', async () => {
      await deleteAllThreads();

      expect(prisma.thread.deleteMany).toHaveBeenCalledWith({
        where: {
          userId: mockUser.sub,
        },
      });
    });
  });
}); 