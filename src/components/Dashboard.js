import React, {useEffect, useState} from 'react'
import Sidebar from './sidebar/Sidebar';
import '../App.css'
import Home from '../pages/home/Home'
import Topbar from "../components/topbar/Topbar"
import { GetTickets} from '../services/TicketService'

const Dashboard = (props) => {
    const [tickets, setTickets] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        GetTickets().then((res) => {
            setTickets(res)
            setLoading(false)
        });
    }, [])

    return (
        <>
            <Topbar />
            <div className="container1">
                <Sidebar id={props?.location?.state?.id} />
                <Home isLoading={isLoading} tickets={tickets} />
            </div>
        </>
    )
}


export default Dashboard;