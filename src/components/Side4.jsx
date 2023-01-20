import React, {useState} from 'react';
import apiFacade from "../apiFacade.js";

function Side4({setErrorMessage}) {

    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [dish, setDish] = useState('');
    const [price, setPrice] = useState('');
    const [createEvent, setCreateEvent] = useState(false)

    const handleLocation = (e) => {
        setLocation(e.target.value);
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
                time: time,
                location: location,
                dish: dish,
                price: price
            }
        console.log(jsonBody)
        await apiFacade.postData("dinner", (data) => {
            console.log("Dinner event in: " + data.location + " " + data.time + " was successfully created");
        }, setErrorMessage, jsonBody)
        setCreateEvent(!createEvent)
    }

    return (
        <div style={{padding: 30}} className="column middle" style={{paddingLeft: 40}}>
            <div style={{paddingTop: 30}}>
                <h2>Create new dinner event</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="inputLogin" required type="text" placeholder="Location" name="location"
                       onChange={handleLocation}/>
                <br/>
                <input className="inputLogin" required type="text" placeholder="Time" name="time"
                       onChange={handleTime}/>
                <br/>
                <input className="inputLogin" required type="text" placeholder="Dish" name="dish"
                       onChange={handleDish}/>
                <br/>
                <input className="inputLogin" required type="text" placeholder="Price" name="price"
                       onChange={handlePrice}/>
                <br/><br/>
                <button onClick={handleSubmit} type="submit">Create dinner event</button>
            </form>
            <div>
                {createEvent ? (
                    <h5>Dinner event in {location}  {time} with dish {dish} was successfully created</h5>
                ) : ""}
            </div>
        </div>
    );
}

export default Side4;