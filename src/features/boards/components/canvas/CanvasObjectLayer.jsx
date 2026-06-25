import StickyNote from "./StickyNote";

function CanvasObjectLayer({
    items,
}) {

    return (
        <>
            {
                items.map(item => {
                    if(
                        item.type === "sticky"
                    ){
                        return (
                            <StickyNote
                                key={item.id}
                                item={item}
                            />
                        );
                    }
                    return null;
                })
            }
        </>
    );
}

export default CanvasObjectLayer;