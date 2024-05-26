const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  user_logout: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "GET",
  },
};

export default SummaryApi;
