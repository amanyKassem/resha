import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import faq from './FaqReducer';
import rules from './RulesReducer';
import about from './AboutAppReducer';
import subscriptions from './SubscriptionsReducer';
import homeCounts from './HomeCountsReducer';
import restaurants from './RestaurantsReducer';
import foodTrucks from './FoodTrucksReducer';
import familiesCategories from './FamiliesCategoriesReducer';
import families from './FamiliesReducer';
import events from './EventsReducer';
import contactUs from './ContactUsReducer';
import eventDetails from './EventDetailsReducer';
import eventTickets from './EventTicketsReducer';
import searchResult from './SearchReducer';
import popularEvents from './PopularEventsReducer';
import eventCategories from './EventCategoriesReducer';
import organizations from './OrganizationsReducer';
import storeEvent from './StoreEventReducer';
import ownerEvents from './OwnerEventsReducer';
import ownerEventsDetails from './OwnerEventsDetailsReducer';
import searchSuggestedEvents from './SearchSuggestedEventsReducer';
import saveTicket from './SaveTicketReducer';
import eventsPrices from './EventsPricesReducer';
import filterEvents from './FilterEventsReducer';
import favouriteEvents from './FavouriteEventsReducer';
import notifications from './NotificationsReducer';
import changePassword from './ChangePasswordReducer';
import confirmChangePassword from './ConfirmChangePasswordReducer';
import sendComplaint from './SendComplaintReducer';
import reservations from './ReservationsReducer';
import reservationDetails from './ReservationDetailsReducer';
import deleteTicket from './DeleteTicketReducer';
import register from './RegisterReducer';
import sendActivationCode from './SendActivationCodeReducer';
import sendForgetCode from './SendForgetCodeReducer';
import checkForgetCode from './CheckForgetCodeReducer';
import organizerEvents from './OrganizerEventsReducer';
import profileDetails from './ProfileDetailsReducer';
import profileProducts from './ProfileProductsReducer';
import showProduct from './ShowProductReducer';
import rateProduct from './RateProductReducer';
import filterFamilies from './FilterFamiliesReducer';
import showProfile from './ShowProfileReducer';
import filterProducts from './FilterProductsReducer';
import productPrices from './ProductPricesReducer';
import typeCategories from './TypeCategoriesReducer';
import updateProfileMain from './UpdateProfileMainReducer';
import storeProduct from './StoreProductReducer';
import productAvailability from './ProductAvailabilityReducer';
import authProducts from './AuthProductsReducer';
import filterRestaurants from './FilterRestaurantsReducer';
import stopNotification from './StopNotificationReducer';
import ticketDetails from './TicketDetailsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    faq,
    rules,
    about,
    subscriptions,
    homeCounts,
    restaurants,
    foodTrucks,
    familiesCategories,
    families,
    events,
    contactUs,
    eventDetails,
    eventTickets,
    searchResult,
    popularEvents,
    eventCategories,
    organizations,
    storeEvent,
    ownerEvents,
    ownerEventsDetails,
    searchSuggestedEvents,
    saveTicket,
    eventsPrices,
    filterEvents,
    favouriteEvents,
    notifications,
    changePassword,
    confirmChangePassword,
    sendComplaint,
    reservations,
    reservationDetails,
    deleteTicket,
    register,
    sendActivationCode,
    sendForgetCode,
    checkForgetCode,
    organizerEvents,
    profileDetails,
    profileProducts,
    showProduct,
    rateProduct,
    filterFamilies,
    showProfile,
    filterProducts,
    productPrices,
    typeCategories,
    updateProfileMain,
    storeProduct,
    productAvailability,
    authProducts,
    filterRestaurants,
    stopNotification,
    ticketDetails,
});
