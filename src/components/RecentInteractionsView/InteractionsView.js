import React, {Component, useState} from "react";
import { Theme } from '@twilio-paste/core/theme';
import InteractionsDetails from "../InteractionDetails/InteractionDetails";


//const queryParams = new URLSearchParams(window.location.search);

class InteractionsView extends Component {   
    
    state = {
        // customerCallSid : queryParams.get("customerCallSid") || '',
        // workerCallSid : queryParams.get("workerCallSid") || ''
    };


    render() {
        return (
            <Theme.Provider theme="flex">
                <InteractionsDetails/>
            </Theme.Provider>
        );
      }
}

export default InteractionsView