import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './gallery.css';


const DraggableImage = ({ data, index, moveImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [, ref] = useDrag({
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

  return (
    <div ref={(node) => ref(drop(node))} className={isDragging ? "image dragging" : "image"} style={{ opacity, transition: 'opacity 0.2s ease' }} onMouseEnter={() => setIsDragging(true)} onMouseLeave={() => setIsDragging(false)}>
      <img src={data.img} alt={data.tag} />
      <div className="image-tag">{data.tag}</div>
    </div>
  );
};

export default DraggableImage;