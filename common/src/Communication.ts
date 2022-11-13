export interface Message<T> {
  error?: string;
  payload?: T;
}

export function OK<T>(payload?: T|undefined): Message<T> {
  return {
    error: undefined,
    payload,
  };
}

export function ERR(msg: string): Message<any> {
  return {
    error: msg,
    payload: undefined,
  };
}
