import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import apiFacade from "../apiFacade.js";

function Side3({setErrorMessage}) {

    const [allDinners, setAllDinners] = useState([])
    const [family, setFamily] = useState('')
    const [contact, setContact] = useState('')
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        facade.fetchData("dinner/all", data=> setAllDinners(data), setErrorMessage);
    }, [])

    const handleFamily = (e) => {
        setFamily(e.target.value);
    };

    const handleContact = (e) => {
        setContact(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let jsonBody =
            {
                familyName: family,
                contactInfo: contact
            }
        console.log(jsonBody)
        await apiFacade.postData("assignment", (data) => {
            console.log("Dinner event in: " + data.family + " " + data.time + " was successfully created");
        }, setErrorMessage, jsonBody)
        // setCreateEvent(!createEvent)
    }

    const assignToEvent = (e) => {
        setToggle(!toggle)
    }

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
                    <th scope="col">Assign</th>
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
                        <td><button className="logout" value={dinner.id} onClick={assignToEvent}>Assign to event</button></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {toggle ? (
                <form onSubmit={handleSubmit}>
                    <input className="inputLogin" required type="text" placeholder="Family name"
                           onChange={handleFamily}/>
                    <br/>
                    <input className="inputLogin" required type="text" placeholder="Contact info" name="time"
                           onChange={handleContact}/>
                    <br/><br/>
                    <button onClick={handleSubmit} type="submit">Save</button>
                </form>
            ) : ""}
        </div>
    );
}

export default Side3;
