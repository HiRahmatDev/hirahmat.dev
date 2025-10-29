import "server-only";

import {
  BlockObjectResponse,
  Client,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";
import { cache } from "react";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

type CommonArticle = {
  slug: string;
  title?: string;
  desc?: string;
  cover?: string;
};

export type SelectedProject = CommonArticle;

const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

export const fetchSelectedProjects: () => Promise<SelectedProject[] | null> =
  cache(async () => {
    try {
      const response = await notion.dataSources.query({
        data_source_id: process.env.DS_ARTICLE!,
        filter: {
          and: [
            {
              property: "category",
              select: {
                equals: "Jurnal Proyek",
              },
            },
            {
              property: "status",
              select: {
                equals: "Published",
              },
            },
          ],
        },
        sorts: [{ property: "created_on", direction: "descending" }],
      });

      return (response.results as PageObjectResponse[]).map((result) => ({
        slug:
          result.properties.slug?.type === "title"
            ? result.properties.slug.title[0]?.plain_text
            : "",
        title:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text[0]?.plain_text
            : "",
        desc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text[0]?.plain_text
            : "",
        cover:
          result.properties.cover?.type === "rich_text"
            ? result.properties.cover.rich_text[0]?.plain_text
            : "",
      }));
    } catch (error) {
      console.error(error);
      return null;
    }
  });

export type SelectedBlog = CommonArticle & {
  rawTitle?: RichTextItemResponse[] | null;
  rawDesc?: RichTextItemResponse[] | null;
};

export const fetchSelectedBlogs: () => Promise<SelectedBlog[] | null> = cache(
  async () => {
    try {
      const response = await notion.dataSources.query({
        data_source_id: process.env.DS_ARTICLE!,
        filter: {
          and: [
            {
              property: "category",
              select: {
                equals: "Blog",
              },
            },
            isProd
              ? {
                  property: "status",
                  select: {
                    equals: "Published",
                  },
                }
              : {
                  or: [
                    {
                      property: "status",
                      select: {
                        equals: "Published",
                      },
                    },
                    {
                      property: "status",
                      select: {
                        equals: "Draft",
                      },
                    },
                  ],
                },
          ],
        },
        sorts: [{ property: "created_on", direction: "descending" }],
      });

      return (response.results as PageObjectResponse[]).map((result) => ({
        slug:
          result.properties.slug?.type === "title"
            ? result.properties.slug.title[0]?.plain_text
            : "",
        title:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text.map((p) => p.plain_text).join("")
            : "",
        rawTitle:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text
            : null,
        desc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text
                .map((p) => p.plain_text)
                .join("")
            : "",
        rawDesc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text
            : null,
        cover:
          result.properties.cover?.type === "rich_text"
            ? result.properties.cover.rich_text[0]?.plain_text
            : "",
      }));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const fetchAllArticles: () => Promise<CommonArticle[] | null> = cache(
  async () => {
    try {
      const response = await notion.dataSources.query({
        data_source_id: process.env.DS_ARTICLE!,
        filter: {
          and: [
            isProd
              ? {
                  property: "status",
                  select: {
                    equals: "Published",
                  },
                }
              : {
                  or: [
                    {
                      property: "status",
                      select: {
                        equals: "Published",
                      },
                    },
                    {
                      property: "status",
                      select: {
                        equals: "Draft",
                      },
                    },
                  ],
                },
            {
              or: [
                {
                  property: "category",
                  select: {
                    equals: "Jurnal Proyek",
                  },
                },
                {
                  property: "category",
                  select: {
                    equals: "Blog",
                  },
                },
              ],
            },
          ],
        },
        sorts: [{ property: "created_on", direction: "descending" }],
      });

      return (response.results as PageObjectResponse[]).map((result) => ({
        slug:
          result.properties.slug?.type === "title"
            ? result.properties.slug.title[0]?.plain_text
            : "",
        title:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text.map((p) => p.plain_text).join("")
            : "",
        desc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text
                .map((p) => p.plain_text)
                .join("")
            : "",
        cover:
          result.properties.cover?.type === "rich_text"
            ? result.properties.cover.rich_text[0]?.plain_text
            : "",
      }));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

type MetadataArticle = {
  blockId: string;
  slug: string;
  title: string;
  rawTitle: RichTextItemResponse[] | null;
  desc: string;
  rawDesc: RichTextItemResponse[] | null;
  cover: string;
  cover_alt: string;
  category?: string;
  publishedOn?: string;
  updatedOn?: string;
};

export const fetchArticleMetadataBySlug = cache(
  async (slug: string): Promise<MetadataArticle | null> => {
    try {
      const response = await notion.dataSources.query({
        data_source_id: process.env.DS_ARTICLE!,
        filter: {
          and: [
            isProd
              ? {
                  property: "status",
                  select: {
                    equals: "Published",
                  },
                }
              : {
                  or: [
                    {
                      property: "status",
                      select: {
                        equals: "Published",
                      },
                    },
                    {
                      property: "status",
                      select: {
                        equals: "Draft",
                      },
                    },
                  ],
                },
            {
              property: "slug",
              title: {
                equals: slug,
              },
            },
          ],
        },
      });

      return (response.results as PageObjectResponse[]).map((result) => ({
        blockId: result.id,
        slug:
          result.properties.slug?.type === "title"
            ? result.properties.slug.title[0]?.plain_text
            : "",
        title:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text.map((p) => p.plain_text).join("")
            : "",
        rawTitle:
          result.properties.name?.type === "rich_text"
            ? result.properties.name.rich_text
            : null,
        desc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text
                .map((p) => p.plain_text)
                .join("")
            : "",
        rawDesc:
          result.properties.description?.type === "rich_text"
            ? result.properties.description.rich_text
            : null,
        cover:
          result.properties.cover?.type === "rich_text"
            ? result.properties.cover.rich_text[0]?.plain_text
            : "",
        cover_alt:
          result.properties.cover_alt?.type === "rich_text"
            ? result.properties.cover_alt.rich_text[0]?.plain_text
            : "",
        category:
          result.properties.category?.type === "select"
            ? result.properties.category.select?.name
            : "",
        publishedOn:
          result.properties.published_on?.type === "date"
            ? result.properties.published_on.date?.start
            : "",
        updatedOn:
          result.properties.updated_on?.type === "last_edited_time"
            ? result.properties.updated_on.last_edited_time
            : "",
      }))[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const fetchArticleByBlockId = cache(async (blockId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
});

type TOC = {
  title: string;
  children: TOC[];
};

export const fetchArticleTOCByBlockId = cache(
  async (blockId: string): Promise<TOC[] | null> => {
    try {
      const response = await notion.blocks.children.list({
        block_id: blockId,
      });

      const toc: TOC[] = [];
      let currentH1: TOC | null = null;
      let currentH2: TOC | null = null;

      const results = (
        (response.results as BlockObjectResponse[] | null) || []
      ).filter((result) => result?.type.startsWith("heading_"));

      results.forEach((result) => {
        if (result?.type === "heading_1") {
          const level1: TOC = {
            title:
              result.heading_1?.rich_text?.map((p) => p.plain_text).join("") ||
              "",
            children: [],
          };

          currentH1 = level1;
          toc.push(level1);
        } else if (result?.type === "heading_2") {
          const level2: TOC = {
            title:
              result.heading_2?.rich_text?.map((p) => p.plain_text).join("") ||
              "",
            children: [],
          };

          currentH2 = level2;
          if (currentH1) {
            currentH1.children = currentH1.children || [];
            currentH1.children.push(level2);
          } else {
            toc.push(level2);
          }
        } else if (result?.type === "heading_3") {
          const level3: TOC = {
            title:
              result.heading_3?.rich_text?.map((p) => p.plain_text).join("") ||
              "",
            children: [],
          };

          if (currentH2) {
            currentH2.children = currentH2.children || [];
            currentH2.children.push(level3);
          } else {
            toc.push(level3);
          }
        }
      });

      return toc;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
