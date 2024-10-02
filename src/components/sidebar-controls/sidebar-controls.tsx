import { ColumnType } from "../../types";
import { usePageContextConsumer } from "../../providers/page-provider";
import { SectionCreatorItem } from "../section-item";
import { ColumnTypeSection } from "./column-type-section";
import { TextSection } from "./text-section";
import { ImageSection } from "./image-section";

export const SidebarController = () => {
  const { addRow, selectedRow, selectedColumn, setSelectedRow, setSelectedColumn, addColumn } =
    usePageContextConsumer();

  const onCreateRowHandler = () => {
    const newRow = addRow();
    setSelectedRow(newRow);
    setSelectedColumn(null);
  };

  const onCreateColumnHandler = () => {
    if (!selectedRow) return null;

    const newColumn = addColumn(selectedRow.id, { type: ColumnType.Undefined });
    setSelectedColumn(newColumn);
  };

  return (
    <div className="properties">
      <SectionCreatorItem sectionName={"Page"} onClickHandler={onCreateRowHandler} btnText={"Add row"} />

      {selectedRow && (
        <SectionCreatorItem sectionName={"Row"} onClickHandler={onCreateColumnHandler} btnText={"Add column"} />
      )}

      {selectedColumn && <ColumnTypeSection />}

      {selectedColumn?.content.type === ColumnType.Text && <TextSection />}

      {selectedColumn?.content.type === ColumnType.Image && <ImageSection />}
    </div>
  );
};
