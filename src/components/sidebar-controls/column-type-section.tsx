import classNames from "classnames";
import { ColumnType, TColumnContent } from "../../types";
import { Icons } from "../icons";
import { usePageContextConsumer } from "../../providers/page-provider";

export const ColumnTypeSection = () => {
  const { selectedColumn, updateColumn } = usePageContextConsumer();

  const contentToType: Record<ColumnType, TColumnContent> = {
    [ColumnType.Text]: {
      type: ColumnType.Text,
      alignment: "left",
      text: "",
    },
    [ColumnType.Image]: {
      type: ColumnType.Image,
      image_url: "",
    },
    [ColumnType.Undefined]: {
      type: ColumnType.Undefined,
    },
  };

  const onChangeColumnTypeHandler = (type: ColumnType) => {
    if (type === selectedColumn?.content.type) return null;

    const updatedContent: TColumnContent = contentToType[type];

    updateColumn(selectedColumn!.id, selectedColumn!.rowId, updatedContent);
  };

  return (
    <div className="section">
      <div className="section-header">Column</div>
      <div className="button-group-field">
        <label>Contents</label>
        <div className="button-group">
          <button
            disabled={selectedColumn?.content.type === ColumnType.Text}
            onClick={() => onChangeColumnTypeHandler(ColumnType.Text)}
            className={classNames({ selected: selectedColumn?.content.type === ColumnType.Text })}
          >
            <Icons.Text />
          </button>

          <button
            disabled={selectedColumn?.content.type === ColumnType.Image}
            onClick={() => onChangeColumnTypeHandler(ColumnType.Image)}
            className={classNames({ selected: selectedColumn?.content.type === ColumnType.Image })}
          >
            <Icons.Image />
          </button>
        </div>
      </div>
    </div>
  );
};
