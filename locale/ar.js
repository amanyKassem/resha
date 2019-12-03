const ar = {	'skip':'تخطي',	'name': 'الاسم',	'phoneNumber': 'رقم الجوال',	'password': 'كلمة المرور',	'forgetPass': 'نسيت كلمة المرور ؟',	'visitor': 'دخول كزائر',	'loginButton': 'دخول',	'login': 'تسجيل الدخول',	'registerButton': 'انشاء حساب',	'noAcc': 'ليس لديك حساب؟',	'register': 'تسجيل',	'sendButton': 'ارسال',	'verifyCode': 'كود التحقق',	'oldPass': 'كلمة المرور القديمة',	'newPass': 'كلمة المرور الجديدة',	'rePassword': 'تأكيد كلمة المرور',	'verifyNewPass': 'تأكيد كلمة المرور الجديدة',	'recoverPass' : 'استعادة كلمة المرور',	'confirm': 'تأكيد',	'next': 'التالي',	'username': 'اسم المستخدم',	'fullName': 'الاسم بالكامل',	'email': 'البريد الالكتروني',	'noNotifications': 'لا يوجد اشعارات',	'language': 'اللغة',	'stopNotification': 'ايقاف الاشعارات',	'shareApp': 'مشاركة التطبيق',	'home': 'الرئيسية',	'aboutApp': 'عن التطبيق',	'appLang': 'لغة التطبيق',	'terms' : 'الشروط والاحكام',	'contactUs' : 'تواصل معنا',	'settings' : 'الاعدادات',	'complaints' : 'الشكاوي والاقتراحات',	'logout' : 'تسجيل خروج',	'notifications' : 'الاشعارات',	'notifs' : 'الاشعارات',	'notificationDeleted' : 'تم حذف الاشعار',	'search' : 'بحث',	'RS' : 'ريال',	'city' : 'المدينة',	'date' : 'التاريخ',	'time' : 'الوقت',	'cancel' : 'الغاء',	'address' : 'العنوان',	'msg' : 'الرسالة',	'changePass' : 'تغيير كلمة المرور',	'chooseLang' : 'اختر اللغة',	'passwordRequired': 'كلمة السر مطلوبه',	'phoneRequired': 'رقم الهاتف مطلوب',	'passwordLength': 'كلمة السر اقل من 8 احرف',	'phoneValidation': 'رقم الهاتف غير صحيح',	'organizations': 'الهيئات',	'available':'متاح',	'notavailable':'غير متاح',	'verifyPassword': 'كلمة المرور و تأكيد كلمة المرور غير متطابقين',	'guest': 'زائر',	'codeNotCorrect' : 'كود التفعيل غير صحيح',	'emailNotCorrect': 'البريد الالكتروني غير صحيح',	'searchResult': 'نتائج البحث',	'activateAcc': 'تفعيل الحساب',	'activationCode': 'كود التفعيل',	'location': 'الموقع',	'faq': 'اسئلة متكررة',	'save': 'حفظ',	'events': 'فاعليات',	'eventsNo': 'عدد الفاعليات',	'coffeeRest': 'كوفي ومطاعم',	'number': 'العدد',	'foodTrack': 'فود تراك',	'productiveFamilies': 'الأسر المنتجة',	'familiesNumber': 'عدد الأسر',	'myOrders': 'طلباتي',	'newOrders': 'طلبات جديدة',	'accepted': 'تمت الموافقة عليها',	'executed': 'منفذه',	'refused': 'مرفوضة',	'confirmTicket': 'تأكيد بيانات التذكرة',	'remain': 'متبقي',	'ticketsNo': 'عدد التذاكر',	'details': 'التفاصيل',	'ticketDet': 'تفاصيل التذكرة',	'refuse': 'رفض',	'contactManege': 'تواصل مع الادارة',	'delete': 'حذف',	'orderDet': 'تفاصيل الطلب',	'normalPrice': 'السعر العادي',	'vipPrice': 'السعر المميز',	'goldPrice': 'السعر الذهبي',	'normalChairs': 'عدد الكراسي العادية',	'vipChairs': 'عدد الكراسي المميزه',	'goldChairs': 'عدد الكراسي الذهبية',	'confirmDelete': 'تأكيد الحذف',	'deleteQues': 'هل انت متأكد من خيار الحذف',	'myFamily': 'اسرتي',	'moreProducts': 'مشاهدة المزيد من المنتجات',	'mainNumber': 'الرقم الاساسي',	'editFamily': 'تعديل معلومات الاسرة',	'uploadPhoto': 'رفع صوره',	'familyName': 'اسم الاسرة',	'category': 'التصنيف',	'moreDetails': 'تفاصيل اكثر',	'website': 'الموقع الالكتروني',	'facebook': 'الفيس بوك',	'twitter': 'تويتر',	'myCar': 'عربتي',	'products': 'المنتجات',	'editCar': 'تعديل معلومات العربة',	'carName': 'اسم العربة',	'choosePayMethod': 'اختر وسيلة دفع',	'payByVisa': 'الدفع بالفيزا / الماستر كارد',	'payBySadad': 'الدفع بسداد',	'payByMada': 'الدفع بمدي',	'choosePackage': 'اختر الباقة المناسبة لك',	'monthlyPackage': 'باقة شهرية',	'yearlyPackage': 'باقة سنوية',	'addProduct': 'اضافة منتج',	'editProduct': 'تعديل المنتج',	'productName': 'اسم المنتج',	'price': 'السعر',	'myRest': 'مطعمي',	'editRest': 'تعديل معلومات المطعم',	'restName': 'اسم المطعم',	'productInfo': 'معلومات عن المنتج',	'not': 'غير',	'prodNo': 'عدد المنتجات',	'rest&cafe': 'المطاعم والكافيهات',	'cars': 'العربيات',	'searchFilter': 'فلتر بحث',	'families': 'الأسر',	'sortBy': 'تصنيف حسب',	'editProfile': 'تعديل الصفحة الشخصية',	'profile': 'الملف الشخصي',	'editAcc': 'تعديل الحساب',	'saves': 'المحفوظات',	'proposedEvents': 'الايفينتات المقترحة',	'commonEvents': 'الايفينتات الشائعة',	'favsEvents': 'الايفينتات المفضلة',	'reservations': 'حجوزاتي',	'eventType': 'نوع الفاعلية',	'showTicket': 'عرض التذكرة',	'scanQr': 'قم بعملية مسح لQR',	'deleteTicket': 'حذف التذكرة',	'confirmPayment': 'تأكيد عملية الدفع',	'backToTicket': 'عوده للتذكرة',	'payDone': 'تم تأكيد الدفع',	'bookChair': 'تم حجز مقعدك بنجاح',	'noRefund': 'لا يمكن استرجاع المبلغ',	'seeTicket': 'رؤية التذكرة',	'paymentOp': 'عملية الدفع',	'creditCard': 'بطاقة ائتمان',	'firstName': 'الاسم الأول',	'lastName': 'الاسم الاخير',	'expDate': 'تاريخ الانتهاء',	'securityCode': 'رمز الحماية',	'payment': 'الدفع',	'continue': 'اكمال',	'continueBooking': 'اكمال الحجز',	'ticketType': 'نوع التذكرة',	'vipTicket': 'تذكره vip',	'goldTicket': 'تذكره ذهبية',	'normalTicket': 'تذكره عادية',	'book': 'حجز',	'confirmCancelEvent': 'تأكيد الغاء الفاعلية',	'communicateWithManage': 'يتم التواصل مع الادارة',	'addManyPhotos': 'اضافة العديد من الصور',	'addEvent': 'اضافة فاعلية',	'eventPhotos': 'صور للفاعلية',	'eventSent': 'نجح ارسال الفاعلية',	'willBeAnswered': 'سيتم الرد عليك من قبل الادارة',	'seeEvent': 'رؤية الفاعلية',	'quantity': 'الكمية',	'langSettings': 'اعدادات اللغة',	'deleteAcc': 'حذف الحساب',	'acceptTerms': 'الموافقة علي الشروط و الأحكام',	'complainAndProposal': 'ضع الشكوي وانتظر المقترح',	'addComp': 'اضافة تفاصيل للشكوي',	'arDesc': 'وصف عربي',	'enDesc': 'وصف انجليزي',	'section': 'القسم',	'commission': 'الهيئة',	'arEvent': 'اسم الفاعية باللغة العربية',	'enEvent': 'اسم الفاعية بالأنجليزي',	'eventDate': 'تاريخ الفاعلية',	'eventTime': 'توقيت الفاعلية',	'eventHoursNo': 'عدد ساعات الفاعلية',	'myEvents': 'فاعلياتي',	'underConfirmation': 'تحت التأكيد',	'approved': 'تمت الموافقة عليها',	'cancelled': 'ملغاه',	'userType': 'نوع المستخدم',	'normalUser': 'مستخدم عادي',	'eventOwner': 'صاحب فاعلية',	'organizer': 'منظم',	'cafeOwner': 'صاحب كافيه',	'productiveOwner': 'صاحب اسرة منتجة',	'foodTrackOwner': 'صاحب فود تراك',	'product': 'منتج',	'onlineBook': 'حجز اونلاين',	'chooseCategory': 'اختر قسم',	'chooseOrganizations': 'اختر هيئة',	'confirmPay': 'لا يمكن استرجاع المبلغ اذا تم الموافقة علي التأكيد',	'availTicket': 'عذرا , هذا العدد من التذاكر غير متاح',	'validateData': 'من فضلك ادخل البيانات بطريقه صحيحة',}export default ar;