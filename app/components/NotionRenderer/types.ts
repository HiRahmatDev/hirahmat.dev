// TODO: Remove this if it's unnecessary stuff

type Block = {
  id: string;
  type: blockEnum | string;
  object: "block" | "database" | "page" | string;
  created_time: Date | string;
  last_edited_time: Date | string;
  has_children: boolean;
  [blockEnum.HEADING1]?: BlockTypeContent;
  [blockEnum.HEADING2]?: BlockTypeContent;
  [blockEnum.HEADING3]?: BlockTypeContent;
  [blockEnum.PARAGRAPH]?: BlockTypeContent;
  [blockEnum.DOTS_LIST]?: BlockTypeContent;
  [blockEnum.ENUM_LIST]?: BlockTypeContent;
  [blockEnum.CHECK_LIST]?: BlockTypeContent;
  [blockEnum.TOGGLE_LIST]?: BlockTypeContent;
  [blockEnum.TABLE]?: BlockTypeContent & {
    has_column_header: boolean;
    has_row_header: boolean;
    table_width: number;
  };
  [blockEnum.TABLE_ROW]?: BlockTypeContent & {
    cells: Text[];
  };
};

interface BlockTypeContent {
  text: Text[];
  checked?: boolean;
  children?: Block[];
}

export enum blockEnum {
  HEADING1 = "heading_1",
  HEADING2 = "heading_2",
  HEADING3 = "heading_3",
  PARAGRAPH = "paragraph",
  TOGGLE_LIST = "toggle",
  DOTS_LIST = "bulleted_list_item",
  ENUM_LIST = "numbered_list_item",
  CHECK_LIST = "to_do",
  TITLE = "title",
  VIDEO = "video",
  IMAGE = "image",
  EMBED = "embed",
  FILE = "file",
  PDF = "pdf",
  BOOKMARK = "bookmark",
  CALLOUT = "callout",
  QUOTE = "quote",
  DIVIDER = "divider",
  CODE = "code",
  SYNCED_BLOCK = "synced_block",
  TABLE_OF_CONTENTS = "table_of_contents",
  TABLE = "table",
  TABLE_ROW = "table_row",
}

export const UNSUPPORTED_TYPE = "unsupported";
