export enum Theme {
  Danger = "btn-danger",
  Primary = "btn-primary",
  Secondary = "btn-secondary",
  Success = "btn-success",
  Outline = "btn-outline-dark",
}

export enum ComponentType {
  Button = "button",
  Submit = "submit",
  ExternalLink = "a",
  InternalLink = 'Router-link'
}

export const ButtonProps = {
  theme: {
    type: String as PropType<Theme>,
    required: false,
    default: Theme.Primary,
  },
  isFluid: {
    type: Boolean,
    required: false,
    default: false,
  },

  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  componentType: {
    type: String as PropType<ComponentType>,
    required: false,
    default: ComponentType.Button,
  },
  link: {
    required: false,
    default: {},
  }
};

export type ButtonPropsType = Partial<ExtractPropTypes<typeof ButtonProps>>;