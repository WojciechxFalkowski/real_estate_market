import {
    FieldType,
    type FormConfig,
    type GenericFormObject,
} from "../../../components/GenericForm/contracts";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

export const pageLeaseManagmentFormConfiguration: GenericFormObject = {
    formClass: "grid grid-cols-12 gap-4",
    submitButton: {
        name: "Zapisz",
        componentType: ComponentType.Button,
        class: "col-span-12",
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
            type: "description",
            initialValue: "",
            validation: yup.string().required("Pole jest wymagane"),
            class: "col-span-12 md:col-span-6",
        },
    ],
};
