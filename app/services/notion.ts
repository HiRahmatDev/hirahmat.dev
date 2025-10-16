import "server-only";

import { Client, PageObjectResponse } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

export type SelectedProject = {
  slug: string;
  title?: string;
  desc?: string;
  img?: string;
};

export const fetchSelectedProjects: () => Promise<
  SelectedProject[] | null
> = async () => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.DS_ARTICLE!,
      filter: {
        property: "status",
        select: {
          equals: "Published",
        },
      },
      sorts: [{ property: "created_on", direction: "descending" }],
    });

    return (response.results as PageObjectResponse[]).map((result) => ({
      slug:
        result.properties.slug.type === "title"
          ? result.properties.slug.title[0].plain_text
          : "",
      title:
        result.properties.name.type === "rich_text"
          ? result.properties.name.rich_text[0].plain_text
          : "",
      desc:
        result.properties.description.type === "rich_text"
          ? result.properties.description.rich_text[0].plain_text
          : "",
      img: result.cover?.type === "file" ? result.cover.file.url : "",
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};
