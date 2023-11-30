import {create} from 'zustand';
import type {EventUser, Post} from '~/services/dashboardService';

type DashboardStore = {
    events: EventUser[];
    posts: Post[];
    setEventUsers: (events: EventUser[]) => void;
    setPosts: (posts: Post[]) => void;
    resetDashboardData: () => void;
};

const useDashboardStore = create<DashboardStore>(set => ({
    events: [],
    posts: [],
    setEventUsers: events => {
        set({events});
    },
    setPosts: posts => {
        set({posts});
    },
    resetDashboardData: () => {
        set({events: [], posts: []});
    },
}));

export default useDashboardStore;
