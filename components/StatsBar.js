import {
  GraduationCap,
  BookOpen,
  Library,
  Award,
} from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      icon: GraduationCap,
      value: "15,000+",
      label: "Students Enrolled",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: BookOpen,
      value: "200+",
      label: "Expert Mentors",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Library,
      value: "500+",
      label: "Courses Available",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl rounded-[30px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    {item.value}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
