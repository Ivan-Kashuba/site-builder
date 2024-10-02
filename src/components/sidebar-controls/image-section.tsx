import { usePageContextConsumer } from "../../providers/page-provider";
import { ColumnType, ImageColumnContent } from "../../types";

export const ImageSection = () => {
  const { selectedColumn, updateColumn } = usePageContextConsumer();

  const onChangeImageUrlHandler = (url: string) => {
    const updatedContent: ImageColumnContent = {
      ...selectedColumn?.content,
      image_url: url,
    } as ImageColumnContent;
    updateColumn(selectedColumn!.id, selectedColumn!.rowId, updatedContent);
  };

  const imageUrl = selectedColumn?.content.type === ColumnType.Image ? selectedColumn.content.image_url : "";

  return (
    <div className="section">
      <div className="section-header">Image</div>
      <div className="text-field">
        <label htmlFor="image-url">URL</label>
        <input value={imageUrl} onChange={(e) => onChangeImageUrlHandler(e.target.value)} id="image-url" type="text" />
      </div>
    </div>
  );
};
