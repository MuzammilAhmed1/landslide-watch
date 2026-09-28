import { create } from 'zustand';
import { User } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthState {
  user: User | null;
  role: string | null;
  activePortal: 'citizen' | 'authority' | null;
  userLocation: { lat: number; lon: number; name: string } | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string, portal?: 'citizen' | 'authority') => Promise<void>;
  demoLogin: (role?: string) => void;
  switchPortal: (portal: 'citizen' | 'authority') => void;
  setUserLocation: (loc: { lat: number; lon: number; name: string } | null) => void;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  activePortal: (localStorage.getItem('landslide_portal') as 'citizen' | 'authority') || null,
  userLocation: null,
  loading: false,
  initialized: false,

  switchPortal: (portal) => {
    localStorage.setItem('landslide_portal', portal);
    set({ activePortal: portal });
  },

  setUserLocation: (loc) => {
    set({ userLocation: loc });
  },

  signIn: async (email, password, portal?: 'citizen' | 'authority') => {
    const determinedPortal = portal || (email.includes('citizen') ? 'citizen' : 'authority');
    localStorage.setItem('landslide_portal', determinedPortal);
    set({ loading: true, activePortal: determinedPortal });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      // Fallback to local demo session if Firebase rejected
      const role = email.includes('admin')
        ? 'admin'
        : email.includes('viewer')
        ? 'viewer'
        : determinedPortal; // Use the portal requested or inferred
      set({
        user: { email, uid: 'demo-session', getIdToken: async () => 'demo-token' } as any,
        role,
        activePortal: role === 'citizen' ? 'citizen' : 'authority',
        initialized: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  demoLogin: (role = 'citizen') => {
    const isCitizen = role === 'citizen';
    const email = isCitizen ? 'citizen@landslidewatch.in' : `${role}@landslidewatch.gov.in`;
    const portal = isCitizen ? 'citizen' : 'authority';
    localStorage.setItem('landslide_portal', portal);
    set({
      user: { email, uid: `demo-${role}`, getIdToken: async () => 'demo-token' } as any,
      role,
      activePortal: portal,
      initialized: true,
    });
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
    } catch {}
    localStorage.removeItem('landslide_portal');
    set({ user: null, role: null, activePortal: null, userLocation: null });
  },

  initialize: () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdTokenResult();
            let role = idToken.claims.role as string;
            
            // Fallback if custom claims aren't set
            if (!role) {
              const reqPortal = localStorage.getItem('landslide_portal');
              if (reqPortal === 'citizen') role = 'citizen';
              else if (reqPortal === 'authority') role = 'authority';
              else if (user.email?.includes('citizen')) role = 'citizen';
              else if (user.email?.includes('admin')) role = 'admin';
              else if (user.email?.includes('viewer')) role = 'viewer';
              else role = 'authority';
            }

            const activePortal = role === 'citizen' ? 'citizen' : 'authority';
            localStorage.setItem('landslide_portal', activePortal);
            set({ user, role, initialized: true, activePortal });
          } catch {
            // Error fetching token
            const reqPortal = localStorage.getItem('landslide_portal');
            let role = reqPortal === 'citizen' ? 'citizen' : 'authority';
            set({ user, role, initialized: true, activePortal: role as 'citizen' | 'authority' });
          }
        } else {
          localStorage.removeItem('landslide_portal');
          set({ user: null, role: null, activePortal: null, initialized: true });
        }
      });
    } catch {
       set({ initialized: true });
    }
  },
}));
