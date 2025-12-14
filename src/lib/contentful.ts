// src/lib/contentful.ts
import { createClient, Entry } from 'contentful';

const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;
const ENVIRONMENT = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error('Missing Contentful environment variables');
}

export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
});

export type PageFields = {
  title: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  body?: any;
};

export type StoryFields = {
  title: string;
  slug: string;
  excerpt: string;
  heroImage?: any;
  body: any;
  location?: string;
};

export async function getHomePage() {
  const res = await contentfulClient.getEntries<PageFields>({
    content_type: 'page',
    'fields.slug': 'home',
    limit: 1,
  });

  return res.items[0];
}

export async function getStories() {
  const res = await contentfulClient.getEntries<StoryFields>({
    content_type: 'story',
    order: '-sys.createdAt',
  });

  return res.items;
}

export async function getStoryBySlug(slug: string) {
  const res = await contentfulClient.getEntries<StoryFields>({
    content_type: 'story',
    'fields.slug': slug,
    limit: 1,
  });

  return res.items[0];
}

