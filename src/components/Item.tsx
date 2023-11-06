import { forwardRef, HTMLAttributes, CSSProperties, useState } from 'react';
import CheckBox from './Checkbox';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    image: Image;
    withOpacity?: boolean;
    isDragging?: boolean;
    isOver?: boolean;
    isSorting?: boolean;
    OnImageSelect?: (selectedId: number) => void;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(({ image, withOpacity, isDragging, isSorting, isOver, style, ...props }, ref) => {
    const [imageSelect, setImageSelect] = useState(false);
    const handleCheck = (check: boolean) => {
        setImageSelect(check);
        if (props.OnImageSelect) {
            props.OnImageSelect(image.id);
        }
    }
    return <div
        className={
            `group/item ${withOpacity ? 'opacity-50' : 'opacity-100'
            }  ${isDragging ? "cursor-grabbing" : "cursor-grab"
            } ${isDragging ? "scale-90" : "scale-100"
            } ${isOver ? "shadow-lg" : ""
            } ${image.order != 1 ? "" : "col-span-2 row-span-2"
            }`
        }
        
    >

        <div
            style={{ ...style }}
            ref={ref}
            {...props}
            className={`${!isDragging ? "origin-top-left" : "origin-center"} flex rounded-lg border border-dashed border-gray-600 overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
            <img src={image.src} alt={image.name} />
        </div>
        <div className={`${imageSelect ? "group-hover/item:bg-opacity-50 opacity-100 bg-opacity-0" : "group-hover/item:opacity-50 bg-opacity-50 opacity-0"
            } ${isOver || isDragging ? "hidden" : "block"
            } opacity-${imageSelect ? 100 : 0
            } absolute top-0 left-0 right-0 p-2 rounded-t-lg transition-opacity bg-black z-[0]`}>
            <CheckBox label="" onChange={handleCheck} />
        </div>
    </div>;
});

export default Item;
