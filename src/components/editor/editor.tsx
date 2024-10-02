import { usePageContextConsumer } from "../../providers/page-provider";
import { Stage } from "../stage";
import { Column } from "../column";
import { Row } from "../row";
import { ColumnContent } from "../column/column-content";
import { SidebarController } from "../sidebar-controls";
import { TColumn, TRow } from "../../types";

export const Editor = () => {
  const { pageData, selectedRow, selectedColumn, setSelectedRow, setSelectedColumn } = usePageContextConsumer();

  const onClearSidebarPanelHandler = () => {
    setSelectedRow(null);
    setSelectedColumn(null);
  };

  const onSelectColumnHandler = (row: TRow, col: TColumn) => {
    setSelectedRow(row);
    setSelectedColumn(col);
  };

  const onSelectRowHandler = (row: TRow) => {
    setSelectedRow(row);
    setSelectedColumn(null);
  };

  return (
    <div className="editor">
      <Stage onSelect={onClearSidebarPanelHandler}>
        {pageData.rows.map((row) => {
          return (
            <Row selected={row.id === selectedRow?.id} key={row.id} onSelect={() => onSelectRowHandler(row)}>
              {row.columns.map((col) => {
                return (
                  <Column
                    selected={col.id === selectedColumn?.id}
                    key={col.id}
                    onSelect={() => onSelectColumnHandler(row, col)}
                  >
                    <ColumnContent {...col.content} />
                  </Column>
                );
              })}
            </Row>
          );
        })}
      </Stage>
      <SidebarController />
    </div>
  );
};
