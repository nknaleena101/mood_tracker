'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState({})
    const [loading, setLoading] = useState(true)

    //Auth handlers
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj({});
        setCurrentUser(null);
        return signOut(auth)
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                //set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('No user found')
                    return 
                }

                //if user exists, fetch data from firestore db
                console.log('Fetching user data')
                const docRef = doc(db, 'user', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found User Data')
                    firebaseData = docSnap.data()
                    console.log(firebaseData) //remove after testing
                }
                setUserDataObj(firebaseData)

            } catch (err) {
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
        return unsubscribe
    })

    const value = {
        currentUser,
        userDataObj,
        signup,
        logout,
        login,
        loading
    } 
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}