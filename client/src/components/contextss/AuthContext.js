// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(null);

// export function useAuth() {
// 	return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
// 	const [currentUser, setCurrentUser] = useState();

// 	const value = {
// 		currentUser,
// 	};
// 	return <AuthContext.Provider value={value}></AuthContext.Provider>;
// }

// export default AuthProvider;
// const UserAuthContext = createContext('Serdzio');
// export const UserAuthProvider = UserAuthContext.Provider;

// export const useAuth = () => {
// 	const userAuth = useContext(UserAuthContext);
// 	return userAuth;
// };
