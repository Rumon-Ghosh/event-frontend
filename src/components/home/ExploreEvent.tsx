"use client";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { TEvent } from '@/types/Event';
import React, { useEffect, useState, } from 'react';

const ExploreEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosSecure.get('/events');
        console.log(res.data);
        setEvents(res.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log(events)

  return (
    <div>
      
    </div>
  );
};

export default ExploreEvent;