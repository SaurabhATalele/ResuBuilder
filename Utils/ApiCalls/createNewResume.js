export const createNewResume = async (data) => {
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
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESUME_API}`, requestOptions);
    const resposeData = await response.json();
    return resposeData
    }

export const deleteResume = async (data)=>{
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    const raw = JSON.stringify({
        ...data,
    });
    
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESUME_API}`, requestOptions);
    const resposeData = await response.json();
    return resposeData
}