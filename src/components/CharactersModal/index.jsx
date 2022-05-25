import React from "react";
import { Modal } from "react-bootstrap";

const CharactersModal = ({
  showCharacterModal,
  closeCharacterModal,
  characters,
  handleSelection,
  videogame,
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={showCharacterModal}
      onHide={closeCharacterModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select your character</Modal.Title>
      </Modal.Header>
      <Modal.Body className="character-modal">
        {characters.map((character) => (
          <div
            onClick={() => handleSelection(character)}
            className="image-wrapper"
            key={character.name}
          >
            <img
              style={{ maxWidth: "100%" }}
              src={character.image}
              alt={character.name}
            />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        Images credit goes to{" "}
        {videogame === "sfv" && (
          <a
            target="_blank"
            href="https://twitter.com/RelusionH"
            rel="noreferrer"
          >
            RelusionH
          </a>
        )}
        {videogame === "mvsus" && (
          <a
            target="_blank"
            href="https://multiversus.com/en-gb/roster"
            rel="noreferrer"
          >
            Multiversus official page
          </a>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CharactersModal;