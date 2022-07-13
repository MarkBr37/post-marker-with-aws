import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import apiUrls from '../config.json';


function ModalComponent(props){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    const [imageErrors, setImageErrors] = useState('');

    function isFieldsEmpty(){
        if(!title && !text && !image) return true;
        return false;     
    }


    function handleImage(e){

        let file = e.target.files[0];
        const imageErrors = {};
        const megabyte = 10;
        const maxSize = 1024 * 1024 * megabyte;
        const re = /\.(png|jpeg|jpg|gif|bmp)$/
        let imageValid = true;
  
        // validate image 
        if(file && file.size > maxSize){
           imageErrors['imageSize'] = true;
           imageValid = false;
        }else setImageErrors('');
  
        if(file && !re.test(file.name.toLowerCase())){
           imageErrors['imageFile'] = true;
           imageValid = false;
        }else setImageErrors('');
  
        if( imageValid ){
           setImage(file);

        }else{

           e.currentTarget.value = '';
           setImage('');
           setImageErrors(imageErrors);
        }
    }


    function handleSubmit(e){
        e.preventDefault();

        if(isFieldsEmpty()) return alert('Please fill one of the fields or choose image');

        setLoading(true);

        (async ()=>{
            const formData = new FormData();

            formData.append('title', title);
            formData.append('text', text);
            formData.append('file', image);

            await fetch(apiUrls.srverUrl + apiUrls.post, {
                method: 'POST',
                body: formData,
            })
            .then((res) =>{
                if(res.status === 400){
                    setLoading(false)
                    res.text().then(text => console.log(text))
                }
                if(res.status === 200){
                    setLoading(false)
                    res.json().then(json => props.onClose(json))
                    props.onHide()
                }

            })
            .catch(err => {
                setLoading(false)
                console.log('server error', err)
            })  

        })()
        
    }
    

    return(
    
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Group className="mb-3">

                        <Form.Label>Add Title</Form.Label>
                        <Form.Control type="text" name='title' onChange={({currentTarget})=> setTitle(currentTarget.value) } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Textarea</Form.Label>
                        <Form.Control as="textarea" name='text' onChange={({currentTarget})=> setText(currentTarget.value)} rows={3} />
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name='image' onChange={handleImage} multiple />


                        <span className={imageErrors['imageFile'] ? 'text-danger' : 'info'}>Image have to be: png / jpeg / jpg / gif / bmp</span>
                        <br/>
                        <span className={imageErrors['imageSize'] ? 'text-danger' : 'info'}>Image have to be max 10MB</span>


                    </Form.Group>

                    {!loading && <Button variant="primary" type="submit" disabled={isFieldsEmpty()}>
                        Create post
                    </Button>}
                    {loading && 
                        <Button variant="primary" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                            Loading...
                        </Button>
                    }
                   
                    
                </Form>

            </Modal.Body>
        </Modal>
    )
}

export default ModalComponent;