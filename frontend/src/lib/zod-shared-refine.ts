function dateNoOlderThan1790(date: string | null | undefined): boolean {
  if (date) {
    return new Date(date).getFullYear() > 1970;
  }
  return true;
}

export const zodSharedRefine = { dateNoOlderThan1790 };
