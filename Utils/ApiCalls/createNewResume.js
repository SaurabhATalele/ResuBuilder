export const createNewResume = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log(data);
    
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESUME_API}`, requestOptions);
    const resposeData = await response.json();
    return resposeData
    }