import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import {Search} from "lucide-react";

import {searchApis} from "../services/search";

import SearchResult from "./SearchResult";

import "./search.css";

function SearchBar(){

    const navigate=useNavigate();

    const[value,setValue]=useState("");

    const[results,setResults]=useState(null);

    useEffect(()=>{

        const timeout=setTimeout(async()=>{

            if(!value){
                setResults(null);
                return;
            }

            setResults(
                await searchApis(value)
            );

        },250);

        return()=>clearTimeout(timeout);

    },[value]);

    return(

        <div className="topbar-search">

            <Search size={16}/>

            <input
                value={value}
                placeholder="Search..."
                onChange={e=>
                    setValue(e.target.value)
                }
            />

            {results&&(

                <div className="search-dropdown">

                    {results.boards.map(board=>(

                        <SearchResult
                            key={board.id}
                            title={board.title}
                            subtitle="Board"
                            onClick={()=>
                                navigate(`/boards/${board.id}`)
                            }
                        />

                    ))}

                    {results.workspaces.map(workspace=>(

                        <SearchResult
                            key={workspace.id}
                            title={`${workspace.emoji} ${workspace.name}`}
                            subtitle="Workspace"
                        />

                    ))}

                    {results.profiles.map(profile=>(

                        <SearchResult
                            key={profile.id}
                            title={
                                profile.full_name||
                                profile.username
                            }
                            subtitle="Member"
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default SearchBar;