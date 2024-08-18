import { useState, useEffect, ReactNode } from 'react';

function Draggable(props: { children: ReactNode; dropZoneRef: React.RefObject<HTMLDivElement> }) {
    return (
        <div
            style={{
                position: 'relative',
                // left: position.x,
                // top: position.y,
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex: isDragging ? 999 : 998
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {props.children}
        </div>
    );
}

export default Draggable;
