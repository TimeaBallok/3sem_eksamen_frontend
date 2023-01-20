import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import apiFacade from "../apiFacade.js";

function Side2({setErrorMessage}) {

    const initMember =
        {
            "id": 0,
            "address": "",
            "phone": "",
            "email": "",
            "birthYear": 0,
            "account": 0,
            "assignments": []
        }

    const [memberId, setMemberId] = useState(1)
    const [dinners, setDinners] = useState([])
    const [member, setMember] = useState(initMember)
    const currentUser = apiFacade.getUserName();
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        facade.fetchData("member/name/" + currentUser, data=> setMemberId(data), setErrorMessage);
        facade.fetchData("member/id/" + memberId, data=> setMember(data), setErrorMessage);
        facade.fetchData("dinner/member/" + memberId, data=> setDinners(data), setErrorMessage);
    }, [])


    return (
        <div style={{padding: 30}} className='column middle'>
            <h2>Current account status: {member.account}</h2>
            <br/>
            <h2>Your assignments: </h2>
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
                {dinners.map((dinner, i) =>(
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

export default Side2;