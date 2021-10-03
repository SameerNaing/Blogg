import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/modal";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Center,
  Text,
  VStack,
  Image,
  AspectRatio,
} from "@chakra-ui/react";

interface Props {
  /** publishing status */
  isLoading: boolean;
  /** track modal open,close state */
  isOpen: boolean;
  /** function to close modal */
  onClose(): void;
  /** function to execute when user click 'ok' button on modal */
  onPublish(title: string, image: File): void;
}

const PublishDialog: React.FC<Props> = ({
  isLoading = false,
  isOpen = false,
  onClose,
  onPublish,
}) => {
  /** state to track user enter blog title */
  const [title, setTitle] = useState<string>("");

  /** state to track user select image for display */
  const [image, setImage] = useState<any | null>(null);

  /** state to track user select image file for upload */
  const [imgFile, setImgFile] = useState<File | null>(null);

  /** ref for input type image */
  const imgRef = useRef<HTMLInputElement>(null);

  /** execute when user chooses an image */
  const imageChangeHandler = (image: File) => {
    if (image && image.type.includes("image") && !isLoading) {
      setImgFile(image);
      let reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(image);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Publish</ModalHeader>
        <ModalBody>
          <Input
            value={title}
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
          <Input
            onChange={(e) => imageChangeHandler(e.target.files![0])}
            ref={imgRef}
            disabled={isLoading}
            hidden
            type="file"
          />
          {image && (
            <AspectRatio mt="20px" ratio={1.5}>
              <Image
                opacity={isLoading ? 0.5 : 1}
                cursor="pointer"
                borderRadius="12px"
                onClick={() => imgRef.current!.click()}
                src={image}
                alt="dispalyImage"
              />
            </AspectRatio>
          )}
          {!image && (
            <Center
              onClick={() => imgRef.current!.click()}
              mx="auto"
              mt="20px"
              h="200px"
              borderStyle="dashed"
              borderWidth="1px"
              borderRadius="lg"
              borderColor="orange"
              w="100%"
              cursor="pointer"
            >
              <VStack spacing="10px">
                <AddIcon color="grey" />
                <Text color="grey">Add Display Image</Text>
              </VStack>
            </Center>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => onPublish(title, imgFile!)}
            isLoading={isLoading}
            colorScheme="none"
            bg="orange"
            size="sm"
            disabled={image === null || title.trim().length === 0}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishDialog;
