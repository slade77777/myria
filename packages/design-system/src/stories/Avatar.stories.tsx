import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from '../Avatar/Avatar';

export default {
  title: 'Avatar',
  component: Avatar
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});

DefaultAvatar.args = {
  shape: 'circle',
  type: 'text',
  size: 'xxl',
  src: '',
  children: ''
};
