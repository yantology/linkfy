/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRegisterImport } from './routes/_auth/register'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as AuthForgotPasswordImport } from './routes/_auth/forgot-password'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/forgot-password' | '/login' | '/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/forgot-password' | '/login' | '/register'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_auth/forgot-password'
    | '/_auth/login'
    | '/_auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
