// src/app/components/MoviesPanel.tsx

"use client"; // Ajout de la directive

import { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Button, Flex } from "@chakra-ui/react";
import { movies } from "./moviesData";

export default function MoviesPanel() {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  // Calculer le début et la fin des films à afficher
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Fait défiler la page en douceur
    });
  };

  // Appelle la fonction scrollToTop chaque fois que la page change
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  // Gestion du changement de page
  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width={{ base: "95%", md: "60%" }}
      maxWidth="500px"
      mb="9"
    >
      {currentMovies.map((movie, index) => (
        <Box
          key={index}
          width="100%"
          bg="gray.100"
          mb="4"
          borderRadius="8px"
          overflow="hidden"
        >
          <Grid templateColumns="35% 65%" gap={3} p="2">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width="100%"
              objectFit="contain"
            />
            <Box pr="12px">
              <Text fontWeight="extrabold" fontSize="2xl" color="gray.900">
                {movie.title}
              </Text>
              <Text fontSize="sm" color="gray.900">
                {movie.releaseDate} | {movie.duration} | {movie.genre}
              </Text>
              <Text fontSize="sm" pt="2">
                <Text as="span" color="gray.600">
                  De
                </Text>
                <Text as="span" color="gray.900" fontWeight="bold">
                  {` ${movie.director}`}
                </Text>
              </Text>
              <Text fontSize="sm">
                <Text as="span" color="gray.600">
                  Avec
                </Text>
                <Text as="span" color="gray.900" fontWeight="bold">
                  {` ${movie.cast}`}
                </Text>
              </Text>
            </Box>
          </Grid>
          <Box pt="1" pb="3" px="3">
            <Text color="gray.900">{movie.description}</Text>
          </Box>
        </Box>
      ))}

      {/* Pagination Buttons */}
      <Flex justifyContent="space-between" mt="4">
        <Button onClick={prevPage} isDisabled={currentPage === 1} width="125px">
          Précédent
        </Button>
        <Button
          onClick={nextPage}
          isDisabled={currentPage === Math.ceil(movies.length / moviesPerPage)}
          width="125px"
        >
          Suivant
        </Button>
      </Flex>
    </Box>
  );
}
