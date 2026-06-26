import type { Schema, Struct } from '@strapi/strapi';

export interface FormFieldsCheckBox extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_check_boxes';
  info: {
    displayName: 'CheckBox';
  };
  attributes: {
    fieldName: Schema.Attribute.String;
    label: Schema.Attribute.String;
    options: Schema.Attribute.Component<'shared.options', true>;
    validation: Schema.Attribute.Component<'shared.validation', false>;
  };
}

export interface FormFieldsInputField extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_input_fields';
  info: {
    displayName: 'Input Field';
  };
  attributes: {
    fieldName: Schema.Attribute.String;
    inputType: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'password', 'number', 'textarea']
    >;
    label: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    validation: Schema.Attribute.Component<'shared.validation', false>;
  };
}

export interface FormFieldsRadio extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_radios';
  info: {
    displayName: 'Radio';
  };
  attributes: {
    fieldName: Schema.Attribute.String;
    label: Schema.Attribute.String;
    options: Schema.Attribute.Component<'shared.options', true>;
    validation: Schema.Attribute.Component<'shared.validation', false>;
  };
}

export interface FormFieldsSelect extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_selects';
  info: {
    displayName: 'Select';
  };
  attributes: {
    fieldName: Schema.Attribute.String;
    label: Schema.Attribute.String;
    options: Schema.Attribute.Component<'shared.options', true>;
    placeholder: Schema.Attribute.String;
    validation: Schema.Attribute.Component<'shared.validation', false>;
  };
}

export interface FormFieldsTextArea extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_text_area_s';
  info: {
    displayName: 'TextArea ';
  };
  attributes: {
    fieldName: Schema.Attribute.String;
    label: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    validation: Schema.Attribute.Component<'shared.validation', false>;
  };
}

export interface SectionsAddonSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_addon_sections';
  info: {
    displayName: 'Addon Section';
  };
  attributes: {
    addons: Schema.Attribute.Relation<'oneToMany', 'api::addon.addon'>;
  };
}

export interface SectionsPlanSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_plan_sections';
  info: {
    displayName: 'Plan Section';
  };
  attributes: {
    plans: Schema.Attribute.Relation<'oneToMany', 'api::plan.plan'>;
    required: Schema.Attribute.Boolean;
    requiredMessage: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['default', 'compact', 'horizontal', 'minimal', 'featured']
    >;
  };
}

export interface SectionsStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    stepType: Schema.Attribute.Enumeration<
      ['info', 'plans', 'addons', 'summary']
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsUserInformation extends Struct.ComponentSchema {
  collectionName: 'components_sections_user_informations';
  info: {
    displayName: 'User Information';
  };
  attributes: {
    description: Schema.Attribute.Text;
    fields: Schema.Attribute.Component<'form-fields.input-field', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedAddon extends Struct.ComponentSchema {
  collectionName: 'components_shared_addons';
  info: {
    displayName: 'Addon';
  };
  attributes: {
    description: Schema.Attribute.String;
    planType: Schema.Attribute.Enumeration<['Yearly', 'Monthly']>;
    price: Schema.Attribute.Decimal;
    title: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    text: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'success', 'danger', 'outline', 'ghost']
    >;
  };
}

export interface SharedHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_banners';
  info: {
    displayName: 'Hero Banner';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedOptions extends Struct.ComponentSchema {
  collectionName: 'components_shared_options';
  info: {
    displayName: 'options';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedPlans extends Struct.ComponentSchema {
  collectionName: 'components_shared_plans';
  info: {
    displayName: 'Plans';
  };
  attributes: {
    billingType: Schema.Attribute.Enumeration<['monthly', 'yearly']>;
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Price: Schema.Attribute.Decimal;
    title: Schema.Attribute.String;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'step';
  };
  attributes: {
    addons: Schema.Attribute.Component<'shared.addon', true>;
    fields: Schema.Attribute.Component<'form-fields.input-field', true>;
    order: Schema.Attribute.Integer;
    plans: Schema.Attribute.Component<'shared.plans', true>;
    stepType: Schema.Attribute.Enumeration<
      ['info', 'plans', 'addons', 'summary']
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedValidation extends Struct.ComponentSchema {
  collectionName: 'components_shared_validations';
  info: {
    displayName: 'Validation';
  };
  attributes: {
    maxLength: Schema.Attribute.Integer;
    maxLengthMessage: Schema.Attribute.String;
    minLength: Schema.Attribute.Integer;
    minLengthMessage: Schema.Attribute.String;
    pattern: Schema.Attribute.String;
    patternMessage: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    requiredMessage: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'form-fields.check-box': FormFieldsCheckBox;
      'form-fields.input-field': FormFieldsInputField;
      'form-fields.radio': FormFieldsRadio;
      'form-fields.select': FormFieldsSelect;
      'form-fields.text-area': FormFieldsTextArea;
      'sections.addon-section': SectionsAddonSection;
      'sections.plan-section': SectionsPlanSection;
      'sections.step': SectionsStep;
      'sections.user-information': SectionsUserInformation;
      'shared.addon': SharedAddon;
      'shared.button': SharedButton;
      'shared.hero-banner': SharedHeroBanner;
      'shared.options': SharedOptions;
      'shared.plans': SharedPlans;
      'shared.step': SharedStep;
      'shared.validation': SharedValidation;
    }
  }
}
