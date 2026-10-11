export function ok(data: object = {}) {
  return { ok: true as const, data };
}

export function err(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return { ok: false as const, error: message };
}
