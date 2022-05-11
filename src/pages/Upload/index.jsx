import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { SFV_CHARACTERS } from "../../utils/collections/characters";
import "./upload.scss";

export default function UploadPage() {
  const [characterModal, toggleCharacterModal] = useState(false);
  const [charactersSelected, setCharacters] = useState([]);
  const [formFields, setFormFields] = useState({
    clipType: "tech",
    clipTitle: "",
    clipDescription: "",
    clipURL: "",
  });

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => toggleCharacterModal(true);

  const handleCharacterSelection = (character) => {
    setCharacters([...charactersSelected, character]);
    if (charactersSelected.length > 0) {
      toggleCharacterModal(false);
    }
  };

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <h1>UploadYourTech</h1>
          <Col sm={6}>
            <Form>
              <Form.Group className='mb-3' controlId='selectClipType'>
                <Form.Label className='mt-2'>Clip type</Form.Label>
                <Form.Select
                  value={formFields.clipType}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipType: e.target.value })
                  }
                  aria-label='Select clip type'
                >
                  <option value='tech'>Tech</option>
                  <option value='match'>Match</option>
                  <option value='random'>Random</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3' controlId='uploadFormTitle'>
                <Form.Label className='mt-2'>Title</Form.Label>
                <Form.Control
                  value={formFields.clipTitle}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipTitle: e.target.value })
                  }
                  placeholder='Clip title'
                />
                <Form.Text className='text-muted'>
                  Explain the clip in a few words.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='uploadFormDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={formFields.clipDescription}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      clipDescription: e.target.value,
                    })
                  }
                  as='textarea'
                  placeholder='Clip description'
                />
                <Form.Text className='text-muted'>
                  Write here how the tech has to be implemented or highlight
                  your match moments.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='characterSelect'>
                <Form.Label>Characters</Form.Label>
                <div className='characters-selected'>
                  {charactersSelected.map((character) => (
                    <div key={character.name} className='character'>
                      <img src={character.image} alt={character.name} />
                      <span>{character.name}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={openCharacterModal}
                  variant='outline-primary'
                  style={{ width: "100%" }}
                  disabled={charactersSelected.length > 1}
                >
                  Add character <PlusCircle className='ms-2' />
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            <Form>
              <Form.Group className='mb-3' controlId='clipURL'>
                <Form.Label className='mt-2'>Video URL</Form.Label>
                <Form.Control
                  value={formFields.clipURL}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipURL: e.target.value })
                  }
                  placeholder='Clip URL'
                />
                <Form.Text className='text-muted'>
                  {"Paste here your clip URL (Youtube, Twitch, Stremeable...)"}
                </Form.Text>
              </Form.Group>
            </Form>
            <Form.Label>Preview</Form.Label>
            <Card style={{ margin: "0 10px" }}>
              <ReactPlayer
                width={"100%"}
                url={formFields.clipURL}
              />
              <Card.Body>
                <Card.Title>{formFields.clipTitle}</Card.Title>
                <Card.Text>{formFields.clipDescription}</Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                {charactersSelected.map((character) => (
                  <ListGroupItem className='characters-selected' key={character.name}>
                    <div className='character'>
                      <img src={character.image} alt={character.name} />
                      <span>{character.name}</span>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Card.Body>
                <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        show={characterModal}
        onHide={closeCharacterModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select your character</Modal.Title>
        </Modal.Header>
        <Modal.Body className='character-modal'>
          {SFV_CHARACTERS.map((character) => (
            <div
              onClick={() => handleCharacterSelection(character)}
              className='image-wrapper'
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
          <a href='https://twitter.com/RelusionH'>RelusionH</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}
