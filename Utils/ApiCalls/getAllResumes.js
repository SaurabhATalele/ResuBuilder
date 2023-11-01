export const getAllResumes = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    const raw = JSON.stringify({
        ...data,
    });
    
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    
    console.log(process.env.NEXT_PUBLIC_RESUME_API);
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESUME_API}/get`, requestOptions);
    console.log(response);
    const resposeData = await response.json();
    return resposeData
    }