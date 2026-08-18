export const ADMIN_EMAILS = ["estarlin.elv@gmail.com"];

export function isAdminEmail(email?: string | null): boolean {
  const normalizedEmail = email?.trim().toLowerCase();

  return Boolean(normalizedEmail && ADMIN_EMAILS.includes(normalizedEmail));
}
