import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { Theme } from '@twilio-paste/core/theme';
import { View } from '@twilio/flex-ui';

import RecentInteractionsViewNavButton from './components/RecentInteractionsView/InteractionsViewNavButton';
import InteractionsView from './components/RecentInteractionsView/InteractionsView';

const PLUGIN_NAME = 'RecentInteractionsPlugin';

export default class RecentInteractionsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 }
    
    //adding recent Interactions to side nav button and new view
    flex.SideNav.Content.add(
      <RecentInteractionsViewNavButton key="recent-Interactions-sidenav-button"/>, { sortOrder: 2 }
    );

    // Add view to the 
    flex.ViewCollection.Content.add(
      <View name="interactions-view" key="interactions-view">
        <InteractionsView />  
      </View>
    );
  }
}
