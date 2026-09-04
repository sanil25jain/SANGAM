export type UserType =
  | "solo_entrepreneur"
  | "industrial_unit";

export interface SangamUser {
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

const AUTH_KEY = "sangam_user";
const REGISTERED_USERS_KEY = "sangam_registered_users";

export function getCurrentUser(): SangamUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem(AUTH_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as SangamUser;
  } catch {
    return null;
  }
}

export function registerUser(
  user: SangamUser
): {
  success: boolean;
  message: string;
} {
  if (typeof window === "undefined") {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const existingUsers = getRegisteredUsers();

  const alreadyExists = existingUsers.some(
    (existingUser) =>
      existingUser.email.toLowerCase() === user.email.toLowerCase()
  );

  if (alreadyExists) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const updatedUsers = [...existingUsers, user];

  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify(updatedUsers)
  );

  // Automatically log the user in after registration.
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  return {
    success: true,
    message: "Account created successfully.",
  };
}

export function loginUser(
  email: string,
  password: string
): {
  success: boolean;
  message: string;
} {
  if (typeof window === "undefined") {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const users = getRegisteredUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  return {
    success: true,
    message: "Login successful.",
  };
}

export function logoutUser(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_KEY);
}

function getRegisteredUsers(): SangamUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const users = localStorage.getItem(REGISTERED_USERS_KEY);

  if (!users) {
    return [];
  }

  try {
    const parsed = JSON.parse(users);

    return Array.isArray(parsed)
      ? (parsed as SangamUser[])
      : [];
  } catch {
    return [];
  }
}