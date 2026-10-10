export function isWolPreviewUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "wol.jw.org" &&
      !url.username && !url.password && !url.port;
  } catch {
    return false;
  }
}
