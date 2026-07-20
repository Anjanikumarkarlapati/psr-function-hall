import type { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';

const APP_DIRECTORY = join(process.cwd(), 'app');
const PAGE_FILE_PATTERN = /^page\.(?:js|jsx|ts|tsx)$/;

interface DiscoveredPage {
  path: string;
  lastModified: Date;
}

function discoverStaticPages(
  directory: string,
  routeSegments: string[] = []
): DiscoveredPage[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const pageFile = entries.find(
    (entry) => entry.isFile() && PAGE_FILE_PATTERN.test(entry.name)
  );
  const pages: DiscoveredPage[] = [];

  if (pageFile) {
    const path = routeSegments.length ? `/${routeSegments.join('/')}` : '/';
    pages.push({
      path,
      lastModified: statSync(join(directory, pageFile.name)).mtime,
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const segment = entry.name;
    const isRouteGroup = segment.startsWith('(') && segment.endsWith(')');
    const shouldIgnore =
      segment === 'api' ||
      segment.startsWith('_') ||
      segment.startsWith('.') ||
      segment.startsWith('@') ||
      segment.includes('[');

    if (shouldIgnore) continue;

    pages.push(
      ...discoverStaticPages(
        join(directory, segment),
        isRouteGroup ? routeSegments : [...routeSegments, segment]
      )
    );
  }

  return pages;
}

function routeSettings(path: string): Pick<
  MetadataRoute.Sitemap[number],
  'changeFrequency' | 'priority'
> {
  if (path === '/') return { changeFrequency: 'monthly', priority: 1 };
  if (path === '/book') return { changeFrequency: 'monthly', priority: 0.9 };
  if (path === '/events') return { changeFrequency: 'weekly', priority: 0.9 };
  if (path === '/menu') return { changeFrequency: 'monthly', priority: 0.8 };
  return { changeFrequency: 'monthly', priority: 0.7 };
}

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = discoverStaticPages(APP_DIRECTORY).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    ...routeSettings(page.path),
  }));

  const categoryLastModified = statSync(
    join(process.cwd(), 'lib', 'data.ts')
  ).mtime;
  const eventPages = CATEGORIES.map((category) => ({
    url: absoluteUrl(`/events/${category.id}`),
    lastModified: categoryLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages].sort((a, b) =>
    a.url.localeCompare(b.url)
  );
}
