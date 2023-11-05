import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item, { ItemProps } from "./Item";

const SortableItem: FC<ItemProps> = (props) => {
    const {
        isDragging,
        isOver,
        isSorting,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isSorting?  transition || undefined: undefined,
    };

    return (
        <Item
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            isDragging={isDragging}
            isOver={isOver}
            isSorting={isSorting}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortableItem;
