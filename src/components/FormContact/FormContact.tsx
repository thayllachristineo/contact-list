import { FC, PropsWithChildren } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

import { TContactForm } from '../../types';
import PhoneInput from '../PhoneInput';

type TProps = {
  defaultValues?: TContactForm;
  onSubmit: (_data: TContactForm) => void;
};

const FormContact: FC<PropsWithChildren<TProps>> = ({
  defaultValues,
  onSubmit,
  children,
}) => {
  const { control, handleSubmit } = useForm<TContactForm>({ mode: 'onChange' });

  const phoneValidationsRules = {
    minLength: {
      message: 'Digite um número válido',
      value: 10,
    },
    maxLength: {
      message: 'Digite um número válido',
      value: 11,
    },
  };

  const fields = [
    {
      name: 'name',
      label: 'Nome',
      defaultValue: defaultValues?.name,
      isPhoneInput: false,
      rules: {
        required: 'Campo obrigatório',
      },
    },
    {
      name: 'mainPhone',
      label: 'Telefone principal',
      defaultValue: defaultValues?.mainPhone,
      isPhoneInput: true,
      rules: {
        required: 'Campo obrigatório',
        ...phoneValidationsRules,
      },
    },
    {
      name: 'cellPhone',
      label: 'Telefone celular',
      isPhoneInput: true,
      defaultValue: defaultValues?.cellPhone,
      rules: {
        ...phoneValidationsRules,
      },
    },
    {
      name: 'homePhone',
      label: 'Telefone residencial',
      isPhoneInput: true,
      defaultValue: defaultValues?.homePhone,
      rules: {
        ...phoneValidationsRules,
      },
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <Controller
            key={field.name}
            control={control}
            name={field.name as keyof TContactForm}
            rules={field.rules}
            defaultValue={field.defaultValue}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl
                isInvalid={!!error?.message}
                isRequired={!!field.rules?.required}
                mb={4}
              >
                <FormLabel m={0}>{field.label}</FormLabel>
                {field.isPhoneInput ? (
                  <PhoneInput
                    handleOnChange={onChange}
                    value={value as string}
                  />
                ) : (
                  <Input value={value} onChange={onChange} />
                )}
                {error?.message && (
                  <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
        ))}

        {children}
      </form>
    </>
  );
};

export default FormContact;
