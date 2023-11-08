export const register = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    
    const raw = JSON.stringify({
        ...data,
    });
    

    const requestOptions= {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_REGISTER_API}`, requestOptions);
    const resposeData = await response.json();
    return resposeData
}