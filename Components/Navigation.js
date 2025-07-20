import { authContext } from "@/libs/store/auth-context";
import { useContext } from "react";
import { ImStatsBars } from "react-icons/im";

   export default function Nav() {

    const {user, loading, logout} = useContext(authContext);
    return (
        <header className="contianer max-w-2xl px-6 py-6 mx-auto" >
        <div className="flex items-center justify-between">
              {/* user information */}
              {user && !loading && (
                 <div className="flex  items-center  gap-2">
                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                      <img className="w-full h-full object-cover" 
                        src={user.photoURL} 
                        alt={user.displayName}
                        referrerPolicy="no-referrer"
                      />
                    
                    </div>
      
                    <small>Hi, {user.displayName}</small>
     
                  </div>
              )}
             
             {user && !loading && (
                <nav className="flex items-center gap-4">
                    <div>
                      <button className="btn btn-danger" onClick={logout}>Sign Out</button>
                    </div>
                </nav>
  
             )}
          
        </div>
      </header>
    )
}