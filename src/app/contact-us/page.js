"use client";

import { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // 'success', 'error', 'submitting'
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setResponseMessage(
          "Thank you! Your message has been sent successfully."
        );
        // Clear form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMessage(
          data.error || "An error occurred. Please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setResponseMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <main className="bg-white min-h-[70vh] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you. Fill out the form below and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Let us know how we can help..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>

        {responseMessage && (
          <div
            className={`mt-6 p-4 rounded-lg text-center ${status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {responseMessage}
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Other Ways to Reach Us
          </h3>
          <p>
            Email:{" "}
            <a
              href="mailto:queries@holidaykosh.com"
              className="text-blue-600 hover:underline"
            >
              queries@holidaykosh.com
            </a>{" "}
          </p>
          <p>Phone: +975 17 123 456</p>
        </div>
      </div>
    </main>
  );
}
