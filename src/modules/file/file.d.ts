interface Row {
  id: number;
  label: string;
  type: string;
  length: string | number;
  scale: string;
  nullAble: string;
  dataInfo: string;
  refTable: string;
  refField: string;
  codeInfo: string;
  memo: string;
}

export type PartialRow = Partial<Row>;
