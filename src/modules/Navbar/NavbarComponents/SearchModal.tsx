import { useState } from "react";

import search from "@/modules/Navbar/api";
import {
  Input,
  Modal,
  VStack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

import Link from "next/link";

interface Props {
  /** track modal open,close state */
  isOpen: boolean;
  /** function to close modal */
  onClose(): void;
}

/** Give modal design for blog post search */
const SearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  /** Function to execute when user enter keyword in search input field */
  const onSearch = async (s: string) => {
    setTimeout(async () => {
      if (s.trim().length === 0) {
        setSearchResults([]);
      } else {
        const data = await search(s);
        setSearchResults(data.slice(0, 5));
      }
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay data-cy="search-modal-backdrop" />
      <ModalContent data-cy="search-modal" w="90%" maxW="500px">
        <ModalHeader>
          <Input
            onChange={(e) => onSearch(e.target.value)}
            variant="unstyled"
            placeholder="Search"
          />
        </ModalHeader>
        <ModalBody>
          <VStack
            opacity={0.8}
            color="grey"
            alignItems="self-start"
            spacing={5}
          >
            {searchResults.map((s) => (
              <Link key={s.id} href={`/blogPosts/${s.id}`}>
                <a>{s.title}</a>
              </Link>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
