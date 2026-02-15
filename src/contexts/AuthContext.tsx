import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../services/firebase';
import { UserProfile } from '../../types';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (u: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    updateProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[AuthContext] useEffect started');

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('[AuthContext] onAuthStateChanged:', firebaseUser?.email || 'no user');
            if (firebaseUser) {
                await handleUser(firebaseUser);
            } else {
                setUser(null);
            }
            console.log('[AuthContext] Setting loading to false');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUser = async (firebaseUser: User) => {
        console.log('[AuthContext] handleUser called for:', firebaseUser.email);
        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            console.log('[AuthContext] Fetching Firestore doc:', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            console.log('[AuthContext] Firestore doc exists:', userDoc.exists());

            if (userDoc.exists()) {
                const userData = userDoc.data() as UserProfile;
                console.log('[AuthContext] Setting user from Firestore:', userData);
                setUser(userData);
            } else {
                const newUser: UserProfile = {
                    name: firebaseUser.displayName || 'User',
                    email: firebaseUser.email || '',
                    avatar: firebaseUser.photoURL || '',
                    targetRole: '',
                    skills: [],
                    graduationYear: '',
                    currentLevel: 'Beginner',
                };
                console.log('[AuthContext] Setting NEW user:', newUser);
                setUser(newUser);
            }
        } catch (error) {
            console.error("[AuthContext] Error fetching user profile (Firestore may have permission issues):", error);
            // Fallback: Create a basic user profile from Firebase Auth data
            const fallbackUser: UserProfile = {
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                avatar: firebaseUser.photoURL || '',
                targetRole: '',
                skills: [],
                graduationYear: '',
                currentLevel: 'Beginner',
            };
            console.log('[AuthContext] Setting FALLBACK user due to Firestore error:', fallbackUser);
            setUser(fallbackUser);
        }
    }

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const updateProfile = async (u: UserProfile) => {
        if (!auth.currentUser) return;

        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            await setDoc(userDocRef, u, { merge: true });
            setUser(u);
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
