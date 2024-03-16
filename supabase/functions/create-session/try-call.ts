type Result<E, T> = [E | null, T | undefined];

export async function tryCall<T, Args extends any[]>(func: (...args: Args) => T, ...args: Args): Promise<Result<Error, T>> {
  try {
    const result: T = await func(...args);
    return [null, result];
  } catch (error) {
    return [error as Error, undefined];
  }
}
