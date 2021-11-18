import React from 'react'
import TicketsList from '../TicketsList';
// import TicketList from '../TicketList';
import './widgetLg.css'

const WidgetLg = ({isLoading, tickets}) => {
    
    return (
        <div className="widgetLg">
            {/* <TicketList/> */}
            <TicketsList tickets={tickets} isLoading={isLoading}/>
        </div>
    );

}

export default WidgetLg;