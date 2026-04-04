import type { GetServerSidePropsContext } from "next";

export function parseCookies(cookieHeader?: string) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...value] = cookie.split("=");
    if (!name) {
      return;
    }
    cookies[name.trim()] = decodeURIComponent(value.join("=").trim());
  });

  return cookies;
}

export function isAdminAuthenticated(req: GetServerSidePropsContext["req"]) {
  if (req.cookies && req.cookies.admin_auth !== undefined) {
    return req.cookies.admin_auth === "true";
  }

  const cookies = parseCookies(req.headers.cookie);
  return cookies.admin_auth === "true";
}

export function requireAdminAuth(ctx: GetServerSidePropsContext) {
  if (!isAdminAuthenticated(ctx.req)) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return null;
}
