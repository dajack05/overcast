export interface Message {
  error: string | undefined;
  payload: any | undefined;
}

export function OK(payload: any | undefined): Message {
  return {
    error: undefined,
    payload,
  };
}

export function ERR(msg: string): Message {
  return {
    error: msg,
    payload: undefined,
  };
}
