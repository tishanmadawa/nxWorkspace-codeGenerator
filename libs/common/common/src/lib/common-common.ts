export function commonCommon(): string {
  return 'common-common';
}

export interface FieldProps {
  onChange: (value: string) => void;
  title: string;
  onDoubleClick:(value:IFieldProperty)=>void;
}

interface IFieldProperty{
  title:string
}