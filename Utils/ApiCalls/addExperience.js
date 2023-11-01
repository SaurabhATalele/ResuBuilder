export const addExperience = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        ...data
    });
    // console.log(raw);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/experience`, requestOptions);
    const resposeData = await response.json();
    return resposeData;
    }

export const deleteExperience = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        ...data
    });
    // console.log(raw);
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/experience`, requestOptions);
    const resposeData = await response.json();
    return resposeData;
    }

export const updateExperience = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        ...data
    });
    // console.log(raw);
    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'

    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/experience`, requestOptions);
    const resposeData = await response.json();
    return resposeData;
    }
