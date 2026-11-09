import { NextResponse } from "next/server";

export function successResponse<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function errorResponse(error = "Something went wrong", status = 500) {
  return NextResponse.json({ success: false, error }, { status });
}