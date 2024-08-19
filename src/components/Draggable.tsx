import { ReactNode, useEffect, useRef, useState } from 'react';
import formElements, { FormElement } from '../formElements/formElements';
import { nanoid } from 'nanoid';
import { rootPid } from '../constants/forms';

type DraggableProps = {
	children: ReactNode;
	elementType: FormElement['elementType'];
	uid: string;
	currentIndex?: number;
	isWidget: boolean;
	dropZoneRef: React.RefObject<HTMLDivElement>;
	formData: FormElement[];
	setFormData: React.Dispatch<React.SetStateAction<FormElement[]>>;
};

function Draggable({
	children,
	elementType,
	uid,
	currentIndex,
	isWidget,
	dropZoneRef,
	formData,
	setFormData,
}: DraggableProps) {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const isInsideDropZone = useRef<boolean>(false);
	const dropIndexRef = useRef<number>(Infinity);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setIsDragging(true);
		setOffset({ x: e.clientX, y: e.clientY });
	};

	const handleDrop = () => {
		// let dropIndex: number;

		// if (dropIndexRef.current === Infinity) dropIndex = formData.length;
		// else dropIndex = dropIndexRef.current;

		if (isWidget) {
			const formElement = formElements.find(fe => fe.elementType === elementType);
			if (formElement) setFormData(prev => [...prev, { ...formElement, uid: nanoid(), pid: rootPid }]);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setPosition({
			x: 0,
			y: 0,
		});
		const dropZone = dropZoneRef.current;
		if (!dropZone) return;
		dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
		if (isInsideDropZone.current) {
			handleDrop();
			isInsideDropZone.current = false;
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			});

			const dropZone = dropZoneRef.current;
			if (!dropZone) return;
			if (!(e.target instanceof HTMLDivElement)) return;

			const { clientX, clientY } = e;
			const dropZoneRect = dropZone.getBoundingClientRect();

			if (
				clientX > dropZoneRect.left &&
				clientX < dropZoneRect.right &&
				clientY > dropZoneRect.top &&
				clientY < dropZoneRect.bottom
			) {
				dropZone.style.backgroundColor = 'hsl(0, 0%, 90%)';
				isInsideDropZone.current = true;

				// const children = Array.from(dropZoneRef.current.children).filter(child => child.id !== uid);
				const children = Array.from(dropZoneRef.current.children);
				let hoveredIndex: number = Infinity;
				const x = clientX;
				const y = clientY;

				children.forEach((child, childIndex) => {
					if (child.id === uid) return;
					child.classList.remove('top-space');
					child.classList.remove('bottom-space');

					const dropChildRect = child.getBoundingClientRect();
					const { clientHeight } = child;
					const isHovered =
						x >= dropChildRect.left &&
						x <= dropChildRect.right &&
						y >= dropChildRect.top &&
						y <= dropChildRect.bottom;

					if (isHovered) {
						const verticalCenter = dropChildRect.top + clientHeight / 2;
						const distanceFromCenter = verticalCenter - clientY;

						if (currentIndex === undefined) return;
						if (currentIndex + 1 === childIndex && distanceFromCenter >= 0) return;
						if (currentIndex - 1 === childIndex && distanceFromCenter <= 0) return;

						hoveredIndex = childIndex;

						if (distanceFromCenter >= 0) {
							// setPosition(prev => ({
							// 	...prev,
							// 	y: e.clientY - 50, // 50px is the margin top of .top-space class
							// }));
							dropZone.children[hoveredIndex].classList.add('top-space');
						} else {
							// setPosition(prev => ({
							// 	...prev,
							// 	y: e.clientY,
							// }));
							dropZone.children[hoveredIndex].classList.add('bottom-space');
						}
					} else {
						// setPosition({
						// 	x: e.clientX - offset.x,
						// 	y: e.clientY - offset.y,
						// });
					}
				});
				if (hoveredIndex !== Infinity) {
					dropIndexRef.current = hoveredIndex;
					console.log(hoveredIndex);
				}
			} else {
				dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
				isInsideDropZone.current = false;
			}
		};

		if (isDragging) document.addEventListener('mousemove', handleMouseMove);
		else document.removeEventListener('mousemove', handleMouseMove);

		return () => document.removeEventListener('mousemove', handleMouseMove);
	}, [isDragging, offset.x, offset.y, dropZoneRef, currentIndex, uid, setFormData]);

	return (
		<div
			style={{
				position: 'relative',
				transform: `translate(${position.x}px, ${position.y}px)`,
				cursor: isDragging ? 'grabbing' : 'grab',
				userSelect: 'none',
				zIndex: isDragging ? 999 : 998,
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
		</div>
	);
}

export default Draggable;
