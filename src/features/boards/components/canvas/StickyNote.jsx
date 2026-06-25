import '../../styles/canvas.css'

function StickyNote({
    item,
}) {

    return (
        <div
            className="sticky-note"
            style={{
                left: item.x,
                top: item.y,
            }}
        >
            {item.content}
        </div>
    );
}

export default StickyNote;