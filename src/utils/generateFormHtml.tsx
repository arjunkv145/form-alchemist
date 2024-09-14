import { ReactElement, useEffect, useState } from 'react';
import { FormElement, OptionsApiConfig } from '../types/FormElements';
import FormElementWrapper from '../components/FormElementWrapper';
import FormItem from '../general_components/FormItem';
import InputText from '../general_components/InputText';
import InputNumber from '../general_components/InputNumber';
import Date from '../general_components/Date';
import Time from '../general_components/Time';
import Button from '../general_components/Button';
import TextArea from '../general_components/Textarea';
import Select from '../general_components/Select';
import CheckboxGroup from '../general_components/CheckboxGroup';
import Radio from '../general_components/Radio';
import getOptionsFromApi from './getOptionsFromApi';

const countryCodes = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+7 (Russia)', value: '+7' },
    { label: '+20 (Egypt)', value: '+20' },
    { label: '+27 (South Africa)', value: '+27' },
    { label: '+30 (Greece)', value: '+30' },
    { label: '+31 (Netherlands)', value: '+31' },
    { label: '+32 (Belgium)', value: '+32' },
    { label: '+33 (France)', value: '+33' },
    { label: '+34 (Spain)', value: '+34' },
    { label: '+36 (Hungary)', value: '+36' },
    { label: '+39 (Italy)', value: '+39' },
    { label: '+40 (Romania)', value: '+40' },
    { label: '+41 (Switzerland)', value: '+41' },
    { label: '+43 (Austria)', value: '+43' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+45 (Denmark)', value: '+45' },
    { label: '+46 (Sweden)', value: '+46' },
    { label: '+47 (Norway)', value: '+47' },
    { label: '+48 (Poland)', value: '+48' },
    { label: '+49 (Germany)', value: '+49' },
    { label: '+51 (Peru)', value: '+51' },
    { label: '+52 (Mexico)', value: '+52' },
    { label: '+53 (Cuba)', value: '+53' },
    { label: '+54 (Argentina)', value: '+54' },
    { label: '+55 (Brazil)', value: '+55' },
    { label: '+56 (Chile)', value: '+56' },
    { label: '+57 (Colombia)', value: '+57' },
    { label: '+58 (Venezuela)', value: '+58' },
    { label: '+60 (Malaysia)', value: '+60' },
    { label: '+61 (Australia)', value: '+61' },
    { label: '+62 (Indonesia)', value: '+62' },
    { label: '+63 (Philippines)', value: '+63' },
    { label: '+64 (New Zealand)', value: '+64' },
    { label: '+65 (Singapore)', value: '+65' },
    { label: '+66 (Thailand)', value: '+66' },
    { label: '+81 (Japan)', value: '+81' },
    { label: '+82 (South Korea)', value: '+82' },
    { label: '+84 (Vietnam)', value: '+84' },
    { label: '+86 (China)', value: '+86' },
    { label: '+90 (Turkey)', value: '+90' },
    { label: '+91 (India)', value: '+91' },
    { label: '+92 (Pakistan)', value: '+92' },
    { label: '+93 (Afghanistan)', value: '+93' },
    { label: '+94 (Sri Lanka)', value: '+94' },
    { label: '+95 (Myanmar)', value: '+95' },
    { label: '+98 (Iran)', value: '+98' },
    { label: '+211 (South Sudan)', value: '+211' },
    { label: '+212 (Morocco)', value: '+212' },
    { label: '+213 (Algeria)', value: '+213' },
    { label: '+216 (Tunisia)', value: '+216' },
    { label: '+218 (Libya)', value: '+218' },
    { label: '+220 (Gambia)', value: '+220' },
    { label: '+221 (Senegal)', value: '+221' },
    { label: '+222 (Mauritania)', value: '+222' },
    { label: '+223 (Mali)', value: '+223' },
    { label: '+224 (Guinea)', value: '+224' },
    { label: '+225 (Ivory Coast)', value: '+225' },
    { label: '+226 (Burkina Faso)', value: '+226' },
    { label: '+227 (Niger)', value: '+227' },
    { label: '+228 (Togo)', value: '+228' },
    { label: '+229 (Benin)', value: '+229' },
    { label: '+230 (Mauritius)', value: '+230' },
    { label: '+231 (Liberia)', value: '+231' },
    { label: '+232 (Sierra Leone)', value: '+232' },
    { label: '+233 (Ghana)', value: '+233' },
    { label: '+234 (Nigeria)', value: '+234' },
    { label: '+235 (Chad)', value: '+235' },
    { label: '+236 (Central African Republic)', value: '+236' },
    { label: '+237 (Cameroon)', value: '+237' },
    { label: '+238 (Cape Verde)', value: '+238' },
    { label: '+239 (Sao Tome and Principe)', value: '+239' },
    { label: '+240 (Equatorial Guinea)', value: '+240' },
    { label: '+241 (Gabon)', value: '+241' },
    { label: '+242 (Congo)', value: '+242' },
    { label: '+243 (DR Congo)', value: '+243' },
    { label: '+244 (Angola)', value: '+244' },
    { label: '+245 (Guinea-Bissau)', value: '+245' },
    { label: '+246 (British Indian Ocean Territory)', value: '+246' },
    { label: '+247 (Ascension Island)', value: '+247' },
    { label: '+248 (Seychelles)', value: '+248' },
    { label: '+249 (Sudan)', value: '+249' },
    { label: '+250 (Rwanda)', value: '+250' },
    { label: '+251 (Ethiopia)', value: '+251' },
    { label: '+252 (Somalia)', value: '+252' },
    { label: '+253 (Djibouti)', value: '+253' },
    { label: '+254 (Kenya)', value: '+254' },
    { label: '+255 (Tanzania)', value: '+255' },
    { label: '+256 (Uganda)', value: '+256' },
    { label: '+257 (Burundi)', value: '+257' },
    { label: '+258 (Mozambique)', value: '+258' },
    { label: '+260 (Zambia)', value: '+260' },
    { label: '+261 (Madagascar)', value: '+261' },
    { label: '+262 (Reunion)', value: '+262' },
    { label: '+263 (Zimbabwe)', value: '+263' },
    { label: '+264 (Namibia)', value: '+264' },
    { label: '+265 (Malawi)', value: '+265' },
    { label: '+266 (Lesotho)', value: '+266' },
    { label: '+267 (Botswana)', value: '+267' },
    { label: '+268 (Eswatini)', value: '+268' },
    { label: '+269 (Comoros)', value: '+269' },
    { label: '+290 (Saint Helena)', value: '+290' },
    { label: '+291 (Eritrea)', value: '+291' },
    { label: '+297 (Aruba)', value: '+297' },
    { label: '+298 (Faroe Islands)', value: '+298' },
    { label: '+299 (Greenland)', value: '+299' },
    { label: '+350 (Gibraltar)', value: '+350' },
    { label: '+351 (Portugal)', value: '+351' },
    { label: '+352 (Luxembourg)', value: '+352' },
    { label: '+353 (Ireland)', value: '+353' },
    { label: '+354 (Iceland)', value: '+354' },
    { label: '+355 (Albania)', value: '+355' },
    { label: '+356 (Malta)', value: '+356' },
    { label: '+357 (Cyprus)', value: '+357' },
    { label: '+358 (Finland)', value: '+358' },
    { label: '+359 (Bulgaria)', value: '+359' },
    { label: '+370 (Lithuania)', value: '+370' },
    { label: '+371 (Latvia)', value: '+371' },
    { label: '+372 (Estonia)', value: '+372' },
    { label: '+373 (Moldova)', value: '+373' },
    { label: '+374 (Armenia)', value: '+374' },
    { label: '+375 (Belarus)', value: '+375' },
    { label: '+376 (Andorra)', value: '+376' },
    { label: '+377 (Monaco)', value: '+377' },
    { label: '+378 (San Marino)', value: '+378' },
    { label: '+379 (Vatican City)', value: '+379' },
    { label: '+380 (Ukraine)', value: '+380' },
    { label: '+381 (Serbia)', value: '+381' },
    { label: '+382 (Montenegro)', value: '+382' },
    { label: '+383 (Kosovo)', value: '+383' },
    { label: '+385 (Croatia)', value: '+385' },
    { label: '+386 (Slovenia)', value: '+386' },
    { label: '+387 (Bosnia and Herzegovina)', value: '+387' },
    { label: '+389 (North Macedonia)', value: '+389' },
    { label: '+420 (Czech Republic)', value: '+420' },
    { label: '+421 (Slovakia)', value: '+421' },
    { label: '+423 (Liechtenstein)', value: '+423' }
];

type Options = {
    label: string;
    value: string;
}[];

type GenerateFormHtmlProps =
    | {
          mode: 'Builder';
          formData: FormElement[];
          formElement: FormElement;
          index: number;
          onEditElement: (element: FormElement) => void;
          onRemove: (uid: string) => void;
          isDragging: boolean;
          onDragStart: (elementType: FormElement['elementType'], uid: string, isWidget?: boolean) => void;
          onDragOver: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
          onDragEnd: () => void;
          dataSourceType: 'values' | 'api' | null;
          apiOptions: OptionsApiConfig | null;
      }
    | {
          mode: 'Render';
          formData: FormElement[];
          setFormData: React.Dispatch<React.SetStateAction<FormElement[]>>;
          formElement: FormElement;
          index: number;
          dataSourceType: 'values' | 'api' | null;
          apiOptions: OptionsApiConfig | null;
      };

const GenerateFormHtml = (props: GenerateFormHtmlProps) => {
    const [optionsFromApi, setOptionsFromApi] = useState<Options>([]);
    let formElementHtml: ReactElement;
    const { mode, formElement, index } = props;
    const { elementType, uid } = formElement;

    useEffect(() => {
        if (props.dataSourceType === 'api' && props.apiOptions !== null)
            getOptionsFromApi(props.apiOptions).then((data) => data !== undefined && setOptionsFromApi(data));
    }, [elementType, props.apiOptions, props.dataSourceType]);

    if (elementType === 'name' || elementType === 'text') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={
                    mode === 'Render'
                        ? [
                              { required, message: 'This field is required' },
                              { min: attributes.minLength, message: `Minimum length is ${attributes.minLength}` },
                              { max: attributes.maxLength, message: `Maximum length is ${attributes.maxLength}` }
                          ]
                        : []
                }
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <InputText {...attributes} className='custom-element' />
            </FormItem>
        );
    } else if (elementType === 'email') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={
                    mode === 'Render'
                        ? [
                              {
                                  type: 'email',
                                  message: 'The input is not a valid email address!'
                              },
                              { required, message: 'This field is required' },
                              { min: attributes.minLength, message: `Minimum length is ${attributes.minLength}` },
                              { max: attributes.maxLength, message: `Maximum length is ${attributes.maxLength}` }
                          ]
                        : []
                }
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <InputText {...attributes} className='custom-element' />
            </FormItem>
        );
    } else if (elementType === 'phone number') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required, requireCountryCode } =
            formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={
                    mode === 'Render'
                        ? [
                              { required, message: 'This field is required' },
                              {
                                  pattern: /^\d{7,15}$/,
                                  message: 'Phone number must be between 7 and 15 digits long'
                              }
                          ]
                        : []
                }
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                {requireCountryCode ? (
                    <InputText
                        {...attributes}
                        maxLength={15}
                        addonBefore={
                            <FormItem
                                name='countryCode'
                                noStyle
                                rules={[{ required: true, message: 'Please select a country code' }]}
                                initialValue='+91'
                            >
                                <Select
                                    showSearch
                                    options={countryCodes}
                                    placeholder='Code'
                                    style={{ width: 120 }}
                                    filterOption={(input, option) =>
                                        (String(option?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </FormItem>
                        }
                        allowClear
                    />
                ) : (
                    <InputText {...attributes} maxLength={15} allowClear />
                )}
            </FormItem>
        );
    } else if (elementType === 'number') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={
                    mode === 'Render'
                        ? [
                              { required, message: 'This field is required' },
                              { min: attributes.min, message: `Minimum length is ${attributes.min}` },
                              { max: attributes.max, message: `Maximum length is ${attributes.max}` }
                          ]
                        : []
                }
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <InputNumber {...attributes} className='custom-element' />
            </FormItem>
        );
    } else if (elementType === 'date') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <Date {...attributes} className='custom-element' />
            </FormItem>
        );
    } else if (elementType === 'time') {
        const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <Time {...attributes} className='custom-element' />
            </FormItem>
        );
    } else if (elementType === 'button') {
        const { elementStyles, attributes } = formElement;
        const { placeholder, type, disabled, id } = attributes;

        formElementHtml = (
            <FormItem elementStyles={elementStyles}>
                <Button type='primary' htmlType={type} id={id} disabled={disabled} className='custom-element'>
                    {placeholder}
                </Button>
            </FormItem>
        );
    } else if (elementType === 'textarea') {
        const { label, labelPosition, labelStyles, elementStyles, attributes, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                <TextArea />
            </FormItem>
        );
    } else if (elementType === 'select') {
        const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;

        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                {formElement.dataSourceType === 'values' ? (
                    <Select
                        mode={attributes.multiple ? 'tags' : undefined}
                        options={options.map(({ label, value, disabled }) => ({ value, label, disabled }))}
                        defaultValue={options.filter((option) => option.selected).map((option) => option.value)}
                    />
                ) : (
                    <Select
                        mode={attributes.multiple ? 'tags' : undefined}
                        options={optionsFromApi.map(({ label, value }) => ({ value, label }))}
                    />
                )}
            </FormItem>
        );
    } else if (elementType === 'checkbox') {
        const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                {formElement.dataSourceType === 'values' ? (
                    <CheckboxGroup
                        options={options.map(({ label, value, disabled }) => ({
                            value,
                            label,
                            disabled
                        }))}
                        defaultValue={options.filter((option) => option.checked).map((option) => option.value)}
                    />
                ) : (
                    <CheckboxGroup options={optionsFromApi.map(({ label, value }) => ({ value, label }))} />
                )}
            </FormItem>
        );
    } else if (elementType === 'radio') {
        const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;
        const selectedValue = options.find((option) => option.checked);
        formElementHtml = (
            <FormItem
                layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
                label={label || ''}
                name={attributes.name}
                rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
                labelCol={{ className: 'custom-label' }}
                labelStyles={labelStyles}
                elementStyles={elementStyles}
            >
                {formElement.dataSourceType === 'values' ? (
                    <Radio
                        options={options.map(({ label, value, disabled }) => ({
                            value,
                            label,
                            disabled
                        }))}
                        defaultValue={selectedValue ? selectedValue.value : undefined}
                    />
                ) : (
                    <Radio options={optionsFromApi.map(({ label, value }) => ({ value, label }))} />
                )}
            </FormItem>
        );
    } else {
        formElementHtml = <></>;
    }

    if (mode === 'Builder') {
        const { isDragging, onDragStart, onDragOver, onDragEnd, formData, onEditElement, onRemove } = props;
        const formElementWrapperProps = {
            uid,
            formData,
            onEditElement,
            onRemove
        };

        return (
            <div
                key={index}
                className={`form-element ${isDragging && 'is-dragging'}`}
                id={uid}
                draggable
                onDragStart={() => onDragStart(elementType, uid, false)}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
            >
                <FormElementWrapper {...formElementWrapperProps}>{formElementHtml}</FormElementWrapper>
            </div>
        );
    } else {
        return (
            <div key={index} className='form-element'>
                {formElementHtml}
            </div>
        );
    }
};

export default GenerateFormHtml;
