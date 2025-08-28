export type User = { name: string; email: string };

const KEY = "bt_user";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(u: User) {
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function clearUser() {
  localStorage.removeItem(KEY);
}
