import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";

function Side7({setErrorMessage}) {

    const [allDinners, setAllDinners] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        facade.fetchData("dinner/all", data=> setAllDinners(data), setErrorMessage);
    }, [toggle])

    const deleteDinner = async(e) => {
        await facade.deleteData("dinner/delete/" + e.target.value, data => {
            console.log("Boat with id: " + e.target.value + " was successfully deleted");
        }, setErrorMessage)
        setToggle(!toggle)
    }

    return (
        <div style={{padding: 30}} className='column middle'>
            <div style={{paddingTop: 30}}>
                <h2>Dinner events list</h2>
            </div>


            <br/>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Location</th>
                    <th scope="col">Dish</th>
                    <th scope="col">Time</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delete</th>
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
                        <td><button className="logout" value={dinner.id} onClick={deleteDinner}>Delete event</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Side7;