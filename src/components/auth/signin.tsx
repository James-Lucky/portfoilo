
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Infinity,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

type AuthStep = "phone" | "otp";

export default function Signin() {
  const router = useRouter();

  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // OTP countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Continue to OTP screen
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) return;

    setStep("otp");
    setTimer(30);
    setOtp("");
  };

  // Verify OTP (Demo Only)
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(otp)) return;

    setIsVerifying(true);

    // Demo authentication
    localStorage.setItem("admin_auth", "true");

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 300);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timer > 0) return;

    setOtp("");
    setTimer(30);
  };

  // Back navigation
  const handleBack = () => {
    if (step === "otp") {
      setStep("phone");
      setOtp("");
      setTimer(0);
    } else {
      router.back();
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f4] p-2 sm:p-3">
      <section className="relative flex min-h-[calc(100svh-16px)] sm:min-h-[calc(100svh-24px)] items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-[#1d1b1e] px-5 py-20 text-white">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_10%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(ellipse_at_0%_100%,rgba(255,255,255,0.10),transparent_30%)]" />

        {/* Back button */}
        <button
          onClick={handleBack}
          type="button"
          className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Authentication */}
        <div className="relative z-10 w-full max-w-[440px]">

          {/* Logo */}
          <div className="mb-7 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.07] shadow-lg">
              <Infinity
                size={30}
                strokeWidth={1.7}
                className="text-white"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-[24px] font-medium tracking-tight sm:text-[27px]">
              {step === "phone"
                ? "welcome back Lucky"
                : "Check your phone!"}
            </h1>

            {step === "otp" && (
              <p className="mt-2 text-[13px] text-white/45">
                Enter the verification code sent to{" "}
                <span className="text-white/80">
                  +91 {phone}
                </span>
              </p>
            )}
          </div>

          {/* Phone form */}
          {step === "phone" ? (
            <form
              onSubmit={handleSendOtp}
              className="space-y-3"
            >
              <div className="flex h-12 items-center overflow-hidden rounded-xl border border-white/[0.07] bg-black/10 transition focus-within:border-white/30">
                <span className="border-r border-white/[0.08] px-4 text-sm text-white/55">
                  +91
                </span>

                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  className="h-full w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={phone.length !== 10}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight size={16} />
              </button>

              <p className="pt-1 text-center text-xs text-white/40">
                We will send you a one-time password to verify your number.
              </p>
            </form>
          ) : (

            /* OTP form */
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-3"
            >
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={4}
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                className="h-12 w-full rounded-xl border border-white/[0.07] bg-black/10 px-4 text-center text-lg tracking-[0.7em] text-white outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-white/30 focus:border-white/30"
                required
              />

              <button
                type="submit"
                disabled={otp.length !== 4 || isVerifying}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  "Verify & Enter Dashboard"
                )}
              </button>

              <div className="flex items-center justify-between px-1 pt-2 text-xs">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                  className="text-white/70 transition hover:text-white disabled:text-white/30"
                >
                  {timer > 0
                    ? `Resend OTP in ${timer}s`
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.07]" />

            <span className="text-[11px] text-white/30">
              or
            </span>

            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Security info */}
          <div className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.015] text-xs text-white/65">
            <ShieldCheck size={15} className="text-white/50" />
            Secure OTP authentication
          </div>

        </div>
      </section>
    </main>
  );
}
