import * as Repository_Task from './task.repository.js';
import * as Service_Task from './task.service.js';

const userIdMock = 'user-uuid-mock';

const makeTask = (id: number) => ({
  id,
  title: `Task ${id}`,
  description: `Description ${id}`,
  status: 'PENDING' as const,
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('getTasks flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should call repository with correct arguments including cursorId', async () => {
    const limit = 10;
    const cursorId = 5;
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue([]);

    await Service_Task.getTasks(userIdMock, limit, cursorId);

    expect(Repository_Task.getTasks).toHaveBeenCalledWith(userIdMock, limit, cursorId);
    expect(Repository_Task.getTasks).toHaveBeenCalledTimes(1);
  });

  test('Should call repository without cursorId when not provided (first page)', async () => {
    const limit = 10;
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue([]);

    await Service_Task.getTasks(userIdMock, limit);

    expect(Repository_Task.getTasks).toHaveBeenCalledWith(userIdMock, limit, undefined);
  });

  test('Should return hasNextPage true and data sliced to limit when repository returns limit + 1 items', async () => {
    const limit = 3;
    const tasks = [makeTask(4), makeTask(3), makeTask(2), makeTask(1)];
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue(tasks);

    const result = await Service_Task.getTasks(userIdMock, limit);

    expect(result.pagination.hasNextPage).toBe(true);
    expect(result.data).toHaveLength(limit);
    expect(result.data).toEqual(tasks.slice(0, limit));
  });

  test('Should set nextCursor to the last item of sliced data when hasNextPage is true', async () => {
    const limit = 3;
    const tasks = [makeTask(4), makeTask(3), makeTask(2), makeTask(1)];
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue(tasks);

    const result = await Service_Task.getTasks(userIdMock, limit);

    expect(result.pagination.nextCursor).toEqual(tasks[limit - 1].id);
  });

  test('Should return hasNextPage false and full data when repository returns exactly limit items', async () => {
    const limit = 3;
    const tasks = [makeTask(3), makeTask(2), makeTask(1)];
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue(tasks);

    const result = await Service_Task.getTasks(userIdMock, limit);

    expect(result.pagination.hasNextPage).toBe(false);
    expect(result.data).toHaveLength(limit);
    expect(result.data).toEqual(tasks);
  });

  test('Should return hasNextPage false and nextCursor null when repository returns fewer than limit items', async () => {
    const limit = 10;
    const tasks = [makeTask(2), makeTask(1)];
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue(tasks);

    const result = await Service_Task.getTasks(userIdMock, limit);

    expect(result.pagination.hasNextPage).toBe(false);
    expect(result.pagination.nextCursor).toBeNull();
    expect(result.data).toEqual(tasks);
  });

  test('Should return empty data, hasNextPage false and nextCursor null when repository returns no tasks', async () => {
    const limit = 10;
    vi.spyOn(Repository_Task, 'getTasks').mockResolvedValue([]);

    const result = await Service_Task.getTasks(userIdMock, limit);

    expect(result.data).toHaveLength(0);
    expect(result.pagination.hasNextPage).toBe(false);
    expect(result.pagination.nextCursor).toBeNull();
  });
});
