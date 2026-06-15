export const ADMIN_SESSION_COOKIE = "devcraft_admin_session";

function getRequiredEmail() {
  const email = process.env.ADMIN_EMAIL;
  if (!email) throw new Error("ADMIN_EMAIL non configuré");
  return email;
}

function getRequiredPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD non configuré");
  return password;
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function createSessionToken() {
  return "authenticated";
}

export function verifyPassword(password: string) {
  const expected = getRequiredPassword();
  return expected.length > 0 && password.trim() === expected.trim();
}

export function verifyEmail(email: string) {
  const expected = getRequiredEmail();
  return expected.length > 0 && email.trim().toLowerCase() === expected.trim().toLowerCase();
}

