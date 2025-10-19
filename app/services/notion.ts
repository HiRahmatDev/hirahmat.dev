import "server-only";

import { Client, PageObjectResponse } from "@notionhq/client";
import { cache } from "react";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

export type SelectedProject = {
  slug: string;
  title?: string;
  desc?: string;
  cover?: string;
};

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
          result.properties.slug.type === "title"
            ? result.properties.slug.title[0]?.plain_text
            : "",
        title:
          result.properties.name.type === "rich_text"
            ? result.properties.name.rich_text[0]?.plain_text
            : "",
        desc:
          result.properties.description.type === "rich_text"
            ? result.properties.description.rich_text[0]?.plain_text
            : "",
        cover:
          result.properties.cover.type === "rich_text"
            ? result.properties.cover.rich_text[0]?.plain_text
            : "",
      }));
    } catch (error) {
      console.error(error);
      return null;
    }
  });

export const fetchArticleMetadataBySlug = cache(async (slug: string) => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.DS_ARTICLE!,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
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
        result.properties.slug.type === "title"
          ? result.properties.slug.title[0]?.plain_text
          : "",
      title:
        result.properties.name.type === "rich_text"
          ? result.properties.name.rich_text[0]?.plain_text
          : "",
      desc:
        result.properties.description.type === "rich_text"
          ? result.properties.description.rich_text[0]?.plain_text
          : "",
      cover:
        result.properties.cover.type === "rich_text"
          ? result.properties.cover.rich_text[0]?.plain_text
          : "",
      category:
        result.properties.category.type === "select"
          ? result.properties.category.select?.name
          : "",
      publishedOn:
        result.properties.published_on.type === "date"
          ? result.properties.published_on.date?.start
          : "",
      updatedOn:
        result.properties.updated_on.type === "last_edited_time"
          ? result.properties.updated_on.last_edited_time
          : "",
    }))[0];
  } catch (error) {
    console.error(error);
    return null;
  }
});

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
