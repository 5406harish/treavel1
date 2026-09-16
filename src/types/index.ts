export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profilePicture: string;
  tripsCount: number;
  groupsJoined: number;
  travelHistory: string[];
  locationSharing: boolean;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  tripName: string;
  destination: string;
  startingLocation: string;
  destinationLocation: string;
  startDate: string;
  endDate: string;
  description: string;
  groupImage: string;
  groupCode: string;
  adminId: string;
  memberIds: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  messageType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'LOCATION' | 'ALERT' | 'THREAT';
  messageText: string;
  mediaUrl?: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
  replyToMessageId?: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startingLocation: string;
  startDate: string;
  endDate: string;
  description: string;
  groupId?: string;
  placesToVisit: string[];
  userId: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

export interface Alert {
  id: string;
  groupId: string;
  senderId: string;
  alertType: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ThreatReport {
  id: string;
  groupId: string;
  reporterId: string;
  threatType: string;
  description: string;
  latitude: number;
  longitude: number;
  mediaUrl?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export interface Location {
  id: string;
  userId: string;
  groupId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  isSharing: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  groupId?: string;
}

export interface TravelTimeline {
  id: string;
  tripId: string;
  day: number;
  location: string;
  photos: number;
  videos: number;
  notes: string;
  activities: string[];
  date: string;
}

export interface MediaItem {
  id: string;
  groupId: string;
  uploaderId: string;
  type: 'photo' | 'video' | 'audio' | 'document';
  url: string;
  caption?: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
}
