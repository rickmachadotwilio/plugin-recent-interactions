import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';
 
const RecentInteractionsViewNavButton = ({ activeView }) => {
   function navigate() {
       Actions.invokeAction('NavigateToView', { viewName: 'interactions-view'});
       Actions.invokeAction('SetComponentState', {
        name: 'RecentInteractionsView',
        state: { isOpen: false }
      });
   }
 
   return (
       <SideLink
            showLabel={true}
            icon="Whatsapp"
            iconActive="Whatsapp"
            isActive={activeView === 'interactions-view'}
            onClick={navigate}>
            Interactions
       </SideLink>
   )
}
export default RecentInteractionsViewNavButton;