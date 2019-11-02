import {Dimensions , I18nManager , Platform} from "react-native";
import COLORS from '../../src/consts/colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = ({
    transform:{
        transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]
    },
    writing:{
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    },
    flex0:{
        flex:0
    },
    flex1:{
        flex:1
    },
    flexGrow:{
        flexGrow: 1
    },
    asfs:{
        alignSelf: 'flex-start'
    },
    asc:{
        alignSelf: 'center'
    },
    tac:{
        textAlign: 'center'
    },
    imageBackground: {
        width: null,
        height: null,
        flex: 1,
    },
    keyboardAvoid: {
        width:'100%',
        height: null,
        flex: 1,
    },
    directionColumn:{
        flexDirection:'column',
    },
    directionColumnCenter:{
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'column'
    },
    directionRow:{
        flexDirection:'row',
    },
    directionRowAlignCenter:{
        flexDirection:'row',
        alignItems:'center'
    },
    directionRowCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    centerBlock:{
        justifyContent:'center',
        alignItems:'center'
    },
    directionRowSpace:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    mb15:{
        marginBottom:15
    },
    tAC:{
        textAlign:'center'
    },
    mt15:{
        marginTop:15
    },
    mt25:{
        marginTop:25
    },
    mt50:{
        marginTop:50
    },
    mt70:{
        marginTop:70
    },
    mt30:{
        marginTop:30
    },
    ml10:{
        marginLeft:10
    },
    mb10:{
        marginBottom:10
    },
    mb100:{
        marginBottom:100
    },
    p20:{
        padding:20
    },
    w100:{
        width:'100%'
    },
    w50:{
        width:'50%'
    },
    BoldText:{
        fontFamily: I18nManager.isRTL ? 'cairoBold' : 'openSansBold'
    },
    normalText:{
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'
    },
    whiteText:{
        color:COLORS.white,
        fontSize:15
    },
    blueText:{
        color:COLORS.blue,
        fontSize:15
    },
    orangeText:{
        color:COLORS.orange,
        fontSize:15
    },
    grayText:{
        color:COLORS.gray,
        fontSize:12
    },
    boldGrayText:{
        color:COLORS.boldGray,
        fontSize:15
    },
    blueBtn:{
        backgroundColor:COLORS.blue,
        justifyContent:'center',
        alignItems:'center',
        width:150,
        height:45,
        alignSelf:'center'
    },
    disabledBtn:{
        backgroundColor:COLORS.lightGray,
        justifyContent:'center',
        alignItems:'center',
        width:150,
        height:45,
        alignSelf:'center'
    },
    eventBtn:{
        backgroundColor:COLORS.blue,
        justifyContent:'center',
        alignItems:'center',
        width:75,
        height:30,
        marginTop:5
    },


    // language
    langView:{
         width:'100%',
        paddingHorizontal:25,
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 10
    },
    logo:{
        width:200,
        height:200
    },
    langBorder:{
        width:140,
        height:120,
        borderWidth:1,
        borderRadius:20,
        padding: 5
    },
    lang:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff20',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    },


    // Auth
    headerbg:{
        width:'100%' ,
        height:230
    },
    headerLogo:{
        position:'absolute' ,
        top:0 ,
        width:'40%' ,
        alignSelf:'center'
    },

    // Login Screen Styles
    authBack:{
        height:45 ,
        width:45 ,
        position:'absolute' ,
        zIndex:1 ,
        top:40,
        left:20
    },
    authImg:{
        height:25 ,
        width:25 ,
    },

    rightHeaderIcon:{
        fontSize: 40,
        color:COLORS.white ,
        width:45 ,
        height:45,
        position:'absolute' ,
        right:15
    },

    itemPicker : {
        borderWidth: 1,
        borderColor: 'transparent',
        height: '100%',
        borderRadius: 0,
        width: '100%',
        padding: 5,
        flexDirection: 'column',
        // flexBasis : "100%",
        alignItems : 'center',
        justifyContent : 'center',
    },
    picker:{
        width:Platform.OS === 'ios' ? 300 : '100%',
        backgroundColor: '#ffffff20',
        color: COLORS.white ,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        fontWeight: 'normal',
        fontSize: 15,
        top: I18nManager.isRTL ? Platform.OS === 'ios' ? -15 : -13 : -11,
        paddingRight:10,
        paddingLeft:Platform.OS === 'ios' ?0:10,
        height:37,
        lineHeight:37,
        left:Platform.OS === 'ios' ? 0 : -2,
        borderRadius:0
    },
    pickerImg:{
        width: 20,
        height: 20,
        right: 10,
        position:'absolute'
    },

    regMarker:{
        width:25 ,
        height:25 ,
    },
    modalStyle:{
        flex: 1 ,
        backgroundColor:'#fff' ,
        padding:20 ,
        position:'absolute' ,
        width:'100%',
        borderRadius:25,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    modalEvent:{
        flex: 1 ,
        backgroundColor:'#fff' ,
        padding:15 ,
        position:'absolute' ,
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    mapView: {
        flex: 1 ,
        width:'100%' ,
        height:350
    },
    mapMarker: {
        width: 20,
        height: 20,
        right:10,
        position:'absolute',
        top:15
    },
    inputParent:{
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 0,
        flexDirection: 'row' ,
        marginTop:35,
        borderColor: COLORS.blue,
        width: '100%',
    },
    item:{
        borderBottomWidth: 0,
        top: -18,
        marginTop: 0,
        position: 'absolute',
        width: '100%',
        padding: 0,
        marginLeft:0,
    },
    labelImg:{
        width:15,
        height:15,
        position:"absolute",
        top:0,
        left:0,
    },
    labelItem:{
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        fontFamily:  I18nManager.isRTL ? 'cairo' : 'openSans',
        color: COLORS.blue ,
        fontSize:15 ,
        top: I18nManager.isRTL ?-13 : -8.5,
        paddingRight: I18nManager.isRTL ? Platform.OS === 'ios' ?13 :25 : 13,
        paddingLeft:I18nManager.isRTL ? Platform.OS === 'ios' ?25 : 10 :25,
        left:0,
        borderBottomWidth:1,
        borderBottomColor:'#201531'
    },
    itemInput:{
        width: '96.6%',
        color: COLORS.white,
        textAlign: I18nManager.isRTL ?'right' : 'left',
        fontSize: 15,
        top: I18nManager.isRTL ? Platform.OS === 'ios' ?-11 : -7 : Platform.OS === 'ios' ?-4 : -3 ,
        paddingRight:10,
        paddingLeft:10,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        backgroundColor: '#ffffff20',
        height:37,
        lineHeight:I18nManager.isRTL ? Platform.OS === 'ios' ?30 : 37 : Platform.OS === 'ios' ?20 : 37 ,
        left:5.4
    },
    textarea:{
        width: '96.6%',
        textAlign: I18nManager.isRTL ?'right' : 'left',
        fontSize: 15,
        top: I18nManager.isRTL ? Platform.OS === 'ios' ?-11 : -7 : -3,
        padding:10,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        height:120,
        left:0.5,
        backgroundColor:'#f5f5f5',
        color: COLORS.gray
    },
    itemText:{
        width: '96.6%',
        color: COLORS.white,
        fontSize: 15,
        top: I18nManager.isRTL ? Platform.OS === 'ios' ?-6: -2 : 2,
        paddingRight:Platform.OS === 'ios' ?30 :10,
        paddingLeft:Platform.OS === 'ios' ?10 :30,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        backgroundColor: '#ffffff20',
        height:37,
        lineHeight:37,
        left:5.4,
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    },

    accParent:{
        borderWidth: 1,
        height: 50,
        flexDirection: 'column' ,
        marginTop:70,
        borderColor: COLORS.blue,
        width:'50%' ,
        alignSelf:'flex-end',
        left:2,
        marginBottom:20
    },
    createAccText:{
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        color: COLORS.blue ,
        borderBottomWidth:1,
        borderBottomColor:'#201531',
        flexDirection:'row',
        top:I18nManager.isRTL ?-26 : -21.5,
        paddingLeft: 20,
        paddingRight:5,
    },
    noAcc:{
        width: '96.6%',
        color: COLORS.white,
        fontSize: 15,
        top:I18nManager.isRTL ?-21 : -16,
        backgroundColor:COLORS.blue,
        height:38,
        left:5,
        justifyContent:'center',
        alignItems:'center',
    },
    // side menu
    sideImgView:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:300
    },
    sideImg:{
        width:50 ,
        height:50
    },
    cutCircle:{
        height:140,
        overflow:'hidden' ,
        marginBottom:10
    },
    sideProfileImg:{
        width:160,
        height:160 ,
        borderRadius:80,
        overflow:'hidden' ,
        borderWidth:6 ,
        borderColor:'#ffffff56'
    },
    sideDrawerImg:{
        width:'100%',
        height:'100%'
    },
    drawImg:{
        width:Platform.OS === 'ios' ?151 :160,
        height:Platform.OS === 'ios' ?151 :160 ,
        top:Platform.OS === 'ios' ?-1.5 :0 ,
        alignSelf:'center',
        borderRadius:80,
    },
    sideName:{
        color:'#fff',
        fontSize:17,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
    },
    bgSideMenu:{
        width: '100%',
        height: 300
    },
    drawerContainer:{
        backgroundColor:'#fff' ,
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    drawerLabel:{
        color: COLORS.gray ,
        fontSize:15 ,
        marginLeft: 0 ,
        marginRight: 0 ,
        marginBottom:10 ,
        marginTop:10  ,
        fontWeight: 'normal',
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
    },
    drawerImg:{
        height: 25,
        width: 25
    },
    drawerIcon:{
        marginHorizontal:20
    },
    drawerItemStyle:{
        // marginBottom:10 ,
        // paddingBottom:5 ,
        marginTop:0 ,
        paddingTop:0,
    },



    // home

    homecontent:{
        zIndex: -1,
        marginTop: -100,
    },
    header : {
        backgroundColor:'transparent',
        paddingTop: 30,
        height: 100,
        paddingLeft:0,
        paddingRight:0,
        borderBottomWidth:0
    },
    animatedHeader:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        height: 100 ,
        marginTop:-50 ,
        alignItems:'center',
        paddingTop: 30
    },
    headerMenu:{
        width: 25,
        height: 25,
    },
    headerText:{
        color:'#fff',
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans' ,
        fontSize: 15 ,
    },
    headerBtn:{
        width:40,
        height:40 ,
        justifyContent:'center' ,
        alignItems:'center',
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        paddingBottom:0,
    },

    homeSection : {
        width: '100%',
        paddingHorizontal:10,
        marginBottom:20,
        marginTop:85
    },
    whiteHome : {
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        flex:1,
        marginBottom:0,

    },

    overlay : {
        width: '100%',
        height: '100%',
        backgroundColor:'#00000060',
        position:'absolute',
        bottom:0,
        flexDirection:'column',
        justifyContent:'center' ,
        alignItems:'flex-start',
        paddingHorizontal:25,
    },
    imgParent : {
        borderRadius:15,
        overflow: 'hidden',
        marginBottom:20
    },

    overImg : {
        width:40,
        height:40,
    },
    activeImg : {
        width:30,
        height:30,
    },



    // footer
    footer:{
        backgroundColor: COLORS.mov,
        height:55,
        paddingTop:15,
        borderTopWidth:0
    },
    footerTab:{
        backgroundColor: COLORS.mov,
        width: width ,
        flexDirection: 'row',
        justifyContent: 'space-between' ,

    },
    activeFoot:{
        backgroundColor:COLORS.rose ,
        height:3,
        width:'60%',
        borderRadius:3,
        marginBottom:3,
    },
    footImg:{
        width: 24,
        height: 24,
        marginBottom:10,
    },
    footSearch:{
        bottom:25,
        width: 80,
        height: 80,
    },
    footSearchImg:{
        width: 50,
        height: 50,
    },

    // notifications
    notiBlock:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:COLORS.lightGray,
        padding:20
    },
    notiImg:{
        width: 17,
        height: 17,
        marginRight:7
    },
    resha:{
        width: 30,
        height: 30,
        marginRight:0
    },
    notiClose:{
        width: 22,
        height: 22,
    },

    //side menu Img
    blackLogo:{
        width:80,
        height:80,
        alignSelf:'center',
    },
    faqImg:{
        width:150,
        height:150,
        alignSelf:'center',
        marginTop:65
    },
    faqBlock:{
        width:'100%',
        marginBottom:15
    },

    // fa3lyat
    mainScroll:{
        height:40,
        marginTop:90,
        justifyContent:'center',
        alignItems:'center',
    },
    scrollView:{
        justifyContent:'center',
        alignItems:'center',
        height:40,
        marginHorizontal:13,
    },
    scrollText:{
        fontSize:15,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        height:40,
        lineHeight:40,
    },
    activeLine: {
        width: '100%',
        height: 3,
        backgroundColor: 'transparent',
        borderRadius:3,
        position:'absolute',
        bottom:0
    },
    eventImg:{
        width:110,
        height:'100%',
        marginRight:20,
        flex:0
    },
    touchImg:{
        width:110,
        marginRight:20,
        flex:0,
        height:115
    },
    ticketView:{
        alignSelf:'center',
        width:200,
        height:100,
        overflow:"hidden",
        justifyContent:'center',
        alignItems:'center',
    },
    ticket:{
        width:200,
        height:200,
    },
    ticketViewType:{
        alignSelf:'center',
        width:270,
        height:140,
        overflow:"hidden",
        justifyContent:'center',
        alignItems:'center',
    },
    ticketType:{
        width:250,
        height:250,
    },
    ticketText:{
        textAlign:'center',
        position:'absolute',
        top:'40%'
    },
    checkBox:{
        left:0,
        marginRight:5,
        marginLeft:0,
        paddingRight:Platform.OS === 'ios' ?4 : 2,
        borderRadius:3
    },
    line:{
        borderWidth:.5 ,
        borderColor:COLORS.lightGray ,
        width:'100%' ,
        marginVertical:20
    },
    whiteLine:{
        borderWidth:1 ,
        borderColor:COLORS.white ,
        width:37 ,
        marginVertical:5
    },
    catPicker:{
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor:'transparent',
        height: 30,
        width:'100%',
        padding: 0,
        flexDirection: 'row' ,
    },
    pickerLabel:{
        backgroundColor: 'transparent',
        color: COLORS.boldGray ,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        fontWeight: 'normal',
        marginLeft:0,
        textAlign: I18nManager.isRTL ?'right' : 'left',
        width: width - 80,
        marginRight:20 ,
        right:Platform.OS === 'ios' ? 15 : 10,
        fontSize:15
    },
    delAcc:{
        backgroundColor:'#f2f2f2',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:13 ,
        marginVertical:15
    },
    dropArrow: {
        right:5,
        width:20 ,
        height:20,
        position:'absolute'
    },
    addMore: {
        width:30 ,
        height:30,
    },
    removeImg: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    borderImg: {
        borderRadius:50,
        borderWidth:2,
        borderColor:COLORS.rose,
        overflow:'hidden',
        marginRight:10
    },
    starStyle:{
        color: '#f0aa0b',
        marginHorizontal: .5
    },
    eventdoteStyle:{
        backgroundColor:'#fff',
        borderRadius: 50,
        width: 10,
        height: 10,
        bottom:-15
    },
    eventactiveDot:{
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.blue,
        width: 10,
        height: 10,
        bottom:-15
    },
    eventswiper:{
        width: '100%',
        height: 200,
        flex:0,
        marginTop:20,
        marginBottom:15,
        overflow:'hidden'
    },
    restImg:{
        width: '90%',
        height: 200,
        marginTop:20,
        marginBottom:15,
        overflow:'hidden',
        alignSelf:'center'
    },
    swiperImg:{
        width: '100%',
        height: '100%',
    },
    productImg:{
        width: 100,
        height: 90,
        marginTop:10
    },
    dateView:{
        height: 45,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        backgroundColor:'#ddeeee'
    },
    remainingView:{
        height: 45,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        backgroundColor:'#f9f0f4'
    },
    payView:{
        borderWidth:1,
        borderColor:COLORS.gray,
        paddingHorizontal:15,
        paddingVertical:7,
        marginBottom:20
    },
    QR :{
        width:80 ,
        height:80 ,
        position:'absolute' ,
        bottom:100 ,
        left:20,
        marginBottom:30,
        overflow:'hidden',
    },
    // reservation


    reservationScroll:{
        height:60,
        alignItems:'center',
        backgroundColor:'#c289a333',
        borderRadius:10,
        paddingHorizontal:10,
        marginBottom:15
    },
    reservationScrollView:{
        justifyContent:'center',
        alignItems:'center',
        height:60,
        marginHorizontal:5,
        paddingHorizontal:10,
        width:70
    },
    reservationScrollText:{
        fontSize:14,
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        color:COLORS.white,
        textAlign:'center',

    },
    eventTouch:{
        flex:1,
        marginBottom: 15,
        width:'100%',
        height:180 ,
        borderRadius:15,
        alignSelf:'center',
    },
    eventCont : {
        backgroundColor: '#cfcfcf6b' ,
        position:'absolute' ,
        top:0 ,
        height:'100%' ,
        padding:20,
        borderRadius:15,
        flexDirection:'row' ,
        flex:1 ,
        width:'100%' ,
        justifyContent:'space-between',
        alignItems:'flex-end'

    },
    dateEvent : {
        backgroundColor:'#28939187',
        paddingHorizontal:10 ,
        width:50 ,
        height:45 ,
        justifyContent:'center' ,
        alignItems:'center',
        top:10

    },

    familiesCont : {
        backgroundColor: '#b1aba940' ,
        position:'absolute' ,
        top:0 ,
        height:'100%' ,
        padding:20,
        borderRadius:15,
        flexDirection:'column' ,
        flex:1 ,
        width:'100%' ,
        justifyContent:'space-between' ,

    },
    familiesEvent : {
        backgroundColor:'#28939187',
        paddingHorizontal:15 ,
        paddingVertical:10,
        justifyContent:'center' ,
        alignItems:'center',
        alignSelf:'flex-end'
    },
    inputView : {
        borderRadius: 35,
        height: 45,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        marginTop:30,
        marginBottom:20
    },
    inputItem :{
        borderBottomWidth: 0,
        width:'100%',
        paddingHorizontal: 10,
    },
    searchToch : {
        right: 0,
        top: -2,
        position: 'absolute',
        flex: 1
    },
    searchImg : {
        width: 50,
        height: 50,
    },
    modalInput:{
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: '#acabae',
        fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans',
        paddingBottom:0,
        textAlign: I18nManager.isRTL ?'right' : 'left',
        fontSize:14,
        paddingRight:25
    },
    saveBtn:{
        width:40,
        height:40 ,
        justifyContent:'center' ,
        alignItems:'center',
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        paddingBottom:0,
        position:'absolute',
        top:-18,
        right:15,
        zIndex:1
    },
    editBtn:{
        borderWidth: 1,
        borderColor: COLORS.blue,
        alignSelf:'center',
        padding:3,
        marginTop:15
    },
    upload:{
        flexDirection:'row' ,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    overProfile:{
        backgroundColor:'#ead6e1ad',
        position:'absolute',
        top:-.5,
        zIndex:1,
        width:'101%',
        height:'101%',
        borderWidth:6,
        borderColor:'#ead6e1',
        borderRadius:80,
        left:-.5
    },
    restTabs:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10
    },
    grayCont:{
        backgroundColor:'#f2f2f2',
        padding:15
    },
    floatingEdit:{
        position:'absolute',
        bottom:100,
        right:10
    },
    editImg:{
        width:60,
        height:60
    },
    restProfile:{
        width:100 ,
        height:100 ,
        marginTop:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e9f4f4',
        alignSelf:'center',
        marginBottom:15
    },
    deleteProduct:{
        width:50,
        height:50 ,
        justifyContent:'center' ,
        alignItems:'center',
        position:'absolute',
        right:-20,
        top:-15,
    },
    sliderParent:{
        width: '100%',
        marginTop: 20
    },
    slider:{
        width: '100%' ,
        transform: Platform.OS === 'ios' ?  [{rotateY : '0deg'}] : I18nManager.isRTL ? [{rotateY : '-180deg'}] : [{rotateY : '0deg'}]
    },
    range:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '100%',
        alignItems: 'center'
    },
    switch:{
        marginHorizontal:5,
        transform: I18nManager.isRTL ? Platform.OS === 'ios' ?  [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] :  [{rotateY : '0deg'}]
    }
});

export default styles;