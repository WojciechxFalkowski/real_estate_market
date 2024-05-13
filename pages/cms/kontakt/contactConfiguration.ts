import {
    FieldType,
    type GenericFormObject,
} from "../../../components/GenericForm/contracts";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

export const contactPageConfiguration: GenericFormObject = {
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
            class: "col-span-12",
        }
    ],
};
