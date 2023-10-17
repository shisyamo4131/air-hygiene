/**
 * authenticated.js
 *
 * Copyright 2022 Daizo Maruyama. All Rights reserved.
 *
 * Defines redirect handling that applies to all pages.
 * Specify this plugin as middlware in the route property
 * of 'nuxt.config.js' to apply it to all pages.
 *
 * In addition, redirect processing for each page is
 * realized by passing Permission setting to Router's meta.
 *
 * e.g.)
 * router: {
 *   middleware: ['authenticated'],
 *   extendRoutes(routes) {
 *     routes.forEach((route) => {
 *       const meta = pagePermissions[route.name] || []
 *       route.meta = {
 *         requiredPermissions: meta,
 *       }
 *     })
 *   },
 * },
 *
 * Reference: https://www.metrocode.co/blog/post/firebase-authentication-nuxt-vuejs
 */

export default ({ app, store, route, redirect, error }) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const publicPages = ['login', 'register']

  if (!isAuthenticated) {
    if (!publicPages.includes(route.name)) redirect('/login')
  } else if (route.name === 'login' || route.name === 'register') {
    redirect('/')
  }

  const permissions = route.meta[0]?.requiredPermissions || [
    'admin',
    'developer',
  ]
  if (permissions.length) {
    const userRoles = store.getters['auth/roles']
    const isApproved =
      [...permissions, ...userRoles].filter(
        (item) => permissions.includes(item) && userRoles.includes(item)
      ).length > 0 || permissions.length === 0
    if (!isApproved) {
      redirect('/')
    }
  }
}
