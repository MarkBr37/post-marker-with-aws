import { useState } from 'react';
import { Card ,Modal ,Button } from 'react-bootstrap';
import apiurls from '../config.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faEye,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faHeart as reHeart } from '@fortawesome/free-regular-svg-icons'


function PostCard({post,deletePost}){
  const [ loveIt, setLoveIt] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      <Card style={{ width: '18rem' }}>
        {post.image &&
        <Card.Img variant="top" src={ apiurls.srverUrl + apiurls.images + post.image } />
        }
        <Card.Body>
          {
            <Card.Title>{post.title}</Card.Title> 
          }
          { post.text &&
            <Card.Text>
              {post.text}
            </Card.Text>
          }
        
        </Card.Body>
        <Card.Footer>
          <div className='footer-post'>
            <div>
            <span className='views'>0</span>
            <FontAwesomeIcon icon={faEye} />
            </div>
            <input className='' type="text" placeholder="write a comment" />
            { !loveIt && <FontAwesomeIcon icon={reHeart} onClick={()=>setLoveIt(true)} />}
            { loveIt && <FontAwesomeIcon icon={faHeart} onClick={()=>setLoveIt(false)} />}
            <FontAwesomeIcon icon={faTrashCan} onClick={()=> setShowDeleteModal(true)}/>
          </div>
        </Card.Footer>
      </Card>

      <Modal show={showDeleteModal} /* onHide={handleClose} */>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> setShowDeleteModal(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={()=> {
              setShowDeleteModal(false);
              deletePost(post._id);
            }}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  )

}

export default PostCard;