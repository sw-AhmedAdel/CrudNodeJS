export default (
  label: string,
  options: {
    control?: string;
    controlType?: string;
    placeholder?: string;
    values?: string[];
    validation?: { [key: string]: any };
    type?: string;
    required?: boolean;
  }
) => {
  const fieldOptions = {
    label,
    control: "input",
    controlType: "text",
    required: true,
    ...options,
    validation: options.validation,
  };
  return fieldOptions;
};
