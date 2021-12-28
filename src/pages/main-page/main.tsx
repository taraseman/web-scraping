import { Box, Flex, Text, Select, Button } from "@chakra-ui/react";
import { Genre } from "../../types/genre";
import { useState } from "react";
import { genres } from "../../constants/constants";
import { postData } from "../../service/api/post-genre";

export function Main() {
  const [selectedGenre, setGenre] = useState<Genre | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    if (!selectedGenre) return;
    
    setIsLoading(true);
    await postData(selectedGenre);
    setIsLoading(false);
  };
  return (
    <Flex
      px="20px"
      h="100vh"
      w="100%"
      bgColor="#D3D3D3"
      alignItems="center"
      justify="center"
    >
      <Flex
        w={["98%", "80%", "50%", "35%"]}
        h="600px"
        p="10"
        pt="100px"
        borderRadius="12px"
        bgColor="white"
        boxShadow="md"
      >
        <Box>
          <Text mb="6" fontSize="24px" textAlign="center">
            Hello User,
            <br /> choose your favorite genre
          </Text>
          <Text mb="6" color="grey" fontSize="12px">
            This Web site helps you order (on Ebay) a DVD of your favorite genre
            random film after you'll have chosen the genre.
          </Text>
          <Select
            mb="6"
            placeholder="Choose your favorite Genre"
            size="md"
            onChange={(e) => {
              setGenre(
                genres.find((genre) => genre.id === e.target.value) || null
              );
            }}
          >
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.title}
              </option>
            ))}
          </Select>
          <Flex justify="flex-end">
            <Button
              colorScheme="teal"
              onClick={onSubmit}
              isDisabled={!selectedGenre}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
