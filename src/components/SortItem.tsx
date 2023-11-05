type Props={
    image:Image
}


function SortableItem(props:Props) {
    return <div className="sortable-item">{props.image.name}</div>
}

export default SortableItem;