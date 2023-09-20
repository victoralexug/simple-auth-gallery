import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableImage from './DraggableImage'; 
import './gallery.css';
import data from '../../data';
import Spinner from './Spinner';
  
function ImageGallery({ user, auth }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    // Filter images based on searchQuery
    const filteredImages = images.filter((image) =>
      image.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    
    // Function to move an image in the array
    const moveImage = (fromIndex, toIndex) => {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImages(updatedImages);
      };

    useEffect(() => {
      setTimeout(() => {
        setImages(data.GalleryData);
        setLoading(false);
      }, 2000);
    }, []);


    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            navigate('/signin');
          })
          .catch((error) => {
            // Handle any errors during sign out
            console.error('Error signing out:', error);
          });
      };
    
  
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
            {loading ? (
                // Display loading spinner while images are loading
                <Spinner />
                ) : (
                <div>
                    <div className="header">
                        <h2>Welcome, <span className='user-email'>{user.email}</span></h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search images by tag..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>

                    <div className="image-grid">
                        {filteredImages.map((data, index) => (
                            <DraggableImage
                                key={data.id}
                                data={data}
                                index={index}
                                moveImage={moveImage}
                            />
                        ))}
                    </div>

                    <div className="sign-up">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            )}
        </DndProvider>
      </div>
    );
  }
  
  export default ImageGallery;
  