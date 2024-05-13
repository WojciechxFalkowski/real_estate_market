import * as yup from "yup";
import type { ButtonPropsType } from '~/components/Button/Button.props'

interface SelectOption {
    value: string;
    label: string;
}

export enum FieldType {
    select = 'select',
    input = 'input'
}

export enum TransactionType {
    wynajem = "Na wynajem",
    zakup = "Zakup"
}

export interface InitialFieldConfig {
    id: string;
    initialValue: string | number;
}

export interface FieldConfig {
    name: string;
    id: string;
    type: string;
    as: FieldType;
    validation: yup.StringSchema<string | undefined>;
    class?: string
    options?: SelectOption[];
    initialValue?: string | number
}

export type ExtendedButtonProps = ButtonPropsType & {
    name: string;
    class: string
};


export interface GenericFormObject {
    fields: FieldConfig[];
    submitButton: ExtendedButtonProps;
    formClass: string;
}
export interface FormConfig extends GenericFormObject {
    initialValues: InitialFieldConfig[]
    onSubmit: (values: any) => void;
}