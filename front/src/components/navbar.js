import {Navbar, Container} from 'react-bootstrap';

function NavBar({name}){
    
    return (

        <Navbar bg="dark" variant="dark">
            <Container className='center-nav'>
                
                    <Navbar.Brand >{name}</Navbar.Brand>
                
            </Container>
        </Navbar>
    )
}

export default NavBar;