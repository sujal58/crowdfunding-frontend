export const baseApi = import.meta.env.VITE_API_URL;


export const apiEndpoints = {
    // Auth
    signupUrl: `${baseApi}/auth/signup`,
    loginUrl: `${baseApi}/auth/login`,
    forgotPasswordUrl: `${baseApi}/auth/forgot-password`, // if implemented
  
    // Campaigns
    createCampaignUrl: `${baseApi}/campaigns`,
    getCampaignByIdUrl: `${baseApi}/campaigns/id/`,        // append {id}
    getAllCampaignsUrl: `${baseApi}/campaigns`,
    getUserCampaignsUrl: `${baseApi}/campaigns/total`,
    deleteCampaignUrl: `${baseApi}/campaigns/delete/`,     // append {id}
  
    // Categories
    createCategoryUrl: `${baseApi}/categories`,
    getAllCategoriesUrl: `${baseApi}/categories`,
    deleteCategoryUrl: `${baseApi}/categories/delete/`,    // append {id}
  
    // Comments
    createCommentUrl: `${baseApi}/comments/`,              // append {campaignId}
    getAllCommentsUrl: `${baseApi}/comments`,
    getCommentsByCampaignUrl: `${baseApi}/comments/`,      // append {campaignId}
    deleteCommentUrl: `${baseApi}/comments/`,              // append {id}
  
    // Donations
    getAllDonationsUrl: `${baseApi}/donations`,
    createDonationUrl: `${baseApi}/donations/`,            // append {campaignId}
    getDonationByIdUrl: `${baseApi}/donations/`,           // append {id}
    getDonationsByDonorIdUrl: `${baseApi}/donations/donor/`, // append {donorId}
    getCurrentUserDonationsUrl: `${baseApi}/donations/user`,
  
    // KYC
    submitKycUrl: `${baseApi}/kyc/submit`,
    getKycByUserIdUrl: `${baseApi}/kyc/`,                  // append {userId}
    getAllKycUrl: `${baseApi}/kyc`,
    deleteKycUrl: `${baseApi}/kyc/`,                       // append {userId}
    changeKycStatusUrl: `${baseApi}/kyc/status`,
  
    // Notifications
    sendNotificationUrl: `${baseApi}/notifications`,
    getAllNotificationsUrl: `${baseApi}/notifications`,
    getUserNotificationsUrl: `${baseApi}/notifications/user`,
    getUnreadNotificationsUrl: `${baseApi}/notifications/unread`,
    getNotificationByIdUrl: `${baseApi}/notifications/`,   // append {id}
    deleteNotificationUrl: `${baseApi}/notifications/`,    // append {id}
  
    // Roles
    getAllRolesUrl: `${baseApi}/roles`,
    createRoleUrl: `${baseApi}/roles`,
    deleteRoleUrl: `${baseApi}/roles/`,                    // append {id}
  
    // Tags
    createTagUrl: `${baseApi}/tags`,
    getAllTagsUrl: `${baseApi}/tags`,
    deleteTagUrl: `${baseApi}/tags/`,                      // append {id}
  
    // Users
    getUserByIdUrl: `${baseApi}/users/`,                   // append {id}
    getAllUsersUrl: `${baseApi}/users`,
    getAllUserDetailsUrl: `${baseApi}/users/details`,
    getKycStatusByUsernameUrl: `${baseApi}/users/kyc/`,    // append {username}
    deleteUserUrl: `${baseApi}/users/`,                    // append {id}
  };