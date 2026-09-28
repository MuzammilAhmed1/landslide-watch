import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Spinner } from './Badges';
import { UserRole } from '../../types';

interface Props {
  children: React.ReactNode;
  minRole?: UserRole;
}

const ROLE_LEVEL: Record<UserRole, number> = { citizen: 1, viewer: 1, authority: 2, admin: 3 };

export function ProtectedRoute({ children, minRole = 'citizen' }: Props) {
  const { user, role, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <Spinner size={32} />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    if (location.pathname.startsWith('/citizen')) {
      return <Navigate to="/citizen/login" replace />;
    } else if (location.pathname.startsWith('/authority') || location.pathname === '/map' || location.pathname === '/alerts') {
      return <Navigate to="/authority/login" replace />;
    }
    // Default fallback
    return <Navigate to="/" replace />;
  }

  // Authenticated but wrong role
  const userRoleStr = (role as UserRole) || 'citizen';
  
  // If Authority tries to access Citizen routes
  if (userRoleStr !== 'citizen' && location.pathname.startsWith('/citizen')) {
    return <Navigate to="/authority" replace />;
  }

  // If Citizen tries to access Authority routes
  if (userRoleStr === 'citizen' && (location.pathname.startsWith('/authority') || ROLE_LEVEL[userRoleStr] < ROLE_LEVEL[minRole])) {
    return <Navigate to="/citizen/welcome" replace />;
  }

  // Basic RBAC check
  if (minRole && ROLE_LEVEL[userRoleStr] < ROLE_LEVEL[minRole]) {
    return <Navigate to={userRoleStr === 'citizen' ? '/citizen/welcome' : '/authority'} replace />;
  }

  return <>{children}</>;
}
