import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";

import { deleteDoc, doc, getDoc } from "firebase/firestore"; 
import Navigation from "../components/Navigation";

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const id = params.id;
  const [user,loading ]= useAuthState(auth)
  const navigate = useNavigate()

  async function deletePost(id) {
    await deleteDoc(doc(db,"posts",id));
    navigate("/")
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db,"posts",id));
    const post = postDocument.data()
    setCaption(post.caption);
    setImage(post.image);
  }

  useEffect(() => {
    if (loading ) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id,navigate,user,loading]);

  return (
    <>
      <Navigation/>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{caption}</Card.Text>
                <Card.Link href={`/update/${id}`}
                onClick={() => getPost()}
                >Edit</Card.Link>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
