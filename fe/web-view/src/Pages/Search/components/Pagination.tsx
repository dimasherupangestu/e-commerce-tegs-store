import { Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <HStack spacing={4} justifyContent="center" mt={8} >
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
            >
                Previous
            </Button>
            <Text>
                Page {currentPage} of {totalPages}
            </Text>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
            >
                Next
            </Button>
        </HStack>
    );
};

export default Pagination;
