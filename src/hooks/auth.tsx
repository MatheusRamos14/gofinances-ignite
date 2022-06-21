import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string,
    name: string,
    email: string,
    photo?: string
}

interface AuthContextData {
    user: User,
    signInWithGoogle(): Promise<void>
    signInWithApple(): Promise<void>
    signOut(): void
}

interface GoogleResponseData {
    params: {
        access_token: string;
    },
    type: string;
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)

    const userStorageKey = '@gofinances:user'

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email')

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { params, type } =
                await AuthSession.startAsync({ authUrl, }) as GoogleResponseData

            if (type === 'success') {
                const response =
                    await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const responseObject = await response.json();

                const userInfo: User = {
                    id: responseObject.id,
                    email: responseObject.email,
                    name: responseObject.given_name,
                    photo: responseObject.picture
                }

                setUser(userInfo)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo))
            }
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async function signInWithApple() {
        try {
            const data = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME
                ]
            })

            if (data.authorizationCode) {
                const name = `${data.fullName?.givenName} ${data.fullName?.familyName}`
                const photo = `https://ui-avatars.com/api/?name=${encodeURI(name)}&length=2`
                
                const userInfo: User = {
                    id: data.identityToken!,
                    email: data.email!,
                    name,
                    photo: undefined
                }

                setUser(userInfo)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo))
            }
        } catch (err) {
            throw new Error(String(err))
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await AsyncStorage.getItem(userStorageKey);

                if (response) {
                    const userLogged = JSON.parse(response);

                    setUser(userLogged)
                }
            } catch (err) {
                console.log(err)
            }
        }

        loadUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context
}

export { AuthProvider, useAuth };