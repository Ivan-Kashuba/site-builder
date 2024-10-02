import { Icons } from "../icons";
import { ColumnType, TextAlignment, TextColumnContent } from "../../types";
import { usePageContextConsumer } from "../../providers/page-provider";
import classNames from "classnames";

export const TextSection = () => {
  const { selectedColumn, updateColumn } = usePageContextConsumer();

  const onChangeAlignmentHandler = (textAlignment: TextAlignment) => {
    const updatedContent: TextColumnContent = {
      ...selectedColumn?.content,
      alignment: textAlignment,
    } as TextColumnContent;
    updateColumn(selectedColumn!.id, selectedColumn!.rowId, updatedContent);
  };

  const onChangeTextHandler = (text: string) => {
    const updatedContent: TextColumnContent = { ...selectedColumn?.content, text } as TextColumnContent;
    updateColumn(selectedColumn!.id, selectedColumn!.rowId, updatedContent);
  };

  const columnText = selectedColumn?.content.type === ColumnType.Text ? selectedColumn.content.text : "";

  return (
    <div className="section">
      <div className="section-header">Text</div>
      <div className="button-group-field">
        <label>Alignment</label>
        <div className="button-group">
          <button
            onClick={() => onChangeAlignmentHandler("left")}
            className={classNames({
              selected: selectedColumn?.content.type === ColumnType.Text && selectedColumn.content.alignment === "left",
            })}
          >
            <Icons.TextAlignLeft />
          </button>
          <button
            onClick={() => onChangeAlignmentHandler("center")}
            className={classNames({
              selected:
                selectedColumn?.content.type === ColumnType.Text && selectedColumn.content.alignment === "center",
            })}
          >
            <Icons.TextAlignCenter />
          </button>
          <button
            onClick={() => onChangeAlignmentHandler("right")}
            className={classNames({
              selected:
                selectedColumn?.content.type === ColumnType.Text && selectedColumn.content.alignment === "right",
            })}
          >
            <Icons.TextAlignRight />
          </button>
        </div>
      </div>
      <div className="textarea-field">
        <textarea
          value={columnText}
          onChange={(e) => onChangeTextHandler(e.target.value)}
          rows={8}
          placeholder="Enter text"
        ></textarea>
      </div>
    </div>
  );
};
