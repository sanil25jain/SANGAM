"use client";

import { getCurrentUser } from "./auth-utils";

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}