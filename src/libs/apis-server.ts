import 'server-only';

import { CreateReviewDto, UpdateReviewDto } from '@/src/models/review';
import { CreateBookingDto } from '@/src/models/room';
import sanityServerClient from './sanity.server';

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  guestName,
  guestEmail,
}: CreateBookingDto) => {
  return sanityServerClient.create({
    _type: 'booking',
    // No Sanity user reference — store guest details directly
    guestName: guestName ?? 'Guest',
    guestEmail: guestEmail ?? '',
    hotelRoom: { _type: 'reference', _ref: hotelRoom },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
  });
};

export const updateHotelRoom = async (hotelRoomId: string) => {
  return sanityServerClient.patch(hotelRoomId).set({ isBooked: true }).commit();
};

export async function checkReviewExists(
  guestEmail: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  const result = await sanityServerClient.fetch<{ _id: string } | null>(
    `*[_type == 'review' && guestEmail == $guestEmail && hotelRoom._ref == $hotelRoomId][0] { _id }`,
    { guestEmail, hotelRoomId }
  );
  return result ?? null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  return sanityServerClient
    .patch(reviewId)
    .set({ text: reviewText, userRating })
    .commit();
};

export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  return sanityServerClient.create({
    _type: 'review',
    guestEmail: userId, // reuse userId field as guestEmail
    hotelRoom: { _type: 'reference', _ref: hotelRoomId },
    userRating,
    text: reviewText,
  });
};
