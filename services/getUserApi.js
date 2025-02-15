export const getUserApi = async (name) => {
    try {
        const res = await useFetch(`https://apidev.unabase.cc/app/users/findUsers/ByNames?name=${name}`);
        const data = JSON.stringify(res.data.value);
        return data;
    } catch (error) {
        console.log(error);
    }
    
}