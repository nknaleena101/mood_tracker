import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
    title: "Mood Tracker · Dashboard",
  };

export default function DashboardPage(){
    const isAuthenticated = true

    let childern = (
        <Login />
    )

    if(isAuthenticated){
        childern =(
            <Dashboard/>
        )
    }
    
    return(
        <Main>
            {childern}
        </Main>
    )
}