import { Container,Nav,Navbar } from "react-bootstrap";
import {auth} from "../firebase"
import {signOut} from "firebase/auth"

export default function Navigation(){


    return (
        <>
            <Navbar variant="light" bg="light">
            <Container>
            <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
            <Nav>
                <Nav.Link href="/add">New Post</Nav.Link>
                <Nav.Link href="/add"
                onClick={
                (e) => signOut(auth)
                }
                >🚪</Nav.Link>
            </Nav>
            </Container>
            </Navbar>
        </>
    )
}

