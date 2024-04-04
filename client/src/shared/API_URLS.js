
const ipAddress = "http://192.168.1.100:9090";

const clinicalConfigBase = ipAddress + "/clinical-config-service/api/v1";
const allergyBase = ipAddress + "/allergy-service/api/v1";


export const API_URL = {
    Login: authorizeBase + "/authnticate",
    RESET_PASSWORD: authorizeBase + "/change-password",
    RESET_REQUEST: authorizeBase + "/reset-password",
    CHECK_USER_VALIDITY: authorizeBase + "/auth-status",
    Users: {
        UserList: {},
        UserInfo: {
            GET: ehrBase + "/api/v1/users/{userId}",
        },
    },

    hospitals: {
        list: adminBase + "/hospitals",
        GET_HOSPITAL_DETAILS: adminBase + "/hospitals/{hospitalId}",
        UPDATE_HOSPITAL_DETAILS: adminBase + "/hospitals/{hospitalId}",
        CREATE_NEW_HOSPITAL: adminBase + "/hospitals",
        GET_ALL_HOSPITALS_OF_HOSPITAL_GROUP: adminBase + "/hospitals/groups/{groupId}?searchKey={searchKey}&pageNo={pageNo}&pageSize={pageSize}",
    },
    RCM: {
        SEARCH_UCAF_INVOICES: RCMBase + "/ucaf/appoinment-details",
        GET_UCAF_DETAILS: RCMBase + "/ucaf/{ucafId}",
        UPDATE_UCAF_DETAILS: RCMBase + "/ucaf",
        GET_UCAF_SERVICE_DETAILS: RCMBase + "/ucaf-service-detail/getAll?pageNo={pageNo}&pageSize={pageSize}&appointmentNo={appointmentNo}",
        UPDATE_COMPANY_SHARE_AND_DISCOUNT_AMOUNT: RCMBase + "/ucaf-service-detail/{ucafDetailId}",
        GET_UCAF_PDF: RCMBase + "/report/ucaf/{ucafDetailId}",
        GET_WIDGET_STATS: RCMBase + "/rcm-widget/widget-stats",
    },
};
