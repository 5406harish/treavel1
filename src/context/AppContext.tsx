import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, Group, Message, Trip, Alert, ThreatReport, Location, Notification } from '../types';
import { mockUsers, mockGroups, mockMessages, mockTrips, mockAlerts, mockThreats, mockLocations, mockNotifications } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  groups: Group[];
  messages: Message[];
  trips: Trip[];
  alerts: Alert[];
  threats: ThreatReport[];
  locations: Location[];
  notifications: Notification[];
  users: User[];
  activeGroupId: string | null;
  activeTripId: string | null;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { password: string }) => boolean;
  logout: () => void;
  setActiveGroup: (id: string | null) => void;
  setActiveTrip: (id: string | null) => void;
  sendMessage: (msg: Omit<Message, 'id' | 'timestamp' | 'status'>) => void;
  createGroup: (group: Omit<Group, 'id' | 'createdAt' | 'groupCode'>) => string;
  joinGroup: (code: string) => boolean;
  createAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  createThreat: (threat: Omit<ThreatReport, 'id' | 'timestamp'>) => void;
  createTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  toggleLocationSharing: () => void;
  removeMember: (groupId: string, userId: string) => void;
  regenerateGroupCode: (groupId: string) => string;
  getGroupMessages: (groupId: string) => Message[];
  getGroupMembers: (groupId: string) => User[];
  getUnreadNotifications: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function generateGroupCode(): string {
  const prefixes = ['TRV', 'GRP', 'ADV', 'EXP', 'TRP'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    isAuthenticated: false,
    groups: mockGroups,
    messages: mockMessages,
    trips: mockTrips,
    alerts: mockAlerts,
    threats: mockThreats,
    locations: mockLocations,
    notifications: mockNotifications,
    users: mockUsers,
    activeGroupId: null,
    activeTripId: null,
  });

  const login = useCallback((email: string, _password: string) => {
    const user = mockUsers.find(u => u.email === email || u.username === email);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user, isAuthenticated: true }));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: Partial<User> & { password: string }) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: data.fullName || '',
      username: data.username || '',
      email: data.email || '',
      phone: data.phone || '',
      profilePicture: data.profilePicture || '',
      tripsCount: 0,
      groupsJoined: 0,
      travelHistory: [],
      locationSharing: true,
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
      isAuthenticated: true,
    }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({ ...prev, currentUser: null, isAuthenticated: false, activeGroupId: null }));
  }, []);

  const setActiveGroup = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, activeGroupId: id }));
  }, []);

  const setActiveTrip = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, activeTripId: id }));
  }, []);

  const sendMessage = useCallback((msg: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    setState(prev => ({ ...prev, messages: [...prev.messages, newMsg] }));
  }, []);

  const createGroup = useCallback((group: Omit<Group, 'id' | 'createdAt' | 'groupCode'>) => {
    const code = generateGroupCode();
    const newGroup: Group = {
      ...group,
      id: `group-${Date.now()}`,
      groupCode: code,
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, groups: [...prev.groups, newGroup] }));
    return code;
  }, []);

  const joinGroup = useCallback((code: string) => {
    const group = state.groups.find(g => g.groupCode === code && g.isActive);
    if (group && state.currentUser) {
      if (group.memberIds.includes(state.currentUser.id)) return false;
      setState(prev => ({
        ...prev,
        groups: prev.groups.map(g =>
          g.id === group.id ? { ...g, memberIds: [...g.memberIds, prev.currentUser!.id] } : g
        ),
      }));
      return true;
    }
    return false;
  }, [state.groups, state.currentUser]);

  const createAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, alerts: [...prev.alerts, newAlert] }));
  }, []);

  const createThreat = useCallback((threat: Omit<ThreatReport, 'id' | 'timestamp'>) => {
    const newThreat: ThreatReport = {
      ...threat,
      id: `threat-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, threats: [...prev.threats, newThreat] }));
  }, []);

  const createTrip = useCallback((trip: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...trip,
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, trips: [...prev.trips, newTrip] }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
    }));
  }, []);

  const toggleLocationSharing = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentUser: prev.currentUser ? { ...prev.currentUser, locationSharing: !prev.currentUser.locationSharing } : null,
    }));
  }, []);

  const removeMember = useCallback((groupId: string, userId: string) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g =>
        g.id === groupId ? { ...g, memberIds: g.memberIds.filter(id => id !== userId) } : g
      ),
    }));
  }, []);

  const regenerateGroupCode = useCallback((groupId: string) => {
    const code = generateGroupCode();
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g => g.id === groupId ? { ...g, groupCode: code } : g),
    }));
    return code;
  }, []);

  const getGroupMessages = useCallback((groupId: string) => {
    return state.messages.filter(m => m.groupId === groupId).sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [state.messages]);

  const getGroupMembers = useCallback((groupId: string) => {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return [];
    return state.users.filter(u => group.memberIds.includes(u.id));
  }, [state.groups, state.users]);

  const getUnreadNotifications = useCallback(() => {
    if (!state.currentUser) return 0;
    return state.notifications.filter(n => n.userId === state.currentUser!.id && !n.isRead).length;
  }, [state.notifications, state.currentUser]);

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      setActiveGroup,
      setActiveTrip,
      sendMessage,
      createGroup,
      joinGroup,
      createAlert,
      createThreat,
      createTrip,
      markNotificationRead,
      toggleLocationSharing,
      removeMember,
      regenerateGroupCode,
      getGroupMessages,
      getGroupMembers,
      getUnreadNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
