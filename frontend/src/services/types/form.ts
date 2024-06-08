export interface FormType {
  reduxConnectionString: string;
  formElements: FormElementType[];
}

export interface InputsBodyType {
  reduxConnectionString: string;
  formElement: FormElementType;
}

export interface FormSplitterType {
  reduxConnectionString: string;
  reduxKey: string;
  type: string;
  error: boolean;
  [key: string]: any;
}

export interface FormElementType {
  reduxKey: string;
  size: number;
  type: string;
  labelId: number;
}
