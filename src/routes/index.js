import React from "react";
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
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
import ProductiveFamilies from "../components/ProductiveFamilies";
import Families from "../components/Families";
import FamilyFilter from "../components/FamilyFilter";
import FamilyDetails from "../components/FamilyDetails";
import Products from "../components/Products";
import ProductFilter from "../components/ProductFilter";
import ProductDetails from "../components/ProductDetails";
import Cars from "../components/Cars";
import CarDetails from "../components/CarDetails";
import RestCafe from "../components/RestCafe";
import RestCafeDetails from "../components/RestCafeDetails";
import MyResturant from "../components/MyResturant";
import RestProducts from "../components/RestProducts";
import RestProductDetails from "../components/RestProductDetails";
import EditRestProfile from "../components/EditRestProfile";
import EditRestContact from "../components/EditRestContact";
import AddProduct from "../components/AddProduct";
import FoodPayment from "../components/FoodPayment";
import FoodPayMethod from "../components/FoodPayMethod";
import MyCar from "../components/MyCar";
import CarProducts from "../components/CarProducts";
import EditCarProfile from "../components/EditCarProfile";
import EditCarContact from "../components/EditCarContact";
import MyFamily from "../components/MyFamily";
import FamilyProducts from "../components/FamilyProducts";
import EditFamilyProfile from "../components/EditFamilyProfile";
import EditFamilyContact from "../components/EditFamilyContact";
import MyOrders from "../components/MyOrders";
import OrderDetails from "../components/OrderDetails";
import QrConfirmTicket from "../components/QrConfirmTicket";
import QrTicketDetails from "../components/QrTicketDetails";
import QrScan from "../components/QrScan";
import ProposedEvents from "../components/ProposedEvents";
import CommonEvents from "../components/CommonEvents";
import InitScreen from "../components/InitScreen";
import SignIn from "../components/SignIn";
import SearchFamiliesResult from "../components/SearchFamiliesResult";
import SearchProductsResult from "../components/SearchProductsResult";
import EditProduct from "../components/EditProduct";
import RestFilter from "../components/RestFilter";
import SearchRestResult from "../components/SearchRestResult";
import VisaPay from "../components/VisaPay";


const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />)
const drawerNavigator = createDrawerNavigator({
    home:Home,
    notifications:Notifications,
    myEvents:MyEvents,
    addEvent:AddEvent,
    myResturant:MyResturant,
    myCar:MyCar,
    myFamily:MyFamily,
    myOrders:MyOrders,
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
    productiveFamilies:ProductiveFamilies,
    families:Families,
    familyFilter:FamilyFilter,
    familyDetails:FamilyDetails,
    products:Products,
    productFilter:ProductFilter,
    productDetails:ProductDetails,
    cars:Cars,
    carDetails:CarDetails,
    restCafe:RestCafe,
    restCafeDetails:RestCafeDetails,
    restProducts:RestProducts,
    restProductDetails:RestProductDetails,
    editRestProfile:EditRestProfile,
    editRestContact:EditRestContact,
    addProduct:AddProduct,
    carProducts:CarProducts,
    editCarProfile:EditCarProfile,
    editCarContact:EditCarContact,
    familyProducts:FamilyProducts,
    editFamilyProfile:EditFamilyProfile,
    editFamilyContact:EditFamilyContact,
    orderDetails:OrderDetails,
    qrConfirmTicket:QrConfirmTicket,
    qrTicketDetails:QrTicketDetails,
    proposedEvents:ProposedEvents,
    commonEvents:CommonEvents,
    signIn:SignIn,
    searchFamiliesResult:SearchFamiliesResult,
    searchProductsResult:SearchProductsResult,
    editProduct:EditProduct,
    restFilter:RestFilter,
    searchRestResult:SearchRestResult,
    visaPay:VisaPay,

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



const appStack = createStackNavigator({


    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    language: {
        screen: Language,
        navigationOptions: {
            header: null
        }
    },
    searchRestResult: {
        screen: SearchRestResult,
        navigationOptions: {
            header: null
        }
    },
    restFilter: {
        screen: RestFilter,
        navigationOptions: {
            header: null
        }
    },
    editProduct: {
        screen: EditProduct,
        navigationOptions: {
            header: null
        }
    },
    commonEvents: {
        screen: CommonEvents,
        navigationOptions: {
            header: null
        }
    },
    proposedEvents: {
        screen: ProposedEvents,
        navigationOptions: {
            header: null
        }
    },
    searchFamiliesResult: {
        screen: SearchFamiliesResult,
        navigationOptions: {
            header: null
        }
    },
    searchProductsResult: {
        screen: SearchProductsResult,
        navigationOptions: {
            header: null
        }
    },
    productFilter: {
        screen: ProductFilter,
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
    myOrders: {
        screen: MyOrders,
        navigationOptions: {
            header: null
        }
    },
    qrScan: {
        screen: QrScan,
        navigationOptions: {
            header: null
        }
    },
    qrConfirmTicket: {
        screen: QrConfirmTicket,
        navigationOptions: {
            header: null
        }
    },
    qrTicketDetails: {
        screen: QrTicketDetails,
        navigationOptions: {
            header: null
        }
    },
    orderDetails: {
        screen: OrderDetails,
        navigationOptions: {
            header: null
        }
    },
    myFamily: {
        screen: MyFamily,
        navigationOptions: {
            header: null
        }
    },
    editFamilyProfile: {
        screen: EditFamilyProfile,
        navigationOptions: {
            header: null
        }
    },
    editFamilyContact: {
        screen: EditFamilyContact,
        navigationOptions: {
            header: null
        }
    },
    myCar: {
        screen: MyCar,
        navigationOptions: {
            header: null
        }
    },
    familyProducts: {
        screen: FamilyProducts,
        navigationOptions: {
            header: null
        }
    },
    editCarProfile: {
        screen: EditCarProfile,
        navigationOptions: {
            header: null
        }
    },
    editCarContact: {
        screen: EditCarContact,
        navigationOptions: {
            header: null
        }
    },
    carProducts: {
        screen: CarProducts,
        navigationOptions: {
            header: null
        }
    },
    foodPayment: {
        screen: FoodPayment,
        navigationOptions: {
            header: null
        }
    },
    foodPayMethod: {
        screen: FoodPayMethod,
        navigationOptions: {
            header: null
        }
    },
    restProducts: {
        screen: RestProducts,
        navigationOptions: {
            header: null
        }
    },
    addProduct: {
        screen: AddProduct,
        navigationOptions: {
            header: null
        }
    },
    myResturant: {
        screen: MyResturant,
        navigationOptions: {
            header: null
        }
    },
    editRestContact: {
        screen: EditRestContact,
        navigationOptions: {
            header: null
        }
    },
    editRestProfile: {
        screen: EditRestProfile,
        navigationOptions: {
            header: null
        }
    },
    restProductDetails: {
        screen: RestProductDetails,
        navigationOptions: {
            header: null
        }
    },
    restCafeDetails: {
        screen: RestCafeDetails,
        navigationOptions: {
            header: null
        }
    },
    restCafe: {
        screen: RestCafe,
        navigationOptions: {
            header: null
        }
    },
    carDetails: {
        screen: CarDetails,
        navigationOptions: {
            header: null
        }
    },
    cars: {
        screen: Cars,
        navigationOptions: {
            header: null
        }
    },
    productDetails: {
        screen: ProductDetails,
        navigationOptions: {
            header: null
        }
    },
    familyDetails: {
        screen: FamilyDetails,
        navigationOptions: {
            header: null
        }
    },
    products: {
        screen: Products,
        navigationOptions: {
            header: null
        }
    },
    families: {
        screen: Families,
        navigationOptions: {
            header: null
        }
    },
    familyFilter: {
        screen: FamilyFilter,
        navigationOptions: {
            header: null
        }
    },
    productiveFamilies: {
        screen: ProductiveFamilies,
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
    signIn: {
        screen: SignIn,
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




});


const authStack = createStackNavigator({
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
    verifyCode: {
        screen: VerifyCode,
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
    confirmPass: {
        screen: ConfirmPass,
        navigationOptions: {
            header: null
        }
    },
    visaPay: {
        screen: VisaPay,
        navigationOptions: {
            header: null
        }
    },
});


const AppNavigator = createSwitchNavigator({

    initScreen: {
        screen: InitScreen,
        navigationOptions: {
            header: null
        }
    },
    auth: authStack,
    app: appStack,

});

export default createAppContainer(AppNavigator);