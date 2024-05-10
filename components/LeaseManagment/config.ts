import { FieldType, TransactionType, type ExtendedButtonProps, type FieldConfig } from "../GenericForm/contracts";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

export const NEW_FLAT_ROUTE = 'new'

export const editTableFormConfiguration: {
    formClass: string;
    fields: FieldConfig[];
    submitButton: ExtendedButtonProps
} = {
    formClass: "grid grid-cols-12 gap-4",
    submitButton: {
        name: 'Zapisz',
        componentType: ComponentType.Button,
        class: 'col-span-12',
        theme: Theme.Primary,
    },
    fields: [
        {
            id: "title",
            name: "Tytuł",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "description",
            name: "Opis",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "svg",
            name: "Ikona SVG",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "svgClass",
            name: "Klasa SVG",
            as: FieldType.select,
            type: "text",
            initialValue: TransactionType.wynajem,
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
            options: [
                { value: TransactionType.wynajem, label: TransactionType.wynajem },
                { value: TransactionType.zakup, label: TransactionType.zakup },
            ]
        },
    ],
};
