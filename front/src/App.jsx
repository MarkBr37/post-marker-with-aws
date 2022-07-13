import './App.css';
import { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap'
import NavBar from './components/navbar';
import PostCard from './components/postCard';
import ModalComponent from './components/modal';

import apiUrls from './config.json';

function App() {
  const [showModal, setShowModal] = useState(false)
  const [posts, setPosts] = useState([]);


  useEffect(()=>{

    (async ()=>{
      const res = await fetch(apiUrls.srverUrl + apiUrls.post);
      const data = await res.json();
      setPosts(data)
    })()

  },[])


  const deletePost = async (id) =>{

    await fetch(apiUrls.srverUrl + apiUrls.post + '/' + id, {
      method: 'DELETE',
    }).then((res) =>{
      if(res.status === 200){
        setPosts((allposts) => allposts.filter(post => post._id !== id))
      }
    }
    ).catch(err => console.log('server error', err))

  }

  const addPost = (post) =>{
    setPosts((allposts) => [post, ...allposts])
  }

  return (
    <div className="App" >
      <header>
        <NavBar name={'Post Maker'} />
      </header>

      <main>
        <Container>

          <div className='center-btn '>
            <Button className='btn-lg' onClick={()=> setShowModal(true)} >Creat Post</Button>
          </div>

          {posts.length > 0 &&<div className='posts'>
            {posts.map(post => <PostCard key={post._id} post={post} deletePost={deletePost} />)}
          </div>  }

          <ModalComponent 
          show={showModal}
          onClose={addPost}
          onHide={() => setShowModal(false)}/>

        </Container>

        
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
