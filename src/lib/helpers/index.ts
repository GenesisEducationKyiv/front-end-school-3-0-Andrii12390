export function updateUrlParams(
  current: URLSearchParams,
  updates: Record<string, string | number | null>
) {
  const newParams = new URLSearchParams(current);
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      newParams.set(key, String(value));
    } else {
      newParams.delete(key);
    }
  });
  return newParams;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
