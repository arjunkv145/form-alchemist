import { ReactNode, useEffect, useRef, useState } from "react";
import formElements, { FormElement } from "../formElements/formElements";
import { nanoid } from "nanoid";
import { rootPid } from "../constants/forms";

function Draggable({
    children,
    elementType,
    uid,
    isWidget,
    dropZoneRef,
    setFormData

}: {
    children: ReactNode;
    elementType: FormElement['elementType'];
    uid: string;
    isWidget: boolean;
    dropZoneRef: React.RefObject<HTMLDivElement>
    setFormData: React.Dispatch<React.SetStateAction<FormElement[]>>

}) {
    const [dragElement, setDragElement] = useState<{
        elementType: string;
        uid: string;
        isWidget: boolean;
    } | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const isInsideDropZone = useRef<boolean>(false)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        setDragElement({ elementType, uid, isWidget });
    };

    const handleDrop = () => {
        if (dragElement?.isWidget) {
            const formElement = formElements.find((fe) => fe.elementType === dragElement?.elementType);
            if (formElement) setFormData((prev) => [...prev, { ...formElement, uid: nanoid(), pid: rootPid }]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setPosition({
            x: 0,
            y: 0
        });
        const dropZone = dropZoneRef.current;
        if (!dropZone) return;
        dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
        setDragElement(null);
        if (isInsideDropZone.current) {
            handleDrop()
            isInsideDropZone.current = false
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y
                });

                const dropZone = dropZoneRef.current;
                if (!dropZone) return;
                if (!(e.target instanceof HTMLDivElement)) return;

                const { clientX, clientY } = e;
                const dropAreaRect = dropZone.getBoundingClientRect();

                if (
                    clientX > dropAreaRect.left &&
                    clientX < dropAreaRect.right &&
                    clientY > dropAreaRect.top &&
                    clientY < dropAreaRect.bottom
                ) {
                    dropZone.style.backgroundColor = 'hsl(0, 0%, 90%)';
                    isInsideDropZone.current = true
                    
                    const children = Array.from(dropZoneRef.current.children).filter(child => child.id !== uid);
                    let hoveredIndex = null;
                    const parentRect = dropZone.getBoundingClientRect();
                    const x = e.clientX - parentRect.left;
                    const y = e.clientY - parentRect.top;

                    children.forEach((child, index) => {
                        const rect = child.getBoundingClientRect();
                        const isHovered = (
                            x >= rect.left - parentRect.left &&
                            x <= rect.right - parentRect.left &&
                            y >= rect.top - parentRect.top &&
                            y <= rect.bottom - parentRect.top
                        );

                        if (isHovered) {
                            hoveredIndex = index;
                        }
                    })
                    if (hoveredIndex) console.log(hoveredIndex)
                } else {
                    dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
                    isInsideDropZone.current = false
                }
            }
        };

        if (isDragging) document.addEventListener('mousemove', handleMouseMove);
        else document.removeEventListener('mousemove', handleMouseMove);

        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isDragging, offset.x, offset.y]);
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
            {children}
        </div>
    );
}

export default Draggable