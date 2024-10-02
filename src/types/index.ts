export type TPage = {
  rows: TRow[];
};

export type TRow = {
  id: string;
  columns: TColumn[];
};

export enum ColumnType {
  Undefined = "undefined",
  Image = "image",
  Text = "text",
}

export type TColumn = {
  id: string;
  rowId: string;
  content: TColumnContent;
};

interface ColumnContentBase {
  type: ColumnType;
}

export interface TextColumnContent extends ColumnContentBase {
  type: ColumnType.Text;
  text: string;
  alignment: TextAlignment;
}

export interface ImageColumnContent extends ColumnContentBase {
  type: ColumnType.Image;
  image_url: string;
}

interface UndefinedColumnContent extends ColumnContentBase {
  type: ColumnType.Undefined;
}

export type TColumnContent = TextColumnContent | ImageColumnContent | UndefinedColumnContent;
export type TextAlignment = "left" | "center" | "right";
