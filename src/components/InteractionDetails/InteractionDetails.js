import React, {useState, useEffect, Component} from "react";
import { IconButton, Notifications } from '@twilio/flex-ui';
import { Theme } from '@twilio-paste/core/theme';
import { Card, Table, THead, TFoot, TBody, Tr, Th, Td } from '@twilio-paste/core';
import {Heading} from '@twilio-paste/core/heading';
import { Manager, TaskHelper } from '@twilio/flex-ui';
import SyncHelper from '../../helpers/SyncHelper';
import { resumeInteraction } from '../../helpers/InteractionsServices';
import Moment from 'react-moment';



class InteractionsDetails extends Component { 
    constructor() {
        super();
        this.state = {
          mapItems: [],
          show: false,
          showSendMessageButton: true,
          showLoadingScreen: true,
          syncEmpty: false,
          agentName: '',
          workerSid: '',
          mapKey: '',
        };
      }
    

    mapItemStateUpdate = async () => {
        const getSyncMapItems = await SyncHelper.getMapItems(
          //Using the user friendly name to get sync Map 
          await Manager.getInstance().workerClient.name
        );
        console.log('#### getSyncMapItems ', getSyncMapItems);

        if (getSyncMapItems.length === 0) {
          console.warn('Sync Map is empty.');
    
          this.setState({ syncEmpty: true, showLoadingScreen: false });
          return;
        }
    
        // prep syncMap data
        const formattedSyncMapItems = getSyncMapItems.map(mapItem => {
            // items return from the sync map have a slightly different structure in Flex 2.x: item.value vs item.descriptor.data
            let newObject = mapItem.item.descriptor.data;
            newObject.mapKey = mapItem.item.descriptor.key;
            //console.log('##### newObject ', newObject)
            return newObject;
        });
    
        this.setState({
          mapItems: formattedSyncMapItems,
          showLoadingScreen: false,
        });
    };
    
    componentDidMount = () => { 
        this.mapItemStateUpdate();
        console.log('#### Interactions Details Component mounted');
    };
    
    render(){
        //console.log('######## taskSid > ' , this.props.task.taskSid);
        //console.log('######## Worker Friendly Name -> ' , Manager.getInstance().workerClient.friendlyName);
        //console.log('Taskhelper -> ' , new TaskHelper(this.props.task));  
        //console.log('######## callSid -> ' , this.props.task.conference?.participants[0]._callSid); 
    return (
            <Theme.Provider theme="flex">
                <Card>
                    <Heading as="h2" variant="heading30">
                        Recent Interaction List
                    </Heading>
                    <Table variant="borderless">
                    <THead>
                        <Tr>
                            <Th>Channel</Th>
                            <Th>Phone</Th>
                            <Th>Customer Name</Th>
                            <Th>Date & Time</Th>
                            <Th>Queue</Th>
                            <Th>Action</Th>
                            <Th></Th>
                        </Tr>
                    </THead>
                        <TBody>
                            {this.state.mapItems.map(mapItem => {
                            return (
                            <Tr key={mapItem.mapKey}>
                                <Td>{mapItem.taskAttributes.channelType}</Td>                             
                                <Td>{mapItem.taskAttributes.customers.phone}</Td>
                                <Td>{mapItem.taskAttributes.customerName}</Td>
                                <Td>
                                    <Moment format="DD/MM/YYYY HH:mm">{mapItem.taskAttributes.date_created}</Moment>
                                </Td>
                                <Td>{mapItem.taskAttributes.intent}</Td>
                                <Td><IconButton
                                    icon={'Message'}
                                    title="Resume Interaction"
                                    onClick={ () => resumeInteraction(mapItem.mapKey)}
                                    />
                                </Td>
                                <Th>
                                </Th>
                            </Tr>
                            );
                        })}
                        </TBody>
                
                    </Table>
                </Card>

            
            </Theme.Provider>
    )}
}
export default InteractionsDetails