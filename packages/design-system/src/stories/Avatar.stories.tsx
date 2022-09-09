import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from '../Avatar/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    shape: {
      options: ['circle', 'square'],
      control: { type: 'radio' }
    },
    type: {
      options: ['image', 'text', 'icon', 'iconColor'],
      control: { type: 'radio' }
    },
    size: {
      options: ['xxl', 'xl', 'l', 'm', 's', 'xs'],
      control: { type: 'radio' }
    }
  }
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
