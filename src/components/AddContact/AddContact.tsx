import { FC } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  IconButton,
  ModalHeader,
} from '@chakra-ui/react';

import { TContactForm } from '../../types';
import { addContact } from '../../services';
import FormContact from '../FormContact';
import SubmitButton from '../Button';

type TProps = {
  onInsert?: (_data: TContactForm) => void;
};
const AddContact: FC<TProps> = ({ onInsert }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (data: TContactForm) => {
    await addContact(data);

    onClose();
    onInsert?.(data);
  };

  return (
    <>
      <Box position="fixed" bottom="20px" right="20px">
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Done"
          fontSize="20px"
          icon={<AddIcon />}
          onClick={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar contato</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormContact onSubmit={onSubmit}>
                <SubmitButton type="submit" />
              </FormContact>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddContact;
