import { createContext, useContext } from 'react';

const UserAuthContext = createContext('Serdzio');
export const UserAuthProvider = UserAuthContext.Provider;

export const useAuth = () => {
	const userAuth = useContext(UserAuthContext);
	return userAuth;
};
