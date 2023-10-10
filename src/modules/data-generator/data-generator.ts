// import { DataGeneratorInterface } from './data-generator.interface.js';

// export default class OfferGenerator implements DataGeneratorInterface {
//   constructor(private readonly mockData: MockData) {}

//   public generate(): string {
//     const title = getRandomItem<string>(this.mockData.titles);
//     const description = getRandomItem<string>(this.mockData.descriptions);
//     const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').format(DATE_FORMAT);
//     const city = getRandomItem<string>(this.mockData.cities);
//     const previewImage = getRandomItem<string>(this.mockData.previewImages);
//     const images = getRandomImages(this.mockData.images).join(';');
//     const isPremium = getRandomBoolean();
//     const isFavorite = getRandomBoolean();
//     const rating = generateRandomValue(MIN_OFFER_RATING, MAX_OFFER_RATING, 1).toString();
//     const type = getRandomItem<string>([RentalType.Apartment, RentalType.Hotel, RentalType.House, RentalType.Room]);
//     const rooms = generateRandomValue(MIN_COUNT_OFFER_ROOMS, MAX_COUNT_OFFER_ROOMS).toString();
//     const guests = generateRandomValue(MIN_COUNT_OFFER_GUESTS, MAX_COUNT_OFFER_GUESTS).toString();
//     const price = generateRandomValue(MIN_OFFER_PRICE, MAX_OFFER_PRICE).toString();
//     const amenities = getRandomItems<string>(this.mockData.amenities, 2).join(';');
//     const user = objectToString(getRandomItem(this.mockData.users));
//     const coordinates = objectToString(getCoordinates(city));

//     return [
//       title, description, publicationDate,
//       city, coordinates, previewImage, images,isPremium,
//       isFavorite, rating, type, rooms, guests,
//       price, amenities, user,
//       COMMENT_COUNT
//     ].join('\t');
//   }
// }
