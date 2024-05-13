import { FieldType, TransactionType, type ExtendedButtonProps, type FieldConfig } from "../GenericForm/contracts";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

export const NEW_FLAT_ROUTE = 'new'

interface LeaseManagmentFormConfiguration {
    formClass: string;
    fields: FieldConfig[];
    submitButton: ExtendedButtonProps
}

export const editTableFormConfiguration: LeaseManagmentFormConfiguration = {
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
            initialValue: "Warszawa, Mokotów, ul. Puławska 27",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "description",
            name: "Opis",
            as: FieldType.input,
            type: "description",
            initialValue: "Mokotów | 4 pokoje | Taras na dachu",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "url",
            name: "Url",
            as: FieldType.input,
            type: "url",
            initialValue: "2-pokoje-51-m2-pl.-niemena-żoliborz-artystyczny",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "location",
            name: "Lokalizacja (miasto)",
            as: FieldType.input,
            type: "text",
            initialValue: "Żoliborz",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "area",
            name: "Powierzchnia",
            as: FieldType.input,
            type: "text",
            initialValue: "130 m²",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
        },
        {
            id: "floor",
            name: "Piętro",
            as: FieldType.input,
            type: "text",
            initialValue: "13 / 14",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
        },
        {
            id: "bedroom",
            name: "Sypialnie",
            as: FieldType.input,
            type: "text",
            initialValue: "3",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
        },
        {
            id: "rooms",
            name: "Pokoje",
            as: FieldType.input,
            type: "text",
            initialValue: "4",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
        },
        {
            id: "year_of_construction",
            name: "Rok budowy",
            as: FieldType.input,
            type: "text",
            initialValue: "2018",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-6 md:col-span-3 lg:col-span-2",
        },
        {
            id: "transaction_type",
            name: "Apartament",
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
        {
            id: "price",
            name: "Cena",
            as: FieldType.input,
            type: "text",
            initialValue: "1 233",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6 lg:col-span-4",
        },
        {
            id: "currency",
            name: "Waluta",
            as: FieldType.select,
            type: "text",
            initialValue: "PLN",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6 lg:col-span-4",
            options: [
                { value: "PLN", label: "PLN" },
                { value: "EURO", label: "EURO" },
                { value: "USD", label: "USD" },
            ],
        },
        {
            id: "pricePerMeter",
            name: "Cena za metr",
            as: FieldType.input,
            type: "text",
            initialValue: "51 PLN / m²",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6 lg:col-span-4",
        },
    ],
};
