import i18n from 'i18next';
import 'intl';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: 'Hello!',
      changeLanguage: 'Change Language',
      welcome: 'Welcome',
      goodbye: 'Goodbye',
      contactusheading: 'If you have any inquries, get in touch with us, we will be happy to help you',
      developercontact: 'Website / App Developer Contact',
      developeby: 'Developed by',
      successchangeLanguage: 'Do you want to change the language?',
      loginsuccessfully: 'Login successfully.',
      home: 'Home',
      profile: 'Profile',
      login: 'Login',
      committeeMember: 'Committee members',
      settings: 'Settings',
      contactUs: 'Contact us',
      logout: 'Logout',
      cacelSubScription: 'Cancel Subscription',
      aboutUs: 'About us',
      register: 'Register',
      news: 'News',
      newsDetails: 'News Details',
      villages: 'Villages',
      village: 'Village',
      paymentPage: 'Payment',
      directory: 'Directory',
      familyList: 'Family List',
      paymentSuccess: 'Payment Success',
      paymentFail: 'Payment Fail',
      familyDetailsPage: 'Family Details Page',
      searchDirectory: 'Search Directory',
      changePassword: 'Change Password',
      familyRegister: 'Family Register',
      editMainDetails: 'Edit MainDetails',
      editFamilyDetails: 'Edit FamilyDetails',
      maintenanceScreen: 'MaintenanceScreen',
      search: 'Search',
      select_your_village: 'Select Your Village',
      name: 'Name',
      firstname: 'First Name',
      middlename: 'Middle Name',
      lastname: 'Last Name',
      password: 'Password',
      dateofbirth: 'Date of Birth',
      mobileno: 'Mobile',
      email: 'Email',
      mobile: 'Mobile Number',
      address: 'Current Address',
      city: 'City',
      state: 'State',
      pincode: 'Pincode',
      education: 'Education',
      profession: 'Profession',
      maritalstatus: 'Marital Status',
      relationship: 'Relationship',
      gender: 'Gender',
      job: 'Job',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      married: 'Married',
      unmarried: 'Unmarried',
      widower: 'Widower',
      widow: 'Widow',
      message: 'Message',
      divorcee: 'Divorcee',
      passwordisrequired: 'Password is required',
      mobilenumberisrequired: 'Mobile number is required',
      invalidmobilenumber: 'Incorrect mobile number',
      incorrectPassword: 'Incorrect Password',
      next: 'Next',
      selectyourvillage: 'Select your village.',
      registerthemainmemberofthehouse: 'Register the main member of the house.',
      pleasefillalltherequiredfields: 'Please fill all the required fields !',
      mobilenumberisalreadyregistered: 'Mobile number is already registered !',
      dopaymentforsuccessfullregistration: 'Do payment for successfull registration.',
      passwordmusthaveatleastoneletteronenumberandonespecialcharacter: 'Password must have at least one letter, one number, and one special character',
      pleaseenterfirstname: 'Please enter firstname.',
      pleaseenterlastname: 'Please enter lastname.',
      pleaseentermiddlename: 'Please enter middlename.',
      pleaseenteremail: 'Please enter Email.',
      pleaseentersubject: 'Please enter subject.',
      pleaseentermessage: 'Please enter message',
      Invalidemailaddress: 'Invalid email address.',
      pleaseenterpassword: 'Please enter password',
      passwordmusthaveatleastcharacters: 'Password must have at least 6 characters',
      pleaseenterdob: 'Please enter Date of Birth',
      pleaseentermobilenumber: 'Please enter mobile number',
      pleaseenteravalidmobilenumber: 'Please enter a valid mobile number',
      pleaseenterstate: 'Please enter state',
      pleaseentercity: 'Please enter city',
      pleaseenterpincode: 'Please enter pincode',
      pleaseenteravalidpincodenumber: 'Please enter a valid pincode number',
      pleaseentereducation: 'Please enter education',
      pleaseenteraddress: 'Please enter current address',
      pleaseenterjob: 'Please enter job',
      pleaseentergender: 'Please enter gender',
      pleasechoosemaritalstatus: 'Please choose marital status',
      pleasechooserelation: 'Please choose relationship',
      pay: 'Pay',
      registeredsuccessfully: 'Registered successfully.',
      paymentDoneSuccessfully: 'Payment Done Successfully.',
      paymentFailed: 'Payment Failed.',
      goTologinpage: 'GO TO LOGIN PAGE',
      registrationfailed: 'Registration failed !',
      pleaseTryAgain: 'Please Try Again',
      gotoregister: 'GO TO REGISTER PAGE',
      searchhere: 'Search here...',
      nosearchdatafound: 'No search data found...',
      nodatafound: 'No data found...',
      invoice: 'Invoice',
      download: 'Download',
      familyMembers: 'Family Members',
      downloadsuccessfully: 'Download successfully',
      profileimageupdatedsuccessfully: 'Profile image updated successfully.',
      currentpassword: 'Current password',
      newPassword: 'New Password',
      confirmpassword: 'Confirm password',
      currentpasswordisrequired: 'Current password is required',
      newpasswordisrequired: 'New password is required',
      confirmpasswordisrequired: 'Confirm password is required',
      newpasswordmustbedifferentfromthecurrentpassword: 'New password must be different from the current password!',
      incorrectcurrentpassword: 'Incorrect current password',
      passwordupdatedsuccessfully: 'Password updated successfully.',
      dataupdatedsuccessfully: 'Data updated successfully.',
      chooseyourgender: 'Choose Your Gender',
      update: 'Update',
      datadeletedsuccessfully: 'Data deleted successfully.',
      personalid: 'Personal Id.',
      age: 'Age',
      deleteconfirm: 'Are you sure you want to delete ?',
      delete: 'Delete',
      confirmlogout: 'Are you sure you want to logout ?',
      confirmSubscriptionCacel: 'Are you sure you want to cancel subscription ?',
      confirm: 'Confirm',
      familymembersarenotavailable: 'Family members are not available...',
      addnewfamilymembers: 'Add new family Members',
      form: 'Form',
      selectrelation: 'Select Relation',
      youcantaddmorethan7forms: 'You can not add more than 7 forms.',
      fillthedatatoaddnewform: 'Fill the data to add new form.',
      addform: 'Add Form.',
      submit: 'Submit',
      allvillages: 'All villages',
      cancel: 'Cancel',
      yes: 'Yes',
      shereapp: 'Shere app',
      entermobilenumberandpassword: 'Enter mobile number and password',
      emailOrMobileNumber: 'Email or Phone Number',
      OurPurpose: 'Our purpose',
      sendusonemail: 'Send us on email',
      facinganissue: 'Facing an issue? Our support team is here to help. Contact us via email.',
      emailOrMobileRequired: 'Email or Phone number is required',
      invalidEmailOrPhone: 'Invalid email or phone number',
      fullName: 'Full Name',
      invalidDate: "Invalid date",
      basicinfo: "Basic Information",
      ViewProfileImage: "View Profile Image",
      EditProfileImage: "Edit Profile Image",
      Close: "Close",
      Quickhelpforcommonissues: "Quick help for common issues 👋",
      EmailIsRequired: "Email is required",
      OTPisrequired: "OTP is required",
      PleaseEnterEmail: "Please enter email",
      proccessyourpaymentcheckyourinternetconnectionandtryagain: "We can't proccess your payment check your internet connection and try again.",
      Successpaymentmessage: "Success! Your payment is complete. Now you can log in to the Panchal Samaj app to get started.",
      TotalAmount: "Total Amount",
      MemberId: "Member Id",
      StartDate: "Start Date",
      EditProfile: "Edit Profile",
      AddProfile: "Add Profile",
      AddFamilyDetails: "Add Family Members",
      ShareApp: "Share App",
      VillagePeople: "village's People",
      contactusphoneheading: "You can call, text or whatsapp on below provided numbers.",
      contactusemailheading: "We respond to emails within 24 hours.",
      socials: "Socials",
      contactussocialheading: "Follow with our social to get modified with updates offers",
      gettouchmail: "Get in touch with us via email. 👋",
      sendemail: "Send Email",
      subject: "Subject",
      filldetails: "Fill the details",
      donthaveaccount: "Don't have an account?",
      position: "position",
      tryagain: "Try again",
      editbanner: "Edit Banner Image",
      viewbanner: "View Banner Image",
      selectmaritalstatus: "select marital status",
      tellmehowcan: "Tell us, how can I help you👋",
      ourcrewofexpertsareon: "Our Crew of experts are on  always on standy for service",
      getthesolutionsend: "Get the solution in your email inbox",
      findintelligentanswersInstantly: "Find quick answers to FAQs about Panchal community culture here.",
      termsAndConditionCardContent: "Terms and Conditions are rules users accept to use a service",
      termsAndCondition: "Term & Condition",
      searchVillage: "Search Villages",
      searchPersonVillage: "Search person details",
      SupportPage: "Support Page",
      Villagewisepeople: "Village wise people",
      NewsList: "News List",
      EmailSupport: "Email Support",
      RegisterPage: "Register Page",
      EditUserProfile: "Edit User Profile",
      PaymentPage: "Payment Page",
      AddFamilyDetails: "Add Family Details",
      CancelSubscription: "Cancel Subscription",
      EditFamilyDetails: "Edit Family Details",
      Members: "Members",
      Contactus: "Contact us",
      okay: "Okay",
      Subjectisrequired: "Subject is required",
      Messageisrequired: "Message is required",
      Invalidemailformat: "Invalid email format",
      Emailisrequired: "Email is required",
      Description: "Description",
      Support: "Support",
      Loading: "Loading",
      LatestNews: "Latest News",
      joinnow: "join now",
      Directory: "Directory",
      Events: "Events",
      Business: "Business",
      AllUser: "All User",
      PhoneNumber: "Phone Number",
      AllEvents: "All Events",
      SuccessfullyLoggedOut: "Logout Successfully",
      LanguageChangedSuccessfully: "Language Change Successfully",
    },
  },
  gu: {
    translation: {
      greeting: 'હેલો!',
      changeLanguage: 'ભાષા બદલો',
      welcome: 'સ્વાગત છે',
      goodbye: 'આવજો',
      contactusheading: 'જો તમે પંચાલ સમાજ એપમાં કોઈ સમસ્યા અનુભવો છો અથવા વધારાના કાર્યો સૂચવવા ઈચ્છો છો, તો કૃપા કરીને નીચે આપેલા નંબર પર અમારો સંપર્ક કરો.',
      developercontact: 'વેબસાઇટ / એપ બનાવનારનો સંપર્ક',
      developeby: 'બનાવનાર',
      successchangeLanguage: 'શું તમે ભાષા બદલવા માંગો છો?',
      loginsuccessfully: 'લૉગિન સફળતાપૂર્વક થઈ ગયું.',
      home: 'હોમ',
      profile: 'પ્રોફાઇલ',
      login: 'લોગીન ',
      committeeMember: 'સમિતિના સભ્યો',
      settings: 'સેટિંગ',
      contactUs: 'અમારો સંપર્ક કરો',
      logout: 'લૉગ આઉટ',
      cacelSubScription: 'સબ્સ્ક્રિપ્શન રદ કરો',
      aboutUs: 'અમારા વિશે',
      register: 'નોંધણી કરો',
      news: 'સમાચાર',
      newsDetails: 'સમાચાર વિગતો',
      villages: 'ગામડાઓ',
      village: 'ગામ',
      paymentPage: 'ચુકવણી',
      directory: 'ડિરેક્ટરી',
      familyList: 'કુટુંબ યાદી',
      paymentSuccess: 'ચુકવણી સફળ',
      paymentFail: 'ચુકવણી નિષ્ફળ',
      familyDetailsPage: 'કુટુંબ વિગતો',
      searchDirectory: 'શોધ ડિરેક્ટરી',
      changePassword: 'પાસવર્ડ બદલો',
      familyRegister: 'કુટુંબ રજીસ્ટર',
      editMainDetails: 'મુખ્ય વિગતો સંપાદિત કરો',
      editFamilyDetails: 'કૌટુંબિક વિગતો સંપાદિત કરો',
      maintenanceScreen: 'જાળવણી',
      search: 'શોધ',
      select_your_village: 'તમારું ગામ પસંદ કરો',
      name: 'નામ',
      firstname: 'પોતાનું નામ',
      middlename: 'પિતાનું નામ',
      lastname: 'અટક',
      password: 'પાસવર્ડ',
      dateofbirth: 'જન્મ તારીખ',
      mobileno: 'મોબાઇલ',
      email: 'ઇમેઇલ',
      mobile: 'મોબાઇલ નંબર',
      address: 'હાલનું સરનામું',
      city: 'શહેર',
      state: 'રાજ્ય',
      pincode: 'પિનકોડ',
      education: 'ભણતર',
      profession: 'વ્યવસાય',
      maritalstatus: 'વૈવાહિક સ્થિતિ',
      relationship: 'સંબંધ',
      job: 'નોકરી',
      gender: 'લિંગ',
      male: 'પુરુષ',
      female: 'સ્ત્રી',
      other: 'અન્ય',
      married: 'પરિણીત',
      unmarried: 'અપરિણીત',
      widower: 'વિધુર',
      widow: 'વિધવા',
      divorcee: 'છૂટાછેડા લેનાર',
      message: 'સંદેશ',
      passwordisrequired: 'પાસવર્ડ જરૂરી છે',
      mobilenumberisrequired: 'મોબાઈલ નંબર જરૂરી છે',
      invalidmobilenumber: 'ખોટો મોબાઇલ નંબર',
      incorrectPassword: 'ખોટો પાસવર્ડ',
      next: 'આગળ વધો',
      selectyourvillage: 'તમારું ગામ પસંદ કરો.',
      registerthemainmemberofthehouse: 'ઘર ના મુખ્ય સભ્ય નું રજીસ્ટર કરો.',
      pleasefillalltherequiredfields: 'કૃપા કરીને તમામ જરૂરી માહિતી ભરો.',
      dopaymentforsuccessfullregistration: 'સફળ રજીસ્ટ્રેશન માટે પેમેન્ટ કરો.',
      passwordmusthaveatleastoneletteronenumberandonespecialcharacter: 'પાસવર્ડમાં ઓછામાં ઓછો એક અક્ષર, એક નંબર અને એક વિશેષ અક્ષર હોવો આવશ્યક છે',
      pleaseenterfirstname: 'કૃપા કરીને પોતાનું નામ દાખલ કરો',
      pleaseenterlastname: 'કૃપા કરીને અટક દાખલ કરો',
      pleaseentermiddlename: 'કૃપા કરીને પિતાનું નામ દાખલ કરો',
      pleaseenteremail: 'કૃપા કરીને ઇમેઇલ દાખલ કરો',
      pleaseentersubject: 'કૃપા કરીને વિષય દાખલ કરો',
      pleaseentermessage: 'કૃપા કરીને સંદેશ દાખલ કરો',
      Invalidemailaddress: 'અમાન્ય ઇમેઇલ સરનામું',
      pleaseenterpassword: 'કૃપા કરીને પાસવર્ડ દાખલ કરો',
      passwordmusthaveatleastcharacters: 'પાસવર્ડમાં ઓછામાં ઓછા 6 અક્ષરો હોવા આવશ્યક છે',
      pleaseenterdob: 'કૃપા કરીને જન્મતારીખ દાખલ કરો',
      pleaseentermobilenumber: 'કૃપા કરીને મોબાઇલ નંબર દાખલ કરો',
      pleaseenteravalidmobilenumber: 'કૃપા કરીને માન્ય મોબાઇલ નંબર દાખલ કરો',
      pleaseenterstate: 'કૃપા કરીને રાજ્ય દાખલ કરો',
      pleaseentercity: 'કૃપા કરીને શહેર દાખલ કરો',
      pleaseenterpincode: 'કૃપા કરીને પિનકોડ દાખલ કરો',
      pleaseenteravalidpincodenumber: 'કૃપા કરીને માન્ય પિનકોડ નંબર દાખલ કરો',
      pleaseentereducation: 'કૃપા કરીને ભણતર દાખલ કરો',
      pleaseenteraddress: 'કૃપા કરીને હાલનું સરનામું દાખલ કરો',
      pleaseenterjob: 'કૃપા કરીને વ્યવસાય દાખલ કરો',
      pleaseentergender: 'કૃપા કરીને લિંગ દાખલ કરો',
      pleasechoosemaritalstatus: 'કૃપા કરીને વૈવાહિક સ્થિતિ પસંદ કરો',
      pleasechooserelation: 'કૃપા કરીને સંબંધ પસંદ કરો',
      pay: 'ચૂકવણી',
      registeredsuccessfully: 'સફળતાપૂર્વક રજીસ્ટ્રેશન થઈ ગયું.',
      paymentDoneSuccessfully: 'ચુકવણી સફળતાપૂર્વક થઈ.',
      paymentFailed: 'ચુકવણી નિષ્ફળ.',
      goTologinpage: 'લોગિન પેજ પર જાઓ',
      registrationfailed: 'રજીસ્ટર નિષ્ફળ થયું.',
      pleaseTryAgain: 'મહેરબાની કરીને ફરીથી પ્રયતન કરો.',
      gotoregister: 'રજીસ્ટર પેજ પર જાઓ',
      searchhere: 'અહીં શોધો...',
      nosearchdatafound: 'કોઈ શોધ ડેટા મળ્યો નથી...',
      nodatafound: 'કોઈ ડેટા મળ્યો નથી...',
      invoice: 'બીલ',
      download: 'ડાઉનલોડ',
      familyMembers: 'પરિવારના સભ્યો',
      downloadsuccessfully: 'સફળતાપૂર્વક ડાઉનલોડ કરો',
      profileimageupdatedsuccessfully: 'પ્રોફાઇલ છબી સફળતાપૂર્વક અપડેટ થઈ.',
      currentpassword: 'અત્યારનો પાસવર્ડ',
      newPassword: 'નવો પાસવર્ડ',
      confirmpassword: 'કન્ફર્મ પાસવર્ડ',
      currentpasswordisrequired: 'વર્તમાન પાસવર્ડ જરૂરી છે',
      newpasswordisrequired: 'નવો પાસવર્ડ જરૂરી છે',
      confirmpasswordisrequired: 'કન્ફર્મ પાસવર્ડ જરૂરી છે',
      newpasswordmustbedifferentfromthecurrentpassword: 'નવો પાસવર્ડ વર્તમાન પાસવર્ડથી અલગ હોવો જોઈએ!',
      incorrectcurrentpassword: 'ખોટો વર્તમાન પાસવર્ડ',
      passwordupdatedsuccessfully: 'પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો.',
      dataupdatedsuccessfully: 'ડેટા સફળતાપૂર્વક અપડેટ થઈ ગયા.',
      chooseyourgender: 'લિંગ પસંદ કરો',
      update: 'અપડેટ',
      datadeletedsuccessfully: 'ડેટા કાઢી નાખ્યું.',
      personalid: 'વ્યક્તિગત આઈડી',
      age: 'ઉંમર',
      deleteconfirm: 'શું તમે ખરેખર કાઢી નાખવા માંગો છો?',
      delete: 'કાઢી નાખો',
      confirmlogout: 'શું તમે ખરેખર લોગઆઉટ કરવા માંગો છો?',
      confirmSubscriptionCacel: 'શું તમે ખરેખર સબ્સ્ક્રિપ્શન રદ કરવા માંગો છો?',
      confirm: 'પુષ્ટિ કરો',
      familymembersarenotavailable: 'પરિવારના સભ્યો ઉપલબ્ધ નથી',
      addnewfamilymembers: 'કુટુંબના નવા સભ્યો ઉમેરો',
      form: 'ફોર્મ',
      selectrelation: 'સંબંધ પસંદ કરો',
      youcantaddmorethan7forms: 'તમે 7 થી વધુ ફોર્મ ઉમેરી શકતા નથી.',
      fillthedatatoaddnewform: 'નવું ફોર્મ ઉમેરવા માટે તમામ માહિતી ભરો.',
      addform: 'નવું ફોર્મ ઉમેરો',
      submit: 'સબમિટ',
      allvillages: 'બધા ગામડાઓ',
      cancel: 'રદ કરો',
      yes: 'હા',
      shereapp: 'એપ્લિકેશન શેર કરો',
      entermobilenumberandpassword: 'મોબાઇલ નંબર અને પાસવર્ડ દાખલ કરો',
      emailOrMobileNumber: 'ઈમેલ અથવા ફોન નંબર',
      OurPurpose: 'અમારું ઉદ્દેશ્ય',
      sendusonemail: 'ઇમેઇલ પર મોકલો',
      facinganissue: 'સમસ્યા સામનું છે? અમારી સપોર્ટ ટીમ તમારી મદદ માટે અહીં છે. ઇમેઇલ દ્વારા અમારો સંપર્ક કરો.',
      emailOrMobileRequired: 'ઈમેલ અથવા ફોન નંબર જરૂરી છે',
      invalidEmailOrPhone: 'અમાન્ય ઇમેઇલ અથવા ફોન નંબર',
      fullName: 'પૂરું નામ',
      invalidDate: "અમાન્ય તારીખ",
      basicinfo: "મૂળભૂત માહિતી",
      ViewProfileImage: "પ્રોફાઇલ છબી જુઓ",
      EditProfileImage: "પ્રોફાઇલ છબી બદલો",
      Close: "બંધ કરો",
      Quickhelpforcommonissues: "સામાન્ય સમસ્યાઓ માટે ઝડપી મદદ 👋",
      EmailIsRequired: "ઈમેઇલ જરૂરી છે",
      OTPisrequired: "OTP જરૂરી છે",
      PleaseEnterEmail: "કૃપા કરીને ઇમેઇલ દાખલ કરો",
      failpaymentmessage: "અમે તમારી ચુકવણી પ્રોસેસ કરી શકીએ નહીં, તમારી ઇન્ટરનેટ કનેક્શન તપાસો અને ફરી પ્રયાસ કરો.",
      Successpaymentmessage: "સફળ! તમારી ચુકવણી પૂરી થઈ છે. હવે તમે પંચાલ સમાજ એપ માં લોગ ઇન કરી શરૂ કરી શકો છો.",
      TotalAmount: "કુલ રકમ",
      MemberId: "સભ્ય આઈડી",
      StartDate: "શરૂ તારીખ",
      EditProfile: "પ્રોફાઇલ સંપાદિત કરો",
      AddProfile: "પ્રોફાઇલ ઉમેરો",
      AddFamilyDetails: "પરિવારના સભ્યો ઉમેરો",
      CancelSubscription: "સબ્સ્ક્રિપ્શન રદ કરો",
      ShareApp: "એપ્લિકેશન શેર કરો",
      VillagePeople: "ગામના લોકો",
      contactusphoneheading: "તમે નીચે આપેલા નંબર પર કૉલ, ટેક્સ્ટ અથવા વોટ્સએપ કરી શકો છો.",
      contactusemailheading: "અમે ઇમેઇલ્સનો જવાબ 24 કલાકની અંદર આપીએ છીએ.",
      socials: "સોશિયલ મીડિયા",
      contactussocialheading: "અપડેટ્સ અને ઓફર્સની મોદીફાયડ માહિતી મળવા માટે અમારા સોશિયલ મીડિયાનું ફોલો કરો.",
      gettouchmail: "અમારો સંપર્ક કરવા માટે ઇમેઇલ દ્વારા સંપર્ક કરો. 👋",
      sendemail: "ઈ - મેલ મોકલો",
      subject: "વિષય",
      filldetails: "વિગતો ભરો",
      donthaveaccount: "ખાતું નથી?",
      position: "હોદ્દો",
      tryagain: "ફરીથી પ્રયત્ન કરો",
      editbanner: "બૅનર છબી બદલો",
      viewbanner: "બૅનર છબી જુઓ",
      selectmaritalstatus: "વૈવાહિક સ્થિતિ પસંદ કરો",
      tellmehowcan: "અમને કહો કે હું તમને કેવી રીતે મદદ કરી શકું👋",
      ourcrewofexpertsareon: "અમારા નિષ્ણાતોની ટીમ હંમેશા સેવા માટે તૈયાર હોય છે",
      getthesolutionsend: "તમારા ઇમેઇલ ઇનબોક્સમાં ઉકેલ મેળવો",
      findintelligentanswersInstantly: "પંચાલ સમુદાયની સંસ્કૃતિ વિશે વારંવાર પૂછાતા પ્રશ્નોના ઝડપી જવાબો અહીં મેળવો.",
      termsAndConditionCardContent: "નિયમો અને શરતો એ નિયમો છે જે વપરાશકર્તાઓ સેવાનો ઉપયોગ કરવા માટે સ્વીકારે છે",
      termsAndCondition: "નિયમો અને શરતો",
      searchVillage: "ગામડાઓ શોધો",
      searchPersonVillage: "વ્યક્તિની વિગતો શોધો",
      SupportPage: "સપોર્ટ પેજ",
      Villagewisepeople: "ગામડાં પ્રમાણે લોકો",
      NewsList: "સમાચાર યાદી",
      EmailSupport: "ઇમેઇલ સપોર્ટ",
      RegisterPage: "રજીસ્ટર પેજ",
      EditUserProfile: "વપરાશકર્તા પ્રોફાઇલ સંપાદિત કરો",
      PaymentPage: "પેમેન્ટ પેજ",
      AddFamilyDetails: "કૌટુંબિક વિગતો ઉમેરો",
      EditFamilyDetails: "કૌટુંબિક વિગતો બદલો",
      Members: "સભ્યો",
      Contactus: "સંપર્ક",
      okay: "થીક છે.",
      Subjectisrequired: "વિષય જરૂરી છે.",
      Messageisrequired: "સંદેશ જરૂરી છે.",
      Invalidemailformat: "અમાન્ય ઇમેઇલ ફોર્મેટ",
      Emailisrequired: "ઇમેઇલ આવશ્યક છે",
      Description: "વર્ણન",
      Support: "મદદ",
      Loading: "રાહ જુવો",
      LatestNews: "તાજા સમાચાર",
      joinnow: "જોઈન કરો",
      Directory: "સભ્યો",
      Events: "પ્રસન્ગો",
      Business: "વ્યવસાય",
      AllUser: "સભ્યો ની યાદી",
      PhoneNumber: "ફોન નંબર",
      AllEvents: "બધા પ્રસંગો",
      SuccessfullyLoggedOut: "સફળતાપૂર્વક લૉગઆઉટ થઇ ગયુ છે",
      LanguageChangedSuccessfully: "ભાષા સફળતા પૂર્વક બદલાઈ ગઈ છે",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
