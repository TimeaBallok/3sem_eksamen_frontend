import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import apiFacade from "../apiFacade.js";

function Side5({setErrorMessage}) {

    const [allDinners, setAllDinners] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [dinnerId, setDinnerId] = useState(0)
    const [memberId, setMemberId] = useState(0)
    const [removed, setRemoved] = useState(false)

    useEffect(() => {
        facade.fetchData("dinner/all", data => setAllDinners(data), setErrorMessage);
        facade.fetchData("member/all", data => setAllMembers(data), setErrorMessage);
    }, [])

    const dinnerChange = (e) => {
        setDinnerId(e.target.value)
        console.log(dinnerId);
    }

    const memberChange = (e) => {
        setMemberId(e.target.value)
        console.log(memberId);
    }

    const removeMember = async (e) => {
        e.preventDefault();
        let jsonBody = {dinnerId: dinnerId, memberId: memberId}
        console.log(jsonBody)
        await apiFacade.postData("member/remove", (data) => {
            console.log("Boat with id: " + memberId + " and harbour " + dinnerId + " was successfully added together");
        }, setErrorMessage, jsonBody)
        setRemoved(!removed)
    };


    return (
        <div className='column middle'>
            <label htmlFor="boatSelect">Choose a dinner:</label>
            <select onChange={dinnerChange}>
                <option value=""></option>
                {allDinners.map((dinner) => (
                    <option  key={dinner.id} value={dinner.id}>id:{dinner.id} | location:{dinner.location} | time:{dinner.time}</option>
                ))}
            </select>

            <label htmlFor="memberSelect">Choose a member:</label>
            <select onChange={memberChange}>
                <option value=""></option>
                {allMembers.map((member) => (
                    <option  key={member.id} value={member.id}>id:{member.id} | email:{member.email} | phone:{member.phone}</option>
                ))}
            </select>
            <button className="removeMember" onClick={removeMember}>Remove member</button>

            {removed ? (
                <h5>Member with id {memberId} was succesfully removed from dinner event with id {dinnerId}</h5>
            ) : ""}
        </div>
    );
}

export default Side5;