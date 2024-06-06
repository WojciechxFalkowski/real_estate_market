import { FieldType, TransactionType, type ExtendedButtonProps, type FieldConfig } from "../GenericForm/contracts";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

export const NEW_FLAT_ROUTE = 'new'

export const excludeVisitorsFormConfiguration: {
    formClass: string;
    fields: FieldConfig[];
    submitButton: ExtendedButtonProps
} = {
    formClass: "grid grid-cols-12 gap-4",
    submitButton: {
        name: 'Dodaj',
        componentType: ComponentType.Button,
        class: 'col-span-12',
        theme: Theme.Primary,
    },
    fields: [
        {
            id: "visitorId",
            name: "Id użytkownika",
            as: FieldType.input,
            type: "text",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12",
        },
    ],
};
