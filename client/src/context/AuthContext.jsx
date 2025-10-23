import { useState,useEffect, createContext } from "react";


// 1. Create an empty "box" (context)
const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    // 2. State to track if user is logged in
    const [user, setUser] = useState(null);
    // 3. State to track loading (e.g., checking localStorage)
    const [loading, setLoading] = useState(true);
    // 4. Check localStorage for existing user on app load
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser)); 
        }
        setLoading(false);  // Done checking
    },[]);

    // 5. Login function (store user/tokens in localStorage)
    const login = async (credentials)=>{
        // Send username/password to backend
        try{
        console.log(BASE_URL)
        console.log(credentials)
        console.log(`Making request to: ${BASE_URL}/token/`);

        const response = await axios.post(`${BASE_URL}/token/`, credentials);
        const { access, refresh } = response.data;
        console.log(response.data)
        // Save tokens and user data in localStorage (like a fridge)
        localStorage.setItem('access_token',access);
        localStorage.setItem('refresh_token',refresh);
        localStorage.setItem('user', JSON.stringify(user));
        }catch(error){
            console.error("Login failed:", error); // ✅ Log errors
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            } else {
                console.error("Network error or no response received.");
            }
        }

        // Update the "box" (context) with the user
        setUser(user);
    };

    // 7. Provide the "box" to all components
  return (
    <AuthContext.Provider value={{  login}}>
      {children}
    </AuthContext.Provider>
  );

}

// 3. Create the `useAuth` hook (the "way to open the box")
export const useAuth = () => {
    return useContext(AuthContext);
  };