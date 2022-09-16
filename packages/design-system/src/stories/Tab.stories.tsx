import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { Tab } from '../index';

export default {
  title: 'Tabs',
  component: Tab
};

export const UncontrolledTabs: ComponentStory<typeof Tab> = () => (
  <Tab defaultValue="profile">
    <Tab.Triggers
      items={[
        { label: 'Profile Settings', value: 'profile' },
        { label: 'Login & Security', value: 'login' },
        { label: 'Wallet Information', value: 'wallet' },
        { label: 'Node Info', value: 'node' }
      ]}
      getLabel={(item) => item.label}
      getValue={(item) => item.value}
    />
    <div className="p-4">
      <Tab.Content value="profile">Profile Settings</Tab.Content>
      <Tab.Content value="login">Login & Security</Tab.Content>
      <Tab.Content value="wallet">Wallet Information</Tab.Content>
      <Tab.Content value="node">Node Info</Tab.Content>
    </div>
  </Tab>
);

export const ControlledTabs: ComponentStory<typeof Tab> = () => {
  const [tab, setTab] = useState('profile');
  return (
    <Tab value={tab} onValueChange={(tab) => setTab(tab)}>
      <Tab.Triggers
        items={[
          { label: 'Profile Settings', value: 'profile' },
          { label: 'Login & Security', value: 'login' },
          { label: 'Wallet Information', value: 'wallet' },
          { label: 'Node Info', value: 'node' }
        ]}
        getLabel={(item) => item.label}
        getValue={(item) => item.value}
      />
      <div className="p-4">
        <Tab.Content value="profile">Profile Settings</Tab.Content>
        <Tab.Content value="login">Login & Security</Tab.Content>
        <Tab.Content value="wallet">Wallet Information</Tab.Content>
        <Tab.Content value="node">Node Info</Tab.Content>
      </div>
    </Tab>
  );
};
