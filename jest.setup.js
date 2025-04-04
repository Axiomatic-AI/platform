import '@testing-library/jest-dom';

// Mock auth0
jest.mock('@lib/auth0', () => ({
  auth0: {
    getSession: jest.fn(),
  },
}));

// Mock prisma
jest.mock('@lib/prisma', () => ({
  prisma: {
    thread: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
})); 