import { FC } from "react";
import { TColumnContent, ColumnType } from "../../types";
import { Markdown } from "../markdown";
import { ImagePlaceholder } from "../image-placeholder";

export const ColumnContent: FC<TColumnContent> = (content) => {
  if (content.type === ColumnType.Image) {
    return content?.image_url ? <img src={content.image_url} alt="" /> : <ImagePlaceholder />;
  }

  if (content.type === ColumnType.Text) {
    return <Markdown className={`text-align-${content.alignment}`}>{content.text}</Markdown>;
  }

  return null;
};
