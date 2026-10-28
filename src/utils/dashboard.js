// Small helpers shared by the dashboard pages.

// Today as YYYY-MM-DD in the user's own time zone.
export const todayISO = () => new Date().toLocaleDateString("en-CA");

// "10:00:00" -> "10:00 AM"
export const fmtTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${m} ${suffix}`;
};

// "2026-10-26" -> { day: "26", month: "Oct", weekday: "Mon" }
export const dateParts = (iso) => {
  if (!iso) return { day: "–", month: "", weekday: "" };
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
  };
};

// "today" | "upcoming" | "past"
export const dayStatus = (iso) => {
  const today = todayISO();
  if (iso === today) return "today";
  return iso > today ? "upcoming" : "past";
};

export const STATUS_STYLE = {
  today: "bg-primary-color/15 text-dark-primary-color",
  upcoming: "bg-main-color/10 text-main-color",
  past: "bg-gray-200 text-gray-500",
};
export const STATUS_LABEL = { today: "Today", upcoming: "Upcoming", past: "Past" };

// Sort by date, then time.
export const byDateTime = (a, b) =>
  `${a.appointment_date} ${a.appointment_time}`.localeCompare(
    `${b.appointment_date} ${b.appointment_time}`
  );

// Mon..Sun chips (full name is what the API stores).
export const DAYS_SHORT = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((key) => ({ key, label: key.slice(0, 3) }));
