import styled from 'styled-components';
// import {FieldProps} from '@nx-vision/common/common'

const StyledCheckBox = styled.div`
  color: black;
  text-align: left;
  border: 1px solid gray;
  padding: 2px;
`;

const FieldName = styled.p`
  text-align: left;
`;

const CheckBoxField = styled.input``;

export function Field({ title, onChange,onDoubleClick }: FieldProps) {
  return (<StyledCheckBox  onDoubleClick={()=>{
      console.log(title);
      onDoubleClick({title:title});
    }}>
      <FieldName>{title}</FieldName>
      <CheckBoxField
        type="email"
        onChange={(evt) => {
          onChange(evt.target.value);
        }}

      />
    </StyledCheckBox>
  );
}

export interface FieldProps {
  onChange: (value: string) => void;
  title: string;
  onDoubleClick:(value:IFieldProperty)=>void;
}
interface IFieldProperty{
  title:string
}

export default Field;
