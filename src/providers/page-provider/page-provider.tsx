import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ColumnType, TColumn, TColumnContent, TPage, TRow } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { LocalStorageKey } from "../../utils/enums/local-storage";
import { localStorageManager } from "../../utils/local-storage/local-storage-manager";

export type TPageContext = {
  pageData: TPage;
  addRow: () => TRow | null;
  addColumn: (rowId: string, content: TColumnContent) => TColumn | null;
  updateColumn: (columnId: string, rowId: string, content: TColumnContent) => TColumn | null;
  selectedRow: TRow | null;
  selectedColumn: TColumn | null;
  setSelectedRow: Dispatch<SetStateAction<TRow | null>>;
  setSelectedColumn: Dispatch<SetStateAction<TColumn | null>>;
  setPageData: Dispatch<SetStateAction<TPage>>;
};

const pageContextDefaultValue: TPageContext = {
  addRow: () => null,
  addColumn: () => null,
  updateColumn: () => null,
  setSelectedRow: () => {},
  setSelectedColumn: () => {},
  setPageData: () => {},
  pageData: {
    rows: [
      {
        id: "0",
        columns: [
          { id: "01", rowId: "0", content: { type: ColumnType.Text, text: "# Untitled", alignment: "center" } },
        ],
      },
    ],
  },
  selectedColumn: null,
  selectedRow: null,
};

const PageContext = createContext<TPageContext>(pageContextDefaultValue);

export const usePageContextConsumer = () => {
  return useContext(PageContext);
};

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [pageData, setPageData] = useState<TPage>(() => {
    const initialPageData = localStorageManager.get<TPage>(LocalStorageKey.PageData);
    return initialPageData || pageContextDefaultValue.pageData;
  });

  const [selectedRow, setSelectedRow] = useState<TRow | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<TColumn | null>(null);

  const addRow = useCallback(() => {
    const newRow: TRow = {
      id: uuidv4(),
      columns: [],
    };

    setPageData((prev) => ({ ...prev, rows: [...prev.rows, newRow] }));

    return newRow;
  }, [setPageData]);

  const addColumn = useCallback(
    (rowId: string, content: TColumnContent) => {
      const newColumn: TColumn = {
        id: uuidv4(),
        rowId,
        content,
      };

      setPageData((prev) => {
        const updatedRows = prev.rows.map((row) => {
          if (row.id === rowId) {
            return { ...row, columns: [...row.columns, newColumn] };
          }
          return row;
        });

        return { ...prev, rows: updatedRows };
      });

      return newColumn;
    },
    [setPageData]
  );

  const updateColumn = useCallback(
    (columnId: string, rowId: string, content: TColumnContent) => {
      let updatedColumn: TColumn | null = null;
      setPageData((prev) => {
        const updatedRows = prev.rows.map((row) => {
          if (row.id === rowId) {
            const updatedColumns = row.columns.map((column) => {
              if (column.id === columnId) {
                updatedColumn = { ...column, content };

                setSelectedColumn(updatedColumn);
                return updatedColumn;
              }

              return column;
            });

            return { ...row, columns: updatedColumns };
          }
          return row;
        });

        return { ...prev, rows: updatedRows };
      });

      return updatedColumn;
    },
    [setPageData]
  );

  useEffect(() => {
    localStorageManager.set<TPage>(LocalStorageKey.PageData, pageData);
  }, [pageData]);

  const initialContextData: TPageContext = useMemo(() => {
    return {
      pageData,
      addRow,
      updateColumn,
      addColumn,
      selectedColumn,
      selectedRow,
      setSelectedColumn,
      setSelectedRow,
      setPageData,
    };
  }, [
    pageData,
    addRow,
    updateColumn,
    addColumn,
    selectedColumn,
    selectedRow,
    setSelectedColumn,
    setSelectedRow,
    setPageData,
  ]);

  return <PageContext.Provider value={initialContextData}> {children}</PageContext.Provider>;
};
