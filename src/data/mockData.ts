import { User, Group, Message, Trip, Alert, ThreatReport, Location, Notification, TravelTimeline, MediaItem } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'Harish Kumar',
    username: 'harish',
    email: 'harish@travelsync.com',
    phone: '+91 98765 43210',
    profilePicture: '',
    tripsCount: 12,
    groupsJoined: 5,
    travelHistory: ['Kerala', 'Goa', 'Rajasthan', 'Himachal Pradesh'],
    locationSharing: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user-2',
    fullName: 'Arun Sharma',
    username: 'arun',
    email: 'arun@travelsync.com',
    phone: '+91 98765 43211',
    profilePicture: '',
    tripsCount: 8,
    groupsJoined: 3,
    travelHistory: ['Kerala', 'Tamil Nadu'],
    locationSharing: true,
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: 'user-3',
    fullName: 'Karthik Raj',
    username: 'karthik',
    email: 'karthik@travelsync.com',
    phone: '+91 98765 43212',
    profilePicture: '',
    tripsCount: 15,
    groupsJoined: 7,
    travelHistory: ['Kerala', 'Kashmir', 'Ladakh'],
    locationSharing: false,
    createdAt: '2024-03-10T10:00:00Z'
  },
  {
    id: 'user-4',
    fullName: 'Rahul Verma',
    username: 'rahul',
    email: 'rahul@travelsync.com',
    phone: '+91 98765 43213',
    profilePicture: '',
    tripsCount: 6,
    groupsJoined: 2,
    travelHistory: ['Goa', 'Rajasthan'],
    locationSharing: true,
    createdAt: '2024-04-05T10:00:00Z'
  },
  {
    id: 'user-5',
    fullName: 'Priya Nair',
    username: 'priya',
    email: 'priya@travelsync.com',
    phone: '+91 98765 43214',
    profilePicture: '',
    tripsCount: 20,
    groupsJoined: 8,
    travelHistory: ['Kerala', 'Karnataka', 'Tamil Nadu', 'Goa'],
    locationSharing: true,
    createdAt: '2024-01-20T10:00:00Z'
  }
];

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Kerala Adventure 2026',
    tripName: 'Kerala Adventure',
    destination: 'Munnar, Kerala',
    startingLocation: 'Chennai, Tamil Nadu',
    destinationLocation: 'Munnar, Kerala',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    description: 'An exciting trip to the beautiful hill stations of Kerala. We will explore Munnar, Thekkady, and Alleppey.',
    groupImage: '',
    groupCode: 'KER-7X92AB',
    adminId: 'user-1',
    memberIds: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    isActive: true,
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'group-2',
    name: 'Goa Beach Trip',
    tripName: 'Goa Getaway',
    destination: 'Goa',
    startingLocation: 'Bangalore, Karnataka',
    destinationLocation: 'North Goa',
    startDate: '2026-04-10',
    endDate: '2026-04-14',
    description: 'Beach vibes and water sports in Goa!',
    groupImage: '',
    groupCode: 'GOA-3M81CD',
    adminId: 'user-2',
    memberIds: ['user-1', 'user-2', 'user-5'],
    isActive: true,
    createdAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'group-3',
    name: 'Himalayan Trek',
    tripName: 'Himalayan Expedition',
    destination: 'Manali, Himachal Pradesh',
    startingLocation: 'Delhi',
    destinationLocation: 'Manali, HP',
    startDate: '2026-05-20',
    endDate: '2026-05-28',
    description: 'Trekking through the beautiful Himalayan trails.',
    groupImage: '',
    groupCode: 'HIM-5K29EF',
    adminId: 'user-3',
    memberIds: ['user-1', 'user-3', 'user-4'],
    isActive: true,
    createdAt: '2026-03-01T10:00:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    groupId: 'group-1',
    senderId: 'user-1',
    messageType: 'TEXT',
    messageText: "Everyone, let's start at 6 AM tomorrow! Don't forget to pack warm clothes.",
    timestamp: '2026-03-14T18:30:00Z',
    status: 'read'
  },
  {
    id: 'msg-2',
    groupId: 'group-1',
    senderId: 'user-2',
    messageType: 'LOCATION',
    messageText: 'Sharing my current location',
    latitude: 13.0827,
    longitude: 80.2707,
    timestamp: '2026-03-14T18:35:00Z',
    status: 'read'
  },
  {
    id: 'msg-3',
    groupId: 'group-1',
    senderId: 'user-5',
    messageType: 'IMAGE',
    messageText: 'Check out this view from my balcony! 🌅',
    mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    timestamp: '2026-03-14T19:00:00Z',
    status: 'read'
  },
  {
    id: 'msg-4',
    groupId: 'group-1',
    senderId: 'user-3',
    messageType: 'AUDIO',
    messageText: 'Voice message',
    timestamp: '2026-03-14T19:15:00Z',
    status: 'read'
  },
  {
    id: 'msg-5',
    groupId: 'group-1',
    senderId: 'user-4',
    messageType: 'ALERT',
    messageText: '⚠️ Road blocked ahead near Salem due to construction. Take alternate route via NH44.',
    timestamp: '2026-03-14T19:30:00Z',
    status: 'read'
  },
  {
    id: 'msg-6',
    groupId: 'group-1',
    senderId: 'user-1',
    messageType: 'TEXT',
    messageText: 'Thanks for the heads up Rahul! I\'ll update the route.',
    timestamp: '2026-03-14T19:32:00Z',
    status: 'read'
  },
  {
    id: 'msg-7',
    groupId: 'group-1',
    senderId: 'user-5',
    messageType: 'TEXT',
    messageText: 'Can\'t wait for tomorrow! 🎉',
    timestamp: '2026-03-14T19:45:00Z',
    status: 'read'
  },
  {
    id: 'msg-8',
    groupId: 'group-1',
    senderId: 'user-2',
    messageType: 'VIDEO',
    messageText: 'Quick video of my packing 📦',
    mediaUrl: '',
    timestamp: '2026-03-14T20:00:00Z',
    status: 'read'
  }
];

export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    name: 'Kerala Adventure 2026',
    destination: 'Munnar, Kerala',
    startingLocation: 'Chennai, Tamil Nadu',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    description: 'Exploring the beautiful hill stations and backwaters of Kerala.',
    groupId: 'group-1',
    placesToVisit: ['Munnar', 'Thekkady', 'Alleppey', 'Kovalam'],
    userId: 'user-1',
    status: 'upcoming',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'trip-2',
    name: 'Goa Getaway',
    destination: 'North Goa',
    startingLocation: 'Bangalore, Karnataka',
    startDate: '2026-04-10',
    endDate: '2026-04-14',
    description: 'Beach vibes and water sports.',
    groupId: 'group-2',
    placesToVisit: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
    userId: 'user-1',
    status: 'upcoming',
    createdAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'trip-3',
    name: 'Himalayan Expedition',
    destination: 'Manali, Himachal Pradesh',
    startingLocation: 'Delhi',
    startDate: '2026-05-20',
    endDate: '2026-05-28',
    description: 'Trekking through the Himalayan trails.',
    groupId: 'group-3',
    placesToVisit: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    userId: 'user-1',
    status: 'upcoming',
    createdAt: '2026-03-01T10:00:00Z'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    groupId: 'group-1',
    senderId: 'user-4',
    alertType: 'Road Block',
    description: 'Road blocked near Salem due to construction work. Use NH44 alternate route.',
    latitude: 11.6643,
    longitude: 78.1460,
    timestamp: '2026-03-14T19:30:00Z',
    severity: 'medium'
  },
  {
    id: 'alert-2',
    groupId: 'group-1',
    senderId: 'user-3',
    alertType: 'Bad Weather',
    description: 'Heavy rainfall expected in Munnar area. Carry rain gear.',
    latitude: 10.0889,
    longitude: 77.0595,
    timestamp: '2026-03-14T20:00:00Z',
    severity: 'low'
  }
];

export const mockThreats: ThreatReport[] = [
  {
    id: 'threat-1',
    groupId: 'group-1',
    reporterId: 'user-4',
    threatType: 'Unsafe Road',
    description: 'Potholes and broken road near Attur. Drive carefully.',
    latitude: 11.5943,
    longitude: 78.6043,
    severity: 'medium',
    timestamp: '2026-03-14T19:25:00Z'
  },
  {
    id: 'threat-2',
    groupId: 'group-1',
    reporterId: 'user-2',
    threatType: 'Wild Animal',
    description: 'Wild elephants spotted near Thekkady forest road. Avoid night travel.',
    latitude: 9.6008,
    longitude: 77.1500,
    severity: 'high',
    timestamp: '2026-03-14T20:15:00Z'
  }
];

export const mockLocations: Location[] = [
  {
    id: 'loc-1',
    userId: 'user-1',
    groupId: 'group-1',
    latitude: 13.0827,
    longitude: 80.2707,
    timestamp: '2026-03-14T20:00:00Z',
    isSharing: true
  },
  {
    id: 'loc-2',
    userId: 'user-2',
    groupId: 'group-1',
    latitude: 12.9716,
    longitude: 77.5946,
    timestamp: '2026-03-14T19:55:00Z',
    isSharing: true
  },
  {
    id: 'loc-3',
    userId: 'user-5',
    groupId: 'group-1',
    latitude: 13.0500,
    longitude: 80.2500,
    timestamp: '2026-03-14T20:02:00Z',
    isSharing: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'ALERT',
    title: '🚨 Road Block Alert',
    message: 'Rahul reported a road block near Salem',
    timestamp: '2026-03-14T19:30:00Z',
    isRead: false,
    groupId: 'group-1'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'MESSAGE',
    title: 'New message from Priya',
    message: "Can't wait for tomorrow! 🎉",
    timestamp: '2026-03-14T19:45:00Z',
    isRead: false,
    groupId: 'group-1'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'THREAT',
    title: '⚠️ Threat Report',
    message: 'Wild elephants spotted near Thekkady',
    timestamp: '2026-03-14T20:15:00Z',
    isRead: false,
    groupId: 'group-1'
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'LOCATION',
    title: '📍 Location Shared',
    message: 'Arun shared their location',
    timestamp: '2026-03-14T18:35:00Z',
    isRead: true,
    groupId: 'group-1'
  },
  {
    id: 'notif-5',
    userId: 'user-1',
    type: 'MEMBER',
    title: 'New Member Joined',
    message: 'Priya joined Kerala Adventure 2026',
    timestamp: '2026-03-14T17:00:00Z',
    isRead: true,
    groupId: 'group-1'
  }
];

export const mockTimeline: TravelTimeline[] = [
  {
    id: 'tl-1',
    tripId: 'trip-1',
    day: 1,
    location: 'Chennai → Bangalore',
    photos: 15,
    videos: 2,
    notes: 'Started early morning. Highway was smooth. Stopped at Krishnagiri for breakfast.',
    activities: ['Highway drive', 'Breakfast stop', 'City arrival'],
    date: '2026-03-15'
  },
  {
    id: 'tl-2',
    tripId: 'trip-1',
    day: 2,
    location: 'Bangalore → Mysore',
    photos: 24,
    videos: 3,
    notes: 'Visited Mysore Palace. Amazing architecture!',
    activities: ['Palace visit', 'Local market', 'Traditional lunch'],
    date: '2026-03-16'
  },
  {
    id: 'tl-3',
    tripId: 'trip-1',
    day: 3,
    location: 'Mysore → Munnar',
    photos: 32,
    videos: 5,
    notes: 'Reached Munnar by evening. Tea plantations are breathtaking.',
    activities: ['Tea plantation tour', 'Sunset view', 'Local cuisine'],
    date: '2026-03-17'
  }
];

export const mockMedia: MediaItem[] = [
  {
    id: 'media-1',
    groupId: 'group-1',
    uploaderId: 'user-5',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    caption: 'Mountain view from Munnar',
    timestamp: '2026-03-14T19:00:00Z'
  },
  {
    id: 'media-2',
    groupId: 'group-1',
    uploaderId: 'user-1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    caption: 'Sunrise at the campsite',
    timestamp: '2026-03-14T06:00:00Z'
  },
  {
    id: 'media-3',
    groupId: 'group-1',
    uploaderId: 'user-2',
    type: 'video',
    url: '',
    caption: 'Waterfall dance',
    timestamp: '2026-03-14T14:00:00Z'
  },
  {
    id: 'media-4',
    groupId: 'group-1',
    uploaderId: 'user-3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
    caption: 'Lake view',
    timestamp: '2026-03-14T16:30:00Z'
  },
  {
    id: 'media-5',
    groupId: 'group-1',
    uploaderId: 'user-4',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
    caption: 'Road trip vibes',
    timestamp: '2026-03-14T11:00:00Z'
  },
  {
    id: 'media-6',
    groupId: 'group-1',
    uploaderId: 'user-5',
    type: 'audio',
    url: '',
    caption: 'Travel song playlist',
    timestamp: '2026-03-14T20:00:00Z'
  }
];
