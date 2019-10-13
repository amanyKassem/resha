import React from "react";
import { createStackNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";
import {Dimensions, I18nManager} from "react-native";

import Home from "../components/Home";
import DrawerCustomization from "./DrawerCustomization";
import Language from "../components/Language";
import Login from "../components/Login";
import ForgetPass from "../components/ForgetPass";
import VerifyCode from "../components/VerifyCode";
import ConfirmPass from "../components/ConfirmPass";
import Register from "../components/Register";
import ActivationCode from "../components/ActivationCode";
import Notifications from "../components/Notifications";
import Faq from "../components/Faq";
import MyEvents from "../components/MyEvents";
import AddEvent from "../components/AddEvent";
import AddEventDesc from "../components/AddEventDesc";
import AddEventPrice from "../components/AddEventPrice";
import Complaints from "../components/Complaints";
import AboutApp from "../components/AboutApp";
import ShareApp from "../components/ShareApp";
import Terms from "../components/Terms";
import ContactUs from "../components/ContactUs";
import Settings from "../components/Settings";
import ChangePass from "../components/ChangePass";
import ChangePassCode from "../components/ChangePassCode";
import Logout from "../components/Logout";
import AddEventImage from "../components/AddEventImage";
import ShowTicket from "../components/ShowTicket";
import Events from "../components/Events";
import BookTicket from "../components/BookTicket";
import BookType from "../components/BookType";
import ContinueBooking from "../components/ContinueBooking";
import ConfirmTicket from "../components/ConfirmTicket";
import TicketPayment from "../components/TicketPayment";
import PaymentDetails from "../components/PaymentDetails";
import ConfirmPayment from "../components/ConfirmPayment";
import ShowTicketQr from "../components/ShowTicketQr";
import SearchFilter from "../components/SearchFilter";
import SearchResult from "../components/SearchResult";
import Reservations from "../components/Reservations";
import Search from "../components/Search";
import Saves from "../components/Saves";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";


const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />)
const drawerNavigator = createDrawerNavigator({
    home:Home,
    notifications:Notifications,
    myEvents:MyEvents,
    addEvent:AddEvent,
    faq:Faq,
    addEventDesc:AddEventDesc,
    addEventPrice:AddEventPrice,
    complaints:Complaints,
    aboutApp:AboutApp,
    shareApp:ShareApp,
    terms:Terms,
    contactUs:ContactUs,
    settings:Settings,
    changePass:ChangePass,
    changePassCode:ChangePassCode,
    logout:Logout,
    addEventImage:AddEventImage,
    showTicket:ShowTicket,
    events:Events,
    bookTicket:BookTicket,
    bookType:BookType,
    continueBooking:ContinueBooking,
    confirmTicket:ConfirmTicket,
    ticketPayment:TicketPayment,
    paymentDetails:PaymentDetails,
    confirmPayment:ConfirmPayment,
    showTicketQr:ShowTicketQr,
    searchFilter:SearchFilter,
    searchResult:SearchResult,
    reservations:Reservations,
    search:Search,
    saves:Saves,
    profile:Profile,
    editProfile:EditProfile,

},{
    initialRouteName:'home',
    drawerPosition:I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    gesturesEnabled:false,
    drawerToggleRoute:'DrawerToggle',
    drawerWidth:width,
    contentComponent:drawerCust
})



const AppNavigator = createStackNavigator({

    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    editProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    saves: {
        screen: Saves,
        navigationOptions: {
            header: null
        }
    },
    search: {
        screen: Search,
        navigationOptions: {
            header: null
        }
    },
    reservations: {
        screen: Reservations,
        navigationOptions: {
            header: null
        }
    },
    searchResult: {
        screen: SearchResult,
        navigationOptions: {
            header: null
        }
    },
    searchFilter: {
        screen: SearchFilter,
        navigationOptions: {
            header: null
        }
    },
    showTicketQr: {
        screen: ShowTicketQr,
        navigationOptions: {
            header: null
        }
    },
    confirmPayment: {
        screen: ConfirmPayment,
        navigationOptions: {
            header: null
        }
    },
    paymentDetails: {
        screen: PaymentDetails,
        navigationOptions: {
            header: null
        }
    },
    ticketPayment: {
        screen: TicketPayment,
        navigationOptions: {
            header: null
        }
    },
    confirmTicket: {
        screen: ConfirmTicket,
        navigationOptions: {
            header: null
        }
    },
    continueBooking: {
        screen: ContinueBooking,
        navigationOptions: {
            header: null
        }
    },
    bookType: {
        screen: BookType,
        navigationOptions: {
            header: null
        }
    },
    bookTicket: {
        screen: BookTicket,
        navigationOptions: {
            header: null
        }
    },
    events: {
        screen: Events,
        navigationOptions: {
            header: null
        }
    },
    showTicket: {
        screen: ShowTicket,
        navigationOptions: {
            header: null
        }
    },
    addEventImage: {
        screen: AddEventImage,
        navigationOptions: {
            header: null
        }
    },
    addEventPrice: {
        screen: AddEventPrice,
        navigationOptions: {
            header: null
        }
    },
    logout: {
        screen: Logout,
        navigationOptions: {
            header: null
        }
    },
    changePass: {
        screen: ChangePass,
        navigationOptions: {
            header: null
        }
    },
    changePassCode: {
        screen: ChangePassCode,
        navigationOptions: {
            header: null
        }
    },
    settings: {
        screen: Settings,
        navigationOptions: {
            header: null
        }
    },
    contactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null
        }
    },
    terms: {
        screen: Terms,
        navigationOptions: {
            header: null
        }
    },
    shareApp: {
        screen: ShareApp,
        navigationOptions: {
            header: null
        }
    },
    aboutApp: {
        screen: AboutApp,
        navigationOptions: {
            header: null
        }
    },
    complaints: {
        screen: Complaints,
        navigationOptions: {
            header: null
        }
    },
    addEventDesc: {
        screen: AddEventDesc,
        navigationOptions: {
            header: null
        }
    },
    addEvent: {
        screen: AddEvent,
        navigationOptions: {
            header: null
        }
    },
    myEvents: {
        screen: MyEvents,
        navigationOptions: {
            header: null
        }
    },
    faq: {
        screen: Faq,
        navigationOptions: {
            header: null
        }
    },
    notifications: {
        screen: Notifications,
        navigationOptions: {
            header: null
        }
    },
    register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    activationCode: {
        screen: ActivationCode,
        navigationOptions: {
            header: null
        }
    },
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    forgetPass: {
        screen: ForgetPass,
        navigationOptions: {
            header: null
        }
    },
    confirmPass: {
        screen: ConfirmPass,
        navigationOptions: {
            header: null
        }
    },
    verifyCode: {
        screen: VerifyCode,
        navigationOptions: {
            header: null
        }
    },
    Language: {
        screen: Language,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);