import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import './gallery.css';



const DraggableImage = ({ data, index, moveImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);

  const [, drag] = useDrag({
    type: 'IMAGE',
    item: { id: data.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleTouchStart = () => {
    setIsDragging(true);
    drag();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drag(node);
        drop(node);
      }}
      className={isDragging ? 'image dragging' : 'image'}
      style={{ opacity, transition: 'opacity 0.2s ease', cursor: 'grab'}}
      onMouseEnter={() => setIsDragging(true)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={data.img} alt={data.tag} />
      <div className="image-tag">{data.tag}</div>
    </div>
  );
};


export default DraggableImage;