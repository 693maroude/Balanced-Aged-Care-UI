import React,{useState} from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Button from "./styles/Button";
import StyledModal from "./styles/StyledModal";

const App = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return(
    <>
        <Button onClick = {()=>setModalIsOpen(true)}>Click Me!</Button>
        <StyledModal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)} shouldCloseOnOverlayClick={false}>
            <h1>This is a Modal</h1>
            welcome
            <Button onClick = {()=>setModalIsOpen(false)}>Close</Button>
        </StyledModal>
        <GlobalStyle/>
    </>
)}

export default App;
