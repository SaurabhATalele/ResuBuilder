export const generatePoint = async (data) => {
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

    console.log(process.env.NEXT_PUBLIC_GENERATE_PROJECT_POINT_API);
    const response = await fetch(`${process.env.NEXT_PUBLIC_GENERATE_POINT_API}`, requestOptions);
    const resposeData = await response.json();
    return resposeData
}