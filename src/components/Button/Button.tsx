import { FC } from 'react';
import { Button } from '@chakra-ui/react';

type TProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
};

const SubmitButton: FC<TProps> = ({ type }) => {
  return (
    <Button type={type} colorScheme="teal" my={2} width="100%">
      Salvar
    </Button>
  );
};

export default SubmitButton;
