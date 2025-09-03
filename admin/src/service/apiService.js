import { servicesAxiosInstance } from './config'

export const getServerHealth = async () => {
    const response = await servicesAxiosInstance.get('/v1/health')
    return response.data
}

export const getProduct = async (query,limit,offset) => {
    const response = await servicesAxiosInstance.get(`/v1/query-product-data/?query=${query}&limit=${limit}&offset=${offset}`)
    return response.data
}

export const updateProduct = async (token,id,data) =>{

    console.log("helloo",data)
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post(`v1/update-product/${id}`,data,{
        headers
    })
    return response.data
}

export const fetchVisitorLocation = async () => {
    const response = await servicesAxiosInstance.get('/v1/fetch-location-stats')
    return response.data
}

export const fetchSupportTickets = async ({ limit, offset, subject, isRead, isSpam, isSolved,token } = {}) => {
    const params = new URLSearchParams();

    const headers= {
        Authorization: `Bearer ${token}`
    }
    if (limit !== undefined) params.append('limit', limit);
    if (offset !== undefined) params.append('offset', offset);
    if (subject !== undefined) params.append('subject', subject);
    if (isRead !== undefined) params.append('isRead', isRead);
    if (isSpam !== undefined) params.append('isSpam', isSpam);
    if (isSolved !== undefined) params.append('isSolved', isSolved);

    const response = await servicesAxiosInstance.get(`/v1/query-support-enquiry-data/?${params.toString()}`,{
        headers
    });
    return response.data;
};

export const updateSupportTicket = async (token,ticketId, data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post(`/v1/update-support-enquiry-data/${ticketId}`,  data,{
        headers
    });
    return response.data;
}


export const fetchContactUs = async ({ limit, offset, subject, isRead, isSpam, isSolved,token } = {}) => {    
    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', limit);
    if (offset !== undefined) params.append('offset', offset);
    if (subject !== undefined) params.append('subject', subject);
    if (isRead !== undefined) params.append('isRead', isRead);
    if (isSpam !== undefined) params.append('isSpam', isSpam);
    if (isSolved !== undefined) params.append('isSolved', isSolved);

    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.get(`/v1/query-contact-us-data/?${params.toString()}`,{
        headers
    });
    return response.data;
}

export const updateContactUs = async (token,contactId, data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post(`/v1/update-contact-us-data/${contactId}`, data, {
        headers
    });
    return response.data;
}

export const signIn = async (email,password) => {
    const response = await servicesAxiosInstance.post('/v1/sign-in', {
        "emailAddress":email,
        "password":password
    });
    return response.data;
};

export const uploadFile = async (file) => {
    const response = await servicesAxiosInstance.post('/v1/upload-file', file)
    return response.data
}

export const saveSolution = async (token,data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post('/v1/save-solution', data, {
        headers
    });

    return response.data;
}

export const querySolutions = async () => {
    const response = await servicesAxiosInstance.get('/v1/query-solutions')
    return response.data
}

export const querySingleSolutions = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/query-solution/${id}`)
    return response.data
}

export const updateSolutionData = async (id,data) => {
        
    const response = await servicesAxiosInstance.post(`/v1/update-solution/${id}`,data)
    return response.data
}


export const addProduct = async (token,data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post('/v1/add-product', data, {
        headers
    });

    return response.data;   
}

export const queryTestimonials = async() => {
    const response = await servicesAxiosInstance.get('/v1/query-testimonials')
    return response.data
}

export const updateTestimonialStatus = async (id,token) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.get(`/v1/update-testimonial/${id}`,{
        headers
    })
    return response.data
}

export const updateTestimonialData = async (id,data,token) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.put(`/v1/update-testimonial-data/${id}`,data,{
        headers
    })
    return response.data
}



export const saveTestimonials = async (token,data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post('/v1/add-testimonial', data, {
        headers
    });

    return response.data;
}


export const saveProject = async (token,data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post('/v1/save-projects', data, {
        headers
    });

    return response.data;
}


export const queryProjects = async () => {
    const response = await servicesAxiosInstance.get('/v1/query-projects')
    return response.data
}

export const createBlog =  async (token,data) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.post('/v1/create-blog', data, {
        headers
    });

    return response.data;   
}

export const updateBlog = async (token,id,data) =>{
    const headers= {
        Authorization: `Bearer ${token}`
    }
    const response = await servicesAxiosInstance.put(`v1/update-blog/${id}`,data,{
        headers
    })
    return response.data
}


export const getBlog = async (query,limit,offset) => {
    const response = await servicesAxiosInstance.get(`/v1/query-blog-data/?query=${query}&limit=${limit}&offset=${offset}`)
    return response.data
}


export const updateProject = async (id,data) => {
    const response = await servicesAxiosInstance.post(`/v1/update-project/${id}`, data)
    return response.data
}



export const createMedia = async (token, data) => {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const response = await servicesAxiosInstance.post(`v1/create-media`, data, {
        headers
    });
    return response.data;
};

export const updateMedia = async (token, id, data) => {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const response = await servicesAxiosInstance.put(`v1/update-media/${id}`, data, {
        headers
    });
    return response.data;
};

export const getMedia = async (query, limit, offset) => {
    const response = await servicesAxiosInstance.get(
        `v1/query-media-data/?query=${query}&limit=${limit}&offset=${offset}`
    );
    return response.data;
};

export const getSingleMedia = async (id) => {
    const response = await servicesAxiosInstance.get(`v1/query-media/${id}`);
    return response.data;
};



export const deleteByType = async (data)=>{
    const response = await servicesAxiosInstance.delete('/v1/delete-by-type', {
        data:data
    })
    return response.data
}
