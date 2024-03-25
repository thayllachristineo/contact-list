import { FC, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Text,
  Box,
  ModalFooter,
  Button,
  Heading,
  ButtonGroup,
  Divider,
} from '@chakra-ui/react';

import { removeContact, updateContact } from '../../services';
import { TContact, TContactForm } from '../../types';
import FormContact from '../FormContact';
import SubmitButton from '../Button/Button';

type TProps = TContact & {
  isOpen: boolean;
  onClose: () => void;
  onRemove?: (_data: TContact) => void;
};

const PersonModal: FC<TProps> = ({
  id,
  name,
  isOpen = false,
  onClose,
  mainPhone,
  cellPhone,
  homePhone,
  onRemove,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [contact, setContact] = useState<TContactForm>({
    name,
    mainPhone,
    cellPhone,
    homePhone,
  });

  const handleRemove = async () => {
    await removeContact(id);
    onRemove?.({ id, name, mainPhone, cellPhone, homePhone });
    onClose();
  };

  const onSubmit = async (data: TContactForm) => {
    await updateContact(id, data);
    setContact(data);
    setIsEditMode(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsEditMode(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box pt={4} px={4}>
            <Box display="flex" justifyContent="center" pt={5}>
              <Avatar size="xl" name={contact.name} mb={2} />
            </Box>
            {!isEditMode ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={'column'}
                  gap={2}
                >
                  <Heading as="h3" size="lg">
                    {contact.name}
                  </Heading>
                  <Box display="flex" gap={2} alignItems="center">
                    <Text fontSize="sm" color="gray.500">
                      Principal
                    </Text>
                    <Text>{contact.mainPhone}</Text>
                  </Box>
                  <Divider mt={1} />
                </Box>

                <Box display="flex" gap={2} alignItems="center" pt={2} my={1}>
                  <Text fontSize="sm" color="gray.500">
                    Celular
                  </Text>
                  <Text>{contact?.cellPhone || '-'}</Text>
                </Box>
                <Box display="flex" gap={5} alignItems="center" my={1}>
                  <Text fontSize="sm" color="gray.500">
                    Casa
                  </Text>
                  <Text>{contact?.homePhone || '-'}</Text>
                </Box>
              </>
            ) : (
              <FormContact
                onSubmit={onSubmit}
                defaultValues={{
                  name: contact.name,
                  mainPhone: contact.mainPhone,
                  cellPhone: contact?.cellPhone,
                  homePhone: contact?.homePhone,
                }}
              >
                <SubmitButton type="submit" />
              </FormContact>
            )}
          </Box>
        </ModalBody>

        <ModalFooter justifyContent="center">
          {!isEditMode && (
            <ButtonGroup variant="outline" spacing="4" display="flex">
              <Button colorScheme="red" onClick={handleRemove} width="175px">
                Excluir
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => setIsEditMode(true)}
                width="175px"
              >
                Editar
              </Button>
            </ButtonGroup>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
