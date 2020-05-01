export type Result<T, E> = {
  ok: () => T;
  err: () => E;
  isOk: () => boolean;
  isErr: () => boolean;
};
export const Ok = <T, E>(result: T): Result<T, E> => {
  return {
    ok: (): T => result,
    err: () => {
      throw Error("Can't unwrap error");
    },
    isOk: (): boolean => true,
    isErr: (): boolean => false,
  };
};

export const Err = <T, E>(result: E): Result<T, E> => {
  return {
    ok: () => {
      throw Error("Can't unwrap ok");
    },
    err: (): E => result,
    isOk: (): boolean => false,
    isErr: (): boolean => true,
  };
};
