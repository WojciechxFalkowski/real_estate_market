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
    initialValue: string;
}

export interface FieldConfig {
    name: string;
    id: string;
    type: string;
    as: FieldType;
    validation: yup.StringSchema<string | undefined>;
    class?: string
    options?: SelectOption[];
    initialValue?: string
}

export type ExtendedButtonProps = ButtonPropsType & {
    name: string;
    class: string
};

export interface FormConfig {
    fields: FieldConfig[];
    submitButton: ExtendedButtonProps;
    onSubmit: (values: any) => void;
    formClass: string;
    initialValues: InitialFieldConfig[]
}