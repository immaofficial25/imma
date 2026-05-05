import courses from "@/data/courses.json";

function envKeyForCoursePrice(courseId) {
  const normalized = String(courseId)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `COURSE_PRICE_${normalized}`;
}

function normalizeInrPrice(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return `INR ${value}`;
  }

  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const numeric = Number(trimmed.replace(/[^0-9.]/g, ""));
  if (Number.isFinite(numeric) && numeric > 0 && String(numeric) === trimmed) {
    return `INR ${numeric}`;
  }

  return trimmed;
}

function resolveCoursePrice(course) {
  const key = envKeyForCoursePrice(course.id);
  const fromEnv = normalizeInrPrice(process.env[key]);
  if (fromEnv) return fromEnv;

  return normalizeInrPrice(course.price);
}

export function getCourses() {
  return courses.map((course) => ({
    ...course,
    price: resolveCoursePrice(course),
  }));
}

export function getCourseById(id) {
  return getCourses().find((course) => course.id === id) ?? null;
}

