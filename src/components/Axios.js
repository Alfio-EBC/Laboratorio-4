
function apiCons(dispatch, setSt) {
    return async function getData(e) {
        e.preventDefault();

        
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            const lst = [];

            for (let x = 0; x < data.results.length; x += 2) {
                lst.push(data.results.slice(x, x + 2));
            }

            dispatch(setSt(lst));
        } catch (error) {
            console.log("ERROR: " + error.message);
        }
    };
}

export default apiCons;
