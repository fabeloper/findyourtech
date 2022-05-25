import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import {
  SFV_CHARACTERS,
  MVSUS_CHARACTERS,
} from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import "./upload.scss";
import ClipItemCard from "../../components/ClipItemCard";
import { AuthenticationContext } from "../../App";
import createNewClip from "../../functions/createNewClip";
import CharactersModal from "../../components/CharactersModal";
import { useNavigate } from "react-router";

export default function UploadPage() {
  const { user, setUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [characterModal, toggleCharacterModal] = useState(false);
  const [charactersSelected, setCharactersSelected] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [formFields, setFormFields] = useState({
    clipVideogame: "",
    clipType: "",
    clipTitle: "",
    clipDescription: "",
    clipURL: "",
  });

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => toggleCharacterModal(true);

  useEffect(() => {
    switch (formFields.clipVideogame) {
      case "sfv":
        setCharacters(SFV_CHARACTERS);
        break;
      case "mvsus":
        setCharacters(MVSUS_CHARACTERS);
        break;
      default:
        setCharacters(SFV_CHARACTERS);
        break;
    }
  }, [formFields.clipVideogame]);

  const handleCharacterSelection = (character) => {
    setCharactersSelected([...charactersSelected, character]);
    if (charactersSelected.length > 0) {
      toggleCharacterModal(false);
    }
  };

  const createClip = () => {
    const { clipVideogame, clipType, clipTitle, clipDescription, clipURL } =
      formFields;
    const {
      displayName,
      photoURL,
      reloadUserInfo: { screenName },
    } = user;

    createNewClip({
      videogame: clipVideogame,
      user: {
        name: displayName,
        photoURL,
        twitter: `https://twitter.com/${screenName}`,
      },
      url: clipURL,
      type: clipType,
      title: clipTitle,
      description: clipDescription,
      characters: charactersSelected,
    }).then(() => navigate('/'));
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <h1>UploadYourTech</h1>
          <Col sm={6}>
            <Form>
              <Form.Group className="mb-3" controlId="selectVideogame">
                <Form.Label className="mt-2">Videogame</Form.Label>
                <Form.Select
                  value={formFields.clipVideogame}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      clipVideogame: e.target.value,
                    })
                  }
                  aria-label="Select videogame"
                >
                  <option value="">Select videogame...</option>
                  {VIDEOGAMES.map((videogame, i) => (
                    <option key={i} value={videogame.code}>
                      {videogame.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="selectClipType">
                <Form.Label className="mt-2">Clip type</Form.Label>
                <Form.Select
                  value={formFields.clipType}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipType: e.target.value })
                  }
                  aria-label="Select clip type"
                >
                  <option value="">Select clip type...</option>
                  <option value="tech">Tech</option>
                  <option value="match">Match</option>
                  <option value="random">Random</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="uploadFormTitle">
                <Form.Label className="mt-2">Title</Form.Label>
                <Form.Control
                  value={formFields.clipTitle}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipTitle: e.target.value })
                  }
                  placeholder="Clip title"
                />
                <Form.Text className="text-muted">
                  Explain the clip in a few words.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="uploadFormDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={formFields.clipDescription}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      clipDescription: e.target.value,
                    })
                  }
                  as="textarea"
                  placeholder="Clip description"
                />
                <Form.Text className="text-muted">
                  Write here how the tech has to be implemented or highlight
                  your match moments.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="characterSelect">
                <Form.Label>Characters</Form.Label>
                <div className="characters-selected">
                  {charactersSelected.map((character) => (
                    <div key={character.name} className="character">
                      <img src={character.image} alt={character.name} />
                      <span>{character.name}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={openCharacterModal}
                  variant="outline-primary"
                  style={{ width: "100%" }}
                  disabled={
                    charactersSelected.length > 1 ||
                    formFields.clipVideogame === ""
                  }
                >
                  Add character <PlusCircle className="ms-2" />
                </Button>
                <Button
                  onClick={createClip}
                  variant="primary"
                  style={{ width: "100%", marginTop: "10px" }}
                  disabled={
                    formFields.clipType === "" || formFields.clipURL === ""
                  }
                >
                  Create clip!
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            <Form>
              <Form.Group className="mb-3" controlId="clipURL">
                <Form.Label className="mt-2">Video URL</Form.Label>
                <Form.Control
                  value={formFields.clipURL}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipURL: e.target.value })
                  }
                  placeholder="Clip URL"
                />
                <Form.Text className="text-muted">
                  {"Paste here your clip URL (Youtube, Twitch, Stremeable...)"}
                </Form.Text>
              </Form.Group>
            </Form>
            <Form.Label>Preview</Form.Label>
            <ClipItemCard
              clipURL={formFields.clipURL}
              clipTitle={formFields.clipTitle}
              clipDescription={formFields.clipDescription}
              charactersSelected={charactersSelected}
              userName={user.displayName}
              userPhotoURL={user.photoURL}
              userTwitterURL={`https://twitter.com/${user.reloadUserInfo.screenName}`}
            />
          </Col>
        </Row>
      </Container>
      <CharactersModal
        showCharacterModal={characterModal}
        closeCharacterModal={closeCharacterModal}
        characters={characters}
        handleSelection={handleCharacterSelection}
        videogame={formFields.clipVideogame}
       />
    </>
  );
}
