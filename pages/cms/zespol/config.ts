import * as yup from "yup";
import { ComponentType, Theme } from "~/components/Button/Button.props";
import { FieldType, type ExtendedButtonProps, type FieldConfig } from "~/components/GenericForm/contracts";

export const manageTeamMemberConfiguration: {
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
            id: "firstName",
            name: "Imię",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "lastName",
            name: "Nazwisko",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "teamName",
            name: "Zespół",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "specialization",
            name: "Specjalizacja",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
        {
            id: "biography",
            name: "Biografia",
            as: FieldType.textarea,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12",
            inputClass: 'min-h-32'
        },
    ],
};
