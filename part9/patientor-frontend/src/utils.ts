export const assertNever = (value: unknown): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
