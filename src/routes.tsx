import { RouteObject } from "react-router";
import { lazy } from 'react';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import ProductsPage from './pages/products';
import FarmerPartnershipPage from './pages/farmer-partnership';
import ExportMarketsPage from './pages/export-markets';
import ContactPage from './pages/contact';
import LeadershipPage from './pages/leadership';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';
const NotFoundPage = ProdNotFoundPage;
export const routes: RouteObject[] = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/products',
  element: <ProductsPage />
}, {
  path: '/farmer-partnership',
  element: <FarmerPartnershipPage />
}, {
  path: '/export-markets',
  element: <ExportMarketsPage />
}, {
  path: '/contact',
  element: <ContactPage />
}, {
  path: '/leadership',
  element: <LeadershipPage />
}, {
  path: '*',
  element: <NotFoundPage />
}];
export type Path = '/' | '/about' | '/products' | '/farmer-partnership' | '/export-markets' | '/contact' | '/leadership';
export type Params = Record<string, string | undefined>;
