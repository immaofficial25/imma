"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GrantAccessForm() {
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("/api/admin/grants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, courseId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Access granted successfully." });
        // Refresh the page to reflect any UI updates
        router.refresh();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to grant access." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="email"
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        required
        className="input"
      />
      <button type="submit" className="btn-primary">Grant Access</button>
      {message && (
        <p className={message.type === "error" ? "text-rose-600" : "text-emerald-600"}>
          {message.text}
        </p>
      )}
    </form>
  );
}
