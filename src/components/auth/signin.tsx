
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  Check,
  Sparkles,
} from "lucide-react";

type LoginMode = "email" | "phone";

export default function SignIn() {
  const router = useRouter();

  const [mode, setMode] = useState<LoginMode>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    router.push("/admin/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#91c8f5] px-4 py-10 font-sans">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#91d3f5] via-[#91b5fa] to-[#d8c8fa]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[430px] w-[430px] rounded-full bg-[#6675ff]/80 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-[-100px] h-[420px] w-[420px] rounded-full bg-[#b8e6ff]/80 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-170px] right-[15%] h-[380px] w-[380px] rounded-full bg-[#d9b7ff]/65 blur-[110px]" />

      <div className="relative z-10 flex w-full max-w-[320px] flex-col items-center">
        {/* Brand */}
        <div className="mb-5 flex items-center gap-2 text-white">
          <div className="flex h-5 w-5 items-center justify-center">
            <Sparkles size={17} strokeWidth={2.4} />
          </div>
          <span className="text-[11px] font-bold tracking-[0.08em]">
            LUCKY
          </span>
        </div>

        {/* Login card */}
        <section className="w-full rounded-[19px] border border-white/70 bg-white px-7 pb-7 pt-7 shadow-[0_15px_50px_rgba(55,77,150,0.12)] sm:px-9">
          <div className="mb-6 text-center">
            <h1 className="text-[17px] font-semibold tracking-[-0.035em] text-[#222631]">
              Welcome Back!
            </h1>
            <p className="mt-1.5 text-[10px] leading-4 text-[#9ca0aa]">
              We missed you! Please enter your details.
            </p>
          </div>

          {/* Email / Phone selector */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <button
              type="button"
              title="Email login"
              aria-label="Sign in with email"
              aria-pressed={mode === "email"}
              onClick={() => setMode("email")}
              className={`flex h-8 w-9 items-center justify-center rounded-md border transition ${
                mode === "email"
                  ? "border-[#6675f5] bg-[#eef0ff] text-[#5969ed]"
                  : "border-[#edf0f4] bg-white text-[#a0a5b0] hover:bg-gray-50"
              }`}
            >
              <Mail size={15} strokeWidth={1.9} />
            </button>

            <button
              type="button"
              title="Phone login"
              aria-label="Sign in with phone"
              aria-pressed={mode === "phone"}
              onClick={() => setMode("phone")}
              className={`flex h-8 w-9 items-center justify-center rounded-md border transition ${
                mode === "phone"
                  ? "border-[#6675f5] bg-[#eef0ff] text-[#5969ed]"
                  : "border-[#edf0f4] bg-white text-[#a0a5b0] hover:bg-gray-50"
              }`}
            >
              <Phone size={15} strokeWidth={1.9} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-[15px]">
            {mode === "email" ? (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-medium text-[#424652]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-[39px] w-full rounded-[8px] border border-[#e7e9ef] bg-white px-3 text-[11px] text-[#252936] outline-none transition placeholder:text-[#c2c5cd] focus:border-[#7480f8] focus:ring-2 focus:ring-[#7480f8]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[11px] font-medium text-[#424652]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-[39px] w-full rounded-[8px] border border-[#e7e9ef] bg-white px-3 pr-10 text-[11px] text-[#252936] outline-none transition placeholder:text-[#c2c5cd] focus:border-[#7480f8] focus:ring-2 focus:ring-[#7480f8]/10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a6b1] hover:text-[#5865d9]"
                    >
                      {showPassword ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-[11px] font-medium text-[#424652]"
                >
                  Phone number
                </label>
                <div className="flex h-[39px] overflow-hidden rounded-[8px] border border-[#e7e9ef] focus-within:border-[#7480f8] focus-within:ring-2 focus-within:ring-[#7480f8]/10">
                  <span className="flex items-center border-r border-[#e7e9ef] bg-[#fafbfc] px-3 text-[11px] text-[#747987]">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                    className="min-w-0 flex-1 px-3 text-[11px] outline-none placeholder:text-[#c2c5cd]"
                  />
                </div>
                <p className="mt-2 text-[10px] text-[#9ca0aa]">
                  OTP verification will be added later.
                </p>
              </div>
            )}

            {/* Remember / Forgot */}
            {mode === "email" && (
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setRemember((v) => !v)}
                  className="flex items-center gap-1.5 text-[10px] text-[#7f8490]"
                  aria-pressed={remember}
                >
                  <span
                    className={`flex h-[12px] w-[12px] items-center justify-center rounded-[3px] border ${
                      remember
                        ? "border-[#6675f5] bg-[#6675f5] text-white"
                        : "border-[#cfd2da] bg-white"
                    }`}
                  >
                    {remember && <Check size={9} strokeWidth={3} />}
                  </span>
                  Remember me
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.alert("Password recovery will be added later.")
                  }
                  className="text-[10px] font-medium text-[#5969ed] hover:text-[#4051d5]"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-[40px] w-full items-center justify-center rounded-[7px] bg-[#6374f5] text-[11px] font-medium text-white shadow-[0_3px_7px_rgba(99,116,245,0.18)] transition hover:bg-[#5264e9] focus:outline-none focus:ring-4 focus:ring-[#6374f5]/20 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Visual separator */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#eff0f4]" />
            <span className="text-[9px] text-[#b0b3bc]">OR</span>
            <div className="h-px flex-1 bg-[#eff0f4]" />
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert("Google sign-in will be connected later.")
            }
            className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[7px] border border-[#e9ebf0] bg-white text-[10px] font-medium text-[#454955] transition hover:bg-[#f9faff]"
          >
            <span className="bg-gradient-to-br from-blue-500 via-green-500 to-red-500 bg-clip-text text-[15px] font-bold text-transparent">
              G
            </span>
            Sign in with Google
          </button>

          <p className="mt-5 text-center text-[10px] text-[#a0a4ae]">
            Personal workspace · Authorized access only
          </p>
        </section>
      </div>
    </main>
  );
}
