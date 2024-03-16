type Result<E, T> = [E | null, T | undefined];

export function tryCall<T, Args extends any[]>(func: (...args: Args) => T, ...args: Args): Result<Error, T> {
  try {
    const result: T = func(...args);
    return [null, result];
  } catch (error) {
    return [error as Error, undefined];
  }
}
