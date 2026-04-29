import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (username: string, password: string, displayName: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTutorialCompleted: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERNAME_DOMAIN = 'students.spy.local';
const USERNAME_PATTERN = /^[a-z0-9_.]{3,20}$/;

function usernameToEmail(username: string) {
  return `${username.trim().toLowerCase()}@${USERNAME_DOMAIN}`;
}

function validateUsername(username: string) {
  const normalized = username.trim().toLowerCase();
  if (!USERNAME_PATTERN.test(normalized)) {
    throw new Error(
      'Username must be 3-20 characters and use only letters, numbers, underscores, or periods.'
    );
  }
  return normalized;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (username: string, password: string, displayName: string) => {
    const normalized = validateUsername(username);
    const cred = await createUserWithEmailAndPassword(
      auth,
      usernameToEmail(normalized),
      password
    );
    await updateProfile(cred.user, { displayName });
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      displayName,
      username: normalized,
      createdAt: new Date(),
      hasCompletedTutorial: false,
    };
    await setDoc(doc(db, 'users', cred.user.uid), newProfile);
    setProfile(newProfile);
  };

  const signIn = async (username: string, password: string) => {
    const normalized = validateUsername(username);
    await signInWithEmailAndPassword(auth, usernameToEmail(normalized), password);
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const setTutorialCompleted = async () => {
    if (!user) return;
    const updated = { ...profile!, hasCompletedTutorial: true };
    await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, logout, setTutorialCompleted }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
