"use client";

import React from 'react';
import Image from 'next/image';

const SignIn = () => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-white font-sans text-black">
        
        {/* Left Column: Form */}
        <div className="flex w-full flex-col justify-center px-8 sm:px-12 md:w-1/2 lg:w-[45%] lg:px-24">
          <div className="mx-auto w-full max-w-md">
            {/* Logo Placeholder */}
            <div className="mb-6 h-6 w-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                <path d="M4 12l4-4v8zM16 12l4-4v8zM10 6l4-4v8z" />
              </svg>
            </div>

            <h1 className="mb-1 text-3xl font-bold tracking-tight">Sign In</h1>
            <p className="mb-8 text-xs text-gray-400">Continue to access your dashboard</p>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4" />
                Sign in with Google
              </button>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.8 3.58-.75 1.58.07 2.76.71 3.53 1.83-3.1 1.86-2.6 5.92.51 7.15-.69 1.63-1.63 3.01-2.7 3.94zm-3.32-14.2c.59-1.85-.75-3.64-2.56-3.86-.71 2.05.92 3.82 2.56 3.86z"/>
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="mx-4 text-[10px] font-semibold uppercase tracking-wider text-gray-300">Or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-gray-900">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-black underline hover:text-gray-600">
                    Forget Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <a href="#" className="font-semibold text-black underline hover:text-gray-700">
                Create an Account
              </a>
            </p>
          </div>
        </div>

        {/* Right Column: Background Image */}
        <div className="relative hidden w-full bg-gray-50 md:block md:w-1/2 lg:w-[55%]">
          <Image 
            src="/image_c96e75.jpg" 
            alt="Abstract Halftone Pattern" 
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        
      </div>
    </>
  );
};

export default SignIn;