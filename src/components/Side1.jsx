import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";

function Side1({setErrorMessage}) {

    const [allDinners, setAllDinners] = useState([])

    useEffect(() => {
        facade.fetchData("dinner/all", data=> setAllDinners(data), setErrorMessage);
    }, [])

    return (
        <div style={{padding: 30}} className='column middle'>
            <h2>Dinner events list</h2>

            <br/>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Location</th>
                    <th scope="col">Dish</th>
                    <th scope="col">Time</th>
                    <th scope="col">Price</th>
                </tr>
                </thead>
                <tbody>
                {allDinners.map((dinner, i) =>(
                    <tr key={dinner.id}>
                        <th scope="row" >{i+1}</th>
                        <td>{dinner.location}</td>
                        <td>{dinner.dish}</td>
                        <td>{dinner.time}</td>
                        <td>{dinner.price} dkk</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Side1;