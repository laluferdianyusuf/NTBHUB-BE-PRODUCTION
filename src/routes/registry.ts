import { Router } from "express";

export type RouteMount = {
  path: string;
  router: Router;
  group?: string;
};

export const mountRoutes = (parent: Router, mounts: RouteMount[]) => {
  for (const { path, router } of mounts) {
    parent.use(path, router);
  }
};

/**
 * Declarative v1 route registry — grouped by domain for navigation.
 * New modules should register here after adding under `src/modules/`.
 */
export const createV1RouteRegistry = (routes: {
  auth: Router;
  booking: Router;
  device: Router;
  event: Router;
  floor: Router;
  invitation: Router;
  invoice: Router;
  location: Router;
  logs: Router;
  menu: Router;
  news: Router;
  notification: Router;
  operational: Router;
  order: Router;
  points: Router;
  eventTicketType: Router;
  publicPlace: Router;
  payment: Router;
  review: Router;
  reviewPlace: Router;
  users: Router;
  userBalance: Router;
  venue: Router;
  venueBalance: Router;
  venueCategory: Router;
  venueService: Router;
  venueSubCategory: Router;
  venueUnit: Router;
  venueStaff: Router;
  withdraw: Router;
  maps: Router;
  presence: Router;
  communities: Router;
  communityMembers: Router;
  communityPosts: Router;
  communityReactions: Router;
  communityEvents: Router;
  communityTwibbons: Router;
  comments: Router;
  urlPreview: Router;
  ledger: Router;
  communityAttendances: Router;
  attendances: Router;
  tasks: Router;
  profiles: Router;
  search: Router;
  promotion: Router;
  courier: Router;
  account: Router;
  finance: Router;
  deepLink: Router;
  wellKnown: Router;
  banners: Router;
  interests: Router;
  communityEventOrders: Router;
}): RouteMount[] => [
  { group: "core", path: "/auth", router: routes.auth },
  { group: "core", path: "/users", router: routes.users },
  { group: "core", path: "/profiles", router: routes.profiles },
  { group: "core", path: "/search", router: routes.search },
  { group: "core", path: "/logs", router: routes.logs },
  { group: "core", path: "/presence", router: routes.presence },
  { group: "core", path: "/maps", router: routes.maps },
  { group: "core", path: "/well-known", router: routes.wellKnown },
  { group: "core", path: "/deep-link", router: routes.deepLink },
  { group: "core", path: "/urls", router: routes.urlPreview },
  { group: "core", path: "/interests", router: routes.interests },

  { group: "booking", path: "/bookings", router: routes.booking },
  { group: "booking", path: "/orders", router: routes.order },
  { group: "booking", path: "/invoice", router: routes.invoice },
  { group: "booking", path: "/payment", router: routes.payment },

  { group: "venue", path: "/venues", router: routes.venue },
  { group: "venue", path: "/venue-balance", router: routes.venueBalance },
  { group: "venue", path: "/venue-category", router: routes.venueCategory },
  { group: "venue", path: "/venue-service", router: routes.venueService },
  { group: "venue", path: "/venue-sub-category", router: routes.venueSubCategory },
  { group: "venue", path: "/venue-unit", router: routes.venueUnit },
  { group: "venue", path: "/venue-staff", router: routes.venueStaff },
  { group: "venue", path: "/menus", router: routes.menu },
  { group: "venue", path: "/operational", router: routes.operational },
  { group: "venue", path: "/floors", router: routes.floor },
  { group: "venue", path: "/reviews", router: routes.review },
  { group: "venue", path: "/reviews-place", router: routes.reviewPlace },
  { group: "venue", path: "/public-places", router: routes.publicPlace },
  { group: "venue", path: "/promotion", router: routes.promotion },
  { group: "venue", path: "/banners", router: routes.banners },

  { group: "event", path: "/events", router: routes.event },
  { group: "event", path: "/ticket-type", router: routes.eventTicketType },
  { group: "event", path: "/attendances", router: routes.attendances },

  { group: "community", path: "/communities", router: routes.communities },
  { group: "community", path: "/community-members", router: routes.communityMembers },
  { group: "community", path: "/community-posts", router: routes.communityPosts },
  { group: "community", path: "/community-reactions", router: routes.communityReactions },
  { group: "community", path: "/community-events", router: routes.communityEvents },
  { group: "community", path: "/community-event-orders", router: routes.communityEventOrders },
  { group: "community", path: "/community-twibbons", router: routes.communityTwibbons },
  { group: "community", path: "/community-attendances", router: routes.communityAttendances },
  { group: "community", path: "/comments", router: routes.comments },

  { group: "finance", path: "/finance", router: routes.finance },
  { group: "finance", path: "/account", router: routes.account },
  { group: "finance", path: "/ledger", router: routes.ledger },
  { group: "finance", path: "/user-balance", router: routes.userBalance },
  { group: "finance", path: "/withdraw", router: routes.withdraw },
  { group: "finance", path: "/points", router: routes.points },

  { group: "platform", path: "/devices", router: routes.device },
  { group: "platform", path: "/locations", router: routes.location },
  { group: "platform", path: "/notifications", router: routes.notification },
  { group: "platform", path: "/news", router: routes.news },
  { group: "platform", path: "/invitations", router: routes.invitation },
  { group: "platform", path: "/tasks", router: routes.tasks },
  { group: "platform", path: "/courier", router: routes.courier },
];
