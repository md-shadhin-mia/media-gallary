import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useState } from "react"
import SortableItem from "./SortableItem";
import Checkbox from "./Checkbox";
type Props = {
    images: Image[]
    setImages: (images: Image[]) => void
}
function ImageGallery(props: Props) {
    const [images, setImages] = useState(props.images);
    const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setImages((items) => {
                const dragedIndex = items.findIndex((item) => item.id === active.id);
                const droppedIndex = items.findIndex((item) => item.id === over?.id);
                // move items in array and re-order of items
                const newItesm = arrayMove(items, dragedIndex, droppedIndex).map((item, index) => {
                    item.order = index + 1;
                    return item
                });
                return newItesm;
            });
        }
    }, []);

    const handleDelete = () => {
        setImages((pre) => {
            return pre.filter((image) => !selectedImageIds.includes(image.id)).map((item, index) => {
                item.order = index + 1;
                return item
            });
        });
        setSelectedImageIds([]);
    }

    return (
        <div>
            <div className="flex items-center h-16 bg-slate-100 mb-8 px-8">
                {selectedImageIds.length ? <>
                    <Checkbox label="" checked />
                    <span>{selectedImageIds.length} Files Selected</span>
                    <button className="ml-auto font-bold text-red-600 hover:bg-red-200 rounded-lg px-4 py-2" onClick={handleDelete}>Delete Files</button>
                </> : <h2 className="text-2xl">Image Gallery</h2>}

            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={images} strategy={rectSortingStrategy}>
                    <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 gap-2 lg:gap-4">
                        {images.map((image) => (
                            <SortableItem image={image} OnImageSelect={(selectedId) => {
                                setSelectedImageIds((ids) => {
                                    if (ids.includes(selectedId)) {
                                        return ids.filter((id) => id !== selectedId);
                                    }
                                    return [...ids, selectedId];
                                })
                            }} key={image.id} />
                        ))}
                        <div className="flex rounded-lg border border-dashed justify-center flex-col items-center bg-slate-200 hover:bg-slate-300 border-gray-600 overflow-hidden ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 1024 1024"
                                {...props}
                            >
                                <path
                                    stroke="none"
                                    d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1a8.11 8.11 0 0 1-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l229.6 271.6c2.6 3.3 2.2 8.4-1.2 11.2z"
                                />
                            </svg>
                            Add Image
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}


export default ImageGallery;

