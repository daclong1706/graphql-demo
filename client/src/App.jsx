import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import Author from "./pages/Author";
import Publisher from "./pages/Publisher";
import client from "./graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="author" element={<Author />} />
            <Route path="publisher" element={<Publisher />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
