import React, {useEffect, useState} from 'react';
import apiFacade from "../apiFacade.js";
import facade from "../apiFacade.js";

function Side6({setErrorMessage}) {

    const [allDinners, setAllDinners] = useState([])
    const [dinnerId, setDinnerId] = useState(0)
    const [dinner, setDinner] = useState({})
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [dish, setDish] = useState('');
    const [price, setPrice] = useState(0);
    const [createEvent, setCreateEvent] = useState(false)

    useEffect(() => {
        facade.fetchData("dinner/all", data => setAllDinners(data), setErrorMessage);
    }, [])

    const dinnerChange = (e) => {
        setDinnerId(e.target.value)
        console.log(dinnerId);
    }

    const edit = async (e) => {
        e.preventDefault();
        let id = dinnerId
        await facade.fetchData("dinner/id/" + id, data => setDinner(data), setErrorMessage);
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
        console.log(location)
    };

    const handleTime = (e) => {
        setTime(e.target.value);
    };

    const handleDish = (e) => {
        setDish(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let jsonBody =
            {
                id: dinnerId,
                time: time,
                location: location,
                dish: dish,
                price: price
            }
        console.log(jsonBody)
        await apiFacade.putData("dinner/update/" + dinnerId, (data) => {
            console.log("Dinner event was successfully updated");
        }, setErrorMessage, jsonBody)
        // setCreateEvent(!createEvent)
    }

    return (
        <div className="column middle" style={{paddingLeft: 40}}>
            <div>
                <h2>Update dinner event</h2>
            </div>

            <label htmlFor="dinnerSelect">Choose a dinner event:</label>
            <select onChange={dinnerChange}>
                <option value=""></option>
                {allDinners.map((dinner) => (
                    <option  key={dinner.id} value={dinner.id}>id:{dinner.id} | location:{dinner.location} | time:{dinner.time}</option>
                ))}
            </select>
            <button className="removeMember" onClick={edit}>Edit</button>
            <br/>

            <form onSubmit={handleSubmit}>
                <input className="inputLogin" defaultValue={dinner.location} onChange={handleLocation}/>
                <br/>
                <input className="inputLogin" defaultValue={dinner.time} onChange={handleTime}/>
                <br/>
                <input className="inputLogin" defaultValue={dinner.dish} onChange={handleDish}/>
                <br/>
                <input className="inputLogin" defaultValue={dinner.price} onChange={handlePrice}/>
                <br/><br/>
                <button onClick={handleSubmit} type="submit">Save event</button>
            </form>
            <div>
                {createEvent ? (
                    <h5>Dinner event in {location}  {time} with dish {dish} was successfully created</h5>
                ) : ""}
            </div>
        </div>
    );
}

export default Side6;