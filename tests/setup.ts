process.env.NODE_ENV = "test";
process.env.PORT = "3199";
process.env.SOCKET_PORT = "3198";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://test:test@127.0.0.1:5432/ntbhub_test";
process.env.ACCESS_SECRET =
  process.env.ACCESS_SECRET ?? "test-access-secret-key-32chars!!";
process.env.REFRESH_SECRET =
  process.env.REFRESH_SECRET ?? "test-refresh-secret-key-32chars!";
process.env.QR_SECRET = process.env.QR_SECRET ?? "test-qr-secret-key-32chars!!!!";
process.env.REDIS_HOST = process.env.REDIS_HOST ?? "127.0.0.1";
process.env.REDIS_PORT = process.env.REDIS_PORT ?? "6379";
process.env.STORAGE_DRIVER = process.env.STORAGE_DRIVER ?? "s3";
process.env.AWS_REGION = process.env.AWS_REGION ?? "ap-southeast-1";
process.env.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ?? "test";
process.env.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY ?? "test";

jest.mock("config/s3Client", () => ({
  createStorageClient: jest.fn(() => ({
    send: jest.fn(),
  })),
}));

jest.mock("ioredis", () => {
  const mockRedis = jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue("OK"),
    del: jest.fn().mockResolvedValue(1),
    quit: jest.fn().mockResolvedValue("OK"),
    disconnect: jest.fn(),
    on: jest.fn(),
  }));
  return mockRedis;
});

jest.mock("uuid", () => ({ v4: () => "00000000-0000-0000-0000-000000000001" }));
