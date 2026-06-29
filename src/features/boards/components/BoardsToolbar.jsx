import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "../styles/boards-toolbar.css";

function BoardsToolbar({ query, setQuery, sort, setSort }) {
    return (
        <div className="boards-toolbar">
            <Input
                className="boards-search"
                placeholder="Search boards..."
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
            />

            <Select
                value={sort}
                onValueChange={setSort}
            >
                <SelectTrigger className="boards-sort">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem
                        className="boards-select-item"
                        value="updated"
                    >
                        Recently Updated
                    </SelectItem>

                    <SelectItem
                        className="boards-select-item"
                        value="created"
                    >
                        Recently Created
                    </SelectItem>

                    <SelectItem
                        className="boards-select-item"
                        value="alphabetical"
                    >
                        A–Z
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default BoardsToolbar;