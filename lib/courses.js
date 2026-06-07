import courses from "@/data/bengalicourse.json";


function normalizeInrPrice(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return `₹${value}`;
  }

  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const numeric = Number(trimmed.replace(/[^0-9.]/g, ""));
  if (Number.isFinite(numeric) && numeric > 0 && String(numeric) === trimmed) {
    return `₹${numeric}`;
  }

  return trimmed;
}

function resolveCoursePrice(course) {
  const fromEnv = normalizeInrPrice(process.env.NEXT_PUBLIC_COURSE_PRICE || process.env.COURSE_PRICE);
  if (fromEnv) return fromEnv;

  return normalizeInrPrice(course.price);
}

function normalizeCourseResources(resources) {
  if (!resources || typeof resources !== "object") {
    return {
      meetLink: null,
      videos: [],
      pdfs: [],
    };
  }

  const meetLink =
    typeof resources.meetLink === "string" && resources.meetLink.trim()
      ? resources.meetLink.trim()
      : null;

  const videos = Array.isArray(resources.videos)
    ? resources.videos.filter(
      (video) =>
        video &&
        typeof video === "object" &&
        typeof video.title === "string" &&
        video.title.trim() &&
        typeof video.url === "string" &&
        video.url.trim(),
    )
    : [];

  const pdfs = Array.isArray(resources.pdfs)
    ? resources.pdfs.filter(
      (pdf) =>
        pdf &&
        typeof pdf === "object" &&
        typeof pdf.title === "string" &&
        pdf.title.trim() &&
        typeof pdf.url === "string" &&
        pdf.url.trim(),
    )
    : [];

  const liveClasses = Array.isArray(resources.liveClasses)
    ? resources.liveClasses
    : [];

  return { meetLink, videos, pdfs, liveClasses };
}

export function getCourses() {
  return courses.map((course) => ({
    ...course,
    price: resolveCoursePrice(course),
    resources: normalizeCourseResources(course.resources),
  }));
}

export function getCourseById(id) {
  return getCourses().find((course) => course.id === id) ?? null;
}
