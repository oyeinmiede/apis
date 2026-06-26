import { useState } from "react";

import { Button } from "@/components/ui/button";

import CreateBoardModal from "./CreateBoardModal";

function BoardsHeader() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="boards-header">
                <div>
                    <h1>Boards</h1>
                    <p>
                        Everything inside your current workspace.
                    </p>
                </div>

                <Button
                    onClick={() => setOpen(true)}
                >
                    Create Board
                </Button>
            </div>

            <CreateBoardModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default BoardsHeader;