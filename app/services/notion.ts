import "server-only";

import { Client, PageObjectResponse } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

export const fetchSelectedProjects = async () => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.DS_ARTICLE!,
    });

    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error(error);
  }
};
