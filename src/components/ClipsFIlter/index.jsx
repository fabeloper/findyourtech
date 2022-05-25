import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { SFV_CHARACTERS } from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import CharactersModal from "../CharactersModal";

const ClipsFilter = () => {
  const [showCharacterModal, toggleCharacterModal] = useState(false);

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => toggleCharacterModal(true);

  const handleCharacterSelection = (character) => {
    console.log(character);
  };

  return (
    <Form>
      <Stack direction="horizontal">
        <Form.Group className="m-2" controlId="selectVideogame">
          <Form.Select aria-label="Select videogame">
            <option value="">Clip type...</option>
            <option value="tech">Tech</option>
            <option value="match">Match</option>
            <option value="random">Random</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="selectVideogame">
          <Form.Select aria-label="Select videogame">
            <option value="">Videogame...</option>
            {VIDEOGAMES.map((videogame) => (
              <option key={videogame.code} value={videogame.code}>
                {videogame.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button
          onClick={openCharacterModal}
          variant="outline-primary"
          className="ms-2"
          disabled={false}
        >
          Add character <PlusCircle className="ms-2" />
        </Button>
        <Form.Group controlId="search" className="w-50 m-3">
          <Form.Control type="text" placeholder="Search..." />
        </Form.Group>
        <Button variant="dark" className="ms-auto m-2" type="submit">
          Search
        </Button>
        <Button variant="light" type="submit">
          Reset
        </Button>
      </Stack>
      <CharactersModal
        showCharacterModal={showCharacterModal}
        closeCharacterModal={closeCharacterModal}
        characters={SFV_CHARACTERS}
        handleSelection={handleCharacterSelection}
        videogame={"sfv"}
      />
    </Form>
  );
};

export default ClipsFilter;
