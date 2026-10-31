import { authClient } from "./auth-client";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const { data } = await authClient.token();
    if (data?.token) headers.Authorization = `Bearer ${data.token}`;
  }
  const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}

export const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Food Drive", "Health Camp", "Education"];
export const todayStr = () => new Date().toISOString().slice(0, 10);
export const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function validateEvent(f) {
  const e = {};
  if (f.title.trim().length < 5) e.title = "Title needs at least 5 characters.";
  if (f.description.trim().length < 20) e.description = "Describe the event in at least 20 characters.";
  if (!EVENT_TYPES.includes(f.type)) e.type = "Choose an event type.";
  try { new URL(f.thumbnail); } catch { e.thumbnail = "Enter a valid image URL (https://...)."; }
  if (!f.location.trim()) e.location = "Add the event location.";
  if (!f.date) e.date = "Pick an event date.";
  else if (f.date <= todayStr()) e.date = "The event date must be in the future.";
  return e;
}

export function validatePassword(p) {
  if (p.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(p)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(p)) return "Password must include a lowercase letter.";
  return null;
}
