import { DndContext, MouseSensor,TouchSensor, useSensor, useSensors, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useState } from "react"
import SortableItem from "./SortableItem";
import Checkbox from "./Checkbox";
type Props={
    images:Image[]
    setImages:(images:Image[])=>void
}
function ImageGallery(props:Props) {
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

    const handleDelete =()=>{
        setImages((pre)=>{
            return pre.filter((image)=> !selectedImageIds.includes(image.id)).map((item, index) => {
                item.order = index + 1;
                return item
            });
        });
        setSelectedImageIds([]);
    }

    return (
        <div>
            <div className="flex items-center h-16 bg-slate-100 mb-8 px-8">
               {selectedImageIds.length?<> 
               <Checkbox label="" checked/> 
               <span>{selectedImageIds.length} Files Selected</span>
               <button className="ml-auto font-bold text-red-600 hover:bg-red-200 rounded-lg px-4 py-2" onClick={handleDelete}>Delete Files</button>
               </>: <h2 className="text-2xl">Image Gallery</h2>}
                
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={images} strategy={rectSortingStrategy}>
                    <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 gap-2 lg:gap-4">
                    {images.map((image) => (
                        <SortableItem image={image} OnImageSelect={(selectedId)=>{
                            setSelectedImageIds((ids) => {
                                if (ids.includes(selectedId)) {
                                    return ids.filter((id) => id !== selectedId);
                                }
                                return [...ids, selectedId];
                            })
                        }} key={image.id}/>
                    ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}


export default ImageGallery;

