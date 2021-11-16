import React from 'react'
import AssetsLIst from '../TicketsList';
import './widgetLg.css'

const WidgetLg = ({isLoading, assets}) => {
    
    return (
        <div className="widgetLg">
            <AssetsLIst assets={assets} isLoading={isLoading}/>
        </div>
    );

}

export default WidgetLg;