import styled from 'styled-components';

import { Field as Email } from '@nx-vision/fields/email';
import { Field as Number } from '@nx-vision/fields/number';
import { Field as Radio } from '@nx-vision/fields/radio';
import { Field as Checkbox } from '@nx-vision/fields/checkbox';

import { Key, useEffect, useState } from 'react';
const StyledApp = styled.div`
  font-family: sans-serif;

  background-color: ;
`;

const DragAndDropOptions = styled.div`
  background-color: lightgray;
  padding: 5px;
  min-width: 250px;
  max-width: 250px;
`;

const SettingsOptions = styled.div`
  background-color: lightgray;
  padding: 5px;
  min-width: 250px;
  max-width: 250px;
`;

const FieldOption = styled.div``;

const TemplateDiv = styled.div`
  min-height: 100px;
  background-color: #dddddd;
  border: 5px solid white;
`;

const templateJson = [
  {
    className: 'col-md-6',
    name: 'div1',
  },
  { className: 'col-md-6', name: 'div2' },
  { className: 'col-md-12', name: 'div3' },
  {
    className: 'col-md-6',
    name: 'div4',
  },
  { className: 'col-md-6', name: 'div5' },
  { className: 'col-md-12', name: 'div6' },
];

export const App = () => {
  const [fieldDetails, setFieldDetails] = useState({ fieldName: '' });
  const [selectedFieldDetails, setSelectedFieldDetails] =
    useState<IFieldDetails>({ title: '', div: '', index: 0 });
  const [templateData, setTemplateData] = useState<IFieldObject>({});
  const onDragStart = (ev: any, id: string) => {
    setFieldDetails({ fieldName: id });
    console.log(fieldDetails);
    ev.dataTransfer.setData('id', id);
  };

  const onDragOver = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  useEffect(() => {
    const templateInitialObject = {} as any;
    templateJson.forEach((element) => {
      templateInitialObject[element.name] = [];
    });
    setTemplateData(templateInitialObject);
  }, []);

  useEffect(() => {
    console.log(selectedFieldDetails);
  }, [selectedFieldDetails]);

  const onDrop = (ev: any, cat: keyof IFieldObject) => {
    const templateDataCopy = templateData;
    templateData[cat] = [
      ...templateData[cat],
      { name: fieldDetails.fieldName, title: 'Field' },
    ];
    setTemplateData(templateDataCopy);
    setFieldDetails({ fieldName: '' });
  };

  const editTitle = (value: string, div: string, index: number) => {
    const templateDataCopy = templateData;
    const inputObject = templateDataCopy[div][index];
    inputObject.title = value;
    templateDataCopy[div][index] = inputObject;
    setTemplateData((prev) => ({ ...prev, [div]: templateDataCopy[div] }));
  };

  const onDragClick = (e: any, name: string) => {
    setFieldDetails({ fieldName: name });
  };

  const DragField = (props: any) => {
    return (
      <FieldOption
        onDrag={(e) => onDragStart(e, props.field)}
        draggable
        id={'t.id'}
        onClick={(e) => onDragClick(e, props.field)}
      >
        {props.children}
      </FieldOption>
    );
  };

  return (
    <div className="container-fluid" style={{ width: '100%' }}>
      <StyledApp className="row">
        <DragAndDropOptions id="drag" className="col-md-3">
          <DragField field="email">
            <Email
              onChange={(value: any) => {
                console.log(value);
              }}
              onDoubleClick={(e: any) => {
                return null;
              }}
              title={'email'}
            />
          </DragField>
          <DragField field="number">
            <Number
              onChange={(value: any) => {
                console.log(value);
              }}
              onDoubleClick={(e: any) => {
                return null;
              }}
              title={'number'}
            />
          </DragField>
          <DragField field="radio">
            <Radio
              onChange={(value: any) => {
                console.log(value);
              }}
              onDoubleClick={(e: any) => {
                return null;
              }}
              title={'radio'}
            />
          </DragField>
          <DragField field="checkbox">
            <Checkbox
              onChange={(value: any) => {
                console.log(value);
              }}
              onDoubleClick={(e: any) => {
                return null;
              }}
              title={'checkbox'}
            />
          </DragField>
        </DragAndDropOptions>
        <div className="col-md-7 row">
          {templateJson.map((value, index) => {
            return (
              <TemplateDiv
                key={index}
                className={value.className}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, value.name)}
              >
                {templateData[value.name] &&
                  templateData[value.name].map(
                    (field: fieldInterface, index: number) => {
                      switch (field.name) {
                        case 'email':
                          return (
                            <Email
                              onChange={(value: any) => {
                                console.log(value);
                              }}
                              onDoubleClick={(e: any) =>
                                setSelectedFieldDetails({
                                  title: e.title,
                                  div: value.name,
                                  index: index,
                                })
                              }
                              title={field.title}
                            />
                          );
                          break;
                        case 'number':
                          return (
                            <Number
                              onChange={(value: any) => {
                                console.log(value);
                              }}
                              onDoubleClick={(e: any) =>
                                setSelectedFieldDetails({
                                  title: e.title,
                                  div: value.name,
                                  index: index,
                                })
                              }
                              title={field.title}
                            />
                          );
                          break;
                        case 'radio':
                          return (
                            <Radio
                              onChange={(value: any) => {
                                console.log(value);
                              }}
                              onDoubleClick={(e: any) =>
                                setSelectedFieldDetails({
                                  title: e.title,
                                  div: value.name,
                                  index: index,
                                })
                              }
                              title={field.title}
                            />
                          );
                          break;
                        case 'checkbox':
                          return (
                            <Checkbox
                              onChange={(value: any) => {
                                console.log(value);
                              }}
                              onDoubleClick={(e: any) =>
                                setSelectedFieldDetails({
                                  title: e.title,
                                  div: value.name,
                                  index: index,
                                })
                              }
                              title={field.title}
                            />
                          );
                          break;

                        default:
                          return null;
                          break;
                      }
                    }
                  )}
              </TemplateDiv>
            );
          })}
        </div>
        {selectedFieldDetails && (
          <SettingsOptions>
            <p>title</p>
            <input
              type="text"
              value={selectedFieldDetails && selectedFieldDetails.title}
              onChange={(value) => {
                setSelectedFieldDetails((prev) => ({
                  ...prev,
                  title: value.target.value,
                }));
                editTitle(
                  value.target.value,
                  selectedFieldDetails.div,
                  selectedFieldDetails.index
                );
              }}
              onMouseLeave={() => {
                editTitle(
                  selectedFieldDetails.title,
                  selectedFieldDetails.div,
                  selectedFieldDetails.index
                );
              }}
            />
          </SettingsOptions>
        )}
      </StyledApp>
    </div>
  );
};

interface IFieldObject {
  [div1: string]: fieldInterface[];
}

interface fieldInterface {
  name: string;
  title: string;
}

interface IFieldDetails {
  title: string;
  div: string;
  index: number;
}

export default App;
