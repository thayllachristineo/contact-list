import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

import { clearPhoneString, getInputMaskPhoneNumber } from './PhoneInput.utils';

interface IProps extends InputProps {
  handleOnChange: (_phone: string) => void;
  value?: string;
}

const PhoneInput: FC<IProps> = ({ handleOnChange, value = '', ...rest }) => {
  const [phone, setPhone] = useState(() => value || '');

  useEffect(() => {
    if (value !== undefined) setPhone(value);
  }, [value]);

  const formatInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanPhone = clearPhoneString(e.currentTarget.value).slice(0, 11);
    setPhone(cleanPhone);
    handleOnChange(cleanPhone);
  };

  return (
    <Input
      {...rest}
      type="tel"
      value={getInputMaskPhoneNumber(phone)}
      onChange={formatInputValue}
      maxLength={15}
    />
  );
};

export default PhoneInput;
