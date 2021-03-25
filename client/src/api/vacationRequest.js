import Api from "./baseUrl";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const addVacationRequest = (body) => {

  return Api.post(
    "/request",
    { ...body },
    {
      headers: {
        Authorization: `Bearer ${cookies.get("session_token")} `,
      },
    }
  );
};

const getVacationRequestById = (id) => {
  return Api.get(`/request/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const getAllVacationRequestsByToken = () => {

  return Api.get(`/request/user`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};
const getAllVacationRequestAdminView = () => {
  return Api.get("/request/all/admin", {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const getAllVacationRequestsByUserId = (id) => {
  return Api.get(`/request/user/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const getAllVacationRequestsByStatus = (status) => {
  return Api.get(`/request/status/${status}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const getAllVacationRequests = () => {
  return Api.get(`/request/all`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const updateVacationRequest = (id, body) => {

  return Api.put(
    `/request/update/${id}`,
    { ...body },
    {
      headers: {
        Authorization: `Bearer ${cookies.get("session_token")} `,
      },
    }
  );
};

const updateVacationRequestStatus = (id, status) => {
  return Api.put(
    `/request/update/status/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${cookies.get("session_token")} `,
      },
    }
  );
};

const deleteVacationRequest = (id) => {
  return Api.delete(`/request/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("session_token")} `,
    },
  });
};

const importRequestsFromJson = (body) => {
    return Api.post("/request/import",
     body, {
    headers: {
        Authorization: `Bearer ${cookies.get("session_token")} `,
        'Content-Type': 'multipart/form-data'
    }
});
}

const exportAllVacationRequests = () => {
    return Api.get(`/request/all/export`,
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        })
}

const getSingleVacationRequestLengthLimit = () => {
  return Api.get(`/request/get/singlevacationlimit/`,
  {
      headers: {
          Authorization: `Bearer ${cookies.get("session_token")} `
      }
  })
}

const updateSingleVacationRequestLengthLimit = (body) => {
  return Api.put(`/request/update/singlevacationlimit/`,
    body,
    {
      headers: {
        Authorization: `Bearer ${cookies.get("session_token")} `,
      },
    }
  );
}

export {
  addVacationRequest,
  getVacationRequestById,
  getAllVacationRequests,
  getAllVacationRequestsByToken,
  updateVacationRequest,
  deleteVacationRequest,
  getAllVacationRequestsByStatus,
  getAllVacationRequestsByUserId,
  getAllVacationRequestAdminView,
  updateVacationRequestStatus,
  exportAllVacationRequests,
  importRequestsFromJson,
  getSingleVacationRequestLengthLimit,
  updateSingleVacationRequestLengthLimit
};
