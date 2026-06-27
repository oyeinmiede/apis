import{useEffect,useMemo,useState}from"react";

import AppShell from "@/components/layout/AppShell";
import PageContainer from "@/components/layout/PageContainer";

import{Input}from "@/components/ui/input";

import useAuthStore from "@/app/store/authStore";

import{getConnections}from"../services/teams";

import TeamCard from"../components/TeamCard";
import TeamProfileDialog from"../components/TeamProfileDialog";

import{Users,Search}from"lucide-react";

import"../styles/teams.css";

function TeamsPage(){

    const user=useAuthStore(s=>s.user);

    const[connections,setConnections]=useState([]);
    const[loading,setLoading]=useState(true);
    const[selected,setSelected]=useState(null);
    const[search,setSearch]=useState("");

    useEffect(()=>{

        if(user){
            loadConnections();
        }

    },[user]);

    async function loadConnections(){

        setLoading(true);

        const{data,error}=await getConnections(user.id);

        if(!error){
            setConnections(data??[]);
        }

        setLoading(false);

    }

    const filtered=useMemo(()=>{

        return connections.filter(member=>{

            const q=search.toLowerCase();

            return(
                member.full_name?.toLowerCase().includes(q)||
                member.username?.toLowerCase().includes(q)
            );

        });

    },[connections,search]);

    return(

        <AppShell>

            <PageContainer>

                <div className="teams-page">

                    <div className="teams-header">

                        <div>

                            <h1>
                                Teams
                            </h1>

                            <p>
                                Everyone you collaborate with across your workspaces.
                            </p>

                        </div>

                    </div>

                    <div className="teams-search">

                        <Search size={18}/>

                        <Input
                            placeholder="Search teammates..."
                            value={search}
                            onChange={e=>setSearch(e.target.value)}
                        />

                    </div>

                    {loading?(
                        <div className="teams-empty">

                            Loading...

                        </div>
                    ):filtered.length===0?(
                        <div className="teams-empty">

                            <Users size={48}/>

                            <h2>
                                No teammates yet
                            </h2>

                            <p>
                                Invite people to one of your workspaces to start collaborating.
                            </p>

                        </div>
                    ):(
                        <div className="teams-grid">

                            {filtered.map(member=>(

                                <TeamCard
                                    key={member.id}
                                    member={member}
                                    onView={setSelected}
                                />

                            ))}

                        </div>
                    )}

                    <TeamProfileDialog
                        member={selected}
                        open={!!selected}
                        onOpenChange={()=>
                            setSelected(null)
                        }
                    />

                </div>

            </PageContainer>

        </AppShell>

    );

}

export default TeamsPage;