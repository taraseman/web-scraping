import { ChakraProvider } from "@chakra-ui/react";
import { Main } from './pages/main-page/main';

function App() {
  return (
    <ChakraProvider>
      <Main/>
    </ChakraProvider>
  );
}

export default App;
