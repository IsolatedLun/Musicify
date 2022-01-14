import { useMemo } from 'react';
import { useAppSelector } from './hooks';

export const useAuth = () => {
    const user = useAppSelector(state => state.user.user);
    return useMemo(() => ({ user }), [user]);
}