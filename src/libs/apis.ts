import { Review } from './../models/review';

import { Room } from '@/models/room';
import sanityClient from './sanity';
import * as queries from './sanityQueries';
import { Booking } from '@/models/booking';

export async function getFeaturedRoom() {
  try {
    return await sanityClient.fetch<Room>(
      queries.getFeaturedRoomQuery,
      {},
      { cache: 'no-cache' }
    );
  } catch {
    return null as unknown as Room;
  }
}

export async function getRooms() {
  try {
    return await sanityClient.fetch<Room[]>(
      queries.getRoomsQuery,
      {},
      { cache: 'no-cache' }
    );
  } catch {
    return [];
  }
}

export async function getRoom(slug: string) {
  try {
    return await sanityClient.fetch<Room>(
      queries.getRoom,
      { slug },
      { cache: 'no-cache' }
    );
  } catch {
    return null as unknown as Room;
  }
}

export async function getUserBookings(userId: string) {
  try {
    return await sanityClient.fetch<Booking[]>(
      queries.getUserBookingsQuery,
      {
        userId,
      },
      { cache: 'no-cache' }
    );
  } catch {
    return [];
  }
}

export async function getUserData(userId: string) {
  try {
    return await sanityClient.fetch(
      queries.getUserDataQuery,
      { userId },
      { cache: 'no-cache' }
    );
  } catch {
    return null;
  }
}

export async function getRoomReviews(roomId: string) {
  try {
    return await sanityClient.fetch<Review[]>(
      queries.getRoomReviewsQuery,
      {
        roomId,
      },
      { cache: 'no-cache' }
    );
  } catch {
    return [];
  }
}
