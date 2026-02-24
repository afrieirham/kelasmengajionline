import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin/layout.tsx", [
    index("routes/admin/_index.tsx"),
    route("profiles", "routes/admin/profiles.tsx"),
    route("profiles/:id", "routes/admin/profiles.$id.tsx"),
    route("users", "routes/admin/users.tsx"),
    route("tags", "routes/admin/tags.tsx"),
    route("claims", "routes/admin/claims.tsx"),
    route("boosting", "routes/admin/boosting.tsx"),
  ]),
  route("api/auth/*", "routes/better-auth.ts"),
] satisfies RouteConfig;
